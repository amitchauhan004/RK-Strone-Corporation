import { writeFileSync } from 'fs';
import { resolve } from 'path';

const BASE_URL = process.env.SITEMAP_BASE_URL || 'https://rkstonecorporation.com';
const today = new Date().toISOString().slice(0, 10);

// Core routes
const coreRoutes = [
  { loc: `${BASE_URL}/`, changefreq: 'daily', priority: '1.0', lastmod: today },
  { loc: `${BASE_URL}/shop`, changefreq: 'weekly', priority: '0.9', lastmod: today },
  { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: '0.6', lastmod: today },
  { loc: `${BASE_URL}/contact`, changefreq: 'monthly', priority: '0.6', lastmod: today },
  { loc: `${BASE_URL}/stone-temple-jaipur`, changefreq: 'monthly', priority: '0.85', lastmod: today },
  { loc: `${BASE_URL}/cnc-jali-jaipur`, changefreq: 'monthly', priority: '0.85', lastmod: today },
  { loc: `${BASE_URL}/sandstone-supplier-jaipur`, changefreq: 'monthly', priority: '0.85', lastmod: today },
];

// Category query URLs
const categories = [
  'stone-temple','heritage-haveli','chhatri','wall-panel','garden-fountain','red-stone','pink-sand-stone','jodhpur-stone','gwalior-stone','stone-carving'
];
const categoryUrls = categories.map((c) => ({
  loc: `${BASE_URL}/shop?category=${encodeURIComponent(c)}`,
  changefreq: 'monthly',
  priority: '0.6',
  lastmod: today,
}));

// Note: Product URLs can be appended here if you export a list from backend.

const urls = [...coreRoutes, ...categoryUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outPath, xml, { encoding: 'utf-8' });
console.log(`Sitemap written to ${outPath}`);


