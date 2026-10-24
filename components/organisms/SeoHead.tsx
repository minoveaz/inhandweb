import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocale } from '../../context/LocaleContext';
import { SITE_URL, resolveAlternatePath } from '../../config/routes';

interface SeoHeadProps {
  title: string;
  description: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  image = '/images/brand/hero-still-life.jpg',
  type = 'website',
  noindex = false,
  jsonLd,
}) => {
  const { locale } = useLocale();
  const location = useLocation();

  const cleanPath = location.pathname.replace(/\/+$/, '') || '/';
  const canonicalUrl = `${SITE_URL}${cleanPath}`;
  const esPath = resolveAlternatePath(cleanPath, 'es');
  const enPath = resolveAlternatePath(cleanPath, 'en');
  const esUrl = `${SITE_URL}${esPath}`;
  const enUrl = `${SITE_URL}${enPath}`;
  const absoluteImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;
  const robotsContent = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large';

  const baseOrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'INHAND',
    alternateName: 'INHAND — Made to Mean More.',
    url: SITE_URL,
    logo: `${SITE_URL}/logos/01_logotipo/inhand-logo-tight.svg`,
    slogan: 'Made to Mean More.',
    description:
      'Everyday objects and home decor designed with Christian faith, contemporary beauty, and purpose.',
  };

  const schemas = Array.isArray(jsonLd)
    ? [baseOrganizationSchema, ...jsonLd]
    : jsonLd
    ? [baseOrganizationSchema, jsonLd]
    : [baseOrganizationSchema];

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = title;

    const upsertMeta = (attr: 'name' | 'property', key: string, content: string) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const upsertLink = (rel: string, href: string, hreflang?: string) => {
      const selector = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let el = document.head.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        if (hreflang) el.setAttribute('hreflang', hreflang);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', robotsContent);

    upsertLink('canonical', canonicalUrl);
    upsertLink('alternate', esUrl, 'es');
    upsertLink('alternate', enUrl, 'en');
    upsertLink('alternate', esUrl, 'x-default');

    upsertMeta('property', 'og:site_name', 'INHAND');
    upsertMeta('property', 'og:locale', locale === 'es' ? 'es_ES' : 'en_US');
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', absoluteImage);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', absoluteImage);
  }, [
    locale,
    title,
    description,
    robotsContent,
    canonicalUrl,
    esUrl,
    enUrl,
    type,
    absoluteImage,
  ]);

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
};
