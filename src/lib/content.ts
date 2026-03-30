import { getCollection, type CollectionEntry } from "astro:content";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Post = CollectionEntry<"posts">;
export type Project = CollectionEntry<"projects">;
export type Series = CollectionEntry<"series">;

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

/** All posts that are not in draft status, sorted newest first. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => {
    return data.status !== "draft";
  });
  return posts.sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
}

/** Published posts that have `featured: true`. */
export async function getFeaturedPosts(): Promise<Post[]> {
  const published = await getPublishedPosts();
  return published.filter((p) => p.data.featured === true);
}

/** Published posts filtered to a specific category. */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const published = await getPublishedPosts();
  return published.filter((p) => p.data.category === category);
}

/**
 * Published posts belonging to a given series slug, sorted by seriesOrder
 * ascending (posts without a seriesOrder fall to the end).
 */
export async function getPostsBySeries(seriesSlug: string): Promise<Post[]> {
  const published = await getPublishedPosts();
  const inSeries = published.filter((p) => p.data.series === seriesSlug);
  return inSeries.sort((a, b) => {
    const orderA = a.data.seriesOrder ?? Infinity;
    const orderB = b.data.seriesOrder ?? Infinity;
    return orderA - orderB;
  });
}

// ---------------------------------------------------------------------------
// Related content scoring
// ---------------------------------------------------------------------------

/**
 * Score a candidate post against a source post.
 * Higher score = more related.
 */
function scoreRelated(source: Post, candidate: Post): number {
  if (candidate.id === source.id) return -1;

  let score = 0;

  // Explicit relation list
  if (source.data.relatedSlugs?.includes(candidate.id)) score += 10;

  // Same series
  if (
    source.data.series &&
    source.data.series === candidate.data.series
  ) {
    score += 5;
  }

  // Same category
  if (source.data.category === candidate.data.category) score += 3;

  // Shared tags
  const sourceTags = new Set(source.data.tags ?? []);
  const sharedTags = (candidate.data.tags ?? []).filter((t) =>
    sourceTags.has(t)
  );
  score += sharedTags.length;

  return score;
}

/**
 * Return up to `limit` published posts most related to the given post,
 * scored by shared category, tags, series, and explicit relatedSlugs.
 */
export async function getRelatedContent(
  post: Post,
  limit = 3
): Promise<Post[]> {
  const published = await getPublishedPosts();
  return published
    .map((candidate) => ({
      post: candidate,
      score: scoreRelated(post, candidate),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ post: p }) => p);
}

// ---------------------------------------------------------------------------
// Tags
// ---------------------------------------------------------------------------

export interface TagCount {
  tag: string;
  count: number;
}

/** Returns all unique tags across published posts, sorted by count descending. */
export async function getAllTags(): Promise<TagCount[]> {
  const published = await getPublishedPosts();
  const counts = new Map<string, number>();

  for (const post of published) {
    for (const tag of post.data.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}
