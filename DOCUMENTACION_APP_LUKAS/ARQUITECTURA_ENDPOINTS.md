# 🛠️ Lukas AI - Arquitectura de los End Points (MVP Completo)

Este documento define la lógica técnica de los endpoints necesarios para que cada interacción de la aplicación sea funcional y reactiva, centrada en el negocio.

---

## 🏠 1. Módulo Core: Home (Dashboard)

*   **Endpoint: Perfil de Usuario (GET)**
    *   **Ruta**: `/api/user/profile`
    *   **Función**: Obtiene Avatar, Nombre y **Racha Histórica (Streak)** del usuario.
*   **Endpoint: Estadísticas Globales (GET)**
    *   **Ruta**: `/api/home/stats`
    *   **Función**: Retorna el **FinScore (0-100)** y el nivel de llama 🔥 actual (1-7+ días).
*   **Endpoint: LUKAS Pana Tips (GET/POST)**
    *   **Ruta**: `/api/home/tips`
    *   **Función**: Gestiona la consulta de un consejo aleatorio y el **Botón de Refresco 🔄**.
*   **Endpoint: Leak Buster (GET)**
    *   **Ruta**: `/api/home/leak-buster`
    *   **Función**: Datos dinámicos para la **Gráfica de Burbujas Flotantes**.

---

## 📋 2. Módulo: Movimientos (Historial)

*   **Endpoint: Listado de Movimientos (GET)**
    *   **Ruta**: `/api/movimientos/lista`
    *   **Función**: Consulta la tabla de transacciones filtrada por fecha o categoría.
*   **Endpoint: Procesador Multimodal (POST)**
    *   **Ruta**: `/api/movimientos/process`
    *   **Función**: Envía archivos de **Voz 🎙️** o imagen de **OCR 📸** para análisis de la IA.

---

## 👥 3. Módulo: Grupos (Analytics)

*   **Endpoint: Resumen Grupal (GET)**
    *   **Ruta**: `/api/grupos/stats`
    *   **Función**: Datos para los "Anillos de Energía" y el total de gasto del grupo.
*   **Endpoint: Gestión de Miembros (PATCH)**
    *   **Ruta**: `/api/grupos/members`
    *   **Función**: Permite el **Bloqueo de Usuario 🔒**.

---

## 🎯 4. Módulo: Metas (Objetivos)

*   **Endpoint: Gestión de Metas (GET/POST)**
    *   **Ruta**: `/api/metas/gestion`
    *   **Función**: Listar metas activas y crear nuevos objetivos de ahorro.

---

