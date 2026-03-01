import fs from 'fs';
import path from 'path';
import { ROUTES, PREFERRED_DOMAIN } from './routes.mjs';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PUBLIC_SRC = path.resolve(process.cwd(), 'src', 'public');

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

function buildUrl(loc) {
  // ensure leading slash
  const p = loc.startsWith('/') ? loc : `/${loc}`;
  return `${PREFERRED_DOMAIN}${p}`;
}

function generateXml(routes) {
  const lastmod = formatDate(new Date());
  const items = routes.map((r) => `  <url>\n    <loc>${buildUrl(r)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.8</priority>\n  </url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

async function writeSitemaps() {
  const xml = generateXml(ROUTES);

  // ensure dist exists
  if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

  const distPath = path.join(DIST_DIR, 'sitemap.xml');
  fs.writeFileSync(distPath, xml, 'utf8');
  console.log('Wrote', distPath);

  // also update source public sitemap if present
  try {
    if (!fs.existsSync(PUBLIC_SRC)) fs.mkdirSync(PUBLIC_SRC, { recursive: true });
    const publicPath = path.join(PUBLIC_SRC, 'sitemap.xml');
    fs.writeFileSync(publicPath, xml, 'utf8');
    console.log('Updated', publicPath);
  } catch (e) {
    console.warn('Could not write src/public sitemap:', e.message);
  }
}

writeSitemaps();
