# 03. Graphic Elements, Gradients & Textures System — INHAND

Sistema de superficies, gradientes, texturas procedimentales (100% CSS + SVG sin imágenes pesadas), patrones y elementos gráficos listos para integrar en la web en **React**.

## Archivos incluidos

- **[inhand-surfaces.css](file:///Users/minoveaz/Documents/Proyectos/sparklight/Inhand/graphic-elements/inhand-surfaces.css)** — Variables CSS, clases de los 5 gradientes, 4 texturas, 5 patrones y modificador de grano (`ih-with-grain`).
- **[InhandSurfaces.tsx](file:///Users/minoveaz/Documents/Proyectos/sparklight/Inhand/graphic-elements/InhandSurfaces.tsx)** — Componentes de React (`<InhandSurface>`, `<InhandDivider>`, `<InhandArchBadge>`, `<InhandGlow>`).
- **[index.html](file:///Users/minoveaz/Documents/Proyectos/sparklight/Inhand/graphic-elements/index.html)** — Visor interactivo en vivo con botón para probar la textura de grano sobre los gradientes y copiar snippets de React con un clic.
- **[svg/](file:///Users/minoveaz/Documents/Proyectos/sparklight/Inhand/graphic-elements/svg)** — Elementos gráficos y variaciones en SVG (`overlap.svg`, `arch-dot.svg`, `balance.svg`, `flow.svg`, `progress.svg`, `geometric-pattern.svg`, `divider.svg`, `curve.svg`, `arches.svg`, `circles.svg`).

---

## 1. Cómo funcionan los 5 Gradientes (`05. Gradients & Backgrounds`)

Los gradientes combinan `linear-gradient` y `radial-gradient` multicapa (Mesh Gradients en CSS puro) usando los tonos exactos de la lámina:

| Nombre | Clase CSS | Prop en `<InhandSurface>` | Uso recomendado |
| :--- | :--- | :--- | :--- |
| **Blue Gradient** | `.ih-bg-blue-gradient` | `gradient="blue"` | Profundidad y foco (`#022E88` → `#6B94D8` → `#B8CFF0`) |
| **Coral Gradient** | `.ih-bg-coral-gradient` | `gradient="coral"` | Calidez y energía (`#FED5BB` → `#F7AE88` → `#FC6C21`) |
| **Sand Gradient** | `.ih-bg-sand-gradient` | `gradient="sand"` | Fondos neutros y calmados (`#F3E7DE` → `#D7C0AA`) |
| **Mixed Gradient** | `.ih-bg-mixed-gradient` | `gradient="mixed"` | Mesh gradient expresivo (Azul + Coral + Arena) |
| **Soft Background** | `.ih-bg-soft` | `gradient="soft"` | Fondo marfil suave para secciones largas |

---

## 2. Cómo funcionan las 4 Texturas (`06. Textures`) sin penalizar la velocidad web

En lugar de cargar pesados archivos `.png`/`.jpg` de 2 MB que ralentizan la carga en móvil, las 4 texturas están construidas con **filtros SVG procedimentales (`<feTurbulence>` + `<feDiffuseLighting>`) embebidos en CSS (< 1 KB)**:

1. **Paper Texture (`.ih-texture-paper` / `texture="paper"`)**: Usa ruido fractal de baja frecuencia (`baseFrequency="0.045"`) con iluminación difusa cálida (`#f5ece2`) para simular las fibras orgánicas del papel.
2. **Fabric Texture (`.ih-texture-fabric` / `texture="fabric"`)**: Combina una micro-trama cruzada (`repeating-linear-gradient` a `0deg` y `90deg`) con turbulencia direccional (`0.65 0.12`) que recrea el tejido de lino/algodón (*crudo textil*).
3. **Grain Texture (`.ih-texture-grain` / `texture="grain"` o `.ih-with-grain`)**: Ruido monocromo de alta frecuencia (`baseFrequency="0.8"`). Además, puedes añadir la clase `.ih-with-grain` (o `withGrainOverlay` en React) encima de cualquier gradiente para darle acabado editorial.
4. **Light Texture (`.ih-texture-light` / `texture="light"`)**: Haz de luz diagonal cálido (`128deg`) sobre base papel/arena que simula luz natural de ventana.

---

## 3. Ejemplo de uso en React

```tsx
import { InhandSurface, InhandDivider, InhandArchBadge, InhandGlow } from './InhandSurfaces';

export function QuoteSection() {
  return (
    <InhandSurface
      texture="paper"
      className="relative overflow-hidden rounded-3xl p-12"
    >
      {/* Esfera con Mixed Gradient en la esquina */}
      <div className="ih-bg-mixed-gradient ih-with-grain absolute -top-12 -right-12 h-56 w-56 rounded-full opacity-85" />

      <div className="relative z-10 max-w-md">
        <InhandArchBadge size={48} outlined className="mb-6" />
        <h2 className="font-heading text-3xl text-[#1238A0]">
          “Small objects. Big meaning.”
        </h2>
        <InhandDivider width={96} className="mt-4" />
      </div>
    </InhandSurface>
  );
}
```
