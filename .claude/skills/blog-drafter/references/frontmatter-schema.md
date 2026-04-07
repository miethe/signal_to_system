# Frontmatter Schema & Publication Prep (Phase 6)

## Required Frontmatter Fields

All posts must include complete frontmatter in YAML at the top of the MDX file:

```yaml
---
title: "Post Title"
excerpt: "One-sentence description — direct and specific, not tagline-like"
date: YYYY-MM-DD
readTime: "N min"
contentType: essay  # or field-note
category: "Category Name"
tags: ["tag-one", "tag-two", "tag-three"]
status: published  # or evergreen
---
```

### Field Details

| Field | Type | Rules | Example |
|-------|------|-------|---------|
| `title` | string | Clear, specific. 50-70 chars ideal. No generic/tagline language. | "Control Planes for AI: Why Your Agents Need Governance" |
| `excerpt` | string | Single sentence. Direct and specific. Describes what reader will learn, not tagline-like hype. | "How to architect agent environments with context, skills, and observable state—preventing drift and scaling safely." |
| `date` | YYYY-MM-DD | Publication date. Use today if publishing immediately. | "2026-04-07" |
| `readTime` | string | Estimated read time. Format: "5 min", "12 min", "25 min". Rounds to nearest minute. | "8 min" |
| `contentType` | enum | One of: `essay` (long-form, structured argument) or `field-note` (shorter, opinionated, less formal) | "essay" |
| `category` | enum | One of 7 fixed categories (see Category Registry below). Do NOT invent new categories. | "Agentic SDLC" |
| `tags` | array | 3–6 tags. Must come from registry in `src/data/taxonomy.ts`. Do NOT invent new tags. See Tag Registry below. | ["agents", "context-engineering", "platform-engineering"] |
| `status` | enum | One of: `draft`, `published`, `evergreen`. Use `published` for time-sensitive posts; `evergreen` for timeless guides. | "published" |

## Optional Frontmatter Fields

Include these when applicable (do not force if not relevant):

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `series` | string | Name of the series this post belongs to | "Governed Agentic SDLC" |
| `seriesOrder` | number | Position in series (1-indexed) | 3 |
| `featured` | boolean | Highlight post in featured section | true |
| `whyItMatters` | string | 1-2 sentence callout of business/architectural relevance | "This pattern prevents agent context drift and uncontrolled technical debt in scaled agentic teams." |
| `leaderTakeaway` | string | Key takeaway for CTOs/architects (distilled to 1-2 sentences) | "Treat your agent's environment as a first-class deployment artifact. Observable context = observable behavior." |
| `relatedSlugs` | array | Array of post slugs (without .mdx) to link as related reading | ["control-planes-for-agents", "context-engineering-primitives"] |
| `heroImage` | string | Path to hero image (in `public/` directory) | "/images/posts/hero-agents.png" |
| `seoTitle` | string | SEO title (if different from main title) | "Agent Governance: Building Observable AI Systems" |
| `seoDescription` | string | SEO description (if different from excerpt) | "Learn how to architect agent environments with context governance, preventing drift and enabling observability." |
| `draftNotes` | string | Internal notes for the author (not published) | "Check with Nick on final recommendations for CCDash integration." |

## Category Registry (Fixed Set of 7)

Do NOT invent new categories. All posts must fit into one of these:

1. **AI Agents** — Core AI agent concepts, capabilities, patterns, model selection
2. **Agentic SDLC** — Development methodology, orchestration patterns, governance for agentic workflows
3. **Technical Leadership** — Decision-making, team dynamics, strategy, organizational patterns
4. **CTO** — Executive-level strategic topics, business impact, ROI, scaling considerations
5. **Architecture** — System design, patterns, trade-offs, infrastructure decisions
6. **Platform Engineering** — Internal developer platforms, infrastructure-as-code, enabling systems
7. **Projects** — Case studies, project retrospectives, lessons learned from specific implementations

**If a post doesn't fit any category**: Flag for user review before publishing. Do not force fit or invent a new category.

## Tag Registry (From `src/data/taxonomy.ts`)

Use ONLY tags from the canonical registry in `src/data/taxonomy.ts`. Do not invent new tags. Tags should:
- Recur across multiple posts or form a coherent taxonomy
- Be specific enough to be useful for navigation
- Avoid redundancy (don't tag both "agents" and "agent-orchestration" if one post uses both)

Common tags (verify against `src/data/taxonomy.ts` for complete list):
- `agents`, `orchestration`, `context-engineering`, `governance`, `observability`
- `agentic-sdlc`, `intent-driven-development`, `structured-artifacts`
- `platform-engineering`, `infrastructure`, `internal-developer-platforms`
- `technical-leadership`, `architecture`, `systems-design`

**When in doubt**: Check existing posts in `src/content/posts/` for tag patterns. Use 3–6 tags per post. Tags should support discovery, not be exhaustive.

## Publication Move Procedure

Once the draft is finalized and frontmatter verified:

1. **File path**: Copy from `docs/drafts/[post-slug]-draft.mdx` to `src/content/posts/[post-slug].mdx`
2. **Filename**: Strip the `-draft` suffix (required for Astro collection routing)
3. **Verification**: Confirm the file exists and is readable in `src/content/posts/`
4. **Leave the draft**: Original file in `docs/drafts/` can remain or be archived

Example:
```
From: docs/drafts/control-planes-for-agents-draft.mdx
To:   src/content/posts/control-planes-for-agents.mdx
```

## Frontmatter Verification Checklist

Before moving to publication:

- [ ] `title` is specific and clear (not generic or tagline-like)
- [ ] `excerpt` is one sentence, direct, and specific (not a tagline)
- [ ] `date` is correct (today or desired publish date in YYYY-MM-DD format)
- [ ] `readTime` is accurate (verify by rough calculation: ~200 words per minute)
- [ ] `contentType` is `essay` or `field-note` (not other values)
- [ ] `category` is one of the 7 fixed categories (not invented)
- [ ] `tags` contains 3–6 tags, all from `src/data/taxonomy.ts` (no invented tags)
- [ ] `status` is set to `published` or `evergreen` (not `draft`)
- [ ] Optional fields are present only if relevant to the post
- [ ] No typos or formatting errors in YAML

## Example Frontmatter (Complete)

```yaml
---
title: "Control Planes for AI Agents: Architecture and Governance"
excerpt: "How to architect control planes that keep AI agents aligned, observable, and bounded within enterprise guardrails."
date: 2026-04-10
readTime: "12 min"
contentType: essay
category: Architecture
tags: ["agents", "governance", "control-planes", "observability", "platform-engineering"]
status: published
series: "Governed Agentic SDLC"
seriesOrder: 3
whyItMatters: "Without explicit control planes, scaled agentic teams risk drift, uncontrolled technical debt, and loss of architectural coherence."
leaderTakeaway: "Treat your agent's environment as a deployed artifact. Observable control = observable behavior = measurable ROI."
relatedSlugs: ["intent-driven-development", "context-engineering-primitives", "agentic-observability"]
seoTitle: "AI Agent Control Planes: Architecture for Scale"
seoDescription: "Learn how to design control planes that keep AI agents aligned, observable, and constrained within enterprise standards."
---
```

## Example Frontmatter (Minimal)

```yaml
---
title: "Why Literate Programming Matters for AI-Assisted Development"
excerpt: "How Knuth's 40-year-old idea is the perfect interface for working with probabilistic code generation."
date: 2026-04-08
readTime: "8 min"
contentType: essay
category: "Agentic SDLC"
tags: ["literate-programming", "developer-experience", "code-quality"]
status: published
---
```

## Notes

- **Frontmatter is critical for routing and metadata**: Astro uses `contentType`, `category`, and `tags` for collection filtering and navigation. Errors here break navigation and SEO.
- **Taxonomy compliance is strict**: The blog's tag and category systems depend on consistency. Inventing new values breaks the taxonomy and makes posts undiscoverable.
- **Excerpts are not taglines**: Avoid marketing language. Excerpts should describe what the reader will learn or understand, not tease them with mystery.
- **Read times are estimates**: Use ~200 words per minute as a baseline. Round to nearest minute (7 min, not 7.2 min).
