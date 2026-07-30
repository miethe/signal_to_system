import type { CollectionEntry } from "astro:content";
import { TOPIC_HUBS } from "../data/taxonomy";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Post = CollectionEntry<"posts">;
export type Story = CollectionEntry<"stories">;

/** A post or a dev story — series can mix both, so nav must accept either. */
export type SeriesEntry = Post | Story;

export interface SeriesNav {
  prev: SeriesEntry | null;
  next: SeriesEntry | null;
  series: string;
  currentIndex: number;
  total: number;
}

// ---------------------------------------------------------------------------
// getSeriesNav
// ---------------------------------------------------------------------------

/**
 * Given an entry (post or story) and the full list of entries in its
 * collection(s), return navigation context within its series (previous,
 * next, position, and total count). Pass a combined posts+stories array
 * when a series spans both collections; link results with hrefFor().
 *
 * Returns `null` when the entry does not belong to a series.
 */
export function getSeriesNav(
  entry: SeriesEntry,
  allEntries: SeriesEntry[]
): SeriesNav | null {
  const seriesSlug = entry.data.series;
  if (!seriesSlug) return null;

  // Collect entries in the same series, sorted by seriesOrder asc
  const seriesEntries = allEntries
    .filter(
      (e) =>
        e.data.series === seriesSlug && e.data.status !== "draft"
    )
    .sort((a, b) => {
      const orderA = a.data.seriesOrder ?? Infinity;
      const orderB = b.data.seriesOrder ?? Infinity;
      return orderA - orderB;
    });

  const currentIndex = seriesEntries.findIndex(
    (e) => e.collection === entry.collection && e.id === entry.id
  );
  if (currentIndex === -1) return null;

  return {
    prev: currentIndex > 0 ? seriesEntries[currentIndex - 1] : null,
    next:
      currentIndex < seriesEntries.length - 1
        ? seriesEntries[currentIndex + 1]
        : null,
    series: seriesSlug,
    currentIndex,
    total: seriesEntries.length,
  };
}

// ---------------------------------------------------------------------------
// getTopicPosts
// ---------------------------------------------------------------------------

/**
 * Return all published posts that belong to a given topic hub.
 * The `topic` is matched against the TopicHub's `label` (which corresponds
 * to a Category value) so content is automatically grouped by category.
 */
export function getTopicPosts(topic: string, posts: Post[]): Post[] {
  // Find the hub — accept either the slug or the label as the identifier
  const hub = TOPIC_HUBS.find(
    (h) =>
      h.slug === topic ||
      h.label.toLowerCase() === topic.toLowerCase()
  );

  const categoryToMatch = hub ? hub.label : topic;

  return posts
    .filter(
      (p) =>
        p.data.status !== "draft" &&
        p.data.category === categoryToMatch
    )
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
}
