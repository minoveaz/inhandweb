import React from 'react';
import { useLocale } from '../context/LocaleContext';
import { STATIC_ROUTES } from '../config/routes';
import { SeoHead } from '../components/organisms/SeoHead';
import { Card, Badge, Button } from '../components/ui';

export const OurStory: React.FC = () => {
  const { locale, t } = useLocale();
  const routeMeta = STATIC_ROUTES.story;

  return (
    <>
      <SeoHead
        title={routeMeta.title[locale]}
        description={routeMeta.description[locale]}
        image="/images/brand/story-oil-vessel.jpg"
      />

      {/* Editorial Hero */}
      <section className="ih-gradient-editorial ih-with-grain border-b border-ih-border py-16 sm:py-24">
        <div className="ih-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <Badge tone="accent" showSymbol={false}>
                {t.story.eyebrow}
              </Badge>
              <h1 className="ds-display font-bold">
                {t.story.title}
              </h1>
              <p className="text-base sm:text-lg text-ih-muted leading-relaxed">
                {t.story.subtitle}
              </p>

              <Card className="border-l-4 border-l-ih-coral p-6 space-y-2">
                <p className="text-sm sm:text-base font-display italic text-ih-cobalt leading-relaxed">
                  {t.story.verseQuote}
                </p>
                <cite className="block not-italic text-xs font-bold uppercase tracking-widest text-ih-muted">
                  {t.story.verseRef}
                </cite>
              </Card>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-card overflow-hidden border border-ih-border aspect-[16/11] bg-ih-raised">
                <img
                  src="/images/brand/story-oil-vessel.jpg"
                  alt="2 Kings 4:2 — Oil Vessel & Hands"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-16 sm:py-24 ih-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-card overflow-hidden border border-ih-border aspect-[16/11] bg-ih-raised">
              <img
                src="/images/brand/story-collection.jpg"
                alt="INHAND Collection & Editorial Craft"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <h2 className="ds-heading font-bold">
              {t.story.originTitle}
            </h2>
            <p className="text-sm sm:text-base text-ih-text leading-relaxed">
              {t.story.originP1}
            </p>
            <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
              {t.story.originP2}
            </p>
            <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
              {t.story.originP3}
            </p>
          </div>
        </div>
      </section>

      {/* 3 Guiding Principles */}
      <section className="py-16 sm:py-24 bg-ih-soft/55 border-y border-ih-border">
        <div className="ih-container">
          <div className="max-w-2xl space-y-2 mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
              {t.story.principlesEyebrow}
            </span>
            <h2 className="ds-heading font-bold">
              {t.story.principlesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.story.principles.map((p) => (
              <Card
                key={p.number}
                className="p-7 space-y-3"
              >
                <span className="text-sm font-bold text-ih-coral block">
                  {p.number}
                </span>
                <h3 className="text-xl font-display text-ih-cobalt">{p.title}</h3>
                <p className="text-sm text-ih-muted leading-relaxed">
                  {p.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Brand Values */}
      <section className="py-16 sm:py-24 ih-container">
        <div className="max-w-2xl space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
            {t.story.valuesEyebrow}
          </span>
          <h2 className="ds-heading font-bold">
            {t.story.valuesTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.story.values.map((val) => (
            <Card
              key={val.title}
              className="p-6 space-y-4"
            >
              <div className="w-12 h-12 rounded-card bg-ih-sand flex items-center justify-center">
                <img src={val.icon} alt={val.title} className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-display text-ih-cobalt">
                {val.title}
              </h3>
              <p className="text-xs sm:text-sm text-ih-muted leading-relaxed">
                {val.desc}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button
            to={STATIC_ROUTES.shop.paths[locale]}
            variant="primary"
            size="lg"
            className="px-8"
          >
            <span>{t.hero.primaryCta}</span>
            <span>→</span>
          </Button>
        </div>
      </section>
    </>
  );
};
