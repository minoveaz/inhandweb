import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLocale } from '../context/LocaleContext';
import { STATIC_ROUTES, SITE_URL, getProductPath } from '../config/routes';
import { PRODUCTS, CATEGORIES } from '../config/products';
import { ProductCard } from '../components/molecules/ProductCard';
import { SeoHead } from '../components/organisms/SeoHead';
import {
  SearchField,
  FilterChip,
  SortSelect,
  ResultCount,
  EmptyState,
} from '../components/ui';

export const Shop: React.FC = () => {
  const { locale, t } = useLocale();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';
  const query = searchParams.get('q') || '';
  const sortBy = searchParams.get('sort') || 'featured';

  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(updates)) {
      if (!v || v === 'all' || v === 'featured') {
        next.delete(k);
      } else {
        next.set(k, v);
      }
    }
    setSearchParams(next);
  };

  const filteredProducts = useMemo(() => {
    const qLower = query.trim().toLowerCase();

    const matches = PRODUCTS.filter((p) => {
      const catMatch =
        activeCategory === 'all' ||
        p.categorySlug === activeCategory ||
        p.categoryEditorial.toLowerCase() === activeCategory.toLowerCase();

      if (!catMatch) return false;
      if (!qLower) return true;

      return (
        p.name[locale].toLowerCase().includes(qLower) ||
        p.shortDescriptor[locale].toLowerCase().includes(qLower) ||
        p.description[locale].toLowerCase().includes(qLower) ||
        p.biblicalReference.citation[locale].toLowerCase().includes(qLower) ||
        p.sku.toLowerCase().includes(qLower)
      );
    });

    if (sortBy === 'price-asc') {
      return [...matches].sort((a, b) => a.priceEur - b.priceEur);
    }
    if (sortBy === 'price-desc') {
      return [...matches].sort((a, b) => b.priceEur - a.priceEur);
    }
    return matches;
  }, [activeCategory, query, sortBy, locale]);

  const sortOptions =
    locale === 'es'
      ? [
          { value: 'featured', label: 'Recomendados' },
          { value: 'price-asc', label: 'Precio: menor a mayor' },
          { value: 'price-desc', label: 'Precio: mayor a menor' },
        ]
      : [
          { value: 'featured', label: 'Featured' },
          { value: 'price-asc', label: 'Price: low to high' },
          { value: 'price-desc', label: 'Price: high to low' },
        ];

  const hasActiveFilters = activeCategory !== 'all' || Boolean(query.trim());

  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: STATIC_ROUTES.shop.title[locale],
    description: STATIC_ROUTES.shop.description[locale],
    url: `${SITE_URL}${STATIC_ROUTES.shop.paths[locale]}`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PRODUCTS.map((product, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        url: `${SITE_URL}${getProductPath(locale, product.slug)}`,
        name: product.name[locale],
      })),
    },
  };

  return (
    <>
      <SeoHead
        title={STATIC_ROUTES.shop.title[locale]}
        description={STATIC_ROUTES.shop.description[locale]}
        jsonLd={collectionJsonLd}
      />

      {/* Header Banner + SearchField & FilterChips (Slide 16: Shared URL query state) */}
      <section className="ih-gradient-warm-cream border-b border-ih-border py-12 sm:py-16">
        <div className="ih-container space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-ih-coral block">
                {t.shop.eyebrow}
              </span>
              <h1 className="ds-heading font-bold">{t.shop.title}</h1>
              <p className="text-sm sm:text-base text-ih-muted leading-relaxed">
                {t.shop.subtitle}
              </p>
            </div>

            {/* SearchField (Slide 16) */}
            <SearchField
              value={query}
              onChange={(val) => updateParams({ q: val })}
              placeholder={
                locale === 'es'
                  ? 'Buscar por nombre, versículo o SKU...'
                  : 'Search by name, verse, or SKU...'
              }
              className="w-full lg:w-80"
            />
          </div>

          {/* FilterChip Bar: Natural wrap, zero horizontal scrollbar */}
          <div
            className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1"
            role="group"
            aria-label="Category filters"
          >
            <FilterChip
              label={t.shop.filterAll}
              selected={activeCategory === 'all'}
              onSelect={() => updateParams({ category: 'all' })}
            />
            {CATEGORIES.map((cat) => (
              <FilterChip
                key={cat.id}
                label={cat.name[locale]}
                selected={activeCategory === cat.slug}
                onSelect={() => updateParams({ category: cat.slug })}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Catalog Grid + ResultCount + SortSelect (Slide 16) */}
      <section className="ih-container py-12 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <ResultCount
            count={filteredProducts.length}
            label={t.shop.itemsCount}
            onClearFilters={
              hasActiveFilters
                ? () => setSearchParams({})
                : undefined
            }
            clearLabel={locale === 'es' ? 'Limpiar filtros ×' : 'Clear filters ×'}
          />

          <SortSelect
            value={sortBy}
            onChange={(val) => updateParams({ sort: val })}
            options={sortOptions}
            label={locale === 'es' ? 'Ordenar' : 'Sort'}
          />
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* EmptyState (Slide 25) */
          <EmptyState
            icon="⌕"
            title={t.shop.comingSoonCategoryTitle}
            description={t.shop.comingSoonCategoryBody}
            actionLabel={t.shop.notifyCategoryCta}
            onAction={() => setSearchParams({})}
          />
        )}
      </section>

      {/* 4 Brand Benefit Promises (`04_benefit` icons) */}
      <section className="bg-ih-soft/55 border-t border-ih-border py-14 sm:py-20">
        <div className="ih-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.shop.benefits.map((b) => (
              <div key={b.title} className="ds-card p-6 space-y-3">
                <div className="w-11 h-11 rounded-control bg-ih-cream border border-ih-border flex items-center justify-center">
                  <img src={b.icon} alt={b.title} className="w-6 h-6" />
                </div>
                <h3 className="text-base font-display text-ih-cobalt">{b.title}</h3>
                <p className="text-xs text-ih-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
