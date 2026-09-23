/**
 * Writing read model — one PublicationSummary per published post or story.
 *
 * Spec: handoff specs/03-writing-and-authoring.md ("Preserve `posts` and
 * `stories` initially. Map `posts.contentType` into format,
 * `stories.storyType` into Dev Story subtype, and collection-specific hrefs
 * into a shared PublicationSummary").
 *
 * The two collections stay the authoritative stores; this module is a
 * derived, build-time view and never writes. Every surface that lists
 * writing (/writing, the home teasers, facets) reads summaries from here, so
 * a filter is a view over one list rather than another copy of each piece.
 *
 * Fallbacks (explicit, so old URLs and old frontmatter keep working):
 *   posts.format    absent -> posts.contentType (essay | field-note | companion)
 *   stories         always format "dev-story", subtype = storyType
 *   canonicalPath   hrefFor(): /essays/<id>/ or /dev-stories/<id>/ (unchanged)
 */
import { getCollection } from 'astro:content';
import { hrefFor, type Article } from './content';
import { isPublishable } from './publication.mjs';
import { findSeries } from './series.mjs';

export type WritingFormat = 'essay' | 'field-note' | 'dev-story' | 'guide' | 'companion';
export type DevStorySubtype = 'after-action' | 'feature-story' | 'build-note';

/**
 * Who wrote the words. Stories carry `automated`; posts are authored.
 * `reviewed` is only true when a story's frontmatter says so; nothing infers it.
 */
export type Provenance = 'authored' | 'automated' | 'automated-reviewed';

export interface PublicationSummary {
  /** Stable across both collections: "<collection>:<id>". */
  publicId: string;
  collection: 'posts' | 'stories';
  id: string;
  format: WritingFormat;
  subtype?: DevStorySubtype;
  title: string;
  summary: string;
  canonicalPath: string;
  publishedAt: Date;
  updatedAt?: Date;
  readMinutes?: number;
  /** Existing editorial category (posts only), kept for display. */
  category?: string;
  tags: string[];
  projects: string[];
  aos: boolean;
  /** Agentic OS areas (`aosAreas`), only meaningful when `aos` is true. */
  aosAreas: string[];
  series?: { id: string; title: string; order?: number };
  featured: boolean;
  heroImage?: string;
  state: 'published' | 'evergreen';
  provenance: Provenance;
  /** Recorded review date (stories with `reviewed: true` and `reviewedAt`). */
  reviewedAt?: Date;
}

export const FORMAT_LABEL: Record<WritingFormat, string> = {
  essay: 'Essay',
  'field-note': 'Field Note',
  'dev-story': 'Dev Story',
  guide: 'Guide',
  companion: 'Companion',
};

export const FORMAT_PLURAL: Record<WritingFormat, string> = {
  essay: 'Essays',
  'field-note': 'Field Notes',
  'dev-story': 'Dev Stories',
  guide: 'Guides',
  companion: 'Companions',
};

export const SUBTYPE_LABEL: Record<DevStorySubtype, string> = {
  'after-action': 'After-action review',
  'feature-story': 'Feature story',
  'build-note': 'Build note',
};

function minutes(readTime?: string): number | undefined {
  const n = parseInt(readTime ?? '', 10);
  return Number.isFinite(n) ? n : undefined;
}

/** Map one collection entry to its summary. Pure apart from the series lookup table. */
export function toSummary(
  entry: Article,
  allSeries: { id: string; data: { title: string } }[],
): PublicationSummary {
  const d = entry.data;
  const seriesEntry = findSeries(d.series, allSeries);
  const base = {
    publicId: `${entry.collection}:${entry.id}`,
    id: entry.id,
    title: d.title,
    summary: d.excerpt,
    canonicalPath: hrefFor(entry),
    publishedAt: d.date,
    updatedAt: d.updatedDate,
    readMinutes: minutes(d.readTime),
    tags: d.tags ?? [],
    projects: d.projects ?? [],
    aos: Boolean(d.aos),
    aosAreas: d.aosAreas ?? [],
    series: seriesEntry
      ? { id: seriesEntry.id, title: seriesEntry.data.title, order: d.seriesOrder }
      : undefined,
    featured: Boolean(d.featured),
    heroImage: d.heroImage,
    state: d.status === 'evergreen' ? ('evergreen' as const) : ('published' as const),
  };

  if (entry.collection === 'stories') {
    const s = entry.data;
    return {
      ...base,
      collection: 'stories',
      format: 'dev-story',
      subtype: s.storyType,
      provenance: s.automated ? (s.reviewed ? 'automated-reviewed' : 'automated') : 'authored',
      reviewedAt: s.reviewed ? s.reviewedAt : undefined,
    };
  }

  const p = entry.data;
  return {
    ...base,
    collection: 'posts',
    format: p.format ?? p.contentType,
    category: p.category,
    provenance: 'authored',
  };
}

/** Every publishable post and story as summaries, newest first. */
export async function getPublications(): Promise<PublicationSummary[]> {
  const [posts, stories, allSeries] = await Promise.all([
    getCollection('posts', isPublishable),
    getCollection('stories', isPublishable),
    getCollection('series'),
  ]);
  return [...posts, ...stories]
    .map((e) => toSummary(e, allSeries))
    .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
}

/** Group summaries by format, preserving order within each group. */
export function byFormat(items: PublicationSummary[]): Record<WritingFormat, PublicationSummary[]> {
  const out = { essay: [], 'field-note': [], 'dev-story': [], guide: [], companion: [] } as Record<
    WritingFormat,
    PublicationSummary[]
  >;
  for (const item of items) out[item.format].push(item);
  return out;
}
