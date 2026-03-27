# 📱 LUKAS - Documentación de Funcionalidades (MVP)

Esta documentación detalla las interacciones actuales de la aplicación, clasificadas por tipo de interacción: **(Botón)**, **(Interactivo)** y **(Visual)**.

---

## 🏠 1. Módulo: Home (Vista Principal)
El centro de control donde el usuario ve su estado financiero diario.

*   **Perfil de Usuario (Interactivo):** Al oprimir el Nombre o Avatar se abre el **Modal de Perfil**.
*   **Racha de Ahorro - Streak (Interactivo):** 
    *   Muestra una llama que evoluciona: Llama estándar (Día 1-3), Llama estable (Día 4-6) y **"En Llamas" 🔥 (Día 7+)**.
*   **FinScore Gauge (Visual):** Gráfico circular tipo velocímetro que muestra el puntaje financiero.
*   **Lukas Pana Tip (Interactivo):** 
    *   Mecanismo de revelación: Oprimir el recuadro para mostrar el consejo.
    *   **Botón de Refresco 🔄 (Botón):** Cambia el contenido del tip.
*   **Leak Buster (Visual):** Gráfica de burbujas flotantes que indica gastos innecesarios.

---

## 📋 2. Módulo: Movimientos (Historial Inteligente)
Listado detallado y automatizado de las finanzas del usuario.

*   **Listado Cronológico (Visual):** Tarjetas con categorías auto-asignadas por IA.
*   **Añadir Gasto Rápido (POST):**
    *   **Botón de Voz 🎙️ (Interactivo):** Presionar para grabar una descripción del gasto.
    *   **Scanner de Recibos 📸 (Visual):** El visor de la cámara analiza el texto en tiempo real.

---

## 👥 3. Módulo: Grupos (Analytics Compartido)
Gestión de finanzas en pareja o grupos de amigos.

*   **Anillos de Energía Grupal (Visual):** Gráficos circulares que indican quién ha gastado más este mes.
*   **Bloqueo Preventivo 🔒 (Interactivo):** Permite restringir transacciones grupales si se supera el presupuesto común.

---

## 🎯 4. Módulo: Metas (Gamificación del Ahorro)
Transformación de deseos en hitos financieros.

*   **Barra de Progreso Neon (Visual):** Llenado progresivo según el ahorro aportado.
*   **Simulador de Impacto (Interactivo):** "Si ahorro esto hoy, mi meta llega X días antes".

---
