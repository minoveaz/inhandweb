# UX, comercio y requisitos de calidad

## Enfoque
Mobile-first, rapidez, compra sencilla, contenido editorial de calidad. Plataforma **Shopify** propuesta inicialmente por operativa de ecommerce; decisión técnica pendiente de evaluar costes y necesidades.

## Responsive
- Móvil: titular sin cortes extraños, hero con producto reconocible, CTA visible, cards en 1–2 columnas, espacio vertical de 48–72 px entre grandes secciones.
- Tablet: grids de 2 columnas y textos con anchura controlada.
- Desktop: hero editorial con espacio negativo, grids de 3–4 productos si la colección lo permite, secciones con ritmo amplio.
- Probar 360, 390, 768, 1024, 1440 px como puntos de control (no breakpoints obligatorios).

## Accesibilidad
Contraste AA, navegación por teclado, foco visible, textos alternativos reales, etiquetas de formulario, botones de al menos 44x44 px cuando sea posible, reducción de movimiento, jerarquía H1/H2, estados de error y confirmación accesibles.

## Rendimiento
Imágenes WebP/AVIF optimizadas, tamaños responsive, lazy load bajo el primer pantallazo, fuentes alojadas correctamente, limitar scripts de terceros, no sacrificar Core Web Vitals por animaciones.

## Funciones de lanzamiento
- Catálogo y detalle de producto; carrito y checkout seguros.
- Inventario, variantes, impuestos, métodos de envío y pagos correctamente configurados.
- Captación newsletter con doble opt-in si se elige, y consentimiento conforme a normativa aplicable.
- Contacto B2B y avisos de privacidad.
- SEO básico: metadatos, URLs, datos estructurados Product cuando corresponda, sitemap, OG images, redirecciones.
- Medición: visualización de producto, add-to-cart, inicio de checkout, compra y envío de formularios, configurados respetando consentimiento.

## Evitar en V1
Mega menú, filtros sin catálogo suficiente, blog vacío, testimonios ficticios, urgencia/escasez falsa, reseñas inventadas, personalizador avanzado sin demanda validada, secciones duplicadas para llenar espacio.

## Aspectos legales/operativos por revisar
Identificación del vendedor, privacidad/cookies, condiciones de venta, información de precios/impuestos, desistimiento y excepciones aplicables a productos personalizados, envíos y garantías. Revisión jurídica antes de producción.
