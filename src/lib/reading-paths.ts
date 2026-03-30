import type { CollectionEntry } from "astro:content";
import { TOPIC_HUBS } from "../data/taxonomy";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Post = CollectionEntry<"posts">;

export interface SeriesNav {
  prev: Post | null;
  next: Post | null;
  series: string;
  currentIndex: number;
  total: number;
}

// ---------------------------------------------------------------------------
// getSeriesNav
// ---------------------------------------------------------------------------

/**
 * Given a post and the full list of posts, return navigation context for the
 * post within its series (previous, next, position, and total count).
 *
 * Returns `null` when the post does not belong to a series.
 */
export function getSeriesNav(
  post: Post,
  allPosts: Post[]
): SeriesNav | null {
  const seriesSlug = post.data.series;
  if (!seriesSlug) return null;

  // Collect posts in the same series, sorted by seriesOrder asc
  const seriesPosts = allPosts
    .filter(
      (p) =>
        p.data.series === seriesSlug && p.data.status !== "draft"
    )
    .sort((a, b) => {
      const orderA = a.data.seriesOrder ?? Infinity;
      const orderB = b.data.seriesOrder ?? Infinity;
      return orderA - orderB;
    });

  const currentIndex = seriesPosts.findIndex((p) => p.id === post.id);
  if (currentIndex === -1) return null;

  return {
    prev: currentIndex > 0 ? seriesPosts[currentIndex - 1] : null,
    next:
      currentIndex < seriesPosts.length - 1
        ? seriesPosts[currentIndex + 1]
        : null,
    series: seriesSlug,
    currentIndex,
    total: seriesPosts.length,
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
