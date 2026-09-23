import rss from '@astrojs/rss';
import { getPublications, FORMAT_LABEL, type WritingFormat } from '../../lib/writing';
import { site } from '../../data/site';

const formats: WritingFormat[] = ['essay', 'field-note', 'dev-story', 'guide', 'companion'];
export async function getStaticPaths() {
  const publications = await getPublications();
  return formats.filter((format) => publications.some((item) => item.format === format)).map((format) => ({ params: { format } }));
}
export async function GET(context: { params: { format?: string }; site: URL }) {
  const format = context.params.format as WritingFormat;
  const items = (await getPublications()).filter((item) => item.format === format).map((item) => ({
    title: item.title, pubDate: item.publishedAt, description: item.summary, link: item.canonicalPath,
    categories: [item.format, ...(item.subtype ? [item.subtype] : []), ...item.tags, ...item.projects],
  }));
  return rss({ title: `${site.title} — ${FORMAT_LABEL[format]}`, description: site.description, site: context.site, items, customData: '<language>en-us</language>' });
}
