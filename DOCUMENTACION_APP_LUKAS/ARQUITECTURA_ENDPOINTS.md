# 🛠️ Lukas AI - Arquitectura de los End Points (MVP Completo)

Este documento define la lógica técnica de los endpoints necesarios para que cada interacción de la aplicación sea funcional y reactiva, centrada en el negocio.

---

## 🏠 1. Módulo: Home (Dashboard)

*   **Perfil de Usuario (GET):** Obtiene Avatar, Nombre, Estado de Suscripción y Racha Histórica (Streak).
*   **Estadísticas Globales (GET):** Retorna el **FinScore (0-100)**, nivel de llama 🔥 (1-7+ días) e historial de los últimos 7 días.
*   **Pana Tips (GET / POST):** Obtiene consejo aleatorio. El `POST` refresca y devuelve uno nuevo sin ocultar el anterior.
*   **Reto Grupal (GET / POST):** Igual que los Tips pero orientado a retos colaborativos. Cicla entre retos disponibles.
*   **Leak Buster (GET):** Retorna coordenadas y montos para las **Burbujas Flotantes** de gastos hormiga detectados.

---

## 📋 2. Módulo: Movimientos (Historial Completo)

*   **Listado de Movimientos (GET):** Lista transacciones con categoría auto-asignada, ícono y color (Verde = Ingreso, Rojo = Gasto). Soporta filtros: `todos | ingresos | gastos | hormiga`.
*   **Procesador Multimodal (POST):** Procesa **Voz 🎙️** o **OCR 📸** (imagen de recibo) y registra el gasto automáticamente.

---

## 👥 3. Módulo: Grupos (Analytics)

*   **Resumen Grupal (GET):** Total de gasto del grupo, datos para la **Gráfica Comparativa Pana** y selector de mes histórico.
*   **Gestión de Miembros (PATCH):** Bloquear 🔒 o eliminar ✕ un miembro. Al bloquearlo, su gasto se excluye del total y la gráfica en tiempo real.

---

## 🎯 4. Módulo: Metas (Ahorro por Objetivos)

*   **Gestión de Metas (GET / POST / DELETE):** Listar metas activas, crear nuevos objetivos y eliminar metas no deseadas.
*   **Actualizar Prioridad (PATCH):** Cambia la **Insignia de Prioridad** (🔥 Alta, ⚡ Media, 🧊 Baja) de la meta.
*   **Tips de Meta (GET):** Retorna el consejo específico de Lukas y la frase motivadora para esa meta puntual.

---

## 🧭 5. Navegación (Bottom Nav)

*   **Estado de Notificaciones (GET):** Retorna los indicadores (badges) de notificaciones para cada ícono del Bottom Nav.
*   **Registro Rápido (POST):** Endpoint del **Botón Central (+)** para registrar un gasto de forma express.

---

## 🧠 6. Módulo: The Brain (Comparador Inteligente)

*   **IA Optimizer (POST):** Recibe la lista de compras y devuelve el **Mix Perfecto** con la tienda de precio más bajo por producto.
*   **Scanner Mode (POST):** Activa el **modo Turquesa del Orbe** y envía imagen para identificar productos y precios en tiempo real.

---

## 🎭 7. Módulo: The Magic (Modo Ocasiones)

*   **Catálogo de Ocasiones (GET):** Retorna las tarjetas del carrusel (Asado 🥩, Cena Romántica 💕, etc.).
*   **Generar Kit (POST):** Carga automáticamente los ingredientes y productos necesarios para la ocasión seleccionada.

---

## 💾 8. Módulo: La Memoria (IA Proactiva)

*   **Smart Warnings (GET):** Retorna las burbujas de alerta personalizadas para el Home, generadas desde el historial del usuario.
*   **Chat Memoria (POST):** Búsqueda semántica en el historial del usuario usando **pgvector** para responder consultas contextuales.
*   **Predicciones (GET):** Retorna predicciones de gastos básicos y hábitos financieros basados en el historial guardado.

---
