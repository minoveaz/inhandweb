import React, { useState } from 'react';
import { useLocale } from '../context/LocaleContext';
import { STATIC_ROUTES } from '../config/routes';
import { PRODUCTS, CATEGORIES } from '../config/products';
import { ProductCard } from '../components/molecules/ProductCard';
import { SeoHead } from '../components/organisms/SeoHead';
import { Button, Badge, Card, Link, Alert } from '../components/ui';

export const Home: React.FC = () => {
  const { locale, t } = useLocale();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const routeMeta = STATIC_ROUTES.home;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <>
      <SeoHead
        title={routeMeta.title[locale]}
        description={routeMeta.description[locale]}
        image="/images/brand/hero-still-life.jpg"
      />

      {/* =====================================================================
          SECTION 00: HERO — DESIGNED WITH FAITH.
      ===================================================================== */}
      <section className="relative overflow-hidden ih-gradient-editorial ih-with-grain border-b border-ih-border">
        <div className="ih-container py-12 sm:py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Editorial Column */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <Badge tone="accent" showSymbol={false} className="py-1.5 px-4 text-[11px] tracking-[0.16em]">
                  <span className="w-2 h-2 rounded-pill bg-ih-coral mr-1.5 inline-block" />
                  {t.hero.eyebrow}
                </Badge>
              </div>

              <h1 className="ds-display font-bold tracking-tight">
                {t.hero.headline}
              </h1>

              <p className="text-base sm:text-lg text-ih-muted max-w-xl leading-relaxed">
                {t.hero.subheadline}
              </p>

              {/* Root verse card */}
              <Card className="inline-flex items-center gap-2.5 text-xs font-medium text-ih-cobalt px-4 py-2.5">
                <img
                  src="/icons/meaning-values/01_faith_spirituality/bible.svg"
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
                <span>{t.hero.featurePill}</span>
              </Card>

              {/* Dual CTAs (Slide 01 & 08: Primary Blue #092B8B + Secondary Outlined #FFFAF3, radius 4px) */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  to={STATIC_ROUTES.shop.paths[locale]}
                  variant="primary"
                  size="lg"
                >
                  <span>{t.hero.primaryCta}</span>
                  <span>→</span>
                </Button>

                <Button
                  to={STATIC_ROUTES.story.paths[locale]}
                  variant="secondary"
                  size="lg"
                >
                  <span>{t.hero.secondaryCta}</span>
                </Button>
              </div>
            </div>

            {/* Right Still-Life Composition */}
            <div className="lg:col-span-6">
              <div className="relative rounded-card overflow-hidden border border-ih-border bg-ih-raised aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/images/brand/hero-still-life.jpg"
                  alt="INHAND First Drop — Still Life"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto bg-ih-raised/95 backdrop-blur-md border border-ih-border rounded-card px-4 py-3 flex items-center gap-3">
                  <img
                    src="/logos/02_isotipo_a/inhand-a-tight.svg"
                    alt="INHAND Isotype"
                    className="w-7 h-7"
                  />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ih-coral">
                      FIRST DROP · 01–05
                    </p>
                    <p className="text-xs font-bold text-ih-cobalt">
                      MADE TO MEAN MORE.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 01: 01 / FIRST DROP (5 Inaugural Products)
      ===================================================================== */}
      <section className="py-16 sm:py-24 ih-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
              {t.home.firstDropCode}
            </span>
            <h2 className="ds-heading font-bold">
              {t.home.firstDropTitle}
            </h2>
            <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
              {t.home.firstDropSubtitle}
            </p>
          </div>

          <Link
            to={STATIC_ROUTES.shop.paths[locale]}
            className="text-sm font-bold text-ih-cobalt shrink-0"
          >
            <span>{t.home.viewAllProducts}</span>
            <span>→</span>
          </Link>
        </div>

        {/* 5-product editorial grid + 6th Editorial Curated Drop Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* 6th slot: Brand Primary Card (#092B8B per Slide 02) */}
          <Card className="!bg-ih-cobalt text-ih-on-action p-8 flex flex-col justify-between relative overflow-hidden border-ih-cobalt">
            <div className="space-y-4 relative z-10">
              <Badge tone="accent" showSymbol={false} className="!bg-ih-salmon !text-ih-cobalt !border-transparent">
                DROP 01 · EDICIÓN COMPLETA
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-display leading-tight text-ih-on-action">
                MADE TO MEAN MORE.
              </h3>
              <p className="text-sm text-ih-on-action/90 leading-relaxed">
                {locale === 'es'
                  ? 'Cada objeto de esta primera colección viene con su referencia bíblica e historia impresa en su caja de presentación lista para regalar.'
                  : 'Every object in this inaugural drop ships in its collector presentation box with its root Scripture reference.'}
              </p>
            </div>

            <div className="pt-8 relative z-10 flex items-center justify-between">
              <Button
                to={STATIC_ROUTES.shop.paths[locale]}
                variant="secondary"
              >
                <span>{t.home.viewAllProducts}</span>
                <span>→</span>
              </Button>
              <img
                src="/logos/05_monograma_ih/ih-arena.svg"
                alt="IH"
                className="h-9 w-auto opacity-90"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* =====================================================================
          SECTION 01B: THE 6 BRAND CATEGORIES (Product Universe)
      ===================================================================== */}
      <section className="py-16 sm:py-24 bg-ih-soft/55 border-y border-ih-border">
        <div className="ih-container">
          <div className="max-w-2xl space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
              {t.home.categoriesCode}
            </span>
            <h2 className="ds-heading font-bold">
              {t.home.categoriesTitle}
            </h2>
            <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
              {t.home.categoriesSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                to={`${STATIC_ROUTES.shop.paths[locale]}?category=${category.slug}`}
                className="group block"
              >
                <Card interactive className="p-6 flex items-start gap-4 h-full">
                  <div className="w-12 h-12 rounded-card bg-ih-sand flex items-center justify-center shrink-0">
                    <img
                      src={category.iconPath}
                      alt={category.name[locale]}
                      className="w-7 h-7"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-ih-coral block">
                      {category.number} · {category.editorialName}
                    </span>
                    <h3 className="text-lg font-display text-ih-cobalt group-hover:underline">
                      {category.name[locale]}
                    </h3>
                    <p className="text-xs text-ih-muted leading-relaxed">
                      {category.description[locale]}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 02: 02 / OUR PURPOSE — MORE THAN JUST THINGS.
      ===================================================================== */}
      <section className="py-16 sm:py-24 ih-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
              {t.home.purposeCode}
            </span>
            <h2 className="ds-heading font-bold">
              {t.home.purposeTitle}
            </h2>
            <p className="text-base text-ih-text leading-relaxed">
              {t.home.purposeBody1}
            </p>
            <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
              {t.home.purposeBody2}
            </p>
            <div className="pt-2">
              <Button
                to={STATIC_ROUTES.story.paths[locale]}
                variant="secondary"
              >
                <span>{t.home.purposeCta}</span>
                <span>→</span>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-card overflow-hidden border border-ih-border aspect-[16/10] bg-ih-raised">
              <img
                src="/images/brand/purpose-arch.jpg"
                alt="INHAND Purpose — More Than Just Things"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Value Pillars with Meaning & Values Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.home.pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="p-7 space-y-4"
            >
              <div className="w-12 h-12 rounded-card bg-ih-sand flex items-center justify-center">
                <img src={pillar.icon} alt={pillar.title} className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-display text-ih-cobalt">
                {pillar.title}
              </h3>
              <p className="text-sm text-ih-muted leading-relaxed">
                {pillar.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 03: 03 / BEHIND THE MEANING — EVERY DESIGN HAS A STORY.
      ===================================================================== */}
      <section className="py-16 sm:py-24 ih-gradient-warm-cream border-y border-ih-border">
        <div className="ih-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-card overflow-hidden border border-ih-border aspect-[16/10] bg-ih-raised">
                <img
                  src="/images/brand/meaning-sketchbook.jpg"
                  alt="Behind the Meaning — Sketchbook & Design Process"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
                {t.home.meaningCode}
              </span>
              <h2 className="ds-heading font-bold">
                {t.home.meaningTitle}
              </h2>
              <p className="text-base text-ih-text leading-relaxed">
                {t.home.meaningBody1}
              </p>
              <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
                {t.home.meaningBody2}
              </p>

              <Card className="border-l-4 border-l-ih-coral p-5 space-y-1.5">
                <p className="text-sm sm:text-base font-display italic text-ih-cobalt">
                  {t.home.meaningVerseText}
                </p>
                <cite className="block not-italic text-xs font-bold uppercase tracking-widest text-ih-muted">
                  {t.home.meaningVerseRef}
                </cite>
              </Card>

              <div className="pt-2">
                <Button
                  to={STATIC_ROUTES.story.paths[locale]}
                  variant="primary"
                >
                  <span>{t.home.meaningCta}</span>
                  <span>→</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 04: 04 / FOR COMMUNITIES — FAITH IS BETTER TOGETHER.
      ===================================================================== */}
      <section className="py-16 sm:py-24 ih-container">
        <Card className="p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
              {t.home.communitiesCode}
            </span>
            <h2 className="ds-heading font-bold">
              {t.home.communitiesTitle}
            </h2>
            <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
              {t.home.communitiesBody}
            </p>

            <ul className="space-y-2.5 pt-2">
              {t.home.communitiesBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-2.5 text-sm font-medium text-ih-text"
                >
                  <span className="text-ih-coral font-bold">✓</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button
                to={STATIC_ROUTES.communities.paths[locale]}
                variant="primary"
                size="lg"
              >
                <span>{t.home.communitiesCta}</span>
                <span>→</span>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-card overflow-hidden border border-ih-border aspect-[16/10] bg-ih-cream">
              <img
                src="/images/brand/communities-boxes.jpg"
                alt="INHAND For Communities — Custom Editions & Boxes"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      </section>

      {/* =====================================================================
          SECTION 05: 05 / JOIN THE STORY (Newsletter)
      ===================================================================== */}
      <section className="py-16 sm:py-24 bg-ih-cobalt text-ih-on-action relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center space-y-6 relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-salmon block">
            {t.home.newsletterCode}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-ih-on-action">
            {t.home.newsletterTitle}
          </h2>
          <p className="text-sm sm:text-base text-ih-on-action/85 max-w-xl mx-auto leading-relaxed">
            {t.home.newsletterBody}
          </p>

          {newsletterSubmitted ? (
            <div className="max-w-md mx-auto">
              <Alert tone="success" title="¡Gracias por unirte!">
                {t.home.newsletterSuccess}
              </Alert>
            </div>
          ) : (
            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 pt-2"
            >
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder={t.home.newsletterPlaceholder}
                aria-label={t.home.newsletterPlaceholder}
                className="ds-input flex-1"
              />
              <Button
                type="submit"
                variant="secondary"
                className="shrink-0"
              >
                {t.home.newsletterButton}
              </Button>
            </form>
          )}

          <p className="text-xs text-ih-on-action/75">
            {t.home.newsletterDisclaimer}
          </p>
        </div>
      </section>
    </>
  );
};
