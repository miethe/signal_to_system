/**
 * Publication-eligibility gate: the ONE rule deciding whether a posts/stories
 * entry may be emitted anywhere public (HTML routes, RSS/format feeds,
 * search.json, OG images, sitemap, related cards, glossary links).
 *
 * Every `getCollection('posts' | 'stories', ...)` call must pass this
 * function (or a predicate built on it) as its filter;
 * tests/m0/publication-eligibility.test.mjs greps src/ to enforce that.
 * The sitemap is derived from built pages, so an entry that gets no HTML
 * route gets no sitemap entry.
 *
 * Rules (fail closed):
 *   - only `status: published | evergreen` is eligible (draft, or any
 *     unknown status, is not);
 *   - fixture records (`isFixture: true`) are never eligible in a
 *     production build. They stay visible in `astro dev` for design work.
 */

const PUBLIC_STATUSES = new Set(['published', 'evergreen']);

/** True inside a production build (`astro build`) or when NODE_ENV=production. */
export function isProductionBuild() {
  return Boolean(import.meta.env?.PROD) || globalThis.process?.env?.NODE_ENV === 'production';
}

/**
 * @param {{ data?: { status?: string, isFixture?: boolean } }} entry
 * @param {{ production?: boolean }} [options] override build-mode detection (tests).
 *   Ignored unless it is an object, because callers pass this function
 *   straight to `getCollection`/`Array#filter`, which supply an index here.
 */
export function isPublishable(entry, options) {
  const data = entry?.data;
  if (!data || !PUBLIC_STATUSES.has(data.status)) return false;
  const override = options !== null && typeof options === 'object' ? options.production : undefined;
  const production = override ?? isProductionBuild();
  if (data.isFixture === true && production) return false;
  return true;
}
