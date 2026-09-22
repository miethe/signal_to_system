import { getCollection } from "astro:content";
import { getPublishedPosts, getPublishedStories, getPostsBySeries, getStoriesBySeries } from "../../lib/content";
import { formatDate } from "../../lib/utils";
import { renderOgImage, type OgCardInput } from "../../lib/og/render";

// ---------------------------------------------------------------------------
// Build-time OG image endpoint — one PNG per getStaticPaths entry, generated
// during `astro build` (no runtime server). Routes:
//   /og/default.png            -> site card
//   /og/essays/<id>.png        -> one per published post
//   /og/dev-stories/<id>.png   -> one per published story
//   /og/series/<id>.png        -> one per series
// ---------------------------------------------------------------------------

const DEFAULT_TITLE = "A more rigorous relationship with reality.";
// "->" rather than "→": the Newsreader/Inter/JetBrains Mono woff files we
// embed are latin-subset only (no arrow glyph), and satori/resvg render a
// missing glyph as a tofu box rather than falling back to another font.
const DEFAULT_KICKER = "IDEAS -> EVIDENCE -> SYSTEMS";

/** readTime frontmatter is free text ("12 min" or "6 min read") — never duplicate "read". */
function formatReadTime(readTime?: string): string | undefined {
  if (!readTime) return undefined;
  return /read\b/i.test(readTime) ? readTime : `${readTime} read`;
}

function formatArticleMeta(date: Date, readTime?: string): string {
  const dateStr = formatDate(date);
  const readTimeStr = formatReadTime(readTime);
  return readTimeStr ? `${dateStr} · ${readTimeStr}` : dateStr;
}

export async function getStaticPaths() {
  const [posts, stories, seriesEntries] = await Promise.all([
    getPublishedPosts(),
    getPublishedStories(),
    getCollection("series"),
  ]);

  const paths: { params: { slug: string }; props: OgCardInput }[] = [];

  paths.push({
    params: { slug: "default" },
    props: {
      kind: "default",
      kicker: DEFAULT_KICKER,
      title: DEFAULT_TITLE,
      meta: "nickmiethe.com",
      showFooterUrl: false,
    },
  });

  for (const post of posts) {
    paths.push({
      params: { slug: `essays/${post.id}` },
      props: {
        kind: "essay",
        kicker: "ESSAY",
        title: post.data.title,
        meta: formatArticleMeta(post.data.date, post.data.readTime),
        showFooterUrl: true,
      },
    });
  }

  for (const story of stories) {
    paths.push({
      params: { slug: `dev-stories/${story.id}` },
      props: {
        kind: "story",
        kicker: "BUILD NOTE",
        title: story.data.title,
        meta: formatArticleMeta(story.data.date, story.data.readTime),
        showFooterUrl: true,
      },
    });
  }

  for (const seriesEntry of seriesEntries) {
    const [seriesPosts, seriesStories] = await Promise.all([
      getPostsBySeries(seriesEntry.id),
      getStoriesBySeries(seriesEntry.id),
    ]);
    const count = seriesPosts.length + seriesStories.length;
    paths.push({
      params: { slug: `series/${seriesEntry.id}` },
      props: {
        kind: "series",
        kicker: "SERIES",
        title: seriesEntry.data.title,
        meta: `${count} ${count === 1 ? "part" : "parts"}`,
        showFooterUrl: true,
      },
    });
  }

  return paths;
}

export async function GET({ props }: { props: OgCardInput }) {
  const png = await renderOgImage(props);
  return new Response(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
