import {
  Locale,
  ProductVariant,
  ProductMeaningValue,
  Product,
  ProductCategory,
} from '../types';

export type {
  Locale,
  ProductVariant,
  ProductMeaningValue,
  Product,
  ProductCategory,
};

export const CATEGORIES: ProductCategory[] = [
  {
    id: 'cat-01',
    number: '01',
    slug: 'decoracion-y-hogar',
    editorialName: 'Objects',
    iconPath: '/icons/meaning-values/03_community_relationships/belonging.svg',
    name: {
      es: 'Decoración y hogar',
      en: 'Home & Decor',
    },
    description: {
      es: 'Objetos escultóricos que inspiran tu espacio y recuerdan lo esencial cada día.',
      en: 'Sculptural objects that inspire your space and remind you of what matters most every day.',
    },
    itemsSummary: {
      es: ['Esculturas 3D', 'Figuras decorativas', 'Arcos arquitectónicos', 'Objetos de escritorio'],
      en: ['3D Sculptures', 'Decorative figures', 'Architectural arches', 'Desk objects'],
    },
  },
  {
    id: 'cat-02',
    number: '02',
    slug: 'libros-y-papeleria',
    editorialName: 'Pages',
    iconPath: '/icons/meaning-values/01_faith_spirituality/bible.svg',
    name: {
      es: 'Libros y papelería',
      en: 'Books & Stationery',
    },
    description: {
      es: 'Recursos diseñados para leer, reflexionar, estudiar la Palabra y crecer cada día.',
      en: 'Resources designed to read, reflect, study Scripture, and grow every day.',
    },
    itemsSummary: {
      es: ['Marcapáginas bíblicos', 'Soportes de lectura', 'Devocionales', 'Journals y cuadernos'],
      en: ['Biblical bookmarks', 'Reading stands', 'Devotionals', 'Journals & notebooks'],
    },
  },
  {
    id: 'cat-03',
    number: '03',
    slug: 'moda-y-complementos',
    editorialName: 'Wear',
    iconPath: '/icons/01_core/shop.svg',
    name: {
      es: 'Moda y complementos',
      en: 'Apparel & Tote Bags',
    },
    description: {
      es: 'Lleva tu fe contigo de forma natural, contemporánea y auténtica.',
      en: 'Carry your faith with you in a natural, contemporary, and authentic way.',
    },
    itemsSummary: {
      es: ['Tote bags de alto gramaje', 'Sudaderas', 'Camisetas', 'Gorras bordadas'],
      en: ['Heavyweight tote bags', 'Hoodies', 'T-shirts', 'Embroidered caps'],
    },
  },
  {
    id: 'cat-04',
    number: '04',
    slug: 'objetos-cotidianos',
    editorialName: 'Everyday',
    iconPath: '/icons/meaning-values/04_everyday_life/daily-life.svg',
    name: {
      es: 'Objetos cotidianos',
      en: 'Everyday Objects',
    },
    description: {
      es: 'Diseño funcional y sereno pensado para acompañarte en tu rutina diaria.',
      en: 'Functional, serene design crafted to accompany your daily routine.',
    },
    itemsSummary: {
      es: ['Botellas térmicas', 'Tazas de cerámica', 'Organización', 'Accesorios diarios'],
      en: ['Thermal bottles', 'Ceramic mugs', 'Organization', 'Daily accessories'],
    },
  },
  {
    id: 'cat-05',
    number: '05',
    slug: 'regalos-y-detalles',
    editorialName: 'Details',
    iconPath: '/icons/meaning-values/04_everyday_life/gift.svg',
    name: {
      es: 'Regalos y detalles',
      en: 'Gifts & Keepsakes',
    },
    description: {
      es: 'Pequeños gestos con un gran significado que dejan huella en quien los recibe.',
      en: 'Small gestures with profound meaning that leave a lasting mark on those who receive them.',
    },
    itemsSummary: {
      es: ['Llaveros escultóricos', 'Packs de bendición', 'Tarjetas con mensaje', 'Detalles con propósito'],
      en: ['Sculptural keychains', 'Blessing bundles', 'Message cards', 'Purposeful keepsakes'],
    },
  },
  {
    id: 'cat-06',
    number: '06',
    slug: 'packs-y-ocasiones',
    editorialName: 'Bundles',
    iconPath: '/icons/meaning-values/03_community_relationships/family.svg',
    name: {
      es: 'Packs y ocasiones especiales',
      en: 'Gift Packs & Special Moments',
    },
    description: {
      es: 'Cajas regalo y kits temáticos pensados para bautismos, retiros, iglesias y celebraciones.',
      en: 'Gift boxes and themed kits crafted for baptisms, retreats, churches, and celebrations.',
    },
    itemsSummary: {
      es: ['Cajas regalo con propósito', 'Kits de bienvenida', 'Bautismos', 'Retiros y comunidades'],
      en: ['Purposeful gift boxes', 'Welcome kits', 'Baptisms', 'Retreats & communities'],
    },
  },
];

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 01 · TOTE BAG FE EN ACCIÓN. (Destacado #1)
  // =========================================================================
  {
    id: 'prod-tote',
    sku: 'IH-ACC-001',
    slug: 'tote-bag-fe-en-accion',
    categorySlug: 'moda-y-complementos',
    categoryEditorial: 'Wear',
    name: {
      es: 'Tote Bag FE EN ACCIÓN.',
      en: 'FAITH IN ACTION. Tote Bag',
    },
    shortDescriptor: {
      es: 'Bolsa canvas · Algodón resistente',
      en: 'Canvas tote · Heavyweight cotton',
    },
    priceEur: 24,
    featuredInFirstDrop: true,
    badge: {
      es: 'First Drop · Bestseller',
      en: 'First Drop · Bestseller',
    },
    images: {
      main: '/images/products/tote-bag-fe-en-accion/01_main.jpg',
      angle: '/images/products/tote-bag-fe-en-accion/02_angle.jpg',
      detail: '/images/products/tote-bag-fe-en-accion/03_detail.jpg',
      inhand: '/images/products/tote-bag-fe-en-accion/04_inhand.jpg',
      box: '/images/products/tote-bag-fe-en-accion/05_box.jpg',
      lifestyle: '/images/products/tote-bag-fe-en-accion/06_lifestyle.jpg',
    },
    variants: [
      {
        id: 'tote-natural',
        name: {
          es: 'Crudo natural',
          en: 'Natural unbleached',
        },
        colorHex: '#E8DDC9',
        inStock: true,
      },
      {
        id: 'tote-blue',
        name: {
          es: 'Azul tinta',
          en: 'Ink blue',
        },
        colorHex: '#2638A5',
        inStock: true,
      },
      {
        id: 'tote-charcoal',
        name: {
          es: 'Negro carbón',
          en: 'Charcoal black',
        },
        colorHex: '#272A32',
        inStock: true,
      },
    ],
    description: {
      es: 'FE EN ACCIÓN. lleva un mensaje de fe a un accesorio cotidiano. Una bolsa de diseño contemporáneo para libros, trabajo o compras, pensada para recordar que la fe también se expresa en lo que hacemos. La inspiración editorial es Santiago 2:17. Canvas con fuelle, asas reforzadas, serigrafía frontal y logotipo posterior.',
      en: 'FAITH IN ACTION. brings a faith-inspired message to an everyday accessory. A contemporary tote for books, work or errands, designed as a reminder that faith is also expressed through what we do. Editorial inspiration: James 2:17. Gusseted canvas with reinforced handles, front screen print and rear wordmark.',
    },
    biblicalReference: {
      citation: {
        es: 'Santiago 2:17',
        en: 'James 2:17',
      },
      verseText: {
        es: '«Así también la fe, si no tiene obras, está completamente muerta en sí misma.»',
        en: '“So also faith by itself, if it does not have works, is dead.”',
      },
    },
    behindTheMeaning: {
      headline: {
        es: 'Lleva contigo lo que crees.',
        en: 'Carry what you believe.',
      },
      story: {
        es: 'FE EN ACCIÓN. lleva un mensaje de fe a un accesorio cotidiano. Una bolsa de diseño contemporáneo para libros, trabajo o compras, pensada para recordar que la fe también se expresa en lo que hacemos cada día. La inspiración editorial es Santiago 2:17.',
        en: 'FAITH IN ACTION. brings a faith-inspired message to an everyday accessory. A contemporary tote for books, work or errands, designed as a reminder that faith is also expressed through what we do every day. Editorial inspiration: James 2:17.',
      },
      designNote: {
        es: 'Canvas de algodón con fuelle inferior de 10 cm, asas reforzadas en cruz de 60 cm, serigrafía bicolor de alta durabilidad y etiqueta exterior tejida azul de 35 × 18 mm.',
        en: 'Cotton canvas with 10 cm bottom gusset, reinforced 60 cm cross-stitched handles, durable two-color screen print, and blue woven exterior label 35 × 18 mm.',
      },
      values: [
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/cross.svg',
          label: { es: 'Fe', en: 'Faith' },
        },
        {
          iconPath: '/icons/meaning-values/03_community_relationships/service.svg',
          label: { es: 'Acción', en: 'Action' },
        },
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/purpose.svg',
          label: { es: 'Propósito', en: 'Purpose' },
        },
      ],
    },
    specs: {
      materials: {
        es: 'Canvas 100% algodón de alto gramaje (360 g/m²). Serigrafía bicolor al agua, etiqueta tejida y costuras reforzadas.',
        en: '100% heavyweight cotton canvas (360 gsm). Two-color water-based screen print, woven label, and reinforced stitching.',
      },
      dimensions: {
        es: '35 × 40 × 10 cm (asas de 60 × 3,5 cm)',
        en: '35 × 40 × 10 cm (60 × 3.5 cm handles)',
      },
      weight: '280 g',
      care: {
        es: 'Lavar a mano o en ciclo delicado con agua fría (30 °C). Secar al aire. No usar lejía. Planchar del revés sin tocar la serigrafía.',
        en: 'Hand wash or delicate cycle in cold water (30 °C). Air dry. Do not bleach. Iron inside out avoiding the print.',
      },
      packaging: {
        es: 'Bolsa plegada con faja de papel vegetal editorial y etiqueta colgante informativa.',
        en: 'Folded tote with vellum paper band and informative hang tag.',
      },
    },
  },

  // =========================================================================
  // 02 · LLAVERO DE JESÚS. (Destacado #2)
  // =========================================================================
  {
    id: 'prod-keychain',
    sku: 'IH-DET-001',
    slug: 'llavero-jesus',
    categorySlug: 'regalos-y-detalles',
    categoryEditorial: 'Details',
    name: {
      es: 'Llavero de Jesús.',
      en: 'Jesus Keychain.',
    },
    shortDescriptor: {
      es: 'Figura coleccionable · Impresión 3D',
      en: 'Collectible figure · 3D printing',
    },
    priceEur: 14,
    featuredInFirstDrop: true,
    badge: {
      es: 'First Drop · Colección',
      en: 'First Drop · Collectible',
    },
    images: {
      main: '/images/products/llavero-jesus/01_main.jpg',
      angle: '/images/products/llavero-jesus/02_angle.jpg',
      detail: '/images/products/llavero-jesus/03_detail.jpg',
      inhand: '/images/products/llavero-jesus/04_inhand.jpg',
      box: '/images/products/llavero-jesus/05_box.jpg',
      lifestyle: '/images/products/llavero-jesus/06_lifestyle.jpg',
    },
    variants: [
      {
        id: 'jesus-classic',
        name: {
          es: 'Clásico · túnica arena y azul',
          en: 'Classic · sand and blue robe',
        },
        colorHex: '#F3E7DE',
        accentHex: '#2638A5',
        inStock: true,
      },
    ],
    description: {
      es: 'Un pequeño personaje de Jesús, amable y cercano, diseñado para acompañar las llaves, una mochila o un bolso. Su expresión cálida transforma un objeto cotidiano en un recordatorio de compañía y esperanza. La inspiración de Mateo 28:20 conecta con la promesa de su presencia en cada jornada.',
      en: 'A small, approachable Jesus character designed to travel with keys, a backpack or a bag. Its warm expression turns an everyday object into a reminder of companionship and hope. Inspired by Matthew 28:20, it points to the promise of his presence throughout every day.',
    },
    biblicalReference: {
      citation: {
        es: 'Mateo 28:20',
        en: 'Matthew 28:20',
      },
      verseText: {
        es: '«Y he aquí yo estoy con vosotros todos los días, hasta el fin del mundo.»',
        en: '“And behold, I am with you always, to the end of the age.”',
      },
    },
    behindTheMeaning: {
      headline: {
        es: 'Una presencia que acompaña cada día.',
        en: 'A reminder of presence in everyday life.',
      },
      story: {
        es: 'Un pequeño personaje de Jesús, amable y cercano, diseñado para acompañar las llaves, una mochila o un bolso. Su expresión cálida transforma un objeto cotidiano en un recordatorio de compañía y esperanza. La inspiración de Mateo 28:20 conecta con la promesa de presencia constante en todos nuestros caminos.',
        en: 'A small, approachable Jesus character designed to travel with keys, a backpack or a bag. Its warm expression turns an everyday object into a reminder of companionship and hope. Inspired by Matthew 28:20, it points to the promise of constant presence in all our ways.',
      },
      designNote: {
        es: 'Figura estilizada con rostro expresivo, túnica clara y detalle azul. Cuerpo en biopolímero PLA/PETG multicolor con anilla y cadena de acero inoxidable mate antidesgaste.',
        en: 'Stylized figure with expressive face, light robe, and blue accent. Multicolor PLA/PETG biopolymer body with matte wear-resistant stainless steel split ring and chain.',
      },
      values: [
        {
          iconPath: '/icons/meaning-values/03_community_relationships/connection.svg',
          label: { es: 'Compañía', en: 'Companionship' },
        },
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/grace.svg',
          label: { es: 'Fe', en: 'Faith' },
        },
        {
          iconPath: '/icons/meaning-values/02_emotions_values/joy.svg',
          label: { es: 'Alegría', en: 'Joy' },
        },
      ],
    },
    specs: {
      materials: {
        es: 'Cuerpo de biopolímero PLA multicolor impreso en 3D; anilla, cadena y pasador de fijación en acero inoxidable mate.',
        en: 'Multicolor 3D-printed PLA biopolymer body; split ring, chain, and connector in matte stainless steel.',
      },
      dimensions: {
        es: '5,5 × 3,2 × 2,8 cm (longitud total con anilla: 10,5 cm)',
        en: '5.5 × 3.2 × 2.8 cm (10.5 cm total length with ring)',
      },
      weight: '24 g',
      care: {
        es: 'Limpiar con un paño ligeramente húmedo. Evitar altas temperaturas, impactos directos y tracción excesiva sobre la fijación.',
        en: 'Wipe with a slightly damp cloth. Avoid extreme heat, hard impacts, and excessive tension on the connector.',
      },
      packaging: {
        es: 'Estuche compacto INHAND con interior protector y mini tarjeta de Mateo 28:20.',
        en: 'Compact INHAND sleeve with protective insert and miniature Matthew 28:20 card.',
      },
    },
  },

  // =========================================================================
  // 03 · ESCULTURA TIPOGRÁFICA GRACIA.
  // =========================================================================
  {
    id: 'prod-gracia',
    sku: 'IH-OBJ-001',
    slug: 'escultura-tipografica-gracia',
    categorySlug: 'decoracion-y-hogar',
    categoryEditorial: 'Objects',
    name: {
      es: 'Escultura Tipográfica GRACIA.',
      en: 'GRACIA. Typographic Sculpture',
    },
    shortDescriptor: {
      es: 'Escultura de escritorio · Impresión 3D',
      en: 'Desk sculpture · 3D printed PLA',
    },
    priceEur: 32,
    featuredInFirstDrop: true,
    badge: {
      es: 'First Drop · Icono',
      en: 'First Drop · Icon',
    },
    images: {
      main: '/images/products/escultura-tipografica-gracia/01_main.jpg',
      angle: '/images/products/escultura-tipografica-gracia/02_angle.jpg',
      detail: '/images/products/escultura-tipografica-gracia/03_detail.jpg',
      inhand: '/images/products/escultura-tipografica-gracia/04_inhand.jpg',
      box: '/images/products/escultura-tipografica-gracia/05_box.jpg',
      lifestyle: '/images/products/escultura-tipografica-gracia/06_lifestyle.jpg',
    },
    variants: [
      {
        id: 'gracia-blue',
        name: {
          es: 'Azul tinta + acento coral',
          en: 'Ink blue + coral accent',
        },
        colorHex: '#2638A5',
        accentHex: '#FC6C21',
        inStock: true,
      },
      {
        id: 'gracia-sand',
        name: {
          es: 'Arena + acento coral',
          en: 'Sand + coral accent',
        },
        colorHex: '#F3E7DE',
        accentHex: '#FC6C21',
        inStock: true,
      },
    ],
    description: {
      es: 'GRACIA convierte una palabra central de la fe cristiana en un objeto escultórico contemporáneo. Pensada para una estantería, un escritorio o un rincón de reflexión, invita a recordar el regalo de la gracia en la vida diaria. Letras volumétricas de cantos redondeados y detalle circular coral en acabado mate texturizado.',
      en: 'GRACIA turns a central word of Christian faith into a contemporary sculptural object. Made for a shelf, desk or quiet corner, it offers a daily reminder of grace as a gift. Volumetric rounded lettering with a coral circular accent in a textured matte finish.',
    },
    biblicalReference: {
      citation: {
        es: 'Efesios 2:8 · 2 Corintios 12:9',
        en: 'Ephesians 2:8 · 2 Corinthians 12:9',
      },
      verseText: {
        es: '«Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios.»',
        en: '“For by grace you have been saved through faith. And this is not your own doing; it is the gift of God.”',
      },
    },
    behindTheMeaning: {
      headline: {
        es: 'La gracia también puede hacerse visible.',
        en: 'Grace can become something you see.',
      },
      story: {
        es: 'GRACIA convierte una palabra central de la fe cristiana en un objeto escultórico contemporáneo. Pensada para una estantería, un escritorio o un rincón de reflexión, invita a recordar el regalo de la gracia en la vida diaria. La referencia de Efesios 2:8 orienta su significado: no como un adorno vacío, sino como una declaración silenciosa y firme de que no todo depende de nuestras fuerzas.',
        en: 'GRACIA turns a central word of Christian faith into a contemporary sculptural object. Made for a shelf, desk or quiet corner, it offers a daily reminder of grace as a gift. Ephesians 2:8 informs its meaning: not as an empty ornament, but as a quiet, steadfast declaration that not everything depends on our own strength.',
      },
      designNote: {
        es: 'Letras volumétricas de cantos redondeados y detalle circular coral. Geometría autoestable con cuerpo de biopolímero PLA mate texturizado y apoyos inferiores protectores.',
        en: 'Volumetric rounded lettering with a coral circular accent. Freestanding geometry in matte-textured PLA biopolymer with protective base pads.',
      },
      values: [
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/grace.svg',
          label: { es: 'Gracia', en: 'Grace' },
        },
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/hope.svg',
          label: { es: 'Esperanza', en: 'Hope' },
        },
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/purpose.svg',
          label: { es: 'Propósito', en: 'Purpose' },
        },
      ],
    },
    specs: {
      materials: {
        es: 'Biopolímero PLA mate de origen vegetal impreso mediante FDM de alta resolución con acento circular coral.',
        en: 'Plant-based matte PLA biopolymer printed via high-resolution FDM with coral circular accent.',
      },
      dimensions: {
        es: '18 × 6,5 × 3 cm',
        en: '18 × 6.5 × 3 cm',
      },
      weight: '140 g',
      care: {
        es: 'Retirar polvo con paño seco y suave. Evitar exposición solar intensa continuada y fuentes de calor superiores a 55 °C.',
        en: 'Dust with a soft dry cloth. Avoid prolonged direct sunlight and heat sources above 55 °C.',
      },
      packaging: {
        es: 'Caja azul INHAND con inserto de protección a medida y tarjeta editorial explicativa sobre la gracia.',
        en: 'Blue INHAND collector box with custom protective insert and editorial card on grace.',
      },
    },
  },

  // =========================================================================
  // 04 · SOPORTE PARA BIBLIA
  // =========================================================================
  {
    id: 'prod-bible-stand',
    sku: 'IH-EVR-001',
    slug: 'soporte-para-biblia',
    categorySlug: 'libros-y-papeleria',
    categoryEditorial: 'Pages',
    name: {
      es: 'Soporte para Biblia.',
      en: 'Bible Reading Stand.',
    },
    shortDescriptor: {
      es: 'Soporte de lectura · Impresión 3D',
      en: 'Reading stand · 3D printing',
    },
    priceEur: 28,
    featuredInFirstDrop: true,
    badge: {
      es: 'First Drop',
      en: 'First Drop',
    },
    images: {
      main: '/images/products/soporte-para-biblia/01_main.jpg',
      angle: '/images/products/soporte-para-biblia/02_angle.jpg',
      detail: '/images/products/soporte-para-biblia/03_detail.jpg',
      inhand: '/images/products/soporte-para-biblia/04_inhand.jpg',
      box: '/images/products/soporte-para-biblia/05_box.jpg',
      lifestyle: '/images/products/soporte-para-biblia/06_lifestyle.jpg',
    },
    variants: [
      {
        id: 'stand-blue',
        name: {
          es: 'Azul tinta + arena',
          en: 'Ink blue + sand',
        },
        colorHex: '#2638A5',
        accentHex: '#F3E7DE',
        inStock: true,
      },
      {
        id: 'stand-sand',
        name: {
          es: 'Arena + acento coral',
          en: 'Sand + coral accent',
        },
        colorHex: '#F3E7DE',
        accentHex: '#FC6C21',
        inStock: true,
      },
    ],
    description: {
      es: 'Un soporte pensado para facilitar la lectura y el estudio de la Biblia en casa. Su geometría arquitectónica busca integrar funcionalidad y calma visual en el espacio cotidiano. La inspiración de Salmo 119:105 conecta la lectura con la idea de orientación. Base curva con apoyo para libro abierto en azul tinta y arena.',
      en: 'A stand conceived to support Bible reading and study at home. Its architectural geometry brings function and visual calm into everyday spaces. Inspired by Psalm 119:105, it connects reading with guidance. Curved support for an open book in ink blue and sand.',
    },
    biblicalReference: {
      citation: {
        es: 'Salmo 119:105 · Josué 1:8',
        en: 'Psalm 119:105 · Joshua 1:8',
      },
      verseText: {
        es: '«Lámpara es a mis pies tu palabra, y lumbrera a mi camino.»',
        en: '“Your word is a lamp to my feet and a light to my path.”',
      },
    },
    behindTheMeaning: {
      headline: {
        es: 'Un espacio para detenerse y escuchar.',
        en: 'A place to pause and reflect.',
      },
      story: {
        es: 'Cuando un libro permanece cerrado en un estante, es fácil postergar el momento de abrirlo. Un soporte pensado para facilitar la lectura y el estudio de la Biblia en casa. Su geometría arquitectónica busca integrar funcionalidad y calma visual en el espacio cotidiano. La inspiración de Salmo 119:105 conecta la lectura con la idea de orientación diaria.',
        en: 'When a book stays closed on a shelf, it is easy to put off opening it. A stand conceived to support Bible reading and study at home. Its architectural geometry brings function and visual calm into everyday spaces. Inspired by Psalm 119:105, it connects reading with daily guidance.',
      },
      designNote: {
        es: 'Base curva con apoyo para libro abierto, nervaduras estructurales de refuerzo, combinación azul tinta y arena con apoyos antideslizantes integrados.',
        en: 'Curved support for an open book with structural reinforcement ribs, ink blue and sand combination with integrated anti-slip pads.',
      },
      values: [
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/bible.svg',
          label: { es: 'Lectura', en: 'Reading' },
        },
        {
          iconPath: '/icons/meaning-values/04_everyday_life/study.svg',
          label: { es: 'Atención', en: 'Focus' },
        },
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/guidance.svg',
          label: { es: 'Reflexión', en: 'Reflection' },
        },
      ],
    },
    specs: {
      materials: {
        es: 'Biopolímero PLA o PETG de alta resistencia mediante FDM con apoyos antideslizantes integrados.',
        en: 'High-strength PLA or PETG biopolymer via FDM with integrated anti-slip pads.',
      },
      dimensions: {
        es: '21 × 14 × 12 cm',
        en: '21 × 14 × 12 cm',
      },
      weight: '210 g',
      care: {
        es: 'Limpiar con paño suave ligeramente humedecido. Mantener alejado de fuentes de calor directo y no sobrecargar con pesos excesivos.',
        en: 'Wipe with a soft slightly damp cloth. Keep away from direct heat sources and do not overload.',
      },
      packaging: {
        es: 'Caja de cartón rígido INHAND con protecciones interiores y guía de uso y lectura.',
        en: 'Rigid INHAND cardboard box with protective inserts and reading guide.',
      },
    },
  },

  // =========================================================================
  // 05 · MARCAPÁGINAS TU PALABRA.
  // =========================================================================
  {
    id: 'prod-bookmark',
    sku: 'IH-PAG-001',
    slug: 'marcapaginas-tu-palabra',
    categorySlug: 'libros-y-papeleria',
    categoryEditorial: 'Pages',
    name: {
      es: 'Marcapáginas Tu Palabra.',
      en: 'Your Word. Bookmark',
    },
    shortDescriptor: {
      es: 'Marcapáginas bíblico · Impresión 3D',
      en: 'Scripture bookmark · 3D printing',
    },
    priceEur: 12,
    featuredInFirstDrop: true,
    badge: {
      es: 'First Drop',
      en: 'First Drop',
    },
    images: {
      main: '/images/products/marcapaginas-tu-palabra/01_main.jpg',
      angle: '/images/products/marcapaginas-tu-palabra/02_angle.jpg',
      detail: '/images/products/marcapaginas-tu-palabra/03_detail.jpg',
      inhand: '/images/products/marcapaginas-tu-palabra/04_inhand.jpg',
      box: '/images/products/marcapaginas-tu-palabra/05_box.jpg',
      lifestyle: '/images/products/marcapaginas-tu-palabra/06_lifestyle.jpg',
    },
    variants: [
      {
        id: 'bookmark-sand',
        name: {
          es: 'Arena + azul + borla coral',
          en: 'Sand + blue + coral tassel',
        },
        colorHex: '#F3E7DE',
        accentHex: '#FC6C21',
        inStock: true,
      },
      {
        id: 'bookmark-blue',
        name: {
          es: 'Azul tinta + arena',
          en: 'Ink blue + sand',
        },
        colorHex: '#2638A5',
        accentHex: '#F3E7DE',
        inStock: true,
      },
    ],
    description: {
      es: 'Un marcapáginas diseñado para acompañar Biblias, devocionales y lecturas personales. El mensaje «Tu palabra guía mi camino» se inspira en Salmo 119:105 y propone una pausa significativa cada vez que se abre el libro. Silueta delgada con extremo redondeado, cruz integrada, grafismo azul y borla coral.',
      en: 'A bookmark made to accompany Bibles, devotionals and personal reading. The message “Your word guides my path” is inspired by Psalm 119:105, creating a meaningful pause whenever a book is opened. Slim rounded shape with integrated cross, blue graphic detail and coral tassel.',
    },
    biblicalReference: {
      citation: {
        es: 'Salmo 119:105',
        en: 'Psalm 119:105',
      },
      verseText: {
        es: '«Lámpara es a mis pies tu palabra, y lumbrera a mi camino.»',
        en: '“Your word is a lamp to my feet and a light to my path.”',
      },
    },
    behindTheMeaning: {
      headline: {
        es: 'Un pequeño recordatorio entre páginas.',
        en: 'A small reminder between the pages.',
      },
      story: {
        es: 'Un marcapáginas diseñado para acompañar Biblias, devocionales y lecturas personales. El mensaje «Tu palabra guía mi camino» se inspira en Salmo 119:105 y propone una pausa significativa cada vez que se abre el libro para escuchar la voz de Dios.',
        en: 'A bookmark made to accompany Bibles, devotionals and personal reading. The message “Your word guides my path” is inspired by Psalm 119:105, creating a meaningful pause whenever a book is opened to hear the voice of God.',
      },
      designNote: {
        es: 'Silueta delgada con extremo redondeado de 2 mm de grosor que no deforma las páginas de la Biblia, cruz integrada, grafismo serigrafiado en azul tinta y borla textil coral rematada a mano.',
        en: 'Slim rounded profile with 2 mm thickness that respects delicate Bible paper, integrated cross, ink blue graphics, and hand-finished coral textile tassel.',
      },
      values: [
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/path.svg',
          label: { es: 'Guía', en: 'Guidance' },
        },
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/bible.svg',
          label: { es: 'Palabra', en: 'Scripture' },
        },
        {
          iconPath: '/icons/meaning-values/01_faith_spirituality/light.svg',
          label: { es: 'Luz y reflexión', en: 'Light & Reflection' },
        },
      ],
    },
    specs: {
      materials: {
        es: 'Lámina fina de biopolímero PLA flexible impresa en 3D de alta precisión, cordón trenzado y borla textil coral.',
        en: 'High-precision 3D-printed flexible PLA biopolymer blade, braided cord, and coral textile tassel.',
      },
      dimensions: {
        es: '14,5 × 3,5 × 0,2 cm',
        en: '14.5 × 3.5 × 0.2 cm',
      },
      weight: '16 g',
      care: {
        es: 'Limpiar en seco con paño suave. Evitar doblar bruscamente y no exponer a calor elevado superior a 50 °C.',
        en: 'Dry clean with a soft cloth. Avoid sharp bending and exposure to heat above 50 °C.',
      },
      packaging: {
        es: 'Tarjeta soporte editorial INHAND con stamping y funda protectora transparente.',
        en: 'Editorial INHAND backing card with subtle foil stamping and transparent protective sleeve.',
      },
    },
  },
];

export const FREE_SHIPPING_THRESHOLD_EUR = 50;
export const STANDARD_SHIPPING_EUR = 4.9;
export const VAT_RATE_SPAIN = 0.21;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
