import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const projects = await getCollection('projects');

  const index = [
    ...posts
      .filter((p) => p.data.status !== 'draft')
      .map((p) => ({
        title: p.data.title,
        excerpt: p.data.excerpt,
        url: `/essays/${p.id}/`,
        category: p.data.category,
        tags: p.data.tags ?? [],
        type: 'post' as const,
        date: p.data.date.toISOString().split('T')[0],
        readTime: p.data.readTime,
        contentType: p.data.contentType,
        featured: p.data.featured ?? false,
      })),
    ...projects.map((p) => ({
      title: p.data.title,
      excerpt: p.data.excerpt,
      url: `/projects/${p.id}/`,
      category: p.data.type,
      tags: p.data.tags ?? [],
      type: 'project' as const,
      date: p.data.date.toISOString().split('T')[0],
      readTime: undefined,
      contentType: undefined,
      featured: p.data.featured ?? false,
    })),
  ];

  // Sort by date descending
  index.sort((a, b) => (a.date < b.date ? 1 : -1));

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
