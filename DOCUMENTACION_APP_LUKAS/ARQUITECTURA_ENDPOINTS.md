# 🛠️ Lukas AI - Arquitectura de los End Points

Este documento define la lógica técnica de los endpoints necesarios para que cada interacción de la aplicación sea funcional y reactiva, centrada en el negocio.

---

## 🏠 1. Módulo: Home (Dashboard)
*   **Obtener Estadísticas (GET)**: Retorna el estado global del usuario (FinScore, racha actual y ID del tip del día).
*   **Alertas y Proyecciones (GET)**: Retorna los **Smart Warnings** y el **Leak Buster**.

---

## 📋 2. Módulo: Movimientos (Historial)
*   **Listado de Movimientos (GET)**: Consulta la tabla de transacciones filtrada.
*   **Procesador Multimodal (POST)**: Acción para procesar **Voz 🎙️** u **OCR 📸**.

---

## 👥 3. Módulo: Grupos (Analytics)
*   **Resumen Grupal (GET)**: Datos para los "Anillos de Energía" y el total de gasto del grupo.
*   **Gestión de Miembros (PATCH)**: Permite el **Bloqueo de Usuario 🔒**.

---

## 🎯 4. Módulo: Metas (Objetivos)
*   **Gestión de Metas (GET/POST)**: Listar metas activas y crear nuevos objetivos de ahorro.

---

## 🧠 5. Módulo: The Brain (Comparador)
*   **Optimización de Lista (POST)**: Recibe los productos y retorna el "Mix Perfecto" de ahorro.

---

## 🎭 6. Módulo: The Magic (Ocasiones)
*   **Catálogo de Ocasiones (GET)**: Retorna las tarjetas de eventos disponibles.
*   **Crear Kit de Ocasión (POST)**: Carga automáticamente los ingredientes.

---

## 💾 7. Módulo: La Memoria (IA Proactiva)
*   **Búsqueda Semántica (POST)**: Consulta a la memoria de Lukas usando **pgvector**.
*   **Predicciones (GET)**: Retorna la **Predicción de Básicos**.
