// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// TODO: replace with the real production domain before launch (must match src/i18n/site.ts SITE_URL).
const SITE_URL = 'https://www.akai.ai';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [sitemap()],
  redirects: {
    '/': '/es/',
  },
});