# Sistema de Diseño: Lukas Design Spec

## Filosofía de Diseño: "Fresh & Functional"
El diseño debe sentirse tan fresco como una fruta y tan funcional como una hoja de cálculo bien hecha, pero sin ser aburrida.

## Estructura de UI (Atomic Design)

### Atomic
- **Botones:**
  - *Primario:* Fondo Lukas Neon, Texto Dark. Bordes redondeados (Pill shape). Sombras suaves.
  - *Secundario:* Borde Lukas Neon, Fondo Transparente.
  - *Danger:* Fondo Rojo Suave, Texto Rojo Oscuro.
- **Inputs:**
  - Fondo Gris Muy Claro (#F5F5F5), Borde invisible hasta focus (Lukas Neon).
  - Texto grande (16px+ para evitar zoom en iOS).

### Componentes Clave
- **Price Cards:**
  - Tarjetas limpias con la foto del producto, precio grande, y logo de la tienda pequeño.
  - Badge de "Mejor Precio" en verde brillante.
- **Budget Bar:**
  - Una barra de progreso gruesa y animada. Cambia de color al acercarse al límite.
- **Floating Action Button (FAB):**
  - Botón grande "+" en la esquina inferior derecha para "Añadir gasto" o "Escanear".

### Tipografía
- Utilizar **Outfit** para encabezados (Headers). Da un toque moderno y geométrico.
- Utilizar **Inter** para cuerpo de texto y datos. Numerales tabulares para precios (esencial para alineación).

### Iconografía
- Iconos estilo "Linea Gruesa" (2px stroke), bordes redondeados.
- Librería recomendada: *Lucide Icons* o *Phosphor Icons*.

## Interacciones y Animaciones
- **Micro-interacciones:**
  - Al completar una tarea (check en lista), la fila brilla verde sutilmente y desaparece o se tacha.
  - Al pasarse del presupuesto, la app vibra (haptic feedback).
- **Transiciones:**
  - Navegación suave entre pestañas (fade in/out).
  - Modales que deslizan desde abajo (Bottom Sheets) para móviles.

## Layout
- **Mobile First:** Todo se diseña primero para pantallas de 375px de ancho.
- **Navegación:** Barra inferior (Bottom Tab Bar) con 4 items: Inicio, Buscar, Listas, Perfil.
