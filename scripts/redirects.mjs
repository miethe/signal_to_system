import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Extract static redirect declarations from a route migration manifest. */
export function redirectsFrom(manifest) {
  return manifest.routes
    .filter((route) => route.action === 'redirect')
    .map(({ path, target }) => ({ from: path, to: target }));
}

/** Ensure redirects preserve one-hop canonical routing. */
export function validateRedirects(redirects, canonicalPaths) {
  const canonical = new Set(canonicalPaths);
  const sources = new Set();

  for (const { from } of redirects) {
    if (sources.has(from)) throw new Error(`Redirect collision: duplicate source ${from}`);
    if (canonical.has(from)) throw new Error(`Redirect collision: ${from} is a canonical path`);
    sources.add(from);
  }

  const targets = new Map(redirects.map(({ from, to }) => [from, to]));
  for (const { from } of redirects) {
    const visited = new Set();
    let current = from;
    while (sources.has(current)) {
      if (visited.has(current)) throw new Error(`Redirect loop: ${from}`);
      visited.add(current);
      current = targets.get(current);
    }
  }

  for (const { from, to } of redirects) {
    if (sources.has(to)) throw new Error(`Redirect chain: ${from} -> ${to}`);
    if (!canonical.has(to)) throw new Error(`Redirect dangling target: ${from} -> ${to}`);
  }
}

function redirectHtml(to, site) {
  const url = new URL(to, site).href;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0; url=${to}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="noindex">
  <title>Redirecting</title>
</head>
<body>
  <p>This page has moved to <a href="${to}">${to}</a>.</p>
</body>
</html>
`;
}

/** Create an Astro integration that emits validated static redirect pages. */
export function staticRedirects(manifest, site) {
  const redirects = redirectsFrom(manifest);
  const canonicalPaths = manifest.routes
    .filter((route) => route.action !== 'redirect')
    .map((route) => route.path);
  validateRedirects(redirects, canonicalPaths);

  return {
    name: 'migration-manifest-redirects',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        for (const { from, to } of redirects) {
          const destination = join(fileURLToPath(dir), from.replace(/^\//, ''), 'index.html');
          await mkdir(join(destination, '..'), { recursive: true });
          await writeFile(destination, redirectHtml(to, site));
        }
      },
    },
  };
}
