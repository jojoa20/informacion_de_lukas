# 🛠️ Lukas AI - Arquitectura de los End Points (MVP Completo)

Este documento define la lógica técnica de los endpoints necesarios para que cada interacción de la aplicación sea funcional y reactiva, centrada en el negocio.

---

## 🏠 1. Módulo: Home (Dashboard)

*   **Endpoint: Perfil de Usuario (GET)**
    *   **Ruta**: `/api/user/profile`
    *   **Función**: Obtiene Avatar, Nombre, Estado de Suscripción y Racha Histórica (Streak).
*   **Endpoint: Estadísticas Globales (GET)**
    *   **Ruta**: `/api/home/stats`
    *   **Función**: Retorna el **FinScore (0-100)**, nivel de llama 🔥 (1-7+ días) e historial de los últimos 7 días.
*   **Endpoint: Pana Tips (GET / POST)**
    *   **Ruta**: `/api/home/tips`
    *   **Función**: Obtiene consejo aleatorio. El `POST` refresca y devuelve uno nuevo sin ocultar el anterior.
*   **Endpoint: Reto Grupal (GET / POST)**
    *   **Ruta**: `/api/home/reto-grupal`
    *   **Función**: Igual que los Tips pero orientado a retos colaborativos. El `POST` cicla entre retos disponibles.
*   **Endpoint: Leak Buster (GET)**
    *   **Ruta**: `/api/home/leak-buster`
    *   **Función**: Retorna coordenadas y montos para las **Burbujas Flotantes** de gastos hormiga detectados.

---

## 📋 2. Módulo: Movimientos (Historial Completo)

*   **Endpoint: Listado de Movimientos (GET)**
    *   **Ruta**: `/api/movimientos/lista?filtro={todos|ingresos|gastos|hormiga}`
    *   **Función**: Lista transacciones con categoría auto-asignada, ícono y color (Verde = Ingreso, Rojo = Gasto).
*   **Endpoint: Procesador Multimodal (POST)**
    *   **Ruta**: `/api/movimientos/process`
    *   **Función**: Procesa **Voz 🎙️** (audio) o **OCR 📸** (imagen de recibo) y registra el gasto automáticamente.

---

## 👥 3. Módulo: Grupos (Analytics)

*   **Endpoint: Resumen Grupal (GET)**
    *   **Ruta**: `/api/grupos/stats`
    *   **Función**: Total de gasto del grupo, datos para la **Gráfica Comparativa Pana** y selector de mes histórico.
*   **Endpoint: Gestión de Miembros (PATCH)**
    *   **Ruta**: `/api/grupos/members/{id}`
    *   **Función**: Bloquear 🔒 o eliminar ✕ un miembro. Al bloquearlo, su gasto se excluye del total y la gráfica en tiempo real.

---

## 🎯 4. Módulo: Metas (Ahorro por Objetivos)

*   **Endpoint: Gestión de Metas (GET / POST / DELETE)**
    *   **Ruta**: `/api/metas/gestion`
    *   **Función**: Listar metas activas, crear nuevos objetivos y eliminar metas no deseadas.
*   **Endpoint: Actualizar Prioridad (PATCH)**
    *   **Ruta**: `/api/metas/{id}/prioridad`
    *   **Función**: Cambia la **Insignia de Prioridad** (🔥 Alta, ⚡ Media, 🧊 Baja) de la meta.
*   **Endpoint: Tips de Meta (GET)**
    *   **Ruta**: `/api/metas/{id}/tip`
    *   **Función**: Retorna el consejo específico de Lukas y la frase motivadora para esa meta puntual.

---

## 🧭 5. Navegación (Bottom Nav)

*   **Endpoint: Estado de Notificaciones (GET)**
    *   **Ruta**: `/api/nav/badges`
    *   **Función**: Retorna los indicadores (badges) de notificaciones para cada ícono del Bottom Nav.
*   **Endpoint: Registro Rápido (POST)**
    *   **Ruta**: `/api/movimientos/quick-add`
    *   **Función**: Endpoint del **Botón Central (+)** para registrar un gasto de forma express.

---

## 🧠 6. Módulo: The Brain (Comparador Inteligente)

*   **Endpoint: IA Optimizer (POST)**
    *   **Ruta**: `/api/brain/optimize`
    *   **Función**: Recibe la lista de compras y devuelve el **Mix Perfecto** con la tienda de precio más bajo por producto.
*   **Endpoint: Scanner Mode (POST)**
    *   **Ruta**: `/api/brain/scan`
    *   **Función**: Activa el **modo Turquesa del Orbe** y envía imagen para identificar productos y precios en tiempo real.

---

## 🎭 7. Módulo: The Magic (Modo Ocasiones)

*   **Endpoint: Catálogo de Ocasiones (GET)**
    *   **Ruta**: `/api/magic/ocasiones`
    *   **Función**: Retorna las tarjetas del carrusel (Asado 🥩, Cena Romántica 💕, etc.).
*   **Endpoint: Generar Kit (POST)**
    *   **Ruta**: `/api/magic/ocasiones/{id}/kit`
    *   **Función**: Carga automáticamente los ingredientes y productos necesarios para la ocasión seleccionada.

---

## 💾 8. Módulo: La Memoria (IA Proactiva)

*   **Endpoint: Smart Warnings (GET)**
    *   **Ruta**: `/api/memoria/warnings`
    *   **Función**: Retorna las burbujas de alerta personalizadas para el Home, generadas desde el historial del usuario.
*   **Endpoint: Chat Memoria (POST)**
    *   **Ruta**: `/api/memoria/chat`
    *   **Función**: Búsqueda semántica en el historial del usuario usando **pgvector** para responder consultas contextuales.
*   **Endpoint: Predicciones (GET)**
    *   **Ruta**: `/api/memoria/predicciones`
    *   **Función**: Retorna predicciones de gastos básicos y hábitos financieros basados en el historial guardado.

---
