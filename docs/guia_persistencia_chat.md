# Guía de Implementación: Chat Persistente y Transcripción 🎙️💾

Este documento proporciona contexto técnico para el equipo sobre las funcionalidades añadidas a **Lukas AI**.

## 1. Arquitectura de Persistencia
Hemos pasado de un chat estático a uno plenamente funcional y persistente usando **Supabase**.

### Base de Datos
- **Tabla**: `conversaciones`
- **Campos**:
  - `id` (uuid): Identificador único.
  - `created_at` (timestamptz): Fecha y hora del mensaje.
  - `sender` (text): 'user' o 'bot'.
  - `content` (text): El texto del mensaje.
  - `user_id` (uuid): Relacionado con el perfil (actualmente `00000000-0000-0000-0000-000000000001` para el MVP).

### API Endpoint (Backend)
- **Ruta**: [`/api/chat/save`](file:///home/djojo/code/proyecto/src/app/api/chat/save/route.ts)
- **Método**: `POST`
- **Body**: `{ sender: string, content: string, user_id?: string }`
- **Descripción**: Guarda cada interacción en la base de datos Supabase en segundo plano.

## 2. Transcripción de Voz a Texto
Se eliminó la dependencia de ElevenLabs Conversational para dar control total al usuario.
- **Hook**: [`useSpeechRecognition.ts`](file:///home/djojo/code/proyecto/src/hooks/useSpeechRecognition.ts)
- **Tecnología**: Web Speech API (nativa, sin costes de API).
- **Idioma**: Español (Colombia) `es-CO`.

## 3. Estado del Chat en Frontend
- **Componente**: [`ChatView.tsx`](file:///home/djojo/code/proyecto/src/components/demo/ChatView.tsx)
- Se utiliza `useState` para el historial visual y `useCallback` para el manejo de envíos.
- Implementa una animación de "Lukas está pensando..." (`isTyping`) para mejorar la experiencia de usuario.

---

## 🚀 Tareas Pendientes para finalizar el MVP

Para que Lukas AI esté listo para el pitch final, sugiero las siguientes tareas:

1. `[ ]` **Integración de IA Real**: Reemplazar la simulación de `setTimeout` en `ChatView.tsx` por una llamada real a Groq o OpenAI (usando los agentes definidos en `src/lib/supabase/actions.ts`).
2. `[ ]` **Categorización Automática**: Implementar lógica para que si el usuario dice "gasté 20 lucas en empanadas", el sistema detecte la categoría "Comida" automáticamente y lo guarde en la tabla `transactions`.
3. `[ ]` **Refactor de Estilos en Móvil**: Asegurar que la barra de navegación inferior no solape el campo de entrada del chat en dispositivos pequeños.
4. `[ ]` **Dashboard Dinámico**: Conectar los gráficos de `AnalyticsView` con los datos reales de la tabla `transactions` de Supabase.
5. `[ ]` **Login Real**: Cambiar el `dummyUserId` por el ID del usuario autenticado vía Supabase Auth.

---

## Cómo ejecutar localmente
1. Asegúrate de tener las variables en `.env.local` (ya añadidas).
2. `npm run dev`
3. Ve a la sección de Chat y ¡empieza a hablar!
