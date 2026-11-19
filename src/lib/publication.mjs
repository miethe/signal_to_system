/**
 * Shared eligibility gate for posts and stories. Discovery surfaces use
 * isPublishable; direct routes use isRoutable, which also permits unlisted.
 * Draft, private, withdrawn, unknown, future-dated and invalid-dated entries
 * fail closed. Fixtures are excluded from production builds.
 * Unlisted routes carry noindex and are excluded from the sitemap.
 */

const PUBLIC_STATUSES = new Set(['published', 'evergreen']);

/** True inside a production build (`astro build`) or when NODE_ENV=production. */
export function isProductionBuild() {
  return Boolean(import.meta.env?.PROD) || globalThis.process?.env?.NODE_ENV === 'production';
}

/**
 * @param {{ data?: { status?: string, isFixture?: boolean, date?: Date | string } }} entry
 * @param {{ production?: boolean, route?: boolean }} [options] override build-mode detection (tests).
 *   Ignored unless it is an object, because callers pass this function
 *   straight to `getCollection`/`Array#filter`, which supply an index here.
 */
export function isPublishable(entry, options) {
  const data = entry?.data;
  if (!data || (!PUBLIC_STATUSES.has(data.status) && !(options?.route === true && data.status === 'unlisted'))) return false;
  if (data.date != null) {
    const date = new Date(data.date).getTime();
    if (!Number.isFinite(date) || date > Date.now()) return false;
  }
  const override = options !== null && typeof options === 'object' ? options.production : undefined;
  const production = override ?? isProductionBuild();
  if (data.isFixture === true && production) return false;
  return true;
}

/** Direct routes may also render unlisted entries, subject to the same date and fixture rules. */
export function isRoutable(entry) {
  return isPublishable(entry, { route: true });
}
