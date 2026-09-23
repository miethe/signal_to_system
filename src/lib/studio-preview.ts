/**
 * Shared data for the noindex Studio preview pages (/studio/templates/*,
 * /studio/primitives/). Everything shown is drawn from the real collections
 * so the previews never carry invented figures.
 */
import { getCollection } from 'astro:content';
import { getPublishedPosts, getPublishedStories, hrefFor } from './content';
import { getTagLabel } from './tags';

export const templateTabs = (current: string) =>
  [
    { label: 'Hub', sub: 'Section front', icon: 'studio', href: '/studio/templates/' },
    { label: 'Index + rail', sub: 'Filterable listing', icon: 'topics', href: '/studio/templates/index-rail/' },
    { label: 'Detail + rail', sub: 'One record', icon: 'artifacts', href: '/studio/templates/detail-rail/' },
    { label: 'Folio page', sub: 'Notebook leaf', icon: 'notebooks', href: '/studio/templates/folio/' },
    { label: 'Article', sub: 'Essay proposal', icon: 'essays', href: '/studio/templates/article/' },
    { label: 'States', sub: 'Non-content states', icon: 'sparkle', href: '/studio/states/' },
  ].map((t) => ({ ...t, current: t.href === current }));

export async function previewData() {
  const posts = await getPublishedPosts();
  const stories = await getPublishedStories();
  const series = await getCollection('series');
  const tagCounts = new Map<string, number>();
  for (const p of [...posts, ...stories]) {
    for (const t of p.data.tags ?? []) tagCounts.set(t, (tagCounts.get(t) ?? 0) + 1);
  }
  const topics = [...tagCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 8)
    .map(([slug, count]) => ({ label: getTagLabel(slug), href: `/tags/${slug}/`, count }));
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  const card = (e: (typeof posts)[number] | (typeof stories)[number]) => ({
    title: e.data.title,
    excerpt: e.data.excerpt,
    href: hrefFor(e),
    date: fmt(new Date(e.data.date)),
    tags: (e.data.tags ?? []).slice(0, 3).map(getTagLabel),
    kind: e.collection === 'stories' ? 'Dev Story' : 'Essay',
  });
  return {
    counts: { posts: posts.length, stories: stories.length, series: series.length, topics: tagCounts.size },
    posts: posts.map(card),
    stories: stories.map(card),
    topics,
  };
}
