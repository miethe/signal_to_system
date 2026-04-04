# CLAUDE.md

Signal to System: A professional technical publication and portfolio built with Astro, authored by Nick Miethe.

## Project Overview

Static-first technical blog focused on AI agents, agentic SDLC, technical leadership, architecture, and platform engineering. Deployed via GitHub Pages with CI/CD.

**Not** a generic blog or portfolio — this is a technical publication for the agentic era, authored by a practicing technical executive / builder.

## Two Modes of Work

This repo serves two workflows. Use nested CLAUDE.md files for context:

1. **Site development** (Astro, React, Tailwind) — see `src/CLAUDE.md`
2. **Content authoring** (blog posts, series, editorial) — see `docs/CLAUDE.md` and `src/content/CLAUDE.md`

External directories provide research and drafting context:
- `Blogs/` (PKM) — drafts, series materials, reviews, voice guidance
- `MeatyBrain/` (PKM root) — research vault, Workflow OS, Agentic SDLC notes

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Astro 6** | Static site framework (Content Layer API) |
| **React 19** | Interactive islands (`client:idle`, `client:visible`) |
| **Tailwind CSS v4** | Styling (`@import "tailwindcss"`, `@theme` blocks) |
| **MDX** | Content authoring with embedded components |
| **Nanostores** | Cross-island state (theme, performance mode) |
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

## Content Collections (Quick Reference)

Canonical schema: `src/content.config.ts` (NOT `src/content/config.ts`).

Three collections: **posts** (essays/field notes), **projects** (portfolio artifacts), **series** (multi-post sequences). All in `src/content/` as `.mdx`.

For full content authoring guidance, see `src/content/CLAUDE.md`.

## Deployment

- **GitHub Pages** via `.github/workflows/deploy.yml`
- Triggers on push to `main` or manual dispatch
- Site URL: `https://signaltosystem.com`
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
| `public/llms.txt` | Machine-readable site guidance |
| `AGENTS.md` | Machine-readable repo guidance |

## Context Files (Progressive Disclosure)

Read these only when relevant to the task at hand:

| File | When to Read |
|------|-------------|
| `.claude/context/key-context/agent-teams-patterns.md` | Delegating to multiple agents or designing agent workflows |
| `.claude/context/key-context/context-loading-playbook.md` | Optimizing what context to load for agent sessions |
| `.claude/context/key-context/layered-context-governance.md` | Working with multi-tier context strategy |
| `.claude/context/extracted/agent-delegation-patterns.md` | Choosing between Agent tool patterns |
| `.claude/context/extracted/layered-context-model.md` | Understanding context layering theory |
| `.claude/context/development-tracking-playbook.md` | Tracking multi-phase development work |
| `.claude/specs/claude-fundamentals-spec.md` | Generic Claude Code patterns and best practices |
| `.claude/specs/multi-model-usage-spec.md` | Multi-model orchestration (Gemini, Codex, etc.) |
| `.claude/specs/doc-policy-spec.md` | Documentation creation rules and anti-patterns |

## Known Issues

- `z` from `astro:content` shows as deprecated in editor — Tailwind/Astro tooling conflict, builds fine
- `astro.config.mjs` may show a Vite plugin type mismatch — cosmetic, does not affect build
- `astro:content` module resolution errors in editor are expected — types generate at build time (`npm run build` or `astro sync`)

## Available Skills

When writing blog content, use these skills:
- `/voice-writer` — draft or edit in Nick's authentic voice (reads `My Voice.md`)
- `/humanizer` — reduce AI-detectable patterns in a draft
- `/blog-drafter` — full blog drafting workflow from spec to MDX

Other useful skills: `/notebooklm` (source-grounded research), `/gemini-cli` (second opinions, web search), `/nano-banana` (generate diagrams/images), `/content-research-writer` (research + writing)
