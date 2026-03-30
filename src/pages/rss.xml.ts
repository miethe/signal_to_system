import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('posts');

  const published = posts
    .filter((p) => p.data.status !== 'draft')
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items: published.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/essays/${post.id}/`,
      categories: [post.data.category, ...(post.data.tags ?? [])],
    })),
    customData: `<language>en-us</language>`,
  });
}
