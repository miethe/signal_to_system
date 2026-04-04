# src/ — Site Development

This directory contains all site source code. For content authoring, see `content/CLAUDE.md` instead.

## Directory Structure

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
  layouts/        # BaseLayout, PostLayout, ProjectLayout, SeriesLayout, PageLayout
  lib/            # Helpers: content.ts, seo.ts, tags.ts, search.ts, reading-paths.ts
  pages/          # Astro routes
  store/          # Nanostores: themeStore.ts, performanceStore.ts
  styles/         # global.css (Tailwind v4)
```

## Data Flow

- **Site config** — `data/site.ts` (titles, nav, social links, disclaimer)
- **Taxonomy** — `data/taxonomy.ts` (7 categories, ~30 curated tags, topic hubs)
- **External sites** — `data/external-sites.ts` (Other Sites page)
- **Portfolio items** — `data/portfolio.ts` (Portfolio page)

## State Management

Nanostores for cross-island state:
- `$theme` — `'light' | 'dark'`, persisted to localStorage
- `$performanceMode` — `'rich' | 'lite'`, persisted to localStorage
- Theme initialized via inline script in BaseLayout (prevents flash)

## Interactive Islands

React components in `components/interactive/` mount with `client:idle` or `client:visible`. All must:
- Honor `$performanceMode` (static fallback in lite mode)
- Not block core content comprehension
- Degrade gracefully without hydration

## Tailwind v4

- Uses `@import "tailwindcss"` (not `@tailwind` directives)
- Custom design tokens via `@theme { }` blocks in `styles/global.css`
- Dark mode via `.dark` class on `<html>`

## Content API

```ts
import { getCollection, render } from 'astro:content';
const posts = await getCollection('posts');
const { Content } = await render(entry);
// entry.id = slug derived from filename
// entry.data = validated frontmatter
```
