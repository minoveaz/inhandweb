# Guía Oficial de Contenido y Fotografía para Productos INHAND

> **"Made to Mean More."**  
> Guía técnica y editorial para la preparación, fotografía y catalogación de nuevos productos en la tienda online de **INHAND**.

---

## 1. Pack Fotográfico Obligatorio (5 a 6 Fotografías por Producto)

El sistema de comercio electrónico de INHAND utiliza una galería interactiva en la página de producto (PDP) y un efecto de intercambio de ángulo (*hover swap*) en el catálogo. Cada producto requiere las siguientes tomas:

| # | Nombre de Archivo | Encuadre / Tipo de Foto | Función en la Web | Especificaciones Técnicas |
| :--- | :--- | :--- | :--- | :--- |
| **01** | `01_main.jpg` | **Frontal limpia** | Imagen principal en el catálogo, carrito y portadas. | **Proporción 4:5** (`1600 × 2000 px`). Fondo neutro arena/crema claro (`#FBF6EE` o `#FAF4EF`). Iluminación difusa, sombra suave. |
| **02** | `02_angle.jpg` | **Ángulo 3/4** | **Hover swap**: se activa al pasar el ratón en la cuadrícula de tienda para revelar volumen. | **Proporción 4:5** (`1600 × 2000 px`). Mismo fondo, escala y temperatura de luz que la frontal. |
| **03** | `03_detail.jpg` | **Macro / Detalle táctil** | Primer plano de la textura, grabado, material, tejido o serigrafía. | **Proporción 1:1 o 4:5** (`1600 × 1600 px` o `1600 × 2000 px`). Foco nítido en el detalle artesanal. |
| **04** | `04_inhand.jpg` | **En Mano (*Sello INHAND*)** | El objeto interactuando con las manos humanas (aporta escala y cercanía real). | **Proporción 16:10 o 4:5** (`1920 × 1200 px` o `1600 × 2000 px`). Manos cuidadas, luz natural. |
| **05** | `05_box.jpg` | **Packaging / Caja de regalo** | Presentación oficial en su caja con faja editorial y protecciones. | **Proporción 1:1 o 4:5**. Muestra el valor de producto listo para regalar. |
| **06** | `06_lifestyle.jpg` *(Opcional)* | **Contexto / En el entorno** | En escritorio de trabajo, mesita de noche, café o estantería. | **Proporción 16:10 o 4:5**. Ambiente sereno, ordenado y contemporáneo. |

### Dónde guardar las imágenes en el proyecto:
```
public/images/products/<slug-del-producto>/
├── 01_main.jpg
├── 02_angle.jpg
├── 03_detail.jpg
├── 04_inhand.jpg
├── 05_box.jpg
└── 06_lifestyle.jpg
```
*Formato:* JPG o WebP optimizado (calidad 80–85%, peso objetivo: 180–350 KB por imagen para carga ultrarrápida y Core Web Vitals optimizado).*

---

## 2. Ficha de Información Editorial Requerida (Bilingüe ES / EN)

Toda la web es **100% bilingüe nativa (Español e Inglés)** desde el día 1. Para cada producto se deben completar los siguientes campos:

### Bloque A — Identificación Comercial y Categorización
1. **SKU:** Código de inventario único.
   - *Ejemplos:* `IH-OBJ-001`, `IH-PAG-002`, `IH-WTH-003`, `IH-EVR-004`.
2. **Slug de URL:** Texto amigable para la URL en minúsculas sin tildes ni espacios.
   - *Ejemplo:* `escultura-tipografica-gracia` -> genera `/producto/escultura-tipografica-gracia` y `/en/product/escultura-tipografica-gracia`.
3. **Nombre Oficial (`ES` y `EN`):**
   - En INHAND, los nombres llevan **punto final** de identidad tipográfica.
   - *Ejemplo ES:* `«Escultura Tipográfica GRACIA.»`
   - *Ejemplo EN:* `«GRACIA. Typographic Sculpture»`
4. **Descriptor Corto (`ES` y `EN`):** Subtítulo de 4 a 6 palabras que define el formato y material.
   - *Ejemplo ES:* `«Escultura de escritorio · Impresión 3D»`
   - *Ejemplo EN:* `«Desk sculpture · 3D Printed PLA»`
5. **Categoría Editorial:** Debe pertenecer a una de las 6 categorías del universo INHAND:
   - `Objects` (Decoración y hogar — slug: `decoracion-y-hogar`)
   - `Pages` (Papelería y lectura — slug: `papeleria-y-lectura`)
   - `Wear` (Moda y textil — slug: `moda-y-textil`)
   - `Everyday` (Objetos cotidianos — slug: `objetos-cotidianos`)
   - `Details` (Regalos y detalles — slug: `regalos-y-detalles`)
   - `Moments` (Packs y ocasiones especiales — slug: `packs-y-ocasiones`)
6. **Precio (€):** PVP final en Euros con el 21% de IVA incluido (ej: `32.00`).
7. **Insignia / Badge (*Opcional*):** Distintivo en píldora.
   - *Ejemplo ES:* `«First Drop · Icono»` / *EN:* `«First Drop · Icon»`.

---

### Bloque B — Variantes (Colores, Acabados o Tallas)
Si el producto tiene diferentes acabados, para cada uno necesitamos:
- **ID de la variante:** (ej: `gracia-blue`, `gracia-sand`).
- **Nombre de la variante (`ES` y `EN`):** (ej: `«Azul Tinta + Punto Coral»` / `«Ink Blue + Coral Dot»`).
- **Código Hexadecimal (`#HEX`):** Para la pastilla de selección visual (ej: `#092B8B`, `#FF6638`, `#F3E7DE`).
- **Estado de Stock:** `inStock: true` o `false`.

---

### Bloque C — Behind the Meaning (La Historia y el Simbolismo)
*Es el pilar diferencial de INHAND: ningún objeto es solo un objeto.*

1. **Referencia Bíblica:**
   - **Cita (`ES` y `EN`):** Libro, capítulo y versículos (ej: `«2 Corintios 12:9 · Efesios 2:8»`).
   - **Texto del Versículo (`ES` y `EN`):**
     - *ES:* `«Bástate mi gracia; porque mi poder se perfecciona en la debilidad.»`
     - *EN:* `“My grace is sufficient for you, for my power is made perfect in weakness.”`
2. **Titular del Significado (`ES` y `EN`):** Una frase inspiradora y memorable.
   - *ES:* `«Un recordatorio tangible de que siempre es suficiente.»`
   - *EN:* `«A tangible reminder that grace is always enough.»`
3. **Historia Editorial (1 a 2 párrafos en `ES` y `EN`):**
   - Contexto de por qué se diseñó esta pieza, qué momento de la vida acompaña y qué verdad pretende recordar a quien la tiene en su mano o en su casa.
4. **Nota de Diseño Industrial (`ES` y `EN`):**
   - Cómo los materiales, el peso, las curvas o la tipografía comunican ese significado teológico y estético.
5. **Valores Clave (2 a 3 conceptos):**
   - Conceptos centrales de la pieza (ej: `Gracia`, `Paz`, `Propósito`, `Verdad`, `Identidad`).

---

### Bloque D — Especificaciones Técnicas (Acordeón de PDP)
1. **Materiales (`ES` y `EN`):** Descripción de materias primas y proceso de fabricación (ej: *Biopolímero PLA vegetal mate, caucho antideslizante*).
2. **Dimensiones y Peso (`ES` y `EN`):** Medidas reales en cm y peso en gramos (ej: *18,5 × 6,2 × 2,8 cm · 145 gramos*).
3. **Cuidados y Conservación (`ES` y `EN`):** Cómo limpiar y preservar la pieza (ej: *Limpiar con paño suave de microfibra seco. No exponer a fuentes de calor directo.*).
4. **Envío y Packaging (`ES` y `EN`):** Cómo se presenta el paquete (ej: *Se entrega en su estuche rígido protector INHAND con tarjeta conmemorativa del versículo.*).

---

## 3. Plantilla Lista para Rellenar (Ficha de Producto)

Puedes copiar este bloque y rellenarlo para cada nuevo producto que se vaya a dar de alta:

```yaml
================================================================================
FICHA DE NUEVO PRODUCTO — INHAND
================================================================================

1. DATOS COMERCIALES
--------------------------------------------------------------------------------
SKU: IH-XXX-000
Slug: nombre-del-producto
Precio_EUR: 00.00
Categoria_Editorial: Objects | Pages | Wear | Everyday | Details | Moments
Badge_ES: "First Drop"
Badge_EN: "First Drop"

Nombre_ES: "Nombre del Producto."
Nombre_EN: "Product Name."

Descriptor_Corto_ES: "Tipo de objeto · Material o formato"
Descriptor_Corto_EN: "Object type · Material or format"

Descripcion_ES: >
  Descripción completa del producto en español explicando qué es,
  cómo se usa y qué sensaciones transmite al tacto y a la vista.

Descripcion_EN: >
  Full product description in English explaining what it is,
  how it is used, and how it feels to the touch and sight.

2. VARIANTES DISPONIBLES
--------------------------------------------------------------------------------
Variante_1:
  ID: "var-01"
  Nombre_ES: "Azul INHAND"
  Nombre_EN: "INHAND Blue"
  Color_Hex: "#092B8B"
  Stock: true

Variante_2:
  ID: "var-02"
  Nombre_ES: "Coral Vibrante"
  Nombre_EN: "Vibrant Coral"
  Color_Hex: "#FF6638"
  Stock: true

3. BEHIND THE MEANING (HISTORIA Y SIMBOLISMO)
--------------------------------------------------------------------------------
Cita_Biblica_ES: "Libro Cap:Ver"
Cita_Biblica_EN: "Book Chap:Ver"

Texto_Versiculo_ES: "«Texto bíblico completo en español...»"
Texto_Versiculo_EN: "“Full Scripture verse in English...”"

Titular_Significado_ES: "Frase fuerza que sintetiza el propósito de la pieza."
Titular_Significado_EN: "Core headline capturing the purpose of the piece."

Historia_ES: >
  Historia editorial sobre el origen y la intención de la pieza.
  Por qué existe este objeto y qué papel juega en la vida diaria.

Historia_EN: >
  Editorial story about the origin and intention of the piece.
  Why this object exists and what role it plays in everyday life.

Nota_Diseno_ES: "Detalles del diseño físico, equilibrio, texturas y proporciones."
Nota_Diseno_EN: "Physical design notes, balance, textures, and proportions."

Valores_Clave:
  - Concepto_1: "Gracia" / "Grace"
  - Concepto_2: "Propósito" / "Purpose"
  - Concepto_3: "Paz" / "Peace"

4. ESPECIFICACIONES TÉCNICAS
--------------------------------------------------------------------------------
Materiales_ES: "Composición de materiales en español..."
Materiales_EN: "Materials breakdown in English..."

Dimensiones_ES: "00 × 00 × 00 cm · 000 gramos"
Dimensiones_EN: "00 × 00 × 00 cm · 000 grams"

Cuidados_ES: "Instrucciones de mantenimiento..."
Cuidados_EN: "Care instructions..."

Packaging_ES: "Detalles del estuche y presentación..."
Packaging_EN: "Packaging and presentation details..."

5. LISTA DE FOTOS ENTREGADAS
--------------------------------------------------------------------------------
[ ] 01_main.jpg      (Frontal limpia 4:5 - 1600x2000px)
[ ] 02_angle.jpg     (Ángulo 3/4 para hover swap 4:5 - 1600x2000px)
[ ] 03_detail.jpg    (Primer plano de textura/grabado)
[ ] 04_inhand.jpg    (Interacción en mano humana)
[ ] 05_box.jpg       (Caja de regalo y packaging)
[ ] 06_lifestyle.jpg (En contexto de uso real - opcional)
```

---

## 4. Dónde se conecta en el Código de la Web

Una vez completada la ficha y las fotos:
1. Las fotos se guardan en:  
   `public/images/products/<slug>/`
2. El producto se registra en:  
   [config/products.ts](file:///Users/minoveaz/Documents/Proyectos/sparklight/Inhand/config/products.ts) en el array `PRODUCTS`.
3. Al guardar y compilar con `npm run build`:
   - Aparece automáticamente en el catálogo filtrable de la tienda ([Shop.tsx](file:///Users/minoveaz/Documents/Proyectos/sparklight/Inhand/pages/Shop.tsx)).
   - Se crea su página individual ([ProductDetail.tsx](file:///Users/minoveaz/Documents/Proyectos/sparklight/Inhand/pages/ProductDetail.tsx)).
   - Se añade al buscador en tiempo real por SKU, nombre y versículo.
   - Se incorpora a las rutas bilingües y al `sitemap.xml` para SEO en Google.
