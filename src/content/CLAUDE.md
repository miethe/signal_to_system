# src/content/ — Content Authoring

Content collections use the Astro Content Layer API. Schema defined in `src/content.config.ts` (canonical location — NOT this directory's `config.ts`).

## Collections

| Collection | Path | Format | Purpose |
|-----------|------|--------|---------|
| posts | `posts/*.mdx` | essay, field-note | Blog essays and field notes |
| projects | `projects/*.mdx` | various types | Portfolio artifacts |
| series | `series/*.mdx` | active, planned, complete | Multi-post sequences |

## Adding a Post

Create `posts/my-slug.mdx` with required frontmatter:

```yaml
---
title: "Post Title"
excerpt: "One-line description"
date: 2026-03-20
readTime: "8 min"
contentType: essay  # or field-note
category: "Agentic SDLC"  # one of 7 categories
tags: ["agent-ready repos", "context engineering"]  # 3-6 from registry
status: published  # draft | published | evergreen
---
```

Optional fields: `series`, `seriesOrder`, `featured`, `whyItMatters`, `leaderTakeaway`, `relatedSlugs`, `heroImage`, `interactiveElement`, `seoTitle`, `seoDescription`, `canonicalUrl`, `disclaimer`, `draftNotes`

## Categories (fixed set)

AI Agents, Agentic SDLC, Technical Leadership, CTO, Architecture, Platform Engineering, Projects

## Tags

Controlled registry in `src/data/taxonomy.ts`. Prefer 3-6 per post. Only use tags that already exist in the registry.

## Projects Schema

Required: `title`, `excerpt`, `date`, `type`, `tags`, `visibility`
- Types: Deck, Component, Architecture, App, Framework, Library, Artifact
- Visibility: public, summary-only

## Series Schema

Required: `title`, `excerpt`, `status`
- Status: active, planned, complete

## Editorial Workflow

For drafting workflow, voice guidance, and research integration, see `docs/CLAUDE.md`.

When writing content, use the `/voice-writer` skill to match Nick's voice. Use `/blog-drafter` for the full workflow from spec to publication-ready MDX.

Post planning template available at `docs/templates/post-planning.md`.
