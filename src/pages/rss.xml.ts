import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../data/site';

export async function GET(context: { site: URL }) {
  const posts = await getCollection('posts');
  const stories = await getCollection('stories');

  const publishedPosts = posts.filter((p) => p.data.status !== 'draft');
  const publishedStories = stories.filter((s) => s.data.status !== 'draft');

  const items = [
    ...publishedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/essays/${post.id}/`,
      categories: [post.data.category, ...(post.data.tags ?? [])],
    })),
    ...publishedStories.map((story) => ({
      title: story.data.title,
      pubDate: story.data.date,
      description: story.data.excerpt,
      link: `/dev-stories/${story.id}/`,
      categories: [
        story.data.storyType,
        ...(story.data.tags ?? []),
        ...(story.data.projects ?? []),
      ],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: site.title,
    description: site.description,
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
