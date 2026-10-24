import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS, CATEGORIES } from '../config/products';
import { STATIC_ROUTES, SITE_URL, getProductPath } from '../config/routes';
import { ProductCard } from '../components/molecules/ProductCard';
import { SeoHead } from '../components/organisms/SeoHead';
import {
  Breadcrumb,
  Badge,
  Price,
  Availability,
  VariantSelector,
  QuantityInput,
  Button,
  Accordion,
  Card,
} from '../components/ui';

const SLUG_ALIASES: Record<string, string> = {
  'soporte-arquitectonico-biblia': 'soporte-para-biblia',
  'marcapaginas-salmo-119-105': 'marcapaginas-tu-palabra',
  'llavero-jesus-medallon-ih': 'llavero-jesus',
};

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t, formatPrice } = useLocale();
  const { addItem } = useCart();
  const navigate = useNavigate();

  const resolvedSlug = useMemo(() => {
    if (slug && SLUG_ALIASES[slug]) {
      return SLUG_ALIASES[slug];
    }
    return slug;
  }, [slug]);

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.slug === resolvedSlug);
  }, [resolvedSlug]);

  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    if (slug && SLUG_ALIASES[slug]) {
      navigate(getProductPath(locale, SLUG_ALIASES[slug]), { replace: true });
    }
  }, [slug, locale, navigate]);

  useEffect(() => {
    if (product) {
      setSelectedVariantId(product.variants[0]?.id || '');
      setSelectedImageIdx(0);
      setQuantity(1);
    }
  }, [product]);

  const galleryItems = useMemo(() => {
    if (!product) return [];
    const items = [
      { src: product.images.main, label: locale === 'es' ? 'Frontal' : 'Front' },
      { src: product.images.angle, label: locale === 'es' ? 'Ángulo 3/4' : '3/4 Angle' },
      { src: product.images.detail, label: locale === 'es' ? 'Detalle' : 'Detail' },
      { src: product.images.inhand, label: locale === 'es' ? 'En mano' : 'In Hand' },
      { src: product.images.box, label: locale === 'es' ? 'Packaging' : 'Packaging' },
    ];
    if (product.images.lifestyle) {
      items.push({
        src: product.images.lifestyle,
        label: locale === 'es' ? 'Contexto' : 'Context',
      });
    }
    return items;
  }, [product, locale]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
        setIsZoomed(false);
      } else if (e.key === 'ArrowLeft') {
        setSelectedImageIdx((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
        setIsZoomed(false);
      } else if (e.key === 'ArrowRight') {
        setSelectedImageIdx((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isLightboxOpen, galleryItems.length]);

  if (!product) {
    return <Navigate to={STATIC_ROUTES.shop.paths[locale]} replace />;
  }

  const categoryObj = CATEGORIES.find((c) => c.slug === product.categorySlug);
  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAddToBag = () => {
    addItem(product.id, activeVariant.id, quantity, true);
  };

  const handleBuyNow = () => {
    addItem(product.id, activeVariant.id, quantity, false);
    navigate(STATIC_ROUTES.checkout.paths[locale]);
  };

  const productUrl = `${SITE_URL}${getProductPath(locale, product.slug)}`;
  const productSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'INHAND',
          item: `${SITE_URL}${STATIC_ROUTES.home.paths[locale]}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t.nav.shop,
          item: `${SITE_URL}${STATIC_ROUTES.shop.paths[locale]}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: product.name[locale],
          item: productUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name[locale],
      sku: product.sku,
      description: product.description[locale],
      image: galleryItems.map((g) => `${SITE_URL}${g.src}`),
      brand: {
        '@type': 'Brand',
        name: 'INHAND',
      },
      offers: {
        '@type': 'Offer',
        url: productUrl,
        priceCurrency: 'EUR',
        price: product.priceEur.toFixed(2),
        availability: 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/NewCondition',
      },
    },
  ];

  const breadcrumbItems = [
    { label: locale === 'es' ? 'Inicio' : 'Home', to: STATIC_ROUTES.home.paths[locale] },
    { label: t.nav.shop, to: STATIC_ROUTES.shop.paths[locale] },
    { label: product.name[locale] },
  ];

  const accordionItems = [
    {
      id: 'dimensions',
      title: t.product.dimensionsLabel,
      content: `${product.specs.dimensions[locale]} · ${product.specs.weight}`,
    },
    {
      id: 'materials',
      title: t.product.materialsLabel,
      content: product.specs.materials[locale],
    },
    {
      id: 'care',
      title: t.product.careLabel,
      content: product.specs.care[locale],
    },
    {
      id: 'shipping',
      title: t.product.shippingTitle,
      content: product.specs.packaging[locale],
    },
  ];

  const variantOptions = product.variants.map((v) => ({
    id: v.id,
    label: v.name[locale],
    colorHex: v.colorHex,
    inStock: true,
  }));

  return (
    <>
      <SeoHead
        title={`${product.name[locale]} — ${product.shortDescriptor[locale]} | INHAND`}
        description={product.description[locale]}
        image={product.images.main}
        type="product"
        jsonLd={productSchemas}
      />

      {/* Breadcrumb (Slide 15: Inicio / Colección / Pieza) */}
      <div className="ih-container pt-6 pb-2">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* =====================================================================
          PDP MAIN HERO: MULTI-ANGLE GALLERY + PRODUCT ACTIONS (Slide 26)
      ===================================================================== */}
      <section className="ih-container py-6 sm:py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Interactive Image Frame (Calibrated 4:5 / Responsive Fit) */}
            <div
              onClick={() => {
                setIsLightboxOpen(true);
                setIsZoomed(false);
              }}
              className="relative aspect-[4/5] max-h-[620px] w-full rounded-card overflow-hidden bg-ih-sand/20 border border-ih-border cursor-zoom-in group flex items-center justify-center p-3 sm:p-5 transition-colors hover:bg-ih-sand/30"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsLightboxOpen(true);
                  setIsZoomed(false);
                }
              }}
              aria-label={
                locale === 'es'
                  ? 'Hacer clic para ampliar imagen a pantalla completa'
                  : 'Click to expand image in full-screen zoom'
              }
            >
              <img
                src={galleryItems[selectedImageIdx]?.src || product.images.main}
                alt={`${product.name[locale]} — ${
                  galleryItems[selectedImageIdx]?.label || ''
                }`}
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <Badge tone="accent" showSymbol={false}>
                    {product.badge[locale]}
                  </Badge>
                </div>
              )}

              {/* Floating Zoom Hint Pill */}
              <div className="absolute bottom-4 right-4 z-10 pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-ih-raised/95 border border-ih-border shadow-subtle text-xs font-medium text-ih-navy backdrop-blur-xs">
                  <svg
                    className="w-3.5 h-3.5 text-ih-cobalt"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                  {locale === 'es' ? 'Ver en zoom' : 'Click to zoom'}
                </span>
              </div>
            </div>

            {/* Thumbnail Strip (6 slots for 6 complete shots) */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
              {galleryItems.map((img, idx) => {
                const isSelected = idx === selectedImageIdx;
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`group rounded-card overflow-hidden border transition-all text-left bg-ih-raised ${
                      isSelected
                        ? 'border-ih-cobalt ring-2 ring-ih-focus'
                        : 'border-ih-border opacity-80 hover:opacity-100 hover:border-ih-cobalt/40'
                    }`}
                  >
                    <div className="aspect-square overflow-hidden bg-ih-sand/30 flex items-center justify-center p-1.5">
                      <img
                        src={img.src}
                        alt={img.label}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="px-1 py-1 text-[10px] sm:text-[11px] font-semibold text-ih-text truncate text-center">
                      {img.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: ProductActions Group (Slide 26: Price, Availability, VariantSelector, QuantityInput, Actions) */}
          <Card className="lg:col-span-5 p-6 sm:p-8 space-y-6">
            <div className="space-y-2 border-b border-ih-border pb-5">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ih-coral">
                <span>
                  {categoryObj
                    ? `${categoryObj.editorialName} · ${categoryObj.name[locale]}`
                    : product.categoryEditorial}
                </span>
                <span className="font-mono text-ih-muted">
                  {t.product.skuLabel} {product.sku}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-display text-ih-cobalt leading-tight">
                {product.name[locale]}
              </h1>

              <p className="text-sm text-ih-muted">
                {product.shortDescriptor[locale]}
              </p>

              {/* Price + Availability Badge (Slide 19 & 26) */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-3">
                <Price
                  amountFormatted={formatPrice(product.priceEur)}
                  taxNote={t.product.taxIncluded}
                  size="lg"
                />
                <Availability state="available" locale={locale} />
              </div>
            </div>

            <p className="text-sm sm:text-base text-ih-text leading-relaxed">
              {product.description[locale]}
            </p>

            {/* VariantSelector (Slide 26) */}
            <VariantSelector
              label={t.product.selectColor}
              options={variantOptions}
              selectedId={selectedVariantId}
              onSelect={setSelectedVariantId}
            />

            {/* QuantityInput + Primary & Secondary Actions (Slide 26) */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-bold uppercase tracking-wider text-ih-muted">
                {t.product.quantity}
              </span>
              <div className="flex items-center gap-3">
                <QuantityInput
                  value={quantity}
                  onChange={setQuantity}
                />

                <Button
                  variant="primary"
                  className="flex-1 min-h-control-md"
                  onClick={handleAddToBag}
                >
                  <span>{t.product.addToBag}</span>
                  <span>· {formatPrice(product.priceEur * quantity)}</span>
                </Button>
              </div>

              <Button
                variant="secondary"
                className="w-full min-h-control-md"
                onClick={handleBuyNow}
              >
                {t.product.buyNowCheckout} (Stripe / Redsys / Bizum)
              </Button>

              <p className="ds-helper text-center pt-1">
                {t.product.freeShippingNotice}
              </p>
            </div>

            {/* Accordion (Slide 20: Title contains button and announces aria-expanded) */}
            <div className="pt-2">
              <Accordion items={accordionItems} defaultOpenIds={['dimensions']} />
            </div>
          </Card>
        </div>
      </section>

      {/* =====================================================================
          BEHIND THE MEANING SECTION (Biblical Verse + Meaning & Values Icons)
      ===================================================================== */}
      <section className="py-16 sm:py-24 bg-ih-soft/55 border-y border-ih-border">
        <div className="ih-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
                {t.product.behindTheMeaningEyebrow}
              </span>
              <h2 className="ds-heading font-bold">
                {product.behindTheMeaning.headline[locale]}
              </h2>
              <p className="text-sm sm:text-base text-ih-text leading-relaxed">
                {product.behindTheMeaning.story[locale]}
              </p>
              <p className="text-xs sm:text-sm text-ih-muted leading-relaxed">
                {product.behindTheMeaning.designNote[locale]}
              </p>

              {/* Biblical Citation Blockquote */}
              <Card className="border-l-4 border-l-ih-cobalt p-6 space-y-2">
                <p className="text-base sm:text-lg font-display italic text-ih-cobalt">
                  {product.biblicalReference.verseText[locale]}
                </p>
                <cite className="block not-italic text-xs font-bold uppercase tracking-widest text-ih-coral">
                  {product.biblicalReference.citation[locale]}
                </cite>
              </Card>
            </div>

            {/* Meaning & Values Iconography Card */}
            <div className="lg:col-span-5">
              <Card className="p-6 sm:p-8 space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-ih-cobalt">
                  {t.product.symbolismTitle}
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  {product.behindTheMeaning.values.map((item) => (
                    <div
                      key={item.iconPath}
                      className="rounded-card bg-ih-cream border border-ih-border p-4 flex flex-col items-center text-center gap-2.5"
                    >
                      <img
                        src={item.iconPath}
                        alt={item.label[locale]}
                        className="w-10 h-10"
                      />
                      <span className="text-xs font-bold text-ih-cobalt">
                        {item.label[locale]}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="rounded-card overflow-hidden aspect-[16/10] bg-ih-sand border border-ih-border">
                  <img
                    src={product.images.inhand}
                    alt={`${product.name[locale]} in hand`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          RELATED PRODUCTS FROM FIRST DROP
      ===================================================================== */}
      <section className="py-16 sm:py-24 ih-container">
        <div className="space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
            {t.product.relatedEyebrow}
          </span>
          <h2 className="ds-subheading font-bold">
            {t.product.relatedTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

      {/* Mobile Sticky Add-to-Bag Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-ih-raised/95 backdrop-blur-md border-t border-ih-border px-4 py-3 flex items-center justify-between gap-3 shadow-floating">
        <div className="min-w-0">
          <p className="text-xs font-bold text-ih-text truncate">
            {product.name[locale]}
          </p>
          <p className="text-xs font-bold text-ih-cobalt">
            {formatPrice(product.priceEur)} · {activeVariant.name[locale]}
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleAddToBag}
          className="shrink-0"
        >
          {t.product.addToBag}
        </Button>
      </div>

      {/* =====================================================================
          FULL-SCREEN PRODUCT LIGHTBOX / ZOOM GALLERY
      ===================================================================== */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[100] h-screen h-[100dvh] w-screen overflow-hidden flex flex-col bg-[#081225]/98 backdrop-blur-2xl text-white select-none"
          role="dialog"
          aria-modal="true"
          aria-label={
            locale === 'es'
              ? `Galería en zoom de ${product.name[locale]}`
              : `Zoom gallery for ${product.name[locale]}`
          }
        >
          {/* Top Bar with solid opaque contrast */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-3 bg-[#050C1A] border-b border-white/15 shrink-0 shadow-lg h-14">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-sm font-bold tracking-wide uppercase text-white truncate">
                {product.name[locale]}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#132A55] border border-white/20 text-white font-mono font-bold shrink-0">
                {selectedImageIdx + 1} / {galleryItems.length}
              </span>
              <span className="text-xs text-ih-sand hidden sm:inline truncate font-medium">
                · {galleryItems[selectedImageIdx]?.label}
              </span>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* Zoom toggle button */}
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className="px-3.5 py-1.5 rounded-full bg-[#132A55] hover:bg-[#1A3870] text-white border border-white/20 text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
                title={
                  isZoomed
                    ? locale === 'es'
                      ? 'Ajustar a pantalla'
                      : 'Fit to screen'
                    : locale === 'es'
                    ? 'Zoom 2x'
                    : 'Zoom 2x'
                }
              >
                <svg
                  className="w-4 h-4 text-ih-coral"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isZoomed ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  )}
                </svg>
                <span className="hidden sm:inline">
                  {isZoomed
                    ? locale === 'es'
                      ? 'Ajustar'
                      : 'Fit'
                    : locale === 'es'
                    ? 'Zoom 2x'
                    : 'Zoom 2x'}
                </span>
              </button>

              {/* Close button */}
              <button
                type="button"
                onClick={() => {
                  setIsLightboxOpen(false);
                  setIsZoomed(false);
                }}
                className="h-8 px-4 rounded-full bg-[#132A55] hover:bg-[#B33836] active:scale-95 text-white border border-white/20 flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm"
                aria-label={locale === 'es' ? 'Cerrar visor' : 'Close viewer'}
              >
                <span>✕</span>
                <span className="hidden sm:inline font-mono">Esc</span>
              </button>
            </div>
          </div>

          {/* Center Stage with Prev / Next & Interactive Image (Zero Scrollbars) */}
          <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-2 sm:p-6 overflow-hidden">
            {/* Prev Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIdx((prev) =>
                  prev === 0 ? galleryItems.length - 1 : prev - 1
                );
                setIsZoomed(false);
              }}
              className="absolute left-3 sm:left-6 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050C1A]/90 hover:bg-[#132A55] active:scale-95 text-white border border-white/25 flex items-center justify-center transition-all shadow-2xl focus:outline-none focus:ring-2 focus:ring-ih-coral"
              aria-label={locale === 'es' ? 'Imagen anterior' : 'Previous image'}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Clickable Image Container - Strictly overflow-hidden, no scrollbar */}
            <div
              className={`w-full h-full flex items-center justify-center overflow-hidden ${
                isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={galleryItems[selectedImageIdx]?.src}
                alt={galleryItems[selectedImageIdx]?.label}
                className={`max-h-full max-w-full object-contain rounded-md shadow-2xl transition-transform duration-300 select-none ${
                  isZoomed
                    ? 'scale-[1.75] origin-center'
                    : 'scale-100 hover:scale-[1.01]'
                }`}
              />
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIdx((prev) =>
                  prev === galleryItems.length - 1 ? 0 : prev + 1
                );
                setIsZoomed(false);
              }}
              className="absolute right-3 sm:right-6 z-30 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#050C1A]/90 hover:bg-[#132A55] active:scale-95 text-white border border-white/25 flex items-center justify-center transition-all shadow-2xl focus:outline-none focus:ring-2 focus:ring-ih-coral"
              aria-label={locale === 'es' ? 'Imagen siguiente' : 'Next image'}
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Bottom Thumbnails Dock (Fixed height, no vertical overflow) */}
          <div className="px-4 py-2.5 bg-[#050C1A] border-t border-white/15 shrink-0 h-20 flex justify-center items-center gap-2.5 sm:gap-3.5 overflow-x-auto overflow-y-hidden shadow-lg">
            {galleryItems.map((item, idx) => {
              const isSelected = idx === selectedImageIdx;
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => {
                    setSelectedImageIdx(idx);
                    setIsZoomed(false);
                  }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 p-1 flex items-center justify-center ${
                    isSelected
                      ? 'border-ih-coral ring-2 ring-ih-coral/50 scale-105 shadow-2xl bg-white/20'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50 bg-white/5 hover:scale-105'
                  }`}
                  aria-label={`${item.label} (${idx + 1} de ${galleryItems.length})`}
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-contain"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
