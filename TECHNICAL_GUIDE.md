# 🔧 Guía Técnica - Lukas Smart Shopping Copilot

## 📁 Estructura del Proyecto

```
/src
├── /app
│   ├── App.tsx                 # Root component con RouterProvider y AppProvider
│   ├── routes.tsx              # Configuración de rutas React Router
│   │
│   ├── /pages                  # Páginas principales de la aplicación
│   │   ├── HomePage.tsx        # "/" - Home con orbe neutral y resumen
│   │   ├── TheBrainPage.tsx    # "/brain" - Comparador de precios
│   │   ├── TheHeartPage.tsx    # "/heart" - Presupuestos compartidos
│   │   └── TheMagicPage.tsx    # "/magic" - Feed de ocasiones
│   │
│   ├── /components             # Componentes reutilizables
│   │   ├── NavigationWrapper.tsx          # Wrapper de navegación con animaciones
│   │   ├── LukasOrb.tsx                   # Orbe dinámico de Lukas (4 estados)
│   │   ├── LoadingSpinner.tsx             # Spinner de carga
│   │   ├── Toast.tsx                      # Notificaciones toast
│   │   ├── AIOptimizerButton.tsx          # Botón de optimización IA
│   │   ├── SavingsCard.tsx                # Tarjeta de ahorro del mes
│   │   ├── PriceComparisonCard.tsx        # Tarjeta de comparación de precios
│   │   ├── OccasionCard.tsx               # Tarjeta de ocasión (Magic)
│   │   ├── GroupMemberAvatar.tsx          # Avatar de miembro del grupo
│   │   └── BudgetProgressCircle.tsx       # Círculo de progreso de presupuesto
│   │
│   └── /context                # Estado global de la aplicación
│       └── AppContext.tsx      # Context API con estado de presupuesto, miembros, productos
│
├── /imports                    # Componentes importados de Figma
│   ├── LukasHomeMascotAvatarIntegration.tsx
│   ├── TheBrainMascotScannerIntegration.tsx
│   ├── TheHeartSharedBudgets.tsx
│   ├── TheMagicOccasionsFeed.tsx
│   └── /svg-*.ts               # Assets SVG importados
│
└── /styles
    ├── theme.css               # Variables CSS y estilos base
    └── fonts.css               # Importación de Manrope font
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

```typescript
// Backgrounds
const backgrounds = {
  dark: "#101922",
  darker: "#0a0f16",
  card: "rgba(255,255,255,0.03)",
  cardBorder: "rgba(255,255,255,0.08)",
};

// Primary
const primary = {
  blue: "#258CF4",
  cyan: "#00F5FF",
  purple: "#9333EA",
};

// Status
const status = {
  success: "#2ECC71",    // Healthy budget, savings
  warning: "#FB923C",    // Budget warning
  alert: "#FF5757",      // Budget alert
  info: "#258CF4",       // General info
};

// Text
const text = {
  primary: "#F1F5F9",
  secondary: "#94A3B8",
  muted: "#64748B",
  disabled: "#475569",
};

// Semantic
const semantic = {
  orange: "#EA580C",     // Tradición Argentina
  rose: "#BE123C",       // Romántica
  emerald: "#047857",    // Outdoor Luxe
};
```

### Tipografía

```css
/* Font Family */
font-family: 'Manrope', sans-serif;

/* Weights */
--weight-light: 300;
--weight-regular: 400;
--weight-medium: 500;
--weight-semibold: 600;
--weight-bold: 700;
--weight-extrabold: 800;

/* Sizes */
--text-xs: 10px;
--text-sm: 12px;
--text-base: 14px;
--text-lg: 16px;
--text-xl: 18px;
--text-2xl: 24px;
--text-3xl: 30px;
--text-4xl: 36px;

/* Tracking (Letter Spacing) */
--tracking-tight: -0.5px;
--tracking-normal: 0px;
--tracking-wide: 1.2px;
--tracking-wider: 2px;
```

### Efectos Visuales

```css
/* Glassmorphism */
.glass {
  backdrop-filter: blur(6px);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Shadows */
--shadow-sm: 0px 10px 15px -3px rgba(37,140,244,0.2);
--shadow-md: 0px 25px 25px 0px rgba(0,0,0,0.15);
--shadow-lg: 0px 25px 50px -12px rgba(0,0,0,0.25);
--shadow-glow: 0px 0px 60px 10px rgba(37,140,244,0.3);

/* Blur */
--blur-sm: blur(4px);
--blur-md: blur(6px);
```

---

## 🧩 Componentes Principales

### 1. LukasOrb

Orbe dinámico con 4 estados:

```typescript
interface LukasOrbProps {
  state: "neutral" | "scanner" | "success" | "alert";
  size?: number;
}

// Estados:
// - neutral: Pulso azul suave
// - scanner: Anillos giratorios turquesa con puntos orbitantes
// - success: Partículas doradas explosivas
// - alert: Vibración coral intermitente
```

### 2. NavigationWrapper

Wrapper que añade animaciones de transición entre páginas:

```typescript
<NavigationWrapper currentPage="home">
  {/* Contenido de la página */}
</NavigationWrapper>
```

### 3. AppContext

Estado global de la aplicación:

```typescript
const { 
  state,           // Estado completo
  updateBudget,    // Actualizar presupuesto
  addExpense,      // Añadir gasto
  toggleMemberActive, // Toggle miembro activo
  setSelectedOccasion, // Seleccionar ocasión
  setLukasState,   // Cambiar estado de Lukas
  addProduct,      // Añadir producto
  getLowestPrice,  // Obtener precio más bajo
  getTotalSavings  // Calcular ahorro total
} = useApp();
```

---

## 🛣️ Sistema de Rutas

### Configuración

```typescript
// src/app/routes.tsx
export const router = createBrowserRouter([
  { path: "/", Component: HomePage },
  { path: "/brain", Component: TheBrainPage },
  { path: "/heart", Component: TheHeartPage },
  { path: "/magic", Component: TheMagicPage },
]);
```

### Navegación Programática

```typescript
const navigate = useNavigate();

// Navegar a Brain
navigate("/brain");

// Navegar con estado
navigate("/brain", { 
  state: { occasion: "Asado de Domingo" } 
});

// Ir atrás
navigate(-1);
```

---

## 🎭 Animaciones con Motion

### Transiciones de Página

```typescript
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -10 }}
  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
>
```

### Hover Effects

```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
```

### Loops Infinitos

```typescript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ 
    duration: 3, 
    repeat: Infinity, 
    ease: "linear" 
  }}
>
```

### Stagger Children

```typescript
<motion.div
  variants={{
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
  initial="hidden"
  animate="show"
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>
```

---

## 📊 Gestión de Estado

### Budget State

```typescript
interface Budget {
  total: number;      // Presupuesto total
  spent: number;      // Gastado hasta ahora
  percentage: number; // % usado
  status: "healthy" | "warning" | "alert";
}

// Uso:
const { state, updateBudget, addExpense } = useApp();

// Actualizar presupuesto
updateBudget(4500); // Nueva cantidad gastada

// Añadir gasto
addExpense("Alimentación", 250);
```

### Products State

```typescript
interface Product {
  id: string;
  name: string;
  category: string;
  prices: {
    d1?: number;
    ara?: number;
    exito?: number;
  };
}

// Uso:
const { addProduct, getLowestPrice, getTotalSavings } = useApp();

// Añadir producto
addProduct({
  id: "4",
  name: "Arroz 1kg",
  category: "Granos",
  prices: { d1: 4200, ara: 3900, exito: 4500 }
});

// Obtener precio más bajo
const lowest = getLowestPrice("4");
console.log(lowest); // { store: "ara", price: 3900 }

// Calcular ahorro total
const savings = getTotalSavings();
console.log(`Ahorro total: $${savings}`);
```

---

## 🎨 Personalización de Lukas

### Cambiar Estado del Orbe

```typescript
const { setLukasState } = useApp();

// Neutral (azul)
setLukasState("neutral");

// Escaneando (turquesa)
setLukasState("scanner");

// Éxito (dorado)
setLukasState("success");

// Alerta (coral)
setLukasState("alert");
```

### Ejemplo de Flujo

```typescript
// Iniciar comparación
setLukasState("scanner");

// Simular procesamiento
setTimeout(() => {
  // Encontró mejor precio
  setLukasState("success");
  
  // Volver a neutral después de celebrar
  setTimeout(() => {
    setLukasState("neutral");
  }, 3000);
}, 2000);
```

---

## 🧪 Testing & Debugging

### Console Logs Útiles

```typescript
// Debug navigation
useEffect(() => {
  console.log("Current page:", location.pathname);
}, [location]);

// Debug state changes
useEffect(() => {
  console.log("Budget state:", state.budget);
}, [state.budget]);

// Debug clicks
const handleClick = (e: MouseEvent) => {
  console.log("Clicked element:", e.target);
  console.log("Closest link:", e.target.closest('[data-name*="Link"]'));
};
```

### Performance Monitoring

```typescript
// Measure render time
useEffect(() => {
  const start = performance.now();
  
  return () => {
    const end = performance.now();
    console.log(`Render time: ${end - start}ms`);
  };
}, []);
```

---

## 🚀 Optimización

### Lazy Loading

```typescript
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./components/LoadingSpinner";

const TheBrainPage = lazy(() => import("./pages/TheBrainPage"));

// En router
<Suspense fallback={<LoadingSpinner />}>
  <TheBrainPage />
</Suspense>
```

### Memoización

```typescript
import { useMemo, useCallback } from "react";

// Memorizar cálculos costosos
const totalSavings = useMemo(() => {
  return products.reduce((sum, p) => {
    const prices = Object.values(p.prices);
    return sum + (Math.max(...prices) - Math.min(...prices));
  }, 0);
}, [products]);

// Memorizar callbacks
const handleAddExpense = useCallback((category: string, amount: number) => {
  addExpense(category, amount);
}, [addExpense]);
```

---

## 🎯 Próximos Pasos de Desarrollo

### Fase 1: Backend Integration
- [ ] Conectar Supabase
- [ ] Implementar autenticación
- [ ] Sincronización en tiempo real
- [ ] API de scraping de precios

### Fase 2: Features Avanzados
- [ ] Escaneo de código de barras
- [ ] Notificaciones push
- [ ] Geolocalización de tiendas
- [ ] Modo offline

### Fase 3: UX Enhancements
- [ ] Onboarding tutorial
- [ ] Haptic feedback
- [ ] Gestos avanzados
- [ ] Modo oscuro/claro

### Fase 4: Analytics
- [ ] Tracking de comportamiento
- [ ] A/B testing
- [ ] Reportes de ahorro
- [ ] Insights de IA

---

## 📱 Mobile Optimization

### Viewport

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
```

### Touch Targets

Todos los elementos interactivos tienen mínimo 40x40px para facilitar el toque.

### Gestures

```typescript
// Swipe detection
let touchStartX = 0;
let touchEndX = 0;

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
};

const handleSwipe = () => {
  if (touchEndX < touchStartX) {
    // Swipe left
  }
  if (touchEndX > touchStartX) {
    // Swipe right
  }
};
```

---

## 🔐 Seguridad

### Data Privacy

- No se almacenan contraseñas en localStorage
- Tokens JWT para autenticación
- HTTPS obligatorio en producción
- Sanitización de inputs

### Best Practices

```typescript
// Sanitizar inputs
const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '');
};

// Validar números
const validateAmount = (amount: number) => {
  return amount >= 0 && amount <= 1000000;
};

// Limitar rate
let lastCall = 0;
const rateLimit = (fn: Function, delay: number) => {
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
};
```

---

**Desarrollado con ❤️ para el mercado colombiano**
