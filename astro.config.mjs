// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { staticRedirects } from './scripts/redirects.mjs';

const site = 'https://nickmiethe.com';
const migrationManifest = JSON.parse(
  readFileSync(new URL('./docs/project_plans/s2s-v2/migration-manifest.json', import.meta.url), 'utf8'),
);
/** @type {{ path: string; action: string }[]} */
const manifestRoutes = migrationManifest.routes;
const redirectSources = new Set(
  manifestRoutes.filter((route) => route.action === 'redirect').map((route) => route.path),
);

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'ignore',
  integrations: [
    react(),
    mdx(),
    staticRedirects(migrationManifest, site),
    // /workflow-showcase/ is restored but unlisted pending editorial review —
    // keep it out of the sitemap alongside its noindex and absent nav entry.
    sitemap({
      // /studio/* preview pages (brand, primitives, templates) are noindex.
      filter: (page) => {
        const path = new URL(page).pathname;
        return !redirectSources.has(path)
          && !path.includes('/workflow-showcase')
          && !path.includes('/studio/');
      },
    }),
  ],
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
