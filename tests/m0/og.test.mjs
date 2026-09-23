import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// These tests assume `npm run build` has already run (they read `dist/`,
// same as tests/m0/routes.snapshot.json's route-snapshot assertions) — see
// the `verify` script in package.json, which runs build before test:m0.

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const distDir = path.join(repoRoot, 'dist');

/** Read a PNG's pixel dimensions straight out of its IHDR chunk — no new deps. */
function readPngSize(filePath) {
  const buf = readFileSync(filePath);
  const isPng =
    buf.length >= 24 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47;
  assert.ok(isPng, `${filePath} is not a PNG file`);
  // Signature (8 bytes) + chunk length (4) + "IHDR" (4) = width starts at 16.
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

test('dist/og/default.png exists and is 1200x630', () => {
  const file = path.join(distDir, 'og/default.png');
  assert.ok(existsSync(file), 'dist/og/default.png should exist after `astro build`');
  const { width, height } = readPngSize(file);
  assert.equal(width, 1200);
  assert.equal(height, 630);
});

test('one essay OG card exists per published post route', () => {
  const essaysOgDir = path.join(distDir, 'og/essays');
  assert.ok(existsSync(essaysOgDir), 'dist/og/essays/ should exist after `astro build`');
  const cards = readdirSync(essaysOgDir).filter((f) => f.endsWith('.png'));

  const essaysRouteDir = path.join(distDir, 'essays');
  const publishedEssayRoutes = readdirSync(essaysRouteDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(path.join(essaysRouteDir, entry.name, 'index.html')))
    .map((entry) => entry.name);

  assert.ok(cards.length > 0, 'expected at least one published essay OG card');
  assert.equal(
    cards.length,
    publishedEssayRoutes.length,
    'every published essay route should have exactly one generated OG card'
  );
  for (const slug of publishedEssayRoutes) {
    assert.ok(
      existsSync(path.join(essaysOgDir, `${slug}.png`)),
      `missing dist/og/essays/${slug}.png for published essay route /essays/${slug}/`
    );
  }
});

test("a published essay's built HTML references its generated OG card", () => {
  const essaysRouteDir = path.join(distDir, 'essays');
  const [firstSlug] = readdirSync(essaysRouteDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(path.join(essaysRouteDir, entry.name, 'index.html')))
    .map((entry) => entry.name)
    .sort();
  assert.ok(firstSlug, 'expected at least one published essay to check');

  const html = readFileSync(path.join(essaysRouteDir, firstSlug, 'index.html'), 'utf8');
  const match = html.match(/property="og:image" content="([^"]+)"/);
  assert.ok(match, 'expected an og:image meta tag in the built essay HTML');
  assert.ok(
    match[1].endsWith(`/og/essays/${firstSlug}.png`),
    `og:image should end in /og/essays/${firstSlug}.png, got ${match[1]}`
  );
});
