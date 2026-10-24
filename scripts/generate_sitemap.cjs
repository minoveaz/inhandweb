const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://inhand.design';

const BILINGUAL_PAIRS = [
  { es: '/', en: '/en', priority: '1.0', changefreq: 'weekly' },
  { es: '/tienda', en: '/en/shop', priority: '0.9', changefreq: 'weekly' },
  { es: '/nuestra-historia', en: '/en/our-story', priority: '0.8', changefreq: 'monthly' },
  { es: '/para-comunidades', en: '/en/for-communities', priority: '0.8', changefreq: 'monthly' },
  { es: '/contacto', en: '/en/contact', priority: '0.7', changefreq: 'monthly' },
  { es: '/legal', en: '/en/legal', priority: '0.4', changefreq: 'yearly' },
  // 5 Initial Products (First Drop)
  {
    es: '/producto/escultura-tipografica-gracia',
    en: '/en/product/escultura-tipografica-gracia',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    es: '/producto/soporte-para-biblia',
    en: '/en/product/soporte-para-biblia',
    priority: '0.9',
    changefreq: 'weekly',
  },
  {
    es: '/producto/tote-bag-fe-en-accion',
    en: '/en/product/tote-bag-fe-en-accion',
    priority: '0.85',
    changefreq: 'weekly',
  },
  {
    es: '/producto/llavero-jesus',
    en: '/en/product/llavero-jesus',
    priority: '0.85',
    changefreq: 'weekly',
  },
  {
    es: '/producto/marcapaginas-tu-palabra',
    en: '/en/product/marcapaginas-tu-palabra',
    priority: '0.85',
    changefreq: 'weekly',
  },
];

const today = new Date().toISOString().split('T')[0];

function buildUrlBlock(locPath, esPath, enPath, priority, changefreq) {
  return `  <url>
    <loc>${SITE_URL}${locPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${SITE_URL}${esPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${enPath}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${esPath}" />
  </url>`;
}

const urlEntries = [];
for (const pair of BILINGUAL_PAIRS) {
  urlEntries.push(buildUrlBlock(pair.es, pair.es, pair.en, pair.priority, pair.changefreq));
  urlEntries.push(buildUrlBlock(pair.en, pair.es, pair.en, pair.priority, pair.changefreq));
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`;

const publicDir = path.join(__dirname, '..', 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml, 'utf8');

const robotsTxt = `User-agent: *
Allow: /
Disallow: /checkout
Disallow: /en/checkout

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf8');

console.log(`Generated public/sitemap.xml (${urlEntries.length} bilingual URLs) and public/robots.txt`);
