# Arquitectura y Organización de Proyecto — INHAND ("Made to Mean More.")

## 1. Visión General de la Estructura

El proyecto sigue una arquitectura escalable, modular y tipada orientada al e-commerce bilingüe (`ES` / `EN`) y sustentada en el **INHAND Design System v0.1**.

```
Inhand/
├── components/          # Librería de componentes jerarquizada
│   ├── ui/              # 57 Componentes atómicos/primitivos del Design System + InhandSurfaces
│   ├── molecules/       # Componentes compuestos de catálogo (ProductCard, etc.)
│   ├── organisms/       # Secciones complejas (Navbar, Footer, CartDrawer, SeoHead)
│   └── layouts/         # Shell estructural de la web (StorefrontLayout)
├── config/              # Configuración del dominio y fuentes de verdad
│   ├── products.ts      # Catálogo inaugural (First Drop 01–05, 6 Categorías)
│   ├── routes.ts        # Matriz de rutas bilingües canónicas
│   ├── tokens.ts        # Tokens semánticos de diseño (--inhand-*)
│   └── i18n.ts          # Diccionario bilingüe tipado (ES / EN)
├── context/             # Estados globales de React
│   ├── CartContext.tsx  # Estado persistente del carrito y cálculo fiscal (IVA 21%, envío)
│   └── LocaleContext.tsx# Detección y conmutación de idioma
├── hooks/               # Custom hooks reutilizables
│   ├── useCart.ts       # Acceso rápido al carrito
│   ├── useLocale.ts     # Acceso rápido a traducciones e idioma activo
│   ├── useScrollLock.ts # Bloqueo de scroll para modales y cajones
│   ├── useMediaQuery.ts # Consultas de responsive design reactivas
│   └── index.ts         # Barrel de exportación
├── pages/               # Páginas y vistas enrutables
│   ├── Home.tsx         # Portada editorial (Hero, First Drop, Propósito, Newsletter)
│   ├── Shop.tsx         # Catálogo filtrable por categoría, búsqueda y ordenación
│   ├── ProductDetail.tsx# PDP editorial con galería multi-ángulo y Behind the Meaning
│   ├── Checkout.tsx     # Pasarela segura PCI SAQ-A (Stripe, Redsys, Bizum)
│   ├── OurStory.tsx     # Manifiesto de marca y principios rectores
│   ├── ForCommunities.tsx# Soluciones B2B para iglesias y ministerios
│   ├── Contact.tsx      # Formulario y FAQs interactivas
│   ├── Legal.tsx        # Aviso legal, RGPD y condiciones de desistimiento
│   └── DesignSystemPage.tsx # Catálogo interactivo de tokens y 57 componentes
├── public/              # Archivos estáticos servidos directamente por Vite
│   ├── fonts/           # Tipografías oficiales locales (Plus Jakarta Sans, Space Grotesk)
│   ├── icons/           # Iconografía SVG organizada (core, interface, benefit, meaning-values)
│   ├── illustrations/   # Ilustraciones editoriales y elementos gráficos
│   ├── images/          # Fotografía de producto y marca en alta resolución
│   ├── logos/           # Monogramas, logotipos e isotipos SVG
│   ├── graphic-elements/# Texturas y divisores SVG
│   ├── robots.txt       # Directivas de indexación SEO
│   └── sitemap.xml      # Mapa del sitio bilingüe autogenerado
├── services/            # Lógica de integración y pasarelas externas
│   └── paymentGateway.ts# Integración PCI-DSS SAQ-A con Stripe Checkout y Redsys TPV/Bizum
├── styles/              # Hojas de estilo globales y texturas
│   └── inhand-surfaces.css # Gradientes, texturas y mallas de marca
├── types/               # Definiciones de TypeScript canónicas
│   ├── product.ts       # Modelos de Producto, Variante, Categoría y Simbolismo
│   ├── cart.ts          # Modelos de Línea de Carrito y Totales
│   ├── checkout.ts      # Modelos de Cliente, Pedido y Pasarelas
│   ├── routes.ts        # Modelos de Idioma y Rutas
│   └── index.ts         # Barrel de exportación de tipos
├── utils/               # Funciones auxiliares y re-exports de compatibilidad
├── scripts/             # Scripts de compilación y SEO (generate_sitemap.cjs)
├── index.css            # Entrada Tailwind CSS + variables CSS del Design System
├── index.html           # Documento HTML principal
├── index.tsx            # Punto de entrada React 19
├── vite.config.ts       # Configuración de Vite con alias `@/*` y división de chunks
└── tailwind.config.js   # Paleta semántica, sombras, bordes y tipografías INHAND
```

## 2. Convenciones para Escalar

### Cómo añadir un nuevo producto al catálogo
1. Agrega las imágenes optimizadas a `public/images/products/<slug>/`.
2. Añade la entrada tipada en `config/products.ts` cumpliendo la interfaz `Product`.
3. El producto se incorporará automáticamente a:
   - La tienda (`/tienda` y `/en/shop`).
   - El mapa del sitio (`sitemap.xml`) al ejecutar `npm run build`.
   - La búsqueda en tiempo real y el filtrado por categoría.

### Cómo añadir un nuevo componente UI
1. Crea el archivo en `components/ui/<NombreComponente>.tsx`.
2. Expórtalo desde `components/ui/index.ts`.
3. Incorpóralo a la demo interactiva en `pages/DesignSystemPage.tsx` para documentar sus variantes y accesibilidad.

### Principio de Inyección de Rutas y Traducciones
Toda ruta o etiqueta debe apoyarse en `config/routes.ts` y `config/i18n.ts`, asegurando paridad estricta entre `es` y `en`.
