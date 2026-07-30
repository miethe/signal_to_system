import { getCollection } from 'astro:content';

export async function GET() {
  const posts = await getCollection('posts');
  const projects = await getCollection('projects');
  const stories = await getCollection('stories');

  const index = [
    ...posts
      .filter((p) => p.data.status !== 'draft')
      .map((p) => ({
        title: p.data.title,
        excerpt: p.data.excerpt,
        url: `/essays/${p.id}/`,
        category: p.data.category,
        tags: [...(p.data.tags ?? []), ...(p.data.projects ?? [])],
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
    ...stories
      .filter((s) => s.data.status !== 'draft')
      .map((s) => ({
        title: s.data.title,
        excerpt: s.data.excerpt,
        url: `/dev-stories/${s.id}/`,
        category: s.data.storyType,
        tags: [
          ...(s.data.tags ?? []),
          ...(s.data.projects ?? []),
          s.data.workflow?.version,
          s.data.workflow?.orchestrator,
          s.data.storyType,
        ].filter(Boolean) as string[],
        type: 'story' as const,
        date: s.data.date.toISOString().split('T')[0],
        readTime: s.data.readTime,
        contentType: undefined,
        featured: s.data.featured ?? false,
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
