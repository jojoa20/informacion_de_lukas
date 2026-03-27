# 🛠️ Lukas AI - Arquitectura de los End Points (MVP Home)

Este documento define la lógica técnica de los endpoints necesarios únicamente para el Módulo Home, garantizando que el Dashboard sea reactivo y funcional.

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