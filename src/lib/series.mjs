/**
 * Series identity — the one place that decides which series an entry is in.
 *
 * `series` frontmatter was authored inconsistently: some entries named the
 * series-collection id ("governed-agentic-sdlc"), some the display title
 * ("AI Workflows", "I Let Claude Build My App"). Every consumer compared the
 * raw string against the collection id, so title-keyed series counted
 * 0 parts. Content now uses ids (enforced by tests/m0/series-integrity), and
 * every consumer resolves through `seriesKey` so a stray title still groups.
 *
 * Plain .mjs (no astro:content import) so node --test can exercise it.
 */

/** Normalise an id or a display title to one comparable slug. */
export function seriesKey(value) {
  return String(value ?? '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * The series-collection entry an entry's `series` value refers to, matching
 * the id first (how /series/[...slug] builds routes), then the title.
 */
export function findSeries(value, allSeries) {
  if (!value) return undefined;
  const key = seriesKey(value);
  return (
    allSeries.find((s) => seriesKey(s.id) === key) ??
    allSeries.find((s) => seriesKey(s.data.title) === key)
  );
}

/** True when `entry` belongs to the series identified by `value` (id or title). */
export function inSeries(entry, value) {
  return Boolean(entry.data.series) && seriesKey(entry.data.series) === seriesKey(value);
}

/**
 * The series' members from `entries`, in reading order (seriesOrder ascending,
 * unordered entries last, then by date so the order is stable).
 */
export function seriesMembers(value, entries) {
  return entries
    .filter((e) => inSeries(e, value))
    .sort((a, b) => {
      const oa = a.data.seriesOrder ?? Infinity;
      const ob = b.data.seriesOrder ?? Infinity;
      if (oa !== ob) return oa - ob;
      return new Date(a.data.date).getTime() - new Date(b.data.date).getTime();
    });
}
