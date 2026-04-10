import type { CollectionEntry } from "astro:content";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ContentType = "post" | "project" | "series";

export interface SearchIndexEntry {
  title: string;
  excerpt: string;
  url: string;
  category: string;
  tags: string[];
  type: ContentType;
}

// ---------------------------------------------------------------------------
// generateSearchIndex
// ---------------------------------------------------------------------------

/**
 * Build a flat search index from posts, projects, and series collections.
 * The resulting array can be serialised to JSON and consumed by a client-side
 * search library (e.g. Fuse.js, Pagefind, or a custom implementation).
 */
export function generateSearchIndex(
  posts: CollectionEntry<"posts">[],
  projects: CollectionEntry<"projects">[],
  series: CollectionEntry<"series">[]
): SearchIndexEntry[] {
  const postEntries: SearchIndexEntry[] = posts
    .filter((p) => p.data.status !== "draft")
    .map((p) => ({
      title: p.data.title,
      excerpt: p.data.excerpt,
      url: `/essays/${p.id}/`,
      category: p.data.category,
      tags: p.data.tags ?? [],
      type: "post",
    }));

  const projectEntries: SearchIndexEntry[] = projects
    .filter((p) => p.data.visibility === "public")
    .map((p) => ({
      title: p.data.title,
      excerpt: p.data.excerpt,
      url: `/projects/${p.id}`,
      category: p.data.type,
      tags: p.data.tags ?? [],
      type: "project",
    }));

  const seriesEntries: SearchIndexEntry[] = series.map((s) => ({
    title: s.data.title,
    excerpt: s.data.excerpt,
    url: `/series/${s.id}`,
    category: s.data.topic ?? "Series",
    tags: [],
    type: "series",
  }));

  return [...postEntries, ...projectEntries, ...seriesEntries];
}
