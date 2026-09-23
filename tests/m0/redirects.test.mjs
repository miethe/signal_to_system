import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { redirectsFrom, validateRedirects } from '../../scripts/redirects.mjs';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const canonical = ['/current/', '/other/'];

function mustFail(redirects, message) {
  assert.throws(() => validateRedirects(redirects, canonical), new RegExp(message));
}

test('redirect validation rejects duplicate and canonical-path collisions', () => {
  mustFail([{ from: '/old/', to: '/current/' }, { from: '/old/', to: '/other/' }], 'collision');
  mustFail([{ from: '/current/', to: '/other/' }], 'collision');
});

test('redirect validation rejects chains', () => {
  mustFail([{ from: '/old/', to: '/next/' }, { from: '/next/', to: '/current/' }], 'chain');
});

test('redirect validation rejects loops', () => {
  mustFail([{ from: '/old/', to: '/next/' }, { from: '/next/', to: '/old/' }], 'loop');
});

test('redirect validation rejects self-loops', () => {
  mustFail([{ from: '/old/', to: '/old/' }], 'loop');
});

test('redirect validation rejects dangling targets', () => {
  mustFail([{ from: '/old/', to: '/missing/' }], 'dangling');
});

test('redirect validation accepts a one-hop canonical redirect', () => {
  assert.doesNotThrow(() => validateRedirects([{ from: '/old/', to: '/current/' }], canonical));
});

test('the real manifest validates with no authorized redirects', () => {
  const manifest = JSON.parse(readFileSync(path.join(repoRoot, 'docs/project_plans/s2s-v2/migration-manifest.json'), 'utf8'));
  const redirects = redirectsFrom(manifest);
  const canonicalPaths = manifest.routes
    .filter((route) => route.action !== 'redirect')
    .map((route) => route.path);
  assert.deepEqual(redirects, []);
  assert.doesNotThrow(() => validateRedirects(redirects, canonicalPaths));
});

test('the sitemap contains only non-redirect manifest routes when dist exists', (t) => {
  const sitemapPath = path.join(repoRoot, 'dist/sitemap-0.xml');
  if (!existsSync(sitemapPath)) {
    t.skip('dist/sitemap-0.xml is absent; build before sitemap validation');
    return;
  }

  const manifest = JSON.parse(readFileSync(path.join(repoRoot, 'docs/project_plans/s2s-v2/migration-manifest.json'), 'utf8'));
  const allowed = new Set(manifest.routes
    .filter((route) => route.action !== 'redirect')
    .map((route) => route.path));
  const urls = [...readFileSync(sitemapPath, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => decodeURIComponent(new URL(match[1]).pathname));

  for (const url of urls) {
    assert.ok(allowed.has(url), `${url} is not a canonical manifest path`);
    assert.ok(!url.includes('/studio/'), `${url} is a studio URL`);
    assert.ok(!url.includes('/workflow-showcase'), `${url} is workflow showcase URL`);
  }
});
