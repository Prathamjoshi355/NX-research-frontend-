import http from 'http';
import express from 'express';
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { ROUTES } from './routes.mjs';

const DIST_DIR = path.resolve(process.cwd(), 'dist');
const PORT = process.env.PRERENDER_PORT || 4174;

async function startServer() {
  const app = express();
  app.use(express.static(DIST_DIR, { maxAge: '1d' }));
  // fallback to index.html for SPA routes
  app.get('*', (req, res) => res.sendFile(path.join(DIST_DIR, 'index.html')));
  return new Promise((resolve) => {
    const server = app.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist folder not found. Run `npm run build` first.');
    process.exit(1);
  }

  const server = await startServer();
  console.log(`Serving ${DIST_DIR} at http://localhost:${PORT}`);

  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    console.log('Prerendering', url);
    try {
      await page.goto(url, { waitUntil: 'networkidle' , timeout: 60000});
      // give client scripts a moment to run and hydrate
      await page.waitForTimeout(500);
      const html = await page.content();

      // compute output path
      const outPath = path.join(DIST_DIR, route === '/' ? '' : route);
      const targetDir = route === '/' ? DIST_DIR : path.join(DIST_DIR, route.replace(/^\//, ''));
      if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
      const filePath = path.join(targetDir, 'index.html');
      fs.writeFileSync(filePath, html, 'utf8');
      console.log('Wrote', filePath);
    } catch (err) {
      console.error('Failed to prerender', route, err);
    }
  }

  await browser.close();
  server.close();
  console.log('Prerender complete.');
}

prerender().catch((e) => {
  console.error(e);
  process.exit(1);
});
