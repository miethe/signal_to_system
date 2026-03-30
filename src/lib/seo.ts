import { site } from "../data/site";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  og: {
    title: string;
    description: string;
    image: string;
    type: "website" | "article";
  };
}

export interface ArticleJsonLdData {
  title: string;
  description: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  tags?: string[];
}

export interface ProfileJsonLdData {
  name: string;
  url: string;
  image?: string;
  description?: string;
  sameAs?: string[];
}

// ---------------------------------------------------------------------------
// formatTitle
// ---------------------------------------------------------------------------

/** Returns "pageTitle | Signal to System", or just the site title if no page title given. */
export function formatTitle(pageTitle?: string): string {
  if (!pageTitle) return site.title;
  return `${pageTitle} | ${site.title}`;
}

// ---------------------------------------------------------------------------
// generateMeta
// ---------------------------------------------------------------------------

export interface GenerateMetaInput {
  title?: string;
  description?: string;
  path?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

/**
 * Generate a complete set of meta tags for a page.
 * Falls back to site-level defaults for any omitted values.
 */
export function generateMeta(page: GenerateMetaInput): PageMeta {
  const resolvedTitle = formatTitle(page.title);
  const resolvedDescription = page.description ?? site.description;
  const resolvedCanonical =
    page.canonicalUrl ?? buildCanonicalUrl(page.path ?? "/");
  const resolvedImage = resolveOgImage(page.ogImage);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    canonical: resolvedCanonical,
    og: {
      title: resolvedTitle,
      description: resolvedDescription,
      image: resolvedImage,
      type: page.ogType ?? "website",
    },
  };
}

// ---------------------------------------------------------------------------
// generateJsonLd
// ---------------------------------------------------------------------------

/**
 * Generate JSON-LD structured data for an article or author profile.
 *
 * @example
 * const ld = generateJsonLd('article', { title, description, url, datePublished });
 * // Serialize with: JSON.stringify(ld)
 */
export function generateJsonLd(
  type: "article",
  data: ArticleJsonLdData
): Record<string, unknown>;
export function generateJsonLd(
  type: "profile",
  data: ProfileJsonLdData
): Record<string, unknown>;
export function generateJsonLd(
  type: "article" | "profile",
  data: ArticleJsonLdData | ProfileJsonLdData
): Record<string, unknown> {
  if (type === "article") {
    const d = data as ArticleJsonLdData;
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: d.title,
      description: d.description,
      url: d.url,
      image: resolveOgImage(d.image),
      datePublished: d.datePublished,
      dateModified: d.dateModified ?? d.datePublished,
      keywords: d.tags?.join(", "),
      author: {
        "@type": "Person",
        name: d.authorName ?? site.author.name,
        url: buildCanonicalUrl("/about"),
      },
      publisher: {
        "@type": "Organization",
        name: site.title,
        url: site.siteUrl,
      },
    };
  }

  // profile
  const d = data as ProfileJsonLdData;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: d.name,
    url: d.url,
    image: d.image ? resolveOgImage(d.image) : undefined,
    description: d.description,
    sameAs: d.sameAs,
  };
}

// ---------------------------------------------------------------------------
// Helpers (also exported for use in other modules)
// ---------------------------------------------------------------------------

/** Build an absolute canonical URL from a site-relative path. */
export function buildCanonicalUrl(path: string): string {
  const base = site.siteUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

/** Resolve an OG image path/URL to an absolute URL. */
export function resolveOgImage(image?: string): string {
  const img = image ?? site.defaultOgImage;
  if (img.startsWith("http://") || img.startsWith("https://")) return img;
  return buildCanonicalUrl(img);
}

/** Strip HTML tags from a string for safe use in meta attributes. */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/** Truncate a string to a maximum character length, appending an ellipsis. */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max - 1).trimEnd() + "…";
}
