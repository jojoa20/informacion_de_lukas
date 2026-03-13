# 🛒 Lukas - Smart Shopping Copilot

**Aplicación PWA móvil optimizada para el mercado colombiano**

Lukas es tu asistente inteligente de compras que te ayuda a ahorrar comparando precios en tiempo real entre supermercados como D1, Ara, Éxito, Carulla, Jumbo y Olímpica, mientras gestionas presupuestos compartidos con tu familia.

---

## 🎨 Identidad Visual

### Lukas (Dynamic Orb)
El asistente no es texto, es una entidad visual: un orbe de energía líquida que cambia según el contexto.

**Estados del Orbe:**
- 🔵 **Neutral (Azul)**: Pulso lento mientras exploras - presupuesto estable
- 🔷 **Scanner (Turquesa)**: Animación de escaneo circular al comparar precios
- 🟡 **Success (Dorado)**: Efecto de celebración con partículas al encontrar máximo ahorro
- 🟠 **Alerta (Coral)**: Vibración suave cuando el presupuesto llega al límite

---

## 🧠 Funcionalidades Principales

### 1. **El Comparador Mágico ("The Brain")**
Ruta: `/brain`

- Interface Bento Grid con Glassmorphism
- Comparación en tiempo real de productos universales
- **IA Optimizer**: Reorganiza tu lista automáticamente sugiriendo un "Mix Perfecto" de tiendas para ahorrar hasta 30%

**Características:**
- Escaneo de productos (Leche, Café, etc.)
- Comparación de precios entre D1, Ara, Éxito
- Indicador visual del precio más bajo
- Navegación por categorías (Lácteos, Despensa)

### 2. **Presupuestos Compartidos ("The Heart")**
Ruta: `/heart`

- Visualización mediante "Anillos de Energía" dinámicos (estilo Apple Watch)
- Avatares de miembros del grupo que brillan con cada registro de gasto
- **Semaforización ambiental**: Mesh Gradients que cambian de color según salud financiera
  - 🟢 Verde: Gasto Moderado (Saludable)
  - 🟡 Amarillo: Cerca del límite
  - 🔴 Rojo: Presupuesto excedido

**Características:**
- Progreso visual circular (75% usado de $8.000)
- Miembros activos con indicadores de actividad
- Desglose por categoría:
  - 🍊 Alimentación
  - 🎬 Ocio y Cine
  - 🏠 Servicios
- Botón "Registrar Gasto" para añadir nuevos gastos

### 3. **Listas Inteligentes ("The Memory")**
Integrado en Home (`/`)

- Listas colaborativas con sincronización instantánea ("Smart Sync")
- **Recurrencia aprendida**: Lukas predice y recuerda productos básicos (Leche, Huevos) basado en frecuencia histórica
- Sugerencias automáticas basadas en patrones de compra

### 4. **Modo Ocasiones ("The Magic")**
Ruta: `/magic`

- Feed de tarjetas visuales de alta gama para seleccionar eventos
- Ocasiones predefinidas:
  - 🥩 **Asado de Domingo** - Tradición Argentina
  - 💕 **Cena Romántica** - Atmósfera íntima
  - 🧺 **Picnic en el Parque** - Outdoor Luxe

**Características:**
- Al seleccionar una ocasión, Lukas se "viste" para el evento
- Kit de ingredientes óptimo automático
- Paleta cromática dinámica según el evento
- Botón "Explorar Magia" para generar lista de compras perfecta

---

## 🎯 Navegación

### Pantallas Principales

1. **Home** (`/`)
   - Orbe de Lukas en estado Neutral
   - Anillos de Energía resumen
   - Tarjetas de ahorro y próximas compras
   - Bottom Nav: Inicio | Cartera | Social | Ajustes

2. **The Brain** (`/brain`)
   - Orbe en estado Scanner (Turquesa)
   - Lista de productos detectados
   - Comparación de precios en tiempo real
   - Bottom Nav: Home | The Brain (activo) | Historial | Perfil
   - FAB: Añadir producto

3. **The Heart** (`/heart`)
   - Orbe en estado según presupuesto
   - Círculo de progreso central
   - Miembros activos del grupo
   - Desglose por categorías
   - Bottom Nav: Inicio | Cartera (activo) | Social | Ajustes

4. **The Magic** (`/magic`)
   - Feed de ocasiones con imágenes inmersivas
   - Tabs: Descubrir | Ocasiones (activo) | Moods | Temporadas
   - FAB: Crear ocasión personalizada
   - Bottom Nav: Discover | Magic (activo) | Gallery | Profile

---

## 🎨 Estilo Visual

### Diseño
- **Estética**: Minimalismo extremo, visualmente premium
- **Glassmorphism**: Efectos de vidrio translúcido (`backdrop-blur`)
- **Sombras profundas**: `shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]`
- **Bordes sutiles**: `border-[rgba(255,255,255,0.08)]`

### Tipografía
- **Font Family**: Manrope (Geométrica y limpia)
- **Pesos**: Light (300), Regular (400), Medium (500), Semi Bold (600), Bold (700), Extra Bold (800)
- **Tracking**: Espaciado para mayúsculas (`tracking-[2px]`)

### Colores Principales
```css
--bg-dark: #101922
--bg-darker: #0a0f16
--primary-blue: #258CF4
--cyan-bright: #00F5FF
--success-green: #2ECC71
--warning-orange: #FB923C
--alert-red: #BE123C
--text-primary: #F1F5F9
--text-secondary: #94A3B8
--text-muted: #64748B
```

### Animaciones
- **Transiciones**: 60fps con easing suave `[0.4, 0, 0.2, 1]`
- **Duración**: 300ms para navegación, 600ms para orbe
- **Motion**: Framer Motion para transiciones fluidas

---

## 💾 Datos Mock

La aplicación utiliza datos de ejemplo para demostración:

### Productos Comparados
```javascript
{
  "Leche Entera 1L": {
    "D1": "$3.200",
    "Ara": "$2.950", // ⭐ Más barato
    "Éxito": "$4.100"
  },
  "Café Molido 500g": {
    "D1": "$12.500", // ⭐ Más barato
    "Ara": "$13.200",
    "Éxito": "$14.800"
  }
}
```

### Presupuesto Grupal
```javascript
{
  "total": "$8.000",
  "usado": "$4.250",
  "porcentaje": 53,
  "estado": "saludable",
  "miembros": [
    { nombre: "Alex", activo: true },
    { nombre: "Elena", activo: false },
    { nombre: "Marc", activo: true },
    { nombre: "Sofia", activo: false }
  ],
  "categorias": [
    { nombre: "Alimentación", gasto: "$1.420", porcentaje: 65 },
    { nombre: "Ocio y Cine", gasto: "$840", porcentaje: 40 },
    { nombre: "Servicios", gasto: "$1.490", porcentaje: 85 }
  ]
}
```

---

## 🚀 Características Técnicas

### Stack
- **Frontend**: React 18 + TypeScript
- **Routing**: React Router v7 (Data Mode)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React

### Optimización Móvil
- Viewport optimizado para 390px (móvil)
- Touch-friendly (botones mínimo 40x40px)
- Gestos táctiles naturales
- Bottom Navigation para fácil acceso con pulgar

### Performance
- PWA ready
- Lazy loading de imágenes
- Animaciones con GPU acceleration
- Bundle optimization

---

## 🔮 Futuras Mejoras

### Backend (con Supabase)
- [ ] Sincronización en tiempo real de presupuestos
- [ ] Autenticación de usuarios
- [ ] Base de datos para historial de compras
- [ ] IA para predicción de compras recurrentes
- [ ] Web scraping para precios actualizados

### Funcionalidades
- [ ] Modo offline con sincronización diferida
- [ ] Notificaciones push cuando productos bajan de precio
- [ ] Escaneo de código de barras
- [ ] Geolocalización de tiendas cercanas
- [ ] Recetas sugeridas basadas en inventario
- [ ] Modo oscuro/claro
- [ ] Exportar reportes de ahorro

### UX
- [ ] Onboarding interactivo
- [ ] Tutorial de gestos
- [ ] Haptic feedback
- [ ] Sonidos sutiles en acciones clave
- [ ] Animación de Lukas con expresiones faciales

---

## 📱 Uso de la Aplicación

### Navegación entre pantallas
- Usa el **Bottom Navigation** para cambiar entre secciones
- Toca las **tarjetas** para ver detalles
- El **FAB** (botón flotante) abre acciones rápidas
- Los **avatares de miembros** muestran actividad del grupo

### Interacciones Clave
- **Home → Brain**: Toca "Próxima Compra" o usa bottom nav
- **Brain → Home**: Usa el ícono "Home" en bottom nav
- **Heart → Magic**: Toca "Social" en bottom nav
- **Magic → Brain**: Toca cualquier tarjeta de ocasión para generar lista

### Gestos
- **Tap**: Seleccionar elemento
- **Scroll**: Navegar contenido vertical
- **Swipe horizontal**: Cambiar entre tabs (en Magic)

---

## 🎭 Personalidad de Lukas

**Amigable • Confiable • Inteligente**

Lukas no es solo una app, es un **guía financiero** que:
- Te ayuda a tomar buenas decisiones de compra
- Celebra tus ahorros con animaciones doradas
- Te alerta cuando te acercas al límite sin ser molesto
- Aprende de tus patrones de compra para sugerir mejor

**Tono de voz**: Cercano, moderno, sin ser informal. Usa lenguaje colombiano natural.

---

## 📄 Licencia

Proyecto de demostración - Desarrollado como concept app para el mercado colombiano.

---

**Desarrollado con ❤️ para ayudar a las familias colombianas a ahorrar en sus compras diarias.**
