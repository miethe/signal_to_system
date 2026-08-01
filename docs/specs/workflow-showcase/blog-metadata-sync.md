---
title: "Blog-Showcase Metadata Sync"
description: "Mapping blog post frontmatter to Workflow Showcase stage configuration; ordering, publishing rules, and backward-compatibility."
created: 2026-05-15
status: draft
---

# Blog-Showcase Metadata Sync

## Purpose

This document defines how a blog post's frontmatter connects to a Workflow Showcase stage, including field mappings, ordering rules, publication rules, and URL stability guarantees.

## Required Blog Post Frontmatter

Blog posts in `src/content/posts/` that correspond to a Workflow Showcase stage must include these frontmatter fields:

```typescript
// From src/content.config.ts (posts collection schema)
{
  title: string;              // Post title
  excerpt: string;            // Short summary
  date: Date;                 // Publication date (ISO 8601 or coercible)
  readTime: string;           // e.g., "12 min read"
  contentType: "essay" | "field-note";
  category: string;           // One of 7 defined categories
  tags: string[];             // 1-5 tags
  status: "draft" | "published" | "evergreen";

  // Optional but relevant for Workflow Showcase:
  series?: string;            // Series name (e.g., "Governed Agentic SDLC")
  seriesOrder?: number;       // Position in series (used for stage ordering)
  featured?: boolean;
  updatedDate?: Date;
}
```

For stages tied to the "Governed Agentic SDLC" series, the post must have:
- `series: "Governed Agentic SDLC"` (or exact match to series name in config)
- `seriesOrder: N` (or inferred from post number in slug: `post-1-`, `post-2-`, etc.)
- `status: "published"` (only published posts generate showcase stages)

## Stage Configuration Fields

Each stage in `src/data/workflow-stages.json` includes:

```typescript
{
  id: string;                 // Immutable stage identifier (e.g., "stage-1")
  postNumber: number;         // Series post number (e.g., 1, 2)
  postSlug: string;           // Blog post slug from frontmatter (e.g., "post-1-the-cost-of-ungoverned-agents")
  title: string;              // Stage title
  description: string;        // 1-2 sentence summary
  status: "published" | "draft" | "unreleased"; // Only "published" stages appear in selector
  publishedDate: string;      // ISO 8601 (mirrored from post.date)
  // ... other fields: steps[], artifacts, metrics, ctaLinks
}
```

## Frontmatter to Stage Mapping

| Post Frontmatter | Stage Field | Rules |
|------------------|-------------|-------|
| `title` | (used in narrative, not config) | N/A |
| `date` | `publishedDate` | Copy as ISO 8601 string |
| `series` | (used for filtering) | Must match "Governed Agentic SDLC" |
| `seriesOrder` or slug pattern | `postNumber` | Extract from slug: `post-N-slug` or use `seriesOrder` field |
| `slug` (inferred from filename) | `postSlug` | Exact match (e.g., `post-1-the-cost-of-ungoverned-agents`) |
| `status: "published"` | `status: "published"` | Only published posts generate published stages |
| (N/A) | `id` | Author assigns (e.g., `stage-1`, `stage-2`, immutable) |

## Publication Rule

A stage is considered "published" (visible in the Workflow Showcase selector) only if:

1. Its `status` field is `"published"` in `workflow-stages.json`, AND
2. The corresponding blog post exists in `src/content/posts/` with `status: "published"`, AND
3. The post's `publishDate` (from frontmatter `date` field) is not in the future (relative to today)

If a post is drafted or scheduled, set the stage's status to `"draft"` or `"unreleased"`. Once the post goes live, flip the stage status to `"published"`.

### Example: Post 2 Lifecycle

```yaml
# Post 2 (in src/content/posts/post-2-intent-driven-development.mdx)
---
title: Intent-Driven Development
date: 2026-06-12  # Future date (not yet published)
series: Governed Agentic SDLC
seriesOrder: 2
status: published  # Frontmatter says "published" but date is future
---

# Corresponding stage (in src/data/workflow-stages.json)
{
  "id": "stage-2",
  "postNumber": 2,
  "postSlug": "post-2-intent-driven-development",
  "publishedDate": "2026-06-12",
  "status": "unreleased"  # Not visible until publish date arrives
}

# After 2026-06-12 00:00 UTC:
{
  "status": "published"  # Now visible in selector and page
}
```

## Ordering Rule

Stages are ordered in the Workflow Showcase selector by `publishedDate` (earliest first), not by declaration order in `workflow-stages.json`.

If reordering stages is needed (e.g., a post is scheduled later than the next post), stages will naturally sort correctly by publication date. The declaration order in the JSON is cosmetic; the page renders sorted by date.

### Example: Three Posts, Out-of-Order Declaration

```json
[
  {
    "id": "stage-1",
    "postNumber": 1,
    "publishedDate": "2026-05-15",
    "status": "published"
  },
  {
    "id": "stage-3",
    "postNumber": 3,
    "publishedDate": "2026-07-10",
    "status": "published"
  },
  {
    "id": "stage-2",
    "postNumber": 2,
    "publishedDate": "2026-06-12",
    "status": "published"
  }
]
```

UI renders as: Stage 1 (May 15) -> Stage 2 (June 12) -> Stage 3 (July 10), regardless of JSON order.

## URL Scheme Permanence

The Workflow Showcase URL is contractual and stable:

```
/workflow-showcase/?stage=<stage-id>
```

- `<stage-id>` is the immutable stage id (e.g., `stage-1`, `stage-2`), not the post number
- Once a stage is published, its id never changes (renaming breaks external links from blog posts, social media, PKM)
- Blog posts link to `/workflow-showcase/?stage=stage-N` (one-to-one mapping)
- Reordering, renaming, or repurposing stages does not affect these links

## Backward-Compatibility Rules

If you need to update a published stage:

1. **Update content without changing id** (preferred): Edit the manifest, regenerate with `demo-foundry apply`, keep the id
2. **Retire a stage**: Set `status: "draft"` or `"unreleased"`. Direct links will fall back to the first published stage with an inline notice
3. **Never rename or move a stage id** without a redirect. External links must continue to work

Example: If Stage 2 gets reauthored with new artifacts after a post revision, keep `id: "stage-2"` and `postSlug: "post-2-intent-driven-development"`, update step content and artifacts, regenerate, and deploy. All external links stay valid.

## Example: Post Frontmatter ↔ Stage Config

### Blog Post (src/content/posts/post-1-the-cost-of-ungoverned-agents.mdx)

```yaml
---
title: The Cost of Ungoverned Agents
excerpt: "Vague prompts, confident wrong plans, and token inflation. A case study in agentic misgovernance."
date: 2026-05-15
readTime: "10 min read"
contentType: "essay"
category: "Agentic SDLC"
tags: ["governance", "cost", "agents", "SDLC"]
status: "published"
series: "Governed Agentic SDLC"
seriesOrder: 1
---
```

### Corresponding Stage (src/data/workflow-stages.json)

```json
{
  "id": "stage-1",
  "postNumber": 1,
  "postSlug": "post-1-the-cost-of-ungoverned-agents",
  "title": "Stage 1: Pre-Governance Baseline",
  "description": "What an ungoverned agentic workflow actually looks like: a vague Slack prompt, a confident but wrong agent run, no traceable artifacts, and no memory carried forward.",
  "publishedDate": "2026-05-15",
  "status": "published",
  "steps": [
    {
      "stepId": "step-1-1",
      "label": "Vague ask lands",
      "terminal": [
        "$ slack #builds \"hey can we ship the new onboarding flow this week\"",
        "Posted by pm at 09:07",
        "> No PRD, no acceptance criteria, no owner."
      ],
      "panels": { }
    }
    // ... more steps
  ],
  "metrics": {
    "tokensUsed": 487300,
    "throughput": 8400,
    "cost": 2.44,
    "wallClockTime": "14m 02s",
    "dataSource": "curated (illustration)"
  },
  "ctaLinks": [
    {
      "skillName": "spike",
      "skillUrl": "https://github.com/miethe/MeatySkills/tree/main/skills/spike",
      "copyText": "Replace ad-hoc prompts with a defensible SPIKE."
    }
  ]
}
```

## Validation

When syncing blog posts to stages:

- [ ] Post slug in frontmatter matches `postSlug` in stage config
- [ ] Post `date` matches stage `publishedDate` (both ISO 8601)
- [ ] Post `seriesOrder` or post number from slug matches stage `postNumber`
- [ ] If post `status: "published"` and date is not future, stage `status: "published"`
- [ ] If post is draft or scheduled, stage `status: "draft"` or `"unreleased"`
- [ ] Stage id is immutable (never reused or renamed)

## Troubleshooting

**Q: Stage doesn't appear in selector even though post is published**

Check:
- Stage `status` is `"published"` in `workflow-stages.json`
- Post `status: "published"` in frontmatter
- Post `date` is not in the future (or equals today)
- Blog post file exists in `src/content/posts/`

**Q: Post is published but stage is stuck on "unreleased"**

Solution: Update stage `status` to `"published"` in `src/data/workflow-stages.json` and rebuild with `npm run build`.

**Q: External link to `/workflow-showcase/?stage=stage-2` breaks after reordering**

The link should not break. Stage lookup is by id, not position. Verify:
- Stage id `stage-2` still exists in `workflow-stages.json`
- Stage `status` is `"published"` (if it was manually set to draft, change it back)

---

**Last Updated**: 2026-05-15
