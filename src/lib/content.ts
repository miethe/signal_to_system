import { getCollection, type CollectionEntry } from "astro:content";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Post = CollectionEntry<"posts">;
export type Project = CollectionEntry<"projects">;
export type Series = CollectionEntry<"series">;
export type Story = CollectionEntry<"stories">;

/** A post or a dev story — used by cross-collection facet + related helpers. */
export type Article = Post | Story;

// ---------------------------------------------------------------------------
// Collection-aware URLs
// ---------------------------------------------------------------------------

/**
 * Canonical URL for a post or story entry. Posts render under /essays/, dev
 * stories under /dev-stories/. Use this instead of hardcoding a base path so
 * cross-collection relations (related content, shared series) resolve correctly.
 */
export function hrefFor(entry: Article): string {
  return entry.collection === "stories"
    ? `/dev-stories/${entry.id}/`
    : `/essays/${entry.id}/`;
}

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

// ---------------------------------------------------------------------------
// Stories (Dev Stories)
// ---------------------------------------------------------------------------

/** All stories not in draft status, sorted newest first. */
export async function getPublishedStories(): Promise<Story[]> {
  const stories = await getCollection("stories", ({ data }) => data.status !== "draft");
  return stories.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime(),
  );
}

/** Published stories belonging to a series slug, sorted by seriesOrder ascending. */
export async function getStoriesBySeries(seriesSlug: string): Promise<Story[]> {
  const published = await getPublishedStories();
  return published
    .filter((s) => s.data.series === seriesSlug)
    .sort(
      (a, b) => (a.data.seriesOrder ?? Infinity) - (b.data.seriesOrder ?? Infinity),
    );
}

// ---------------------------------------------------------------------------
// Cross-collection facets: projects / systems + AOS areas
// ---------------------------------------------------------------------------

export interface FacetCount {
  slug: string;
  count: number;
}

/** Published posts + stories that reference a given project slug. */
export async function getContentByProject(
  projectSlug: string,
): Promise<{ posts: Post[]; stories: Story[] }> {
  const [posts, stories] = await Promise.all([
    getPublishedPosts(),
    getPublishedStories(),
  ]);
  return {
    posts: posts.filter((p) => (p.data.projects ?? []).includes(projectSlug)),
    stories: stories.filter((s) => (s.data.projects ?? []).includes(projectSlug)),
  };
}

/** All project slugs referenced across published posts + stories, with counts. */
export async function getAllProjects(): Promise<FacetCount[]> {
  const [posts, stories] = await Promise.all([
    getPublishedPosts(),
    getPublishedStories(),
  ]);
  const counts = new Map<string, number>();
  const all: Article[] = [...posts, ...stories];
  for (const entry of all) {
    for (const slug of entry.data.projects ?? []) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

/** Published posts + stories that are part of the AOS (optionally a specific area). */
export async function getContentByAosArea(
  area?: string,
): Promise<{ posts: Post[]; stories: Story[] }> {
  const [posts, stories] = await Promise.all([
    getPublishedPosts(),
    getPublishedStories(),
  ]);
  const match = (data: { aos?: boolean; aosAreas?: string[] }) =>
    data.aos === true && (area ? (data.aosAreas ?? []).includes(area) : true);
  return {
    posts: posts.filter((p) => match(p.data)),
    stories: stories.filter((s) => match(s.data)),
  };
}

/** All AOS area slugs referenced across published aos content, with counts. */
export async function getAllAosAreas(): Promise<FacetCount[]> {
  const [posts, stories] = await Promise.all([
    getPublishedPosts(),
    getPublishedStories(),
  ]);
  const counts = new Map<string, number>();
  const all: Article[] = [...posts, ...stories];
  for (const entry of all) {
    if (entry.data.aos !== true) continue;
    for (const slug of entry.data.aosAreas ?? []) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

// ---------------------------------------------------------------------------
// Cross-collection related content
// ---------------------------------------------------------------------------

function scoreArticle(source: Article, candidate: Article): number {
  if (candidate.collection === source.collection && candidate.id === source.id)
    return -1;

  let score = 0;
  if (source.data.relatedSlugs?.includes(candidate.id)) score += 10;
  if (source.data.series && source.data.series === candidate.data.series) score += 5;

  const sourceProjects = new Set(source.data.projects ?? []);
  score +=
    (candidate.data.projects ?? []).filter((p) => sourceProjects.has(p)).length * 2;

  const sourceTags = new Set(source.data.tags ?? []);
  score += (candidate.data.tags ?? []).filter((t) => sourceTags.has(t)).length;

  return score;
}

/**
 * Related content across BOTH posts and stories, scored by explicit relatedSlugs,
 * shared series, shared projects, and shared tags. Link results with hrefFor().
 */
export async function getRelatedArticles(
  source: Article,
  limit = 3,
): Promise<Article[]> {
  const [posts, stories] = await Promise.all([
    getPublishedPosts(),
    getPublishedStories(),
  ]);
  const pool: Article[] = [...posts, ...stories];
  return pool
    .map((candidate) => ({ candidate, score: scoreArticle(source, candidate) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ candidate }) => candidate);
}
