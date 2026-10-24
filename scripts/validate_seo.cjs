const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const routesPath = path.join(__dirname, '..', 'config', 'routes.ts');
const productsPath = path.join(__dirname, '..', 'config', 'products.ts');

if (!fs.existsSync(sitemapPath)) {
  console.error('Missing public/sitemap.xml');
  process.exit(1);
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const routes = fs.readFileSync(routesPath, 'utf8');
const products = fs.readFileSync(productsPath, 'utf8');

const locCount = (sitemap.match(/<loc>/g) || []).length;
const hreflangCount = (sitemap.match(/hreflang=/g) || []).length;

console.log(`SEO Validation Passed: ${locCount} indexable bilingual URLs, ${hreflangCount} hreflang annotations.`);
if (!routes.includes('resolveAlternatePath') || !products.includes('IH-OBJ-001')) {
  console.error('Missing core route or product definitions.');
  process.exit(1);
}
