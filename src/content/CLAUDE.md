# src/content/ — Content Authoring

Content collections use the Astro Content Layer API. Schema defined in `src/content.config.ts` (canonical location — NOT this directory's `config.ts`).

## Collections

| Collection | Path | Format | Purpose |
|-----------|------|--------|---------|
| posts | `posts/*.mdx` | essay, field-note | Blog essays and field notes |
| projects | `projects/*.mdx` | various types | Portfolio artifacts |
| series | `series/*.mdx` | active, planned, complete | Multi-post sequences |
| stories | `stories/*.mdx` | after-action, feature-story, build-note | Automated agentic build notes / dev stories |

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

## Adding a Dev Story

Dev Stories are automated build notes generated from the agentic execution workflow (AARs, feature completions, build notes), not hand-authored essays. **Don't hand-write these** — they normally come out of the `op story` pipeline (`op story capture` / `op story scan` / `op story review`) and the `dev-story-editor` skill, which draft, editorialize, and gate the MDX before it lands in `stories/*.mdx`. Use this section as a reference for the shape, not a template to fill in by hand.

Create `stories/my-slug.mdx` with required frontmatter:

```yaml
---
title: "Story Title"
excerpt: "One-line description"
date: 2026-07-28
readTime: "6 min"
status: published  # draft | published | evergreen
storyType: after-action  # after-action | feature-story | build-note
tags: ["agentic-sdlc", "context-engineering"]
automated: true  # default true; set false only for hand-curated edits
sourceAar: "aar-2026-07-28-feature-x"  # optional provenance label
projects: ["signal-to-system"]  # slugs from PROJECTS_REGISTRY
aos: true  # optional — flags AOS-subsystem involvement
aosAreas: ["research-foundry", "intenttree"]  # optional slugs from AOS_AREAS_REGISTRY
workflow:
  version: "v4"
  orchestrator: "metis"
  model: "sonnet-5"
  tokens: 482000
  tier: 2
  points: 8
  commits: 6
  runId: "run_2026072801"
  intentId: "itt_9f21"
---
```

`workflow` and all of its fields are optional; include whatever the run record actually captured. Optional shared fields (`updatedDate`, `series`, `seriesOrder`, `featured`, `heroImage`, `seoTitle`, `seoDescription`, `canonicalUrl`, `relatedSlugs`, `whyItMatters`, `leaderTakeaway`, `disclaimer`, `draftNotes`) work the same as on posts.

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

## Formatting Conventions

Posts are rendered through `.prose-custom` (defined in `src/styles/global.css`). Keep these in mind when drafting MDX:

- **Use real markdown tables for comparative data.** If you catch yourself writing three consecutive `**Bold label:**` blocks each followed by a bullet list, collapse them into a `| col | col |` table — `.prose-custom` has proper `thead`/`tbody` styling, and tables survive mobile widths better than stacked bold-lists.
- **Heading spacing is automatic.** `h2` gets a top margin and a subtle bottom border; `h3` gets a smaller top margin. Don't add blank `<br />` tags or extra horizontal rules to force separation.
- **Paragraph spacing is automatic.** One blank line between paragraphs is correct. Don't wrap prose in `<div>` tags — that strips the prose styles.
- **Callouts** use the `<Callout type="info|why-it-matters|leader-takeaway|warning|success|danger" title="...">` component (imported from `../../components/content/Callout`). Prefer callouts over blockquotes for "key insight" framing; reserve blockquotes for actual quoted material or single-line thesis statements.
- **Inline definitions** use `<dfn>**Term**</dfn>` for first mentions of coined terminology (e.g. `<dfn>**Cognitive Debt**</dfn>`).
- **Footnotes** use the standard `[^key]` / `[^key]: ...` syntax — rendered at the bottom of the post automatically.
- **Do NOT use `prose-*` Tailwind modifier classes in MDX.** The `@tailwindcss/typography` plugin is not installed; those classes are no-ops. All styling happens via `.prose-custom` at the layout level.

## Editorial Workflow

For drafting workflow, voice guidance, and research integration, see `docs/CLAUDE.md`.

When writing content, use the `/voice-writer` skill to match Nick's voice. Use `/blog-drafter` for the full workflow from spec to publication-ready MDX.

Post planning template available at `docs/templates/post-planning.md`.
