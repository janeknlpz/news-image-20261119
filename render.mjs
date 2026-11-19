// Renders src/news.html to entry.png (1024x1024) with headless Chromium.
// Usage: node render.mjs   (needs playwright-core; path overridable via PW_PATH)
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW_PATH ?? '/home/bountyrun/tools/pw/node_modules/playwright-core');

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await page.goto('file://' + join(here, 'src', 'news.html'));
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(here, 'entry.png'), clip: { x: 0, y: 0, width: 1024, height: 1024 } });
await browser.close();
console.log('wrote entry.png');
