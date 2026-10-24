import { Locale } from './routes';

export const DICTIONARY: Record<Locale, {
  nav: {
    shop: string;
    ourStory: string;
    forCommunities: string;
    contact: string;
    cart: string;
    freeShippingBanner: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    scrollHint: string;
    featurePill: string;
  };
  home: {
    firstDropCode: string;
    firstDropTitle: string;
    firstDropSubtitle: string;
    viewAllProducts: string;
    categoriesCode: string;
    categoriesTitle: string;
    categoriesSubtitle: string;
    purposeCode: string;
    purposeTitle: string;
    purposeBody1: string;
    purposeBody2: string;
    purposeCta: string;
    pillars: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    meaningCode: string;
    meaningTitle: string;
    meaningBody1: string;
    meaningBody2: string;
    meaningVerseRef: string;
    meaningVerseText: string;
    meaningCta: string;
    communitiesCode: string;
    communitiesTitle: string;
    communitiesBody: string;
    communitiesBullets: string[];
    communitiesCta: string;
    newsletterCode: string;
    newsletterTitle: string;
    newsletterBody: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
    newsletterSuccess: string;
    newsletterDisclaimer: string;
  };
  shop: {
    eyebrow: string;
    title: string;
    subtitle: string;
    filterAll: string;
    itemsCount: string;
    comingSoonCategoryTitle: string;
    comingSoonCategoryBody: string;
    notifyCategoryCta: string;
    addToCart: string;
    addedToCart: string;
    viewDetails: string;
    benefits: Array<{
      title: string;
      desc: string;
      icon: string;
    }>;
  };
  product: {
    backToShop: string;
    skuLabel: string;
    taxIncluded: string;
    selectColor: string;
    quantity: string;
    addToBag: string;
    buyNowCheckout: string;
    freeShippingNotice: string;
    behindTheMeaningEyebrow: string;
    behindTheMeaningTitle: string;
    symbolismTitle: string;
    dimensionsLabel: string;
    materialsLabel: string;
    careLabel: string;
    shippingTitle: string;
    shippingDesc: string;
    relatedEyebrow: string;
    relatedTitle: string;
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyDesc: string;
    exploreFirstDrop: string;
    freeShippingUnlocked: string;
    freeShippingRemainingPrefix: string;
    freeShippingRemainingSuffix: string;
    subtotal: string;
    shipping: string;
    shippingFree: string;
    taxIncludedNote: string;
    proceedToCheckout: string;
    pciSecurityBadge: string;
    remove: string;
  };
  checkout: {
    eyebrow: string;
    title: string;
    subtitle: string;
    pciNoticeTitle: string;
    pciNoticeBody: string;
    step1Title: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    province: string;
    country: string;
    notes: string;
    step2Title: string;
    gatewayStripeTitle: string;
    gatewayStripeSubtitle: string;
    gatewayStripeBadges: string[];
    gatewayRedsysTitle: string;
    gatewayRedsysSubtitle: string;
    gatewayRedsysBadges: string[];
    bizumToggleLabel: string;
    summaryTitle: string;
    subtotal: string;
    taxBase: string;
    vat21: string;
    shipping: string;
    free: string;
    total: string;
    payWithStripe: string;
    payWithRedsys: string;
    payWithBizum: string;
    redirectingTitle: string;
    redirectingDesc: string;
    successTitle: string;
    successSubtitle: string;
    orderReference: string;
    gatewayUsed: string;
    backToStore: string;
  };
  story: {
    eyebrow: string;
    title: string;
    subtitle: string;
    verseQuote: string;
    verseRef: string;
    originTitle: string;
    originP1: string;
    originP2: string;
    originP3: string;
    principlesEyebrow: string;
    principlesTitle: string;
    principles: Array<{
      number: string;
      title: string;
      desc: string;
    }>;
    valuesEyebrow: string;
    valuesTitle: string;
    values: Array<{
      title: string;
      desc: string;
      icon: string;
    }>;
  };
  communities: {
    eyebrow: string;
    title: string;
    subtitle: string;
    useCasesTitle: string;
    useCases: Array<{
      title: string;
      desc: string;
      tag: string;
    }>;
    processTitle: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    formTitle: string;
    formSubtitle: string;
    orgName: string;
    contactName: string;
    email: string;
    projectType: string;
    projectTypes: string[];
    estimatedUnits: string;
    message: string;
    submitButton: string;
    successMessage: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    subtitle: string;
    directEmailLabel: string;
    studioLocationLabel: string;
    studioLocationValue: string;
    hoursLabel: string;
    hoursValue: string;
    formTitle: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    sendButton: string;
    sentSuccess: string;
    faqTitle: string;
    faqs: Array<{
      q: string;
      a: string;
    }>;
  };
  footer: {
    tagline: string;
    navigate: string;
    categories: string;
    legal: string;
    privacy: string;
    cookies: string;
    terms: string;
    paymentSecurity: string;
    copyright: string;
    sparklightCredit: string;
  };
}> = {
  es: {
    nav: {
      shop: 'Tienda',
      ourStory: 'Nuestra Historia',
      forCommunities: 'Para Comunidades',
      contact: 'Contacto',
      cart: 'Carrito',
      freeShippingBanner: 'FIRST DROP DISPONIBLE · ENVÍO GRATUITO EN ESPAÑA PENINSULAR DESDE 50 €',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    hero: {
      eyebrow: 'FIRST DROP · COLECCIÓN 01',
      headline: 'DESIGNED WITH FAITH.',
      subheadline:
        'Objetos cotidianos creados con fe, belleza contemporánea e intención para acompañar tu hogar, tu lectura y los momentos que importan.',
      primaryCta: 'Explorar Tienda',
      secondaryCta: 'Descubrir la Historia',
      scrollHint: 'Desliza para explorar la colección',
      featurePill: 'Inspirado en 2 Reyes 4:2 — «¿Qué tienes en tu mano?»',
    },
    home: {
      firstDropCode: '01 / FIRST DROP',
      firstDropTitle: 'Cinco objetos iniciales. Una misma intención.',
      firstDropSubtitle:
        'Nuestra primera edición limitada une tipografía escultórica, arquitectura para la lectura, textil pesado y detalles que convierten lo cotidiano en un recordatorio visible.',
      viewAllProducts: 'Ver toda la colección',
      categoriesCode: 'UNIVERSO DE PRODUCTO',
      categoriesTitle: 'Seis territorios pensados para la vida diaria',
      categoriesSubtitle:
        'INHAND nace con una arquitectura abierta: desde piezas de presencia para el hogar hasta ediciones especiales para iglesias y comunidades.',
      purposeCode: '02 / OUR PURPOSE',
      purposeTitle: 'More Than Just Things.',
      purposeBody1:
        'Vivimos rodeados de objetos rápidos que ocupan espacio pero rara vez aportan sentido. En INHAND creemos que lo que tocamos y vemos cada día modela silenciosamente nuestra atención.',
      purposeBody2:
        'Por eso diseñamos objetos donde la fe no se añade como una pegatina superficial, sino que inspira la proporción, el material, el color y la palabra.',
      purposeCta: 'Leer nuestro manifiesto',
      pillars: [
        {
          title: 'Faith-Rooted',
          description:
            'Cada pieza nace de una verdad bíblica concreta, pensada para acompañar la vida real con naturalidad y reverencia.',
          icon: '/icons/meaning-values/01_faith_spirituality/cross.svg',
        },
        {
          title: 'Thoughtfully Designed',
          description:
            'Geometría serena, tipografía editorial y materiales duraderos que dialogan con la arquitectura y el hogar contemporáneo.',
          icon: '/icons/meaning-values/04_everyday_life/creativity.svg',
        },
        {
          title: 'Made to Share',
          description:
            'Empaquetado cuidado de colección, listo para bendecir una casa nueva, celebrar un bautismo o acompañar a tu comunidad.',
          icon: '/icons/meaning-values/03_community_relationships/sharing.svg',
        },
      ],
      meaningCode: '03 / BEHIND THE MEANING',
      meaningTitle: 'Every design has a story.',
      meaningBody1:
        'Antes de producir un objeto, estudiamos el pasaje bíblico, la forma táctil en mano y cómo envejecerá sobre una mesa de madera, un escritorio de estudio o el bolso de cada día.',
      meaningBody2:
        'Nuestro nombre proviene de la pregunta del profeta Eliseo en 2 Reyes 4:2: «¿Qué tienes en tu mano?». Dios sigue multiplicando lo pequeño y cotidiano cuando se entrega con propósito.',
      meaningVerseRef: '2 Reyes 4:2 · RVR1960',
      meaningVerseText: '«¿Qué tienes en casa? ¿Qué tienes en tu mano?»',
      meaningCta: 'Conocer el proceso de diseño',
      communitiesCode: '04 / FOR COMMUNITIES',
      communitiesTitle: 'Faith is Better Together.',
      communitiesBody:
        'Colaboramos con iglesias, conferencias, retiros y ministerios para diseñar objetos y packs personalizados que los asistentes quieran conservar mucho después del evento.',
      communitiesBullets: [
        'Packs de bienvenida y gratitud para servidores y voluntarios',
        'Ediciones personalizadas para conferencias, retiros y bautismos',
        'Precios por volumen y acompañamiento de diseño desde 25 unidades',
      ],
      communitiesCta: 'Solicitar propuesta para mi comunidad',
      newsletterCode: '05 / JOIN THE STORY',
      newsletterTitle: 'Recibe los próximos lanzamientos antes que nadie.',
      newsletterBody:
        'Enviamos pocas cartas: notas de estudio, nuevas piezas del catálogo e historias detrás de cada diseño.',
      newsletterPlaceholder: 'Tu correo electrónico',
      newsletterButton: 'Unirme a la lista',
      newsletterSuccess: '¡Gracias por sumarte! Te hemos añadido a la lista prioritaria de INHAND.',
      newsletterDisclaimer: 'Sin spam. Puedes darte de baja en cualquier momento con un clic.',
    },
    shop: {
      eyebrow: 'CATÁLOGO OFICIAL · FIRST DROP',
      title: 'Objetos diseñados para permanecer.',
      subtitle:
        'Explora los 5 objetos inaugurales de INHAND o filtra por las 6 categorías de nuestro sistema de producto.',
      filterAll: 'Todos (5)',
      itemsCount: 'piezas mostradas',
      comingSoonCategoryTitle: 'Próximos objetos en desarrollo para esta categoría',
      comingSoonCategoryBody:
        'Esta categoría forma parte de los 6 territorios oficiales de INHAND. Estamos finalizando los prototipos de nuestro Segundo Drop.',
      notifyCategoryCta: 'Ver las 5 piezas del First Drop',
      addToCart: 'Añadir a la bolsa',
      addedToCart: 'Añadido',
      viewDetails: 'Ver pieza',
      benefits: [
        {
          title: 'Significado en cada pieza',
          desc: 'Cada objeto incluye su referencia bíblica e historia impresa en el packaging.',
          icon: '/icons/04_benefit/purpose-driven.svg',
        },
        {
          title: 'Listo para regalar',
          desc: 'Caja editorial con sello INHAND y acabados limpios, sin plásticos innecesarios.',
          icon: '/icons/04_benefit/premium-quality.svg',
        },
        {
          title: 'Pago 100% cifrado',
          desc: 'Stripe Checkout y Redsys TPV Virtual (Tarjeta y Bizum) sin guardar tarjetas en la web.',
          icon: '/icons/04_benefit/secure-payment.svg',
        },
        {
          title: 'Envío desde España',
          desc: 'Entrega en 48–72h laborables en Península y envío gratuito a partir de 50 €.',
          icon: '/icons/04_benefit/free-shipping.svg',
        },
      ],
    },
    product: {
      backToShop: 'Volver a la tienda',
      skuLabel: 'REF.',
      taxIncluded: 'IVA (21%) incluido · Envío calculado en el checkout',
      selectColor: 'Acabado / Color',
      quantity: 'Cantidad',
      addToBag: 'Añadir al carrito',
      buyNowCheckout: 'Comprar ahora',
      freeShippingNotice: 'Envío gratuito en pedidos desde 50 € · Devolución en 14 días naturales',
      behindTheMeaningEyebrow: 'BEHIND THE MEANING',
      behindTheMeaningTitle: 'Por qué existe este objeto',
      symbolismTitle: 'Valores y simbolismo de la pieza',
      dimensionsLabel: 'Dimensiones y peso',
      materialsLabel: 'Materiales y proceso',
      careLabel: 'Cuidado y conservación',
      shippingTitle: 'Envío y presentación',
      shippingDesc:
        'Se entrega en su estuche protector INHAND. Preparación en 24h laborables y entrega en 48–72h en España peninsular.',
      relatedEyebrow: 'COMPLETA EL CONJUNTO',
      relatedTitle: 'Otras piezas del First Drop',
    },
    cart: {
      title: 'Tu Carrito INHAND',
      emptyTitle: 'Tu carrito está vacío',
      emptyDesc: 'Explora las 5 piezas del First Drop y añade los objetos que quieras llevar a casa o regalar.',
      exploreFirstDrop: 'Explorar First Drop',
      freeShippingUnlocked: '¡Tienes envío gratuito en España peninsular!',
      freeShippingRemainingPrefix: 'Te faltan ',
      freeShippingRemainingSuffix: ' para disfrutar de envío gratuito.',
      subtotal: 'Subtotal (IVA incl.)',
      shipping: 'Envío estimado',
      shippingFree: 'Gratis',
      taxIncludedNote: 'El desglose de base imponible e IVA (21%) se muestra en el siguiente paso.',
      proceedToCheckout: 'Tramitar Pedido Seguro',
      pciSecurityBadge: 'Pago redirigido a Stripe o Redsys (Bizum / Tarjeta) · Cero datos de tarjeta almacenados',
      remove: 'Eliminar',
    },
    checkout: {
      eyebrow: 'CHECKOUT SEGURO · PCI-DSS COMPLIANT',
      title: 'Finalizar Pedido',
      subtitle:
        'Introduce tus datos de entrega y elige tu pasarela bancaria preferida. Nunca solicitamos ni almacenamos números de tarjeta en esta web.',
      pciNoticeTitle: 'Arquitectura de Privacidad Bancaria (Cero almacenamiento de tarjetas)',
      pciNoticeBody:
        'Al confirmar tus datos de envío, serás redirigido de forma segura a la sesión oficial alojada por Stripe (Tarjeta, Apple Pay, Google Pay) o al TPV Virtual Redsys (Bancos de España y Bizum) con firma HMAC-SHA256.',
      step1Title: '1. Datos de contacto y dirección de envío',
      firstName: 'Nombre',
      lastName: 'Apellidos',
      email: 'Correo electrónico (para recibo y seguimiento)',
      phone: 'Teléfono móvil (para avisos del transportista / Bizum)',
      address: 'Dirección completa (calle, número, piso, puerta)',
      city: 'Ciudad / Localidad',
      postalCode: 'Código Postal',
      province: 'Provincia',
      country: 'País',
      notes: 'Notas para el envío o dedicatoria de regalo (opcional)',
      step2Title: '2. Selecciona la pasarela de pago oficial',
      gatewayStripeTitle: 'Stripe Checkout (Internacional y Wallets)',
      gatewayStripeSubtitle:
        'Redirección a sesión alojada de Stripe. Compatible con Visa, Mastercard, American Express, Apple Pay y Google Pay.',
      gatewayStripeBadges: ['Visa / Mastercard', 'Apple Pay', 'Google Pay'],
      gatewayRedsysTitle: 'Redsys TPV Virtual (España · Tarjeta y Bizum)',
      gatewayRedsysSubtitle:
        'Pasarela bancaria española con autenticación 3D Secure 2.0 y pago instantáneo desde el móvil con Bizum.',
      gatewayRedsysBadges: ['TPV Bancario España', 'Bizum Instantáneo', '3D Secure 2'],
      bizumToggleLabel: 'Pagar directamente con Bizum en Redsys',
      summaryTitle: 'Resumen del Pedido',
      subtotal: 'Subtotal productos',
      taxBase: 'Base imponible',
      vat21: 'IVA incluido (21% España)',
      shipping: 'Gastos de envío',
      free: 'Gratis',
      total: 'Total a pagar',
      payWithStripe: 'Ir a pasarela segura Stripe',
      payWithRedsys: 'Ir al TPV Virtual Redsys',
      payWithBizum: 'Pagar con Bizum en Redsys',
      redirectingTitle: 'Conectando con la pasarela bancaria cifrada...',
      redirectingDesc:
        'Estamos preparando el payload firmado de tu pedido sin almacenar datos de tarjeta en INHAND.',
      successTitle: '¡Gracias por tu pedido en INHAND!',
      successSubtitle:
        'Hemos registrado correctamente la autorización de la pasarela de pago. Recibirás un correo con el resumen y el código de seguimiento en cuanto salga de nuestro estudio.',
      orderReference: 'Referencia de pedido',
      gatewayUsed: 'Pasarela autorizada',
      backToStore: 'Volver a la tienda',
    },
    story: {
      eyebrow: 'NUESTRA HISTORIA · MADE TO MEAN MORE',
      title: '¿Qué tienes en tu mano?',
      subtitle:
        'INHAND nace de una pregunta bíblica sencilla pero transformadora en 2 Reyes 4:2: Dios no empieza con lo que nos falta, sino con lo que ya ha puesto en nuestras manos.',
      verseQuote:
        '«Y Eliseo le dijo: ¿Qué te haré yo? Declárame qué tienes en casa. Y ella dijo: Tu sierva ninguna cosa tiene en casa, sino una vasija de aceite.»',
      verseRef: '2 Reyes 4:2',
      originTitle: 'Fe tangible en medio de una cultura efímera',
      originP1:
        'Durante años sentimos una brecha: por un lado, el diseño contemporáneo ofrecía objetos bellos pero vacíos de trascendencia; por otro, muchos productos cristianos repetían fórmulas visuales anticuadas que no encajaban en los hogares ni en el lenguaje estético actual.',
      originP2:
        'INHAND nace para tender ese puente. Diseñamos objetos cotidianos —una escultura sobre la estantería, el atril donde abres las Escrituras cada mañana, la bolsa que te acompaña por la ciudad— donde la forma, el material y el mensaje caminan juntos.',
      originP3:
        'No creamos amuletos ni objetos de consumo rápido: creamos recordatorios silenciosos de gracia, fe y propósito pensados para abrir conversaciones en casa y bendecir a quienes más quieres.',
      principlesEyebrow: 'PRINCIPIOS RECTORES',
      principlesTitle: 'Tres convicciones que guían cada colección',
      principles: [
        {
          number: '01',
          title: 'La fe expresada con excelencia estética',
          desc: 'Creemos que la belleza, el orden tipográfico y la nobleza de los materiales honran al Creador y hacen que el mensaje perdure.',
        },
        {
          number: '02',
          title: 'Significado antes que volumen',
          desc: 'Preferimos lanzar colecciones cortas (Drops) donde cada pieza tenga una razón de ser clara, un versículo raíz y un acabado honesto.',
        },
        {
          number: '03',
          title: 'De la mano personal a la comunidad',
          desc: 'Cada objeto está pensado tanto para el rincón devocional personal como para ser regalado y compartido en comunidad.',
        },
      ],
      valuesEyebrow: 'VALORES DE MARCA',
      valuesTitle: 'Los cuatro pilares de INHAND',
      values: [
        {
          title: 'Propósito',
          desc: 'Nada es meramente decorativo: cada curva, palabra y proporción apunta a una verdad eterna.',
          icon: '/icons/meaning-values/01_faith_spirituality/purpose.svg',
        },
        {
          title: 'Artesanía Contemporánea',
          desc: 'Combinamos fabricación aditiva de precisión, madera natural, textil orgánico y acabados manuales.',
          icon: '/icons/meaning-values/04_everyday_life/creativity.svg',
        },
        {
          title: 'Cercanía y Calidez',
          desc: 'Hablamos con un tono sereno, acogedor y luminoso, lejos del ruido comercial agresivo.',
          icon: '/icons/meaning-values/01_faith_spirituality/grace.svg',
        },
        {
          title: 'Comunidad',
          desc: 'Caminamos junto a iglesias locales, creativos y familias para servir sus momentos clave.',
          icon: '/icons/meaning-values/03_community_relationships/community.svg',
        },
      ],
    },
    communities: {
      eyebrow: 'B2B · IGLESIAS, MINISTERIOS Y EVENTOS',
      title: 'Diseñamos objetos con propósito para tu comunidad.',
      subtitle:
        'Ayudamos a iglesias, conferencias, retiros y organizaciones a reemplazar el merchandising genérico por piezas que la gente realmente guarda en casa.',
      useCasesTitle: 'Cómo colaboramos con comunidades',
      useCases: [
        {
          title: 'Packs de Bienvenida y Bautismos',
          desc: 'Cajas curadas con marcapáginas grabados, llaveros y tarjetas con el versículo anual de tu iglesia.',
          tag: 'Desde 25 uds.',
        },
        {
          title: 'Conferencias y Retiros',
          desc: 'Tote bags de alto gramaje y objetos conmemorativos adaptados a la identidad visual de tu conferencia.',
          tag: 'Edición Especial',
        },
        {
          title: 'Gratitud para Servidores y Líderes',
          desc: 'Esculturas tipográficas y soportes para Biblia con grabado personalizado para agradecer años de servicio.',
          tag: 'Regalo Institucional',
        },
      ],
      processTitle: 'Un proceso claro en 3 pasos',
      steps: [
        {
          step: '01',
          title: 'Cuéntanos vuestra visión y fecha',
          desc: 'Completa el formulario con el tipo de encuentro, unidades aproximadas y el mensaje o pasaje bíblico central.',
        },
        {
          step: '02',
          title: 'Propuesta visual y muestras',
          desc: 'En 48 horas preparamos una propuesta con opciones de personalización, paleta de color y presupuesto cerrado por tramos.',
        },
        {
          step: '03',
          title: 'Producción cuidada y entrega puntual',
          desc: 'Fabricamos, empaquetamos individualmente y enviamos directamente a vuestra sede o lugar del evento.',
        },
      ],
      formTitle: 'Solicitar propuesta para comunidades',
      formSubtitle: 'Sin compromiso. Respondemos en menos de 24–48 horas laborables.',
      orgName: 'Nombre de la iglesia, ministerio u organización',
      contactName: 'Persona de contacto',
      email: 'Correo electrónico',
      projectType: 'Tipo de proyecto',
      projectTypes: [
        'Conferencia o evento especial',
        'Regalo para servidores / voluntarios',
        'Packs de bienvenida / Bautismos',
        'Personalización de productos del catálogo',
        'Otro proyecto a medida',
      ],
      estimatedUnits: 'Unidades estimadas (ej. 50 unidades)',
      message: 'Cuéntanos qué tenéis en mente y para qué fecha lo necesitáis',
      submitButton: 'Enviar solicitud a nuestro estudio',
      successMessage:
        '¡Solicitud recibida! Nuestro equipo de proyectos para comunidades te responderá muy pronto con una propuesta.',
    },
    contact: {
      eyebrow: 'ATENCIÓN AL CLIENTE Y ESTUDIO',
      title: 'Estamos aquí para ayudarte.',
      subtitle:
        'Ya sea para consultar el estado de un pedido, resolver una duda sobre materiales o proponer una colaboración, nos encantará leerte.',
      directEmailLabel: 'Correo directo',
      studioLocationLabel: 'Estudio y envíos',
      studioLocationValue: 'Madrid, España · Envíos a toda España y Unión Europea',
      hoursLabel: 'Horario de atención',
      hoursValue: 'Lunes a Viernes · 9:30 a 18:30 (CET)',
      formTitle: 'Envíanos un mensaje',
      nameLabel: 'Tu nombre',
      emailLabel: 'Tu correo electrónico',
      subjectLabel: 'Asunto',
      messageLabel: 'Mensaje',
      sendButton: 'Enviar mensaje',
      sentSuccess: 'Mensaje enviado correctamente. Te responderemos en menos de 24 horas laborables.',
      faqTitle: 'Preguntas Frecuentes',
      faqs: [
        {
          q: '¿Cuánto tardan los envíos en España y Europa?',
          a: 'Preparamos cada pedido en 24h laborables. El envío estándar en España peninsular tarda entre 48 y 72 horas laborables (gratuito a partir de 50 €). Para Baleares y resto de la UE, entre 4 y 6 días laborables.',
        },
        {
          q: '¿Guardáis los datos de mi tarjeta de crédito en la web?',
          a: 'Nunca. INHAND utiliza exclusivamente redirección segura a Stripe Checkout y al TPV Virtual Redsys (Tarjeta y Bizum). Los datos bancarios se introducen directamente en la pasarela cifrada de la entidad financiera.',
        },
        {
          q: '¿Puedo devolver un producto o enviarlo directamente como regalo?',
          a: 'Sí. Dispones de 14 días naturales desde la recepción para solicitar cambio o devolución. Además, todas las piezas viajan en caja de presentación lista para regalar sin mostrar precios en el interior si lo indicas en las notas.',
        },
      ],
    },
    footer: {
      tagline: 'Objetos cotidianos diseñados con fe, belleza y propósito. Inspirados en 2 Reyes 4:2.',
      navigate: 'Navegación',
      categories: 'Categorías',
      legal: 'Legal y Privacidad',
      privacy: 'Política de Privacidad',
      cookies: 'Política de Cookies',
      terms: 'Condiciones de Venta y Devoluciones',
      paymentSecurity: 'Pagos 100% cifrados vía Stripe & Redsys (Bizum) · Sin almacenamiento de tarjetas',
      copyright: '© 2026 INHAND. Todos los derechos reservados.',
      sparklightCredit: 'Una iniciativa impulsada junto a SparkLight.',
    },
  },
  en: {
    nav: {
      shop: 'Shop',
      ourStory: 'Our Story',
      forCommunities: 'For Communities',
      contact: 'Contact',
      cart: 'Cart',
      freeShippingBanner: 'FIRST DROP LIVE · FREE SHIPPING IN MAINLAND SPAIN ON ORDERS OVER €50',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    hero: {
      eyebrow: 'FIRST DROP · COLLECTION 01',
      headline: 'DESIGNED WITH FAITH.',
      subheadline:
        'Everyday objects crafted with faith, contemporary beauty, and intention to accompany your home, your reading, and the moments that matter.',
      primaryCta: 'Shop the Drop',
      secondaryCta: 'Read Our Story',
      scrollHint: 'Scroll to explore the collection',
      featurePill: 'Inspired by 2 Kings 4:2 — "What do you have in your hand?"',
    },
    home: {
      firstDropCode: '01 / FIRST DROP',
      firstDropTitle: 'Five inaugural objects. One shared intention.',
      firstDropSubtitle:
        'Our first limited edition brings together sculptural typography, architectural reading stands, heavyweight canvas, and everyday tokens that turn daily routines into tangible reminders.',
      viewAllProducts: 'View full collection',
      categoriesCode: 'PRODUCT UNIVERSE',
      categoriesTitle: 'Six territories designed for daily life',
      categoriesSubtitle:
        'INHAND is built on an open product architecture: from sculptural home pieces to custom editions for churches and communities.',
      purposeCode: '02 / OUR PURPOSE',
      purposeTitle: 'More Than Just Things.',
      purposeBody1:
        'We live surrounded by disposable objects that take up space yet rarely carry meaning. At INHAND we believe what we touch and see every day quietly shapes our attention.',
      purposeBody2:
        'That is why we design objects where faith is never an afterthought sticker, but the foundation that informs proportion, material, color, and word.',
      purposeCta: 'Read our manifesto',
      pillars: [
        {
          title: 'Faith-Rooted',
          description:
            'Every piece grows out of a specific biblical truth, crafted to inhabit real life with warmth and reverence.',
          icon: '/icons/meaning-values/01_faith_spirituality/cross.svg',
        },
        {
          title: 'Thoughtfully Designed',
          description:
            'Calm geometry, editorial typography, and enduring materials that belong naturally in a contemporary home.',
          icon: '/icons/meaning-values/04_everyday_life/creativity.svg',
        },
        {
          title: 'Made to Share',
          description:
            'Collector-grade packaging ready to bless a new home, celebrate a baptism, or encourage your community.',
          icon: '/icons/meaning-values/03_community_relationships/sharing.svg',
        },
      ],
      meaningCode: '03 / BEHIND THE MEANING',
      meaningTitle: 'Every design has a story.',
      meaningBody1:
        'Before producing an object, we study the biblical passage, how it feels in the hand, and how it will live on a wooden table, a study desk, or your daily commute.',
      meaningBody2:
        'Our name comes from Elisha’s question in 2 Kings 4:2: "What do you have in your hand?". God still multiplies the small and ordinary when it is placed in His hands with purpose.',
      meaningVerseRef: '2 Kings 4:2 · ESV',
      meaningVerseText: '"Tell me, what do you have in the house? What is in your hand?"',
      meaningCta: 'Explore our design story',
      communitiesCode: '04 / FOR COMMUNITIES',
      communitiesTitle: 'Faith is Better Together.',
      communitiesBody:
        'We partner with churches, conferences, retreats, and ministries to design custom objects and welcome kits people actually keep long after the event ends.',
      communitiesBullets: [
        'Welcome & gratitude kits for volunteers and ministry teams',
        'Custom editions for conferences, retreats, and baptisms',
        'Tiered volume pricing and design guidance starting at 25 units',
      ],
      communitiesCta: 'Request a community proposal',
      newsletterCode: '05 / JOIN THE STORY',
      newsletterTitle: 'Receive upcoming drops before anyone else.',
      newsletterBody:
        'We send thoughtful, infrequent letters: studio notes, new catalog releases, and the stories behind every object.',
      newsletterPlaceholder: 'Your email address',
      newsletterButton: 'Join the list',
      newsletterSuccess: 'Thank you for joining! You are now on the INHAND priority list.',
      newsletterDisclaimer: 'No spam. Unsubscribe anytime with a single click.',
    },
    shop: {
      eyebrow: 'OFFICIAL CATALOG · FIRST DROP',
      title: 'Objects designed to stay.',
      subtitle:
        'Explore the 5 inaugural pieces of the INHAND First Drop or browse across our 6 core product categories.',
      filterAll: 'All (5)',
      itemsCount: 'pieces shown',
      comingSoonCategoryTitle: 'Upcoming objects in development for this category',
      comingSoonCategoryBody:
        'This category is part of the 6 official INHAND territories. Our studio is currently prototyping pieces for Drop 02.',
      notifyCategoryCta: 'View the 5 First Drop pieces',
      addToCart: 'Add to bag',
      addedToCart: 'Added',
      viewDetails: 'View piece',
      benefits: [
        {
          title: 'Meaning in every piece',
          desc: 'Every object includes its biblical reference and story printed on the packaging.',
          icon: '/icons/04_benefit/purpose-driven.svg',
        },
        {
          title: 'Ready to gift',
          desc: 'Editorial presentation box with the INHAND seal and plastic-free protection.',
          icon: '/icons/04_benefit/premium-quality.svg',
        },
        {
          title: '100% encrypted checkout',
          desc: 'Hosted Stripe Checkout & Redsys TPV Virtual (Card & Bizum) with zero card storage.',
          icon: '/icons/04_benefit/secure-payment.svg',
        },
        {
          title: 'Ships from Spain',
          desc: '48–72h delivery in Spain (free over €50) and tracked shipping across the EU.',
          icon: '/icons/04_benefit/free-shipping.svg',
        },
      ],
    },
    product: {
      backToShop: 'Back to shop',
      skuLabel: 'SKU',
      taxIncluded: '21% VAT included · Shipping calculated at checkout',
      selectColor: 'Finish / Colorway',
      quantity: 'Quantity',
      addToBag: 'Add to Cart',
      buyNowCheckout: 'Buy Now',
      freeShippingNotice: 'Free shipping on orders over €50 · 14-day hassle-free returns',
      behindTheMeaningEyebrow: 'BEHIND THE MEANING',
      behindTheMeaningTitle: 'Why this object exists',
      symbolismTitle: 'Piece values & symbolism',
      dimensionsLabel: 'Dimensions & weight',
      materialsLabel: 'Materials & craft',
      careLabel: 'Care instructions',
      shippingTitle: 'Shipping & presentation',
      shippingDesc:
        'Delivered in its protective INHAND collector box. Dispatched within 24 business hours from Madrid.',
      relatedEyebrow: 'COMPLETE THE SET',
      relatedTitle: 'More from the First Drop',
    },
    cart: {
      title: 'Your INHAND Cart',
      emptyTitle: 'Your cart is empty',
      emptyDesc: 'Explore the 5 pieces from our First Drop and add the objects you want to bring home or gift.',
      exploreFirstDrop: 'Explore First Drop',
      freeShippingUnlocked: 'You have unlocked free shipping in mainland Spain!',
      freeShippingRemainingPrefix: 'Add ',
      freeShippingRemainingSuffix: ' more for free shipping.',
      subtotal: 'Subtotal (VAT incl.)',
      shipping: 'Estimated shipping',
      shippingFree: 'Free',
      taxIncludedNote: 'Full net tax base and 21% VAT breakdown is shown at checkout.',
      proceedToCheckout: 'Proceed to Secure Checkout',
      pciSecurityBadge: 'Redirected to Stripe or Redsys (Bizum / Card) · Zero card data stored',
      remove: 'Remove',
    },
    checkout: {
      eyebrow: 'SECURE CHECKOUT · PCI-DSS COMPLIANT',
      title: 'Complete Your Order',
      subtitle:
        'Enter your delivery details and choose your preferred banking gateway. We never ask for or store credit card numbers on this website.',
      pciNoticeTitle: 'Zero-Card-Storage Privacy Architecture',
      pciNoticeBody:
        'Once you confirm your shipping details, you are safely redirected to an official hosted session by Stripe (Card, Apple Pay, Google Pay) or Redsys TPV Virtual (Spanish Banks & Bizum) with HMAC-SHA256 signature.',
      step1Title: '1. Contact & shipping address',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address (for receipt & tracking)',
      phone: 'Mobile phone (for courier updates / Bizum)',
      address: 'Street address, apartment, suite',
      city: 'City / Town',
      postalCode: 'Postal code',
      province: 'Province / State',
      country: 'Country',
      notes: 'Delivery notes or gift message (optional)',
      step2Title: '2. Choose your official payment gateway',
      gatewayStripeTitle: 'Stripe Checkout (International Cards & Wallets)',
      gatewayStripeSubtitle:
        'Hosted Stripe Checkout redirect. Supports Visa, Mastercard, American Express, Apple Pay, and Google Pay.',
      gatewayStripeBadges: ['Visa / Mastercard', 'Apple Pay', 'Google Pay'],
      gatewayRedsysTitle: 'Redsys TPV Virtual (Spain · Card & Bizum)',
      gatewayRedsysSubtitle:
        'Official Spanish banking gateway with 3D Secure 2.0 authentication and instant mobile payment via Bizum.',
      gatewayRedsysBadges: ['Spanish Banking TPV', 'Instant Bizum', '3D Secure 2'],
      bizumToggleLabel: 'Pay directly with Bizum on Redsys',
      summaryTitle: 'Order Summary',
      subtotal: 'Items subtotal',
      taxBase: 'Net tax base',
      vat21: 'Included VAT (21% Spain)',
      shipping: 'Shipping',
      free: 'Free',
      total: 'Total due',
      payWithStripe: 'Continue to Secure Stripe Checkout',
      payWithRedsys: 'Continue to Redsys Banking TPV',
      payWithBizum: 'Pay with Bizum via Redsys',
      redirectingTitle: 'Connecting to encrypted banking gateway...',
      redirectingDesc:
        'Preparing your signed order payload without storing any card information on INHAND.',
      successTitle: 'Thank you for your INHAND order!',
      successSubtitle:
        'Your payment gateway authorization has been recorded. You will receive an email receipt and tracking link as soon as your parcel leaves our studio.',
      orderReference: 'Order reference',
      gatewayUsed: 'Authorized gateway',
      backToStore: 'Return to shop',
    },
    story: {
      eyebrow: 'OUR STORY · MADE TO MEAN MORE',
      title: 'What do you have in your hand?',
      subtitle:
        'INHAND was born from a simple yet transformative biblical question in 2 Kings 4:2: God does not start with what we lack, but with what He has already placed in our hands.',
      verseQuote:
        '"And Elisha said to her, What shall I do for you? Tell me; what have you in the house? And she said, Your servant has nothing in the house except a jar of oil."',
      verseRef: '2 Kings 4:2',
      originTitle: 'Tangible faith in an ephemeral culture',
      originP1:
        'For years we noticed a divide: contemporary design offered beautiful objects emptied of transcendence, while many Christian products relied on dated visual tropes that felt disconnected from modern homes and aesthetics.',
      originP2:
        'INHAND exists to bridge that gap. We design everyday objects—a typographic sculpture on a shelf, the stand where you open Scripture each morning, the canvas bag you carry through the city—where form, material, and message belong together.',
      originP3:
        'We do not make trinkets or fast-consumption novelties; we craft quiet reminders of grace, faith, and purpose designed to spark conversations at home and bless the people you love.',
      principlesEyebrow: 'GUIDING PRINCIPLES',
      principlesTitle: 'Three convictions behind every drop',
      principles: [
        {
          number: '01',
          title: 'Faith expressed with aesthetic excellence',
          desc: 'We believe beauty, typographic order, and honest materials honor the Creator and help the message endure.',
        },
        {
          number: '02',
          title: 'Meaning over volume',
          desc: 'We release focused drops where every single object has a clear reason to exist, a root verse, and lasting craft.',
        },
        {
          number: '03',
          title: 'From personal devotion to shared community',
          desc: 'Every piece is designed both for your personal quiet space and to be gifted and shared in community.',
        },
      ],
      valuesEyebrow: 'BRAND VALUES',
      valuesTitle: 'The four pillars of INHAND',
      values: [
        {
          title: 'Purpose',
          desc: 'Nothing is merely decorative: every curve, word, and proportion points to an enduring truth.',
          icon: '/icons/meaning-values/01_faith_spirituality/purpose.svg',
        },
        {
          title: 'Contemporary Craft',
          desc: 'We pair precision additive manufacturing, natural wood, organic cotton canvas, and hand finishing.',
          icon: '/icons/meaning-values/04_everyday_life/creativity.svg',
        },
        {
          title: 'Warmth & Grace',
          desc: 'We speak in a calm, welcoming, and luminous tone—far from aggressive commercial noise.',
          icon: '/icons/meaning-values/01_faith_spirituality/grace.svg',
        },
        {
          title: 'Community',
          desc: 'We walk alongside local churches, creatives, and families to serve their defining moments.',
          icon: '/icons/meaning-values/03_community_relationships/community.svg',
        },
      ],
    },
    communities: {
      eyebrow: 'B2B · CHURCHES, MINISTRIES & EVENTS',
      title: 'Purposeful objects designed for your community.',
      subtitle:
        'We help churches, conferences, retreats, and ministries replace disposable merch with meaningful objects people keep at home.',
      useCasesTitle: 'How we partner with communities',
      useCases: [
        {
          title: 'Welcome & Baptism Kits',
          desc: 'Curated boxes with engraved bookmarks, keychains, and cards featuring your church’s annual verse.',
          tag: 'From 25 units',
        },
        {
          title: 'Conferences & Retreats',
          desc: 'Heavyweight organic totes and commemorative objects tailored to your conference visual identity.',
          tag: 'Custom Edition',
        },
        {
          title: 'Volunteer & Leader Gratitude',
          desc: 'Typographic sculptures and architectural Bible stands honoring years of faithful service.',
          tag: 'Leadership Gift',
        },
      ],
      processTitle: 'A clear 3-step process',
      steps: [
        {
          step: '01',
          title: 'Share your vision and timeline',
          desc: 'Fill out the brief with your gathering type, estimated quantity, and core biblical passage or theme.',
        },
        {
          step: '02',
          title: 'Visual proposal & sampling',
          desc: 'Within 48 hours we prepare a tailored deck with customization options, colorways, and volume pricing.',
        },
        {
          step: '03',
          title: 'Crafted production & on-time delivery',
          desc: 'We produce, individually box, and ship directly to your church campus or event venue.',
        },
      ],
      formTitle: 'Request a community proposal',
      formSubtitle: 'No obligation. Our studio replies within 24–48 business hours.',
      orgName: 'Church, ministry, or organization name',
      contactName: 'Contact person',
      email: 'Email address',
      projectType: 'Project type',
      projectTypes: [
        'Conference or special event',
        'Volunteer / leadership appreciation gift',
        'Welcome / Baptism kits',
        'Custom colorway of catalog products',
        'Other custom project',
      ],
      estimatedUnits: 'Estimated quantity (e.g., 50 units)',
      message: 'Tell us what you have in mind and your target delivery date',
      submitButton: 'Send inquiry to our studio',
      successMessage:
        'Inquiry received! Our community projects team will get back to you shortly with a tailored proposal.',
    },
    contact: {
      eyebrow: 'CUSTOMER CARE & STUDIO',
      title: 'We would love to hear from you.',
      subtitle:
        'Whether you have a question about an order, materials, or a creative collaboration, our studio team is here to help.',
      directEmailLabel: 'Direct email',
      studioLocationLabel: 'Studio & fulfillment',
      studioLocationValue: 'Madrid, Spain · Shipping across Spain & the European Union',
      hoursLabel: 'Studio hours',
      hoursValue: 'Monday to Friday · 9:30 AM – 6:30 PM (CET)',
      formTitle: 'Send us a message',
      nameLabel: 'Your name',
      emailLabel: 'Your email address',
      subjectLabel: 'Subject',
      messageLabel: 'Message',
      sendButton: 'Send message',
      sentSuccess: 'Message sent! Our team will reply within 24 business hours.',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'How long does shipping take within Spain and Europe?',
          a: 'Orders are prepared within 24 business hours. Standard shipping in mainland Spain takes 48–72 business hours (free on orders over €50). EU deliveries take 4–6 business days.',
        },
        {
          q: 'Do you store my credit card details on your website?',
          a: 'Never. INHAND relies exclusively on hosted redirects to Stripe Checkout and Redsys TPV Virtual (Card & Bizum). Sensitive payment credentials are entered strictly on the bank’s encrypted gateway.',
        },
        {
          q: 'Can I return an item or send an order directly as a gift?',
          a: 'Yes. You have 14 calendar days from delivery to request an exchange or return. Every item ships in a gift-ready collector box without pricing inside if you leave a gift note at checkout.',
        },
      ],
    },
    footer: {
      tagline: 'Everyday objects designed with faith, beauty, and purpose. Inspired by 2 Kings 4:2.',
      navigate: 'Explore',
      categories: 'Categories',
      legal: 'Legal & Privacy',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Policy',
      terms: 'Terms of Sale & Returns',
      paymentSecurity: '100% Encrypted Checkout via Stripe & Redsys (Bizum) · Zero Card Storage',
      copyright: '© 2026 INHAND. All rights reserved.',
      sparklightCredit: 'An initiative developed in partnership with SparkLight.',
    },
  },
};
