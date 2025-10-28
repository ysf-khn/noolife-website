// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://noolife.app',
  integrations: [sitemap()],
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2.noolife.app'
      }
    ]
  },
  vite: {
    plugins: [tailwindcss()]
  }
});