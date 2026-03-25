# 📱 LUKAS - Documentación de Funcionalidades (MVP)

Esta documentación detalla las interacciones actuales de la aplicación, clasificadas por tipo de interacción: **(Botón)**, **(Interactivo)** y **(Visual)**.

---

## 🏠 1. Módulo: Home (Vista Principal)
El centro de control donde el usuario ve su estado financiero diario.

*   **Perfil de Usuario (Interactivo):** Al oprimir el Nombre o Avatar se abre el **Modal de Perfil**. Incluye:
    *   Nombre y Estado de Suscripción.
    *   Configuración de Perfil, Seguridad y Notificaciones.
    *   Botón para **Cerrar Sesión (Botón)**.
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

---

## 📋 2. Módulo: Movimientos (Historial Completo)
Listado detallado de ingresos y gastos con categorización visual.

*   **Filtros de Categoría (Botón):** Chips para filtrar por "Todos", "Ingresos", "Gastos" y el filtro especial **"🚨 Hormiga"**.
*   **Listado Semántico (Visual):**
    *   **Ingresos (+):** Se muestran en **Verde Esmeralda** con brillo neon.
    *   **Gastos (-):** Se muestran en **Rojo Coral** (Alerta Lukas) para fácil identificación.
*   **Categorización Automática (Visual):** Cada gasto tiene un icono (Hormer, Cafetería, etc.) y una etiqueta de tipo de gasto.

---

## 👥 3. Módulo: Grupos (Analytics)
Gestión colaborativa de presupuestos y análisis comparativo.

### Sección: Presupuesto Grupal
*   **Barra de Presupuesto (Visual):** Muestra el gasto total acumulado del grupo. El valor del gasto total se muestra en **Blanco** para máxima claridad.
*   **Gestión de Miembros (Interactivo):**
    *   **Bloqueo de Usuario 🔒 (Botón):** Al oprimir el icono de candado, el usuario se marca en rojo, su nombre se tacha y su gasto **se excluye** automáticamente del total del grupo y de la gráfica.
    *   **Eliminar Miembro ✕ (Botón):** Opción para remover a un integrante del grupo.
*   **Gráfica "Comparativa Pana" (Visual):** Gráfico de barras de colores donde se comparan los gastos de cada integrante. Refleja cambios en tiempo real si un usuario es bloqueado.

### Sección: Histórico
*   **Selector de Mes (Interactivo):** Permite comparar el mes actual con períodos anteriores.
*   **Tarjetas de Resumen (Visual):**
    *   **Superávit/Exceso:** Indica si se ahorró o se gastó de más respecto al mes anterior. Valores en Blanco, mensajes de estado en **Verde (Ahorro)** o **Rojo (Exceso)**.
    *   **Cambio de FinScore:** Muestra los puntos ganados o perdidos con indicadores visuales de tendencia.

---

## 🎯 4. Módulo: Metas (Ahorro por Objetivos)
Seguimiento de sueños y grandes compras.

*   **Crear Meta (Botón):** Botón flotante para añadir nuevos objetivos de ahorro.
*   **Tarjetas de Meta (Interactivo):**
    *   **Insignia de Prioridad (Interactivo):** Al oprimir (🔥, ⚡, 🧊), cambia el nivel de importancia de la meta.
    *   **Barra de Progreso (Visual):** Muestra cuánto falta para llegar al total mediante una barra neon de color dinámico.
    *   **Cuadro de Tip 💡 (Visual):** Recuadro con consejos específicos de Lukas para lograr esa meta puntual.
    *   **Cuadro de Consejo Motivador 🤍 (Visual):** NUEVA SECCIÓN. Cuadro con diseño en blanco translúcido donde se muestran frases de perseverancia ("Persevera y alcanzarás...") para inspirar al usuario.
*   **Eliminar Meta ✕ (Botón):** Opción para descartar metas no deseadas.

---

## 🧭 5. Navegación (Bottom Nav)
*   **Iconos de Acceso (Botón):**
    *   🏠 Home.
    *   📋 Movimientos.
    *   (Botón Central +): Para registro rápido de gastos.
    *   👥 Grupos (Analytics).
    *   🎯 Metas.
