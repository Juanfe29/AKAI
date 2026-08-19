// ponytail: one runnable check for the mobile layout.
//   npm run build && npx sirv dist --port 4401 --dev &   then: node scripts/mobile-check.mjs
// Fails if any page scrolls horizontally, or if the hamburger / mobile menu is off-screen.
import { chromium } from 'playwright';
import assert from 'node:assert';

const base = process.env.BASE || 'http://127.0.0.1:4401';
const paths = ['/es/', '/es/vision/', '/es/process/', '/es/case-studies/palm/', '/es/case-studies/roots/',
  '/es/technology/', '/es/carbon/', '/es/track-record/', '/es/team/', '/es/contact/'];
const widths = [320, 390, 768, 1440];

const browser = await chromium.launch();
let failures = 0;

for (const w of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: 844 }, isMobile: w < 900, hasTouch: w < 900 });
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(300);
    const docW = await page.evaluate(() => document.documentElement.scrollWidth);
    if (docW > w) { console.error(`FAIL ${w}px ${p}: horizontal overflow (doc ${docW} > ${w})`); failures++; }
  }
  if (w < 1180) {
    await page.goto(base + '/es/technology/', { waitUntil: 'domcontentloaded' });
    const btn = page.locator('[data-hamburger]');
    const box = await btn.boundingBox();
    assert.ok(box, `${w}px: hamburger not rendered`);
    if (box.x < 0 || box.x + box.width > w) { console.error(`FAIL ${w}px: hamburger off-screen at x=${Math.round(box.x)}`); failures++; }
    await btn.click();
    const menu = page.locator('[data-mobile-menu]');
    await menu.waitFor({ state: 'visible', timeout: 2000 });
    assert.equal(await menu.locator('a').count(), 10, `${w}px: mobile menu link count`);
  }
  await page.close();
  console.log(`checked ${w}px`);
}

await browser.close();
if (failures) { console.error(String(failures) + ' failure(s)'); process.exit(1); }
console.log('mobile layout OK');
