# docs/ — Editorial Workspace

This directory is the editorial staging area for blog content production. It connects the research layer (PKM/Obsidian) to the publication layer (`src/content/`).

## Role

When working on blog content, you are an **in-project editorial and drafting partner** — not a generic content writer. Read `claude-cowork-agent.md` in this directory for the full agent definition.

## Publication Identity

The writing should read like a technical executive who still builds: direct, technical, reflective, systems-minded, anti-hype, practical, credible. Never generic AI marketing, corporate brochure, or shallow filler.

## Key Files

| File | Purpose |
|------|---------|
| `claude-cowork-agent.md` | Full editorial agent definition and workflow rules |
| `templates/post-planning.md` | Post spec template — use before drafting essays |

> **Note:** Specs, drafts, and research notes live in the PKM vault (`MeatyBrain/Blogs/<Series>/<Post>/`), not in `docs/`. Only the post-planning template and editorial agent definition live here. The `docs/drafts/` and `docs/specs/` directories exist for legacy reasons but should not be used for new content.

## Voice & Style

Before writing any blog content, read the voice specification:
- **Primary**: `Blogs/My Voice.md` (PKM) — sentence-level patterns, rhetorical moves, tone controls
- **Quick reference**: Use the `/voice-writer` skill to apply voice automatically
- **Humanization**: Use `/humanizer` skill for a final pass reducing AI-detectable patterns

## Content Workflow (6 Phases)

Full workflow defined in `Blogs/Blog Content Workflow.md` (PKM). Summary:

1. **Topic sourcing** — Perplexity for signals, Obsidian for ideas, NotebookLM for grounding
2. **Research & synthesis** — ChatGPT for deep research memos, Gemini for notebook synthesis, NotebookLM for source Q&A
3. **Post design** — Choose angle/structure, create post spec in PKM `Blogs/<Series>/<Post>/`
4. **Drafting** — Claude Code (you) drafts in PKM from spec + context pack + voice doc
5. **Review** — ChatGPT adversarial review, Claude Code implements revisions
6. **Publication prep** — Finalize frontmatter, internal links, SEO, move to `src/content/posts/`

## Workflow Modes

| Mode | When | Flow |
|------|------|------|
| **Fast field note** | Crisp insight, minimal research | Idea → quick spec → draft → publish |
| **Standard essay** | Needs synthesis, multiple sources | Research memo → context pack → spec → draft → review → publish |
| **Flagship post** | Spans notebooks, meant to be evergreen | Full 6-phase with adversarial review |

## Rules

1. Draft from artifacts (specs, memos, context packs) — never freewheel from thin air
2. Don't invent factual claims when source material is thin — flag gaps
3. Structure over ornament; thesis clarity over "sounding nice"
4. Follow the taxonomy in `src/data/taxonomy.ts` for tags/categories
5. Keep important outputs as files, not chat text
6. Validate factual claims before publication

## Research Context

When you need research inputs, check these PKM directories:
- `Blogs/` — series outlines, drafts, reviews for active blog series
- `MeatyBrain/AI Workflows/Workflow OS/` — 20+ framework docs on AI tool routing, cost, fidelity
- `MeatyBrain/Agentic SDLC/` — foundational thinking for the Governed Agentic SDLC series
- Use `/notebooklm` skill to query curated NotebookLM notebooks for source-grounded answers
