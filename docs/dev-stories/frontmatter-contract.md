# Dev Stories Frontmatter Contract

Authoritative. If `.claude/skills/dev-story-editor/references/frontmatter-contract.md` (the
skill's operational mapping guide) ever disagrees with this file, this file wins and that one gets
fixed. The Zod schema in `src/content.config.ts` (`stories` collection) is the one true source of
truth for what Astro will actually accept; this document exists so the `op story` pipeline
(`agentic_meta_dev`) has a single, unambiguous target to emit against without reading this repo's
TypeScript.

## 1. The `stories` collection schema

Collection: `stories`, base `src/content/stories`, loader `glob({ pattern: "**/*.{md,mdx}" })`.
Renders at `/dev-stories/[slug]/` via `hrefFor()`/`StoryLayout.astro`, never `/essays/`.

```ts
{
  // Required
  title: string,
  excerpt: string,
  date: coerced date,           // any string Date.parse can read; prefer "YYYY-MM-DD"
  readTime: string,             // e.g. "6 min read"
  status: "draft" | "published" | "evergreen",
  storyType: "after-action" | "feature-story" | "build-note",
  tags: string[],                // must resolve against TAG_REGISTRY, see §3

  // Provenance
  automated: boolean,            // default true; false marks a curated/editorial override
  sourceAar?: string,            // safe LABEL, never a filesystem path

  // Discovery (shared vocabulary with `posts`)
  projects: string[],            // default []; must resolve against PROJECTS_REGISTRY
  aos?: boolean,
  aosAreas?: string[],           // must resolve against AOS_AREAS_REGISTRY; only when aos: true

  // Workflow-execution metadata; every subfield optional, omit rather than guess
  workflow?: {
    version?: string,           // e.g. "v4"
    orchestrator?: string,
    model?: string,
    tokens?: number,
    tier?: number,
    points?: number,
    commits?: number,
    runId?: string,
    intentId?: string,
  },

  // Shared optional display fields (same as `posts`)
  updatedDate?: coerced date,
  series?: string,
  seriesOrder?: number,
  featured?: boolean,
  heroImage?: string,
  seoTitle?: string,
  seoDescription?: string,
  canonicalUrl?: string url,
  relatedSlugs?: string[],
  whyItMatters?: string,
  leaderTakeaway?: string,
  disclaimer?: string,
  draftNotes?: string,
}
```

**The pipeline must always emit `status: "draft"`.** Nothing in the `op story` → this-skill chain
ever flips a story to `published`/`evergreen`; that is a separate, human-initiated edit, always.

## 2. Taxonomy: resolve or omit, never invent

`tags[]`, `projects[]`, and `aosAreas[]` are controlled vocabularies defined in
`src/data/taxonomy.ts` (`TAG_REGISTRY`, `PROJECTS_REGISTRY`, `AOS_AREAS_REGISTRY`). A value that
doesn't resolve against the live registry must be **omitted**, not coerced into a look-alike slug
and not added as a new one. `aosAreas[]` additionally requires `aos: true` to be set; setting one
without the other is a contract violation (this skill's `scripts/emit_frontmatter.py` treats it as
a validation failure, not a warning).

## 3. Frontmatter this skill emits vs. frontmatter it never touches

| Emits every time | Emits when sourced | Never emits |
|---|---|---|
| `title`, `excerpt`, `date`, `readTime`, `status: "draft"`, `storyType`, `tags[]`, `automated` | `sourceAar`, `projects[]`, `aos`, `aosAreas[]`, `workflow{}`, `whyItMatters`, `leaderTakeaway`, `series`/`seriesOrder` when continuing an existing series | `published`/`evergreen` status, `heroImage` (no image-generation step in this chain), `canonicalUrl`, `disclaimer` (the site-level `AutomatedDisclaimer.astro` banner handles that at render time from `automated`/`sourceAar`, not from a frontmatter override) |

## 4. Backfill mapping (AAR + CCDash + pointer -> frontmatter)

Full detail lives in the skill's `references/frontmatter-contract.md`. Summary:

- `workflow.tokens`/`workflow.commits` prefer a `ccdash report aar --json` read over an AAR-stated
  figure when both exist and disagree; note the discrepancy in the story body rather than silently
  picking one.
- `workflow.tier`/`workflow.points` prefer an `itt` intent lookup (the original scope commitment)
  over a retrospective AAR estimate.
- `storyType` is a keyword heuristic, not a classifier; see the skill reference for the exact
  rules, and expect hand-override on ambiguous AARs.
- `projects[]`/`aosAreas[]` are keyword-matched against the AAR body and `pointer.domains`, then
  filtered through §2's resolve-or-omit rule.

## 5. Follow-ups for the op side

> **Status (2026-07-30): implemented in `agentic_meta_dev`.** All three follow-ups below landed in
> `src/operator_core/adapters/story.py` (+ `tests/adapters/test_story*.py`) and are documented in
> `docs/agentic-operator/contracts/story.md` §7/§7.1. The subsections are retained as the spec they
> were built against; the op-side `story.md` contract now describes the resulting behavior. One
> deferred item is called out inline in §5.1.

These were **not implemented on the `signal_to_system` side**; this repo has no write access to
`agentic_meta_dev`. They were the concrete changes needed in `agentic_meta_dev` before Entry Mode A
(the `$OP_STORY_BLOG_CHAIN_CMD` pipeline seam) produces conformant output end to end.

### 5.1 Point the adapter at `src/content/stories/` with the new schema

`src/operator_core/adapters/story.py` currently targets the **old post schema** and the **posts**
directory in three places:

- `_invoke_blog_chain` sends `"schema": "signal_to_system.posts.dev_story"` in the stdin payload.
  Rename to a stories-scoped id, e.g. `"signal_to_system.stories.dev_story"`. This is an
  identifier for the payload *shape*, not a literal target-directory instruction, but it is
  actively misleading as long as it says "posts" while the actual target is `stories`.
- `_signal_repo()` is fine as-is (it resolves the repo root, not a subdirectory); no change
  needed there.
- `_assemble_mdx` builds **post**-schema frontmatter (`contentType`, `category`, `series: "I Let
  Claude Build My App"`, `seriesOrder` computed by scanning `posts/*.mdx`) and unconditionally
  overwrites whatever the chain command already emitted for `title`/`excerpt`/`date`/`readTime`/
  `contentType`/`category`/`tags`/`status`/`series`/`seriesOrder`/`whyItMatters`/`leaderTakeaway`.
  Once `OP_STORY_BLOG_CHAIN_CMD` is wired to this skill (which already emits conformant
  stories-schema frontmatter, see §1-§4 above), this override step needs to either (a) trust the
  chain's output for the stories-specific fields (`storyType`, `projects`, `aos`, `aosAreas`,
  `workflow`) and only backfill what's genuinely missing, rather than blanket-overwriting with
  post-schema defaults, or (b) be replaced entirely by a call into this skill's
  `scripts/emit_frontmatter.py`-equivalent validation instead of re-deriving fields locally.
- `_create_draft_pr` writes to `repo / "src/content/posts" / f"{slug}.mdx"`. Change the target path
  to `repo / "src/content/stories" / f"{slug}.mdx"`.
- `_next_series_order()` and `_published_posts()`/`_published_match()` (used for triage dedup) scan
  `src/content/posts/*.mdx`. Once stories are the target collection, dedup and series-order lookups
  should scan `src/content/stories/*.mdx` instead (or both, if cross-collection dedup against
  hand-authored essays is still wanted; the `stories` schema's `relatedSlugs`/`series` fields are
  shared vocabulary with `posts`, so cross-collection awareness has real value. That's a design
  choice for the op-side owner, not dictated here).

  **Resolved (op side):** `_next_series_order` now scans `src/content/stories/` and takes the
  series as an argument (series is trusted from chain output, no longer force-set to
  "I Let Claude Build My App"). `_published_match`/`_published_posts` scan **both** `posts/` and
  `stories/` but only `published`/`evergreen` content — filtering out drafts is deliberate, because
  dev stories all share the same fallback tags and an unfiltered scan would false-positive-archive
  a fresh candidate against a sibling draft. **Deferred:** `_catalog_signal_posts` (the MeatyWiki
  catalog-export projection) still scans only `posts/` with `/essays/` URLs; extending it to the
  `stories` collection / `/dev-stories/` URLs is out of scope here (separate catalog contract) and
  remains a follow-up.

### 5.2 Wire `OP_STORY_BLOG_CHAIN_CMD`

Point it at a headless invocation that follows this skill's `workflows/single-story.md` against
the JSON contract in `.claude/skills/dev-story-editor/references/pipeline-contract.md`. No literal
wrapper script ships from this task (see that skill's "Deferred / Do Not Say"); the env var itself
is the integration point.

### 5.3 Fix the AAR discovery gap

`StoryAdapter._discover_repo` (the walk `op story scan` runs over each registry repo) matches an
AAR one of two ways:

```python
if fm.has_frontmatter and not fm.malformed and fm.data.get("type") == "aar":
    ...
elif "type: aar" in first_lines and fm.malformed:
    ...
# separately, a second pass:
for path in repo.rglob("*-aar.md"):
    ...
```

Newer AARs in `agentic_meta_dev` are stamped `doc_type: aar` (not `type: aar`) and carry a
`feature_slug` field, with filenames that don't match the `*-aar.md` suffix glob, for example
`.claude/worknotes/aos-native-by-default/aar.md` and
`.claude/worknotes/patent-review-council/AAR-2026-06-26.md`. Neither the frontmatter check
(`fm.data.get("type") == "aar"`, which is `None` for a `doc_type: aar` file) nor the filename glob
(`*-aar.md`, which doesn't match `aar.md` or `AAR-2026-06-26.md`) catches these; they are silently
skipped by every `op story scan` run. Fix: match `fm.data.get("type") == "aar" or
fm.data.get("doc_type") == "aar"` in the frontmatter check, and treat `feature_slug` presence as an
additional (not exclusive) signal alongside the `type`/`doc_type` check, since some AARs may carry
`feature_slug` without either legacy key. The filename-glob fallback pass should stay as a
secondary net for unstamped files, not be relied on as primary discovery.
