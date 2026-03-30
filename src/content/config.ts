import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// ---------------------------------------------------------------------------
// Posts collection
// ---------------------------------------------------------------------------

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    // Required
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    contentType: z.enum(["essay", "field-note"]),
    category: z.enum([
      "AI Agents",
      "Agentic SDLC",
      "Technical Leadership",
      "CTO",
      "Architecture",
      "Platform Engineering",
      "Projects",
    ]),
    tags: z.array(z.string()),
    status: z.enum(["draft", "published", "evergreen"]),

    // Optional metadata
    updatedDate: z.coerce.date().optional(),
    series: z.string().optional(),
    seriesOrder: z.number().optional(),
    featured: z.boolean().optional(),
    heroImage: z.string().optional(),

    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional(),

    // Interactive / rich content
    interactiveElement: z.string().optional(),

    // Relationships
    relatedSlugs: z.array(z.string()).optional(),

    // Editorial extras
    whyItMatters: z.string().optional(),
    leaderTakeaway: z.string().optional(),
    disclaimer: z.string().optional(),
    draftNotes: z.string().optional(),
  }),
});

// ---------------------------------------------------------------------------
// Projects collection
// ---------------------------------------------------------------------------

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    // Required
    title: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    type: z.enum([
      "Deck",
      "Component",
      "Architecture",
      "App",
      "Framework",
      "Library",
      "Artifact",
    ]),
    tags: z.array(z.string()),
    visibility: z.enum(["public", "summary-only"]),

    // Optional metadata
    featured: z.boolean().optional(),
    heroImage: z.string().optional(),
    interactiveElement: z.string().optional(),

    // Links
    repoUrl: z.string().url().optional(),
    artifactUrl: z.string().url().optional(),
    siteUrl: z.string().url().optional(),

    // Engagement context
    caseStudy: z.boolean().optional(),
    engagementType: z
      .enum([
        "prototype",
        "concept",
        "library",
        "internal-style artifact",
        "public artifact",
      ])
      .optional(),

    // Relationships
    relatedSlugs: z.array(z.string()).optional(),

    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

// ---------------------------------------------------------------------------
// Series collection
// ---------------------------------------------------------------------------

const series = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/series" }),
  schema: z.object({
    // Required
    title: z.string(),
    excerpt: z.string(),
    status: z.enum(["active", "planned", "complete"]),

    // Optional metadata
    heroImage: z.string().optional(),
    featured: z.boolean().optional(),
    topic: z.string().optional(),

    // Ordering
    recommendedOrder: z.array(z.string()).optional(),

    // SEO
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const collections = { posts, projects, series };
