# CLAUDE.md

Signal to System: A professional technical publication and portfolio built with Astro, authored by Nick Miethe.

## Project Overview

Static-first technical blog focused on AI agents, agentic SDLC, technical leadership, architecture, and platform engineering. Deployed via GitHub Pages with CI/CD.

**Not** a generic blog or portfolio — this is a technical publication for the agentic era, authored by a practicing technical executive / builder.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Astro 6** | Static site framework (Content Layer API) |
| **React 19** | Interactive islands (`client:idle`, `client:visible`) |
| **Tailwind CSS v4** | Styling (`@import "tailwindcss"`, `@theme` blocks) |
| **MDX** | Content authoring with embedded components |
| **Nanostores** | Cross-island state (theme, performance mode) |
| **Lucide React** | Icon library |
| **Zod** | Content schema validation (via Astro collections) |
| **TypeScript** | Strict mode throughout |

## Node Version

**Requires Node 22+**. Use `nvm use 22` before running any commands. An `.nvmrc` is present.

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm run check` | Run Astro type checking |

## Architecture

### Content Collections (Astro Content Layer API)

Collections are defined in `src/content.config.ts` (NOT `src/content/config.ts` — Astro 6 requires the file at `src/content.config.ts`). A copy exists at `src/content/config.ts` for reference but the canonical location is the root-level one.

Three collections:
- **posts** (`src/content/posts/`) — essays and field notes (`.mdx`)
- **projects** (`src/content/projects/`) — portfolio artifacts (`.mdx`)
- **series** (`src/content/series/`) — multi-post sequences (`.mdx`)

Content API usage:
```ts
import { getCollection, render } from 'astro:content';
const posts = await getCollection('posts');
const { Content } = await render(entry);
// entry.id = slug derived from filename
// entry.data = validated frontmatter
```

### Directory Structure

```
src/
  components/
    global/       # Navigation, Footer, ThemeToggle, ModeToggle, SearchBox
    interactive/  # React islands: InteractiveNetwork, AgenticDiagram, etc.
    content/      # Callout, TagList, RelatedContent, ReadingPathNav
    cards/        # EssayCard, ProjectCard, SeriesCard, SiteLinkCard
    ui/           # Badge, Button, MetadataRow
  content/        # MDX content files (posts/, projects/, series/)
  data/           # Site config, taxonomy, external-sites, portfolio
    site.ts       # Central config: title, nav, social, disclaimer
    taxonomy.ts   # Categories, tag registry, topic hubs
  layouts/        # BaseLayout, PostLayout, ProjectLayout, SeriesLayout, PageLayout
  lib/            # Helpers: content.ts, seo.ts, tags.ts, search.ts, reading-paths.ts
  pages/          # Astro routes
  store/          # Nanostores: themeStore.ts, performanceStore.ts (re-export)
  styles/         # global.css (Tailwind v4)
```

### Data Flow

- **Site config** lives in `src/data/site.ts` — titles, nav, social links, disclaimer
- **Taxonomy** in `src/data/taxonomy.ts` — 7 categories, ~30 curated tags, topic hubs
- **External sites** in `src/data/external-sites.ts` — for Other Sites page
- **Portfolio items** in `src/data/portfolio.ts` — for Portfolio page

### State Management

Uses Nanostores for cross-island state:
- `$theme` — `'light' | 'dark'`, persisted to localStorage
- `$performanceMode` — `'rich' | 'lite'`, persisted to localStorage
- Theme is initialized via inline script in BaseLayout to prevent flash

### Interactive Islands

React components in `src/components/interactive/` are mounted with `client:idle` or `client:visible`. All must:
- Honor `$performanceMode` (provide static fallback in lite mode)
- Not block core content comprehension
- Degrade gracefully without hydration

## Content Authoring

### Adding a Post

Create `src/content/posts/my-slug.mdx` with required frontmatter:

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

Optional: `series`, `seriesOrder`, `featured`, `whyItMatters`, `leaderTakeaway`, `relatedSlugs`

### Categories (fixed set)

AI Agents, Agentic SDLC, Technical Leadership, CTO, Architecture, Platform Engineering, Projects

### Tags

Controlled registry in `src/data/taxonomy.ts`. Prefer 3-6 per post. Only use tags that recur.

## Tailwind v4 Notes

- Uses `@import "tailwindcss"` (not `@tailwind` directives)
- Custom design tokens defined via `@theme { }` blocks in `global.css`
- Dark mode via `.dark` class on `<html>`
- Standard utility classes (`bg-slate-900`, `text-white`, etc.) still work

## Deployment

- **GitHub Pages** via `.github/workflows/deploy.yml`
- Triggers on push to `main` or manual dispatch
- Site URL: `https://signaltosystem.com` (configurable in `astro.config.mjs`)
- CI checks on PRs via `.github/workflows/ci.yml`

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config (site URL, integrations, Tailwind vite plugin) |
| `src/content.config.ts` | Content collection schemas (canonical location) |
| `src/data/site.ts` | Central site configuration |
| `src/data/taxonomy.ts` | Categories, tags, topic hubs |
| `src/layouts/BaseLayout.astro` | HTML shell, meta, theme init, nav, footer |
| `src/styles/global.css` | Tailwind v4 theme, prose styles, utilities |
| `src/store/themeStore.ts` | Theme and performance mode state |
| `public/llms.txt` | Machine-readable site guidance |
| `AGENTS.md` | Machine-readable repo guidance |

## Known Issues

- `z` from `astro:content` shows as deprecated in editor — this is a Tailwind/Astro tooling conflict, builds fine
- `astro.config.mjs` may show a Vite plugin type mismatch — cosmetic, does not affect build
- `astro:content` module resolution errors in editor are expected — types generate at build time (`npm run build` or `astro sync`)
