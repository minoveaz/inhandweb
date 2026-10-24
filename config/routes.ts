import { PRODUCTS } from './products';

export type Locale = 'es' | 'en';

export interface RouteDefinition {
  key: string;
  paths: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  indexable?: boolean;
}

export const SITE_URL = 'https://inhand.design';

export const STATIC_ROUTES: Record<string, RouteDefinition> = {
  home: {
    key: 'home',
    paths: {
      es: '/',
      en: '/en',
    },
    title: {
      es: 'INHAND — Objetos Cotidianos y Decoración con Fe, Belleza y Propósito',
      en: 'INHAND — Everyday Objects & Home Decor Designed With Faith & Purpose',
    },
    description: {
      es: 'Objetos físicos diseñados con fe, belleza contemporánea e intención. Esculturas tipográficas, soportes arquitectónicos para Biblia, bolsas de algodón orgánico y detalles cotidianos. Made to Mean More.',
      en: 'Physical objects designed with faith, contemporary beauty, and intention. Typographic sculptures, architectural Bible stands, heavy canvas totes, and everyday details. Made to Mean More.',
    },
    indexable: true,
  },
  shop: {
    key: 'shop',
    paths: {
      es: '/tienda',
      en: '/en/shop',
    },
    title: {
      es: 'Tienda — First Drop & Colección Inicial | INHAND',
      en: 'Shop — First Drop & Initial Collection | INHAND',
    },
    description: {
      es: 'Explora la primera colección (First Drop) de INHAND: objetos de decoración, lectura, papelería y accesorios creados con diseño contemporáneo y significado cristiano.',
      en: 'Explore the INHAND First Drop collection: home objects, reading stands, stationery, and everyday accessories crafted with contemporary design and Christian meaning.',
    },
    indexable: true,
  },
  story: {
    key: 'story',
    paths: {
      es: '/nuestra-historia',
      en: '/en/our-story',
    },
    title: {
      es: 'Nuestra Historia — Inspirados en 2 Reyes 4:2 | INHAND',
      en: 'Our Story — Inspired by 2 Kings 4:2 | INHAND',
    },
    description: {
      es: '«¿Qué tienes en tu mano?» (2 Reyes 4:2). Conoce cómo nace INHAND para unir fe cotidiana, diseño contemporáneo y objetos que permanecen en casa.',
      en: '"What do you have in your hand?" (2 Kings 4:2). Discover how INHAND was born to bring everyday faith, contemporary design, and meaningful objects into your home.',
    },
    indexable: true,
  },
  communities: {
    key: 'communities',
    paths: {
      es: '/para-comunidades',
      en: '/en/for-communities',
    },
    title: {
      es: 'Para Comunidades, Iglesias y Eventos — Proyectos a Medida | INHAND',
      en: 'For Communities, Churches & Events — Custom Editions | INHAND',
    },
    description: {
      es: 'Creamos ediciones especiales, packs de bienvenida y objetos con propósito para iglesias, conferencias, retiros, ministerios y grupos pequeños.',
      en: 'We create custom editions, welcome kits, and purposeful objects for churches, conferences, retreats, ministries, and small groups.',
    },
    indexable: true,
  },
  contact: {
    key: 'contact',
    paths: {
      es: '/contacto',
      en: '/en/contact',
    },
    title: {
      es: 'Contacto y Atención al Cliente | INHAND',
      en: 'Contact & Customer Care | INHAND',
    },
    description: {
      es: '¿Tienes dudas sobre tu pedido, envíos en España y Europa o colaboraciones? Escríbenos y nuestro estudio te responderá en menos de 24h laborables.',
      en: 'Questions about your order, shipping across Spain and Europe, or collaborations? Reach out and our studio will reply within 24 business hours.',
    },
    indexable: true,
  },
  checkout: {
    key: 'checkout',
    paths: {
      es: '/checkout',
      en: '/en/checkout',
    },
    title: {
      es: 'Finalizar Pedido — Pago Seguro Stripe / Redsys | INHAND',
      en: 'Checkout — Secure Payment via Stripe / Redsys | INHAND',
    },
    description: {
      es: 'Finaliza tu compra en INHAND con pasarela cifrada Stripe o Redsys TPV Virtual (Tarjeta y Bizum) sin almacenar datos de tarjeta.',
      en: 'Complete your INHAND order safely with encrypted Stripe or Redsys TPV Virtual (Card & Bizum) checkout without storing card data.',
    },
    indexable: false,
  },
  legal: {
    key: 'legal',
    paths: {
      es: '/legal',
      en: '/en/legal',
    },
    title: {
      es: 'Aviso Legal, Privacidad, Cookies y Condiciones de Venta | INHAND',
      en: 'Legal Notice, Privacy, Cookies & Terms of Sale | INHAND',
    },
    description: {
      es: 'Información legal, política de privacidad RGPD, política de cookies y condiciones de envío y desistimiento de INHAND.',
      en: 'Legal notice, GDPR privacy policy, cookie policy, and shipping & return terms for INHAND.',
    },
    indexable: true,
  },
  designSystem: {
    key: 'designSystem',
    paths: {
      es: '/design-system',
      en: '/en/design-system',
    },
    title: {
      es: 'Design System v0.1 — Tokens & 57 Componentes | INHAND',
      en: 'Design System v0.1 — Tokens & 57 Components | INHAND',
    },
    description: {
      es: 'Catálogo interactivo en React de los fundamentos, tokens semánticos y los 57 componentes (P1–P4) del sistema de diseño de INHAND.',
      en: 'Interactive React catalog of foundations, semantic tokens, and all 57 components (P1–P4) of the INHAND Design System.',
    },
    indexable: false,
  },
};

export function getProductPath(locale: Locale, slug: string): string {
  return locale === 'es' ? `/producto/${slug}` : `/en/product/${slug}`;
}

export function resolveAlternatePath(pathname: string, targetLocale: Locale): string {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  // 1. Check static routes
  for (const route of Object.values(STATIC_ROUTES)) {
    if (route.paths.es === cleanPath || route.paths.en === cleanPath) {
      return route.paths[targetLocale];
    }
  }

  // 2. Check product routes
  const esProductMatch = cleanPath.match(/^\/producto\/([^/]+)$/);
  if (esProductMatch) {
    const currentSlug = esProductMatch[1];
    const product = PRODUCTS.find((p) => p.slug === currentSlug);
    if (product) {
      return getProductPath(targetLocale, product.slug);
    }
  }

  const enProductMatch = cleanPath.match(/^\/en\/product\/([^/]+)$/);
  if (enProductMatch) {
    const currentSlug = enProductMatch[1];
    const product = PRODUCTS.find((p) => p.slug === currentSlug);
    if (product) {
      return getProductPath(targetLocale, product.slug);
    }
  }

  // Default fallback
  return STATIC_ROUTES.home.paths[targetLocale];
}
