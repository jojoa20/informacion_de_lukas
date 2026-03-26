# 🏛 Arquitectura de Backend (Next.js App Router) - Lukas AI

Este documento establece los cimientos y directrices arquitectónicas para el backend de "Lukas AI", un Personal Finance Manager (PFM) y Robo-Advisor multimodal para la Gen Z, soportado nativamente por la infraestructura de **Next.js (App Router)**, **Supabase (pgvector)** y las APIs de **OpenAI/ElevenLabs**.

---

## 1. Topología del Directorio Backend

Mantendremos una fuerte separación de responsabilidades aprovechando el paradigma de servidor de Next.js. Diferenciaremos claramente las rutas expuestas (para webhooks o streaming de IA) de las llamadas a funciones de servidor (para mutaciones directas de datos provenientes del UI).

\`\`\`text
src/
├── app/
│   └── api/
│       ├── chat/route.ts        # Endpoint POST nativo con ReadableStream para el Assistant de OpenAI.
│       ├── voice/route.ts       # (Opcional) Emisión de tokens firmados de ElevenLabs.
│       └── webhooks/stripe.ts   # Integraciones B2B/B2C para suscripciones.
│
├── actions/                     # Server Actions (Solo reciben y devuelven tipos serializables)
│   ├── auth.ts                  # Registro, login y manejo de sesiones.
│   ├── metas.ts                 # Mutaciones: crearMeta, updateMeta, deleteMeta.
│   ├── transacciones.ts         # Mutaciones directas de gastos/ingresos.
│   └── finscore.ts              # Consulta y canje de recompensas de gamificación.
│
├── services/                    # Capa de Lógica de Negocio (El cerebro de las operaciones)
│   ├── roboAdvisorEngine.ts     # Algoritmo principal de recomendaciones (Ahorro/Inversión).
│   ├── finScoreEngine.ts        # Cálculo asíncrono y penalizaciones (Ej. impacto de "Gastos Hormiga").
│   ├── ocrService.ts            # Pre-procesamiento de facturas y delegación a modelos de Visión.
│   └── memoryManager.ts         # Abstracción de Embeddings y recuperación con pgvector.
│
└── lib/
    ├── supabase/
    │   ├── server.ts            # Instanciación limpia de \`@supabase/ssr\`.
    │   └── admin.ts             # Cliente admin para cron jobs o bypass RLS interno.
    └── openai/
        └── assistant.ts         # Constantes de los propmts del "Pana" y config del SDK.
\`\`\`

---

## 2. Capa de Servicios (Business Logic)

Para evitar inflar los *Server Actions*, toda la complejidad matemática y de la IA será externalizada a \`src/services/\`.

- **FinScore Engine (\`finScoreEngine.ts\`):** 
  Centralizará las reglas de la gamificación. Un *Server Action* solo recibe un dato (Ej. "Compré un café por $5.000"), este servicio calcula que es un ingreso negativo (gasto hormiga), reduce el puntaje global e invoca una actualización local.
- **Robo-Advisor Engine (\`roboAdvisorEngine.ts\`):** 
  En función del capital, la propensión de riesgo y el historial semántico del usuario, orquestará las APIs del mercado junto a la de OpenAI para imprimir estrategias dinámicas y planes de metas.
- **OCR Service (\`ocrService.ts\`):** 
  El front envía un Blob de una imagen; este servicio la sube al bucket temporal de Supabase, extrae el String Base64, e invoca a \`gpt-4o\` para parsear en formato JSON estricto: \`{ monto, fecha, comercio, categoria }\`.

---

## 3. Integración con Supabase (Data Layer & Seguridad)

### Estrategia del Cliente
Utilizaremos **\`@supabase/ssr\`** emparejado con \`cookies()\` de Next.js para asegurar un SSR Auth robusto. Esto previene parpadeos de interfaz al recargar la página y permite consumir el estado del usuario puramente desde el servidor sin JavaScript del lado cliente.

### Políticas de RLS (Row Level Security)
La seguridad se apoya en el Edge y en PostgreSQL. Cada tabla principal restringirá filas basadas en la sesión del usuario.
* **\`profiles\` / \`users\`**: \`auth.uid() = id\`.
* **\`transactions\` / \`metas\` / \`budgets\`**: \`auth.uid() = user_id\`.
* **\`chat_memories\`**: \`auth.uid() = user_id\`.

Las mutaciones de inteligencia (como los resúmenes del asistente) deberán inyectar su respectivo SDK en cascada garantizando que el asistente nunca acceda los historiales financieros de terceros.

### Integración con pgvector
El archivo \`memoryManager.ts\` interactuará con la tabla de embeddings. Utilizaremos **\`supabase.rpc('match_memories', {...})\`** inyectando el query vectorizado de \`text-embedding-3-small\`. El filtro RLS garantizará que el "Pana Financiero" solo recuerde contextos que le pertenecen al emisor del hilo, alimentando \`additional_instructions\` del asistente con recuerdos relevantes.

---

## 4. Capa de Inteligencia Artificial (Integraciones)

### OpenAI (Cerebro Semántico y Analítico)
* **Arquitectura:** Usaremos la **Assistants API** debido a que maneja de forma natural los *Threads* e historial de conversaciones recurrentes sin necesidad de reenviar nosotros el payload completo constantemente.
* **Functions / Tools:** Los Server Actions se exponen a la IA como funciones deterministas. Por ejemplo, al subir el recibo de Nequi, el sistema invoca la función \`add_gasto_hormiga\` automáticamente, la API route ejecuta la transacción en Supabase y devuelve el nuevo FinScore en forma de texto al AI.

### ElevenLabs (Voz Dinámica - Baja Latencia)
* **Arquitectura:** Utilizaremos una conexión **RTC/WebSocket Directo** (\`@elevenlabs/react\`) desde el cliente hacia Conversational AI de ElevenLabs. 
* *Por qué:* Delegar la transmisión de audio a Serverless Functions de Vercel/Next.js mataría el límite de tiempo de ejecución y causaría retardos masivos de audio (Network Latency). En cambio, Next.js solo servirá la página React (entregando el \`NEXT_PUBLIC_ELEVENLABS_AGENT_ID\`) y opcionalmente firmará Auth Tokens efímeros, dejando que el navegador establezca un WebRTC directo con los clústeres de ElevenLabs, logrando respuestas parecidas al modelo de interrupción humana de baja latencia.

---

## 5. Escalabilidad y Rendimiento

Con la fusión de App Router y la IA, minimizaremos métricas de gasto de BBDD y de OpenAI (Tokens) mediante varias capas de almacenamiento:

1. **Revalidación Selectiva:** Operaciones en \`src/actions/...\` utilizarán de forma intensiva \`revalidatePath(...)\` y \`revalidateTag(...)\`. Las páginas de dashboard de FinScore y gráficas serán perezosas hasta recibir invalidación explícita (On-Demand Revalidation) tras insertar un gasto nuevo.
2. **Context Window Management:** Gracias al Retrieval (pgvector) y el uso sensato de *Threads* de OpenAI, reducimos el consumo de context window. Sólo anexaremos 3 - 5 memorias estrictamente relevantes ("El usuario quería ahorrar una moto hace tres meses") extraídas vía similarity search, ignorando historiales conversacionales irrelevantes.
3. **Data Cache de Next.js (\`unstable_cache\`):** Rutas que desplieguen tips estáticos de finanzas para la Gen Z, guías de inversión y las tablas base de recompensas B2B del negocio, se cachearán a nivel global para que múltiples usuarios consumiéndolas nunca golpeen Supabase directamente.
