// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nickmiethe.com',
  trailingSlash: 'ignore',
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // @miethe/ui ships compiled ESM whose internal imports omit .js extensions,
    // which strict Node ESM refuses. Let Vite bundle it so its bundler-relative
    // resolution handles those imports during SSR.
    ssr: {
      noExternal: ['@miethe/ui'],
    },
  },
});
