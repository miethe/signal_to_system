# Enrichment Sources

Gather context **before** drafting. A raw AAR alone is rarely enough to write "how this fits the
AOS arc" or a trustworthy `workflow{}` block; these sources fill that gap. All of them degrade
gracefully: none is required, and a missing source means "omit the field it would have filled,"
never "block the draft" or "estimate instead."

## 1. Local catalog: `src/content/{posts,stories}` frontmatter

Run `scripts/read_catalog.py` first, always. It is offline, fast, and gives:

- **Dedup signal**: has this feature/AAR already been written up? Check titles, `sourceAar`
  labels, and `relatedSlugs` across existing stories before drafting a duplicate.
- **Series continuity**: is there an active `series`/`seriesOrder` this story should join?
- **Taxonomy-in-use**: which `TAG_REGISTRY`/`PROJECTS_REGISTRY`/`AOS_AREAS_REGISTRY` slugs are
  actually being used in practice, as a sanity check against `frontmatter-contract.md`'s registry
  lookups (the registries are the source of truth; this is just a usage cross-check).
- **A concrete "raw dump" example to contrast against**: as of this writing,
  `src/content/stories/after-action-report-fable-5-one-shot-command-center-build.mdx` is still
  `status: draft` on the old post-schema shape (`contentType`/`category`, no `storyType`, no
  `workflow{}`) from before this skill existed, a live migration leftover, not a hypothetical.
  `read_catalog.py`'s output flags any entry missing a `workflow{}` key or a valid `storyType` the
  same way; that heuristic, not a hardcoded filename, is what Entry Mode B actually scans for,
  since this backlog changes as other work lands.

## 2. `op recall [query]`: persona memory

Read-only, no model call, on the op side (`agentic_meta_dev`). Use it to pull durable facts the
persona layer already captured about the feature/subsystem: prior judgments, known gotchas,
cross-references to other work. Treat everything it returns as **context to inform the narrative**,
never as a citable metric in `workflow{}`; persona facts are prose-shaped, not measurements.

```
op recall "<feature or subsystem name>" --json
```

If `op` isn't reachable from this process (it usually runs on the operator's side, not from inside
a headless chain invocation), skip this source; it's a nice-to-have for narrative color, not a
blocking dependency.

## 3. `itt` (IntentTree): the task graph

If the AAR or `pointer.metrics` names an intent/run id, look it up for the original scope (tier,
points, the work-package/pillar it hung off of). This is the best source for `workflow.tier` and
`workflow.points` when the AAR itself doesn't state them, and for the "what we set out to do"
section: the intent's original framing is often more precise than the AAR's own retrospective
summary of it.

## 4. `ccdash report aar --feature <id> [--json]`

The primary source for `workflow{}` numerics when a CCDash `feature_id`/session id is available
(`pointer.session`, or named in the AAR). Prefer `--json` when parsing programmatically; the shape
is `{feature_id, title, summary, sections, cost_breakdown, signals, follow_ups,
source_session_ids, generated_at}`. Markdown mode (`report aar --feature <id>` default) is better
when you want prose to read and pull specific claims from by hand; its stable sections are `##
Summary`, `## What Went Well`, `## What Hurt`, `## Cost & Timing`, `## Signals`, `## Follow-ups`.

Note the overlap with this skill's own Wins/Losses sections: CCDash's `What Went Well`/`What Hurt`
are a **second, independent read** on the same work the AAR describes. Where they agree, that's
corroboration worth stating plainly. Where they diverge (e.g. CCDash flags a cost signal the AAR
didn't mention), surface that in "what it changed / meta-findings": that's exactly the kind of
cross-cutting context a raw AAR dump wouldn't have surfaced on its own.

`forensic.ccdash` on the pipeline-seam payload (Entry Mode A) is already a markdown render of this
same command, fetched by the op side before invoking this skill's chain; check it first before
re-fetching, since a duplicate fetch just burns another network round trip for the same data.

## 5. Research Foundry API (optional)

Only relevant when the AAR references a Research Foundry run (a claim-verification/evidence-bundle
pass that fed the work). Read-only:

```bash
set -a; . ~/.config/research-foundry/serve.env; set +a
curl -s "$RF_API_URL/api/runs/<run_id>" -H "Authorization: Bearer $RF_TOKEN_AGENT"
```

Use this to ground a claim the AAR makes about "the research showed X" with the actual run
record, rather than taking the AAR's paraphrase on faith. Skip entirely if the AAR doesn't
reference a research run; most AARs won't.

## Precedence when sources conflict

1. The scrubbed AAR body is the anchor: it's the human-in-the-loop-reviewed record of what
   actually happened.
2. CCDash/RF are independent corroboration, useful for numbers and for catching what the AAR's
   author didn't think to mention, not for overriding what the AAR says happened.
3. `op recall`/`itt` are narrative color and scope context, not evidence for numeric claims.

Never let an enrichment source override an explicit AAR statement without noting the discrepancy
in the story itself; silent overrides are how an "editorialized" story quietly becomes a
fabricated one.
