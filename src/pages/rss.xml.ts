import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { isPublishable } from '../lib/publication.mjs';
import { site } from '../data/site';

/** Legacy aggregate feed contract. Keep item fields byte-compatible. */
export async function GET(context: { site: URL }) {
  const posts = await getCollection('posts', isPublishable);
  const publishedStories = await getCollection('stories', isPublishable);
  const publishedPosts = posts.filter((p) => p.data.contentType !== 'companion');
  const items = [
    ...publishedPosts.map((post) => ({ title: post.data.title, pubDate: post.data.date, description: post.data.excerpt, link: `/essays/${post.id}/`, categories: [post.data.category, ...(post.data.tags ?? [])] })),
    ...publishedStories.map((story) => ({ title: story.data.title, pubDate: story.data.date, description: story.data.excerpt, link: `/dev-stories/${story.id}/`, categories: [story.data.storyType, ...(story.data.tags ?? []), ...(story.data.projects ?? [])] })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());
  return rss({ title: site.title, description: site.description, site: context.site, items, customData: `<language>en-us</language>` });
}
