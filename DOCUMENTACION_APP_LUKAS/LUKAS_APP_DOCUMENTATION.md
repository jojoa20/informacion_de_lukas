# 📱 LUKAS - Documentación de Funcionalidades (MVP)
Esta documentación detalla las interacciones actuales de la aplicación, clasificadas por tipo de interacción: **(Botón)**, **(Interactivo)** y **(Visual)**.
---
## 🏠 1. Módulo: Home (Vista Principal)
El centro de control donde el usuario ve su estado financiero diario.
*   **Perfil de Usuario (Interactivo):** Al oprimir el Nombre o Avatar se abre el **Modal de Perfil**. Incluye:
    *   Nombre y Estado de Suscripción.
    *   Configuración de Perfil, Seguridad y Notificaciones.
    *   Botón para **Cerrar Sesión (Botón)**.
*   **Perfil de Usuario (Interactivo):** Al oprimir el Nombre o Avatar se abre el **Modal de Perfil**.
*   **Racha de Ahorro - Streak (Interactivo):** 
    *   Muestra una llama que evoluciona: Llama estándar (Día 1-3), Llama estable (Día 4-6) y **"En Llamas" 🔥 (Día 7+)** con animación de rebote y brillo intenso.
    *   Al oprimir la racha, se abre el **Modal: Historial de FinScore (Visual)** que lista los puntajes de los últimos 7 días.
*   **FinScore Gauge (Visual):** Gráfico circular tipo velocímetro que muestra el puntaje financiero en blanco con tipografía bold.
*   **Lukas Pana Tip (Interactivo):**
    *   Mecanismo de revelación: Oprimir el recuadro para mostrar el consejo ("Oprimir para mostrar...").
    *   **Botón de Refresco 🔄 (Botón):** Cambia el contenido del tip. Si ya está revelado, el nuevo texto se muestra directamente sin esconderse.
*   **Reto Grupal (Interactivo):** Similar al Tip, permite revelar retos de ahorro colaborativo.
    *   **Botón de Refresco 🔄 (Botón):** Cicla entre diferentes retos grupales manteniendo la visibilidad si ya fue abierto.
*   **Leak Buster (Visual):** Gráfica de burbujas flotantes que indica gastos innecesarios detectados por la IA.
    *   Muestra una llama que evoluciona: Llama estándar (Día 1-3), Llama estable (Día 4-6) y **"En Llamas" 🔥 (Día 7+)**.
*   **FinScore Gauge (Visual):** Gráfico circular tipo velocímetro que muestra el puntaje financiero.
*   **Lukas Pana Tip (Interactivo):** 
    *   Mecanismo de revelación: Oprimir el recuadro para mostrar el consejo.
    *   **Botón de Refresco 🔄 (Botón):** Cambia el contenido del tip.
*   **Leak Buster (Visual):** Gráfica de burbujas flotantes que indica gastos innecesarios.
---
## 📋 2. Módulo: Movimientos (Historial Completo)
Listado detallado de ingresos y gastos con categorización visual.
## 🧠 6. Módulo: The Brain (Comparador Inteligente)
Sistema de optimización de compras en tiempo real.
*   **Filtros de Categoría (Botón):** Chips para filtrar por "Todos", "Ingresos", "Gastos" y el filtro especial **"🚨 Hormiga"**.
*   **Listado Semántico (Visual):**
    *   **Ingresos (+):** Se muestran en **Verde Esmeralda** con brillo neon.
    *   **Gastos (-):** Se muestran en **Rojo Coral** (Alerta Lukas) para fácil identificación.
*   **Categorización Automática (Visual):** Cada gasto tiene un icono (Hormer, Cafetería, etc.) y una etiqueta de tipo de gasto.
*   **IA Optimizer (Botón):** Botón con efecto de brillo neon que analiza la lista de compras actual.
*   **Scanner Mode (Visual):** El orbe de Lukas cambia a **Turquesa (Scanner)** con anillos giratorios.
*   **Etiqueta de Ahorro Máximo (Visual):** Recuadro dorado sobre el producto que indica la tienda con el precio más bajo.
---
## 👥 3. Módulo: Grupos (Analytics)
Gestión colaborativa de presupuestos y análisis comparativo.
## 🎭 7. Módulo: The Magic (Modo Ocasiones)
Experiencias de compra inmersivas basadas en el contexto del usuario.
### Sección: Presupuesto Grupal
*   **Barra de Presupuesto (Visual):** Muestra el gasto total acumulado del grupo. El valor del gasto total se muestra en **Blanco** para máxima claridad.
*   **Gestión de Miembros (Interactivo):**
    *   **Bloqueo de Usuario 🔒 (Botón):** Al oprimir el icono de candado, el usuario se marca en rojo, su nombre se tacha y su gasto **se excluye** automáticamente del total del grupo y de la gráfica.
    *   **Eliminar Miembro ✕ (Botón):** Opción para remover a un integrante del grupo.
*   **Gráfica "Comparativa Pana" (Visual):** Gráfico de barras de colores donde se comparan los gastos de cada integrante. Refleja cambios en tiempo real si un usuario es bloqueado.
*   **Tarjetas de Ocasión (Interactivo):** Carrusel visual con imágenes 3D de alta gama.
    *   **Asado de Domingo 🥩 (Interactivo)**
    *   **Cena Romántica 💕 (Interactivo)**
*   **Generador de Kit Automático (Botón):** Carga los ingredientes necesarios tras seleccionar una ocasión.
### Sección: Histórico
*   **Selector de Mes (Interactivo):** Permite comparar el mes actual con períodos anteriores.
*   **Tarjetas de Resumen (Visual):**
    *   **Superávit/Exceso:** Indica si se ahorró o se gastó de más respecto al mes anterior. Valores en Blanco, mensajes de estado en **Verde (Ahorro)** o **Rojo (Exceso)**.
    *   **Cambio de FinScore:** Muestra los puntos ganados o perdidos con indicadores visuales de tendencia.
---
## 🎯 4. Módulo: Metas (Ahorro por Objetivos)
Seguimiento de sueños y grandes compras.
## 💾 8. Módulo: La Memoria (IA Proactiva)
El motor de aprendizaje basado en el historial y pgvector.
*   **Crear Meta (Botón):** Botón flotante para añadir nuevos objetivos de ahorro.
*   **Tarjetas de Meta (Interactivo):**
    *   **Insignia de Prioridad (Interactivo):** Al oprimir (🔥, ⚡, 🧊), cambia el nivel de importancia de la meta.
    *   **Barra de Progreso (Visual):** Muestra cuánto falta para llegar al total mediante una barra neon de color dinámico.
    *   **Cuadro de Tip 💡 (Visual):** Recuadro con consejos específicos de Lukas para lograr esa meta puntual.
    *   **Cuadro de Consejo Motivador 🤍 (Visual):** NUEVA SECCIÓN. Cuadro con diseño en blanco translúcido donde se muestran frases de perseverancia ("Persevera y alcanzarás...") para inspirar al usuario.
*   **Eliminar Meta ✕ (Botón):** Opción para descartar metas no deseadas.
*   **Smart Warnings (Visual):** Burbujas de alerta en el Home con mensajes personalizados de Lukas.
*   **Chat Lukas Memory (Interactivo):** Ventana de chat donde el usuario puede consultar su historial.
---
## 🧭 5. Navegación (Bottom Nav)
*   **Iconos de Acceso (Botón):**
    *   🏠 Home.
    *   📋 Movimientos.
    *   (Botón Central +): Para registro rápido de gastos.
    *   👥 Grupos (Analytics).
    *   🎯 Metas.
