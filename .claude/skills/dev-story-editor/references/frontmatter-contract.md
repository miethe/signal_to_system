# Frontmatter Contract: operational reference

This is the *operational* mapping guide this skill's workflows follow. The *authoritative* schema
+ op-side follow-ups doc is
`/Users/miethe/dev/homelab/development/signal_to_system/docs/dev-stories/frontmatter-contract.md`;
if this file and that one ever disagree, that one wins and this one gets fixed.

Canonical schema source: `src/content.config.ts` (`stories` collection, Zod). Read it directly if
in doubt; do not trust a paraphrase, including this one, over the live schema.

## 1. Fields this skill must always set

| Field | Rule |
|---|---|
| `title` | From the AAR's own title/`feature_slug` if present; else `pointer.title`. Strip a leading `AAR:`/`After-Action Report:` prefix (the `storyType` badge already signals that); the title should read like a headline, not a doc-type label. |
| `excerpt` | One sentence, written, not copied from the AAR's TL;DR verbatim. |
| `date` | AAR frontmatter `date` if present, else `pointer.date`, else today. |
| `readTime` | Estimate from final word count (~200 wpm), e.g. `"7 min read"`. |
| `status` | **Always `"draft"`.** Never emit `published`/`evergreen`; see SKILL.md Guardrails. |
| `storyType` | `after-action \| feature-story \| build-note`; see §2. |
| `tags[]` | Slugify each candidate against `TAG_REGISTRY` (`src/data/taxonomy.ts`); drop anything that doesn't match. Never coin a new tag slug. |

## 2. `storyType` heuristic

1. If the source is a genuine incident/session AAR (`pointer.source in {"manual","frontmatter","glob"}`,
   i.e. a real filesystem AAR, not a synthetic CCDash stub) with a clear before/after arc, use `after-action`.
2. If the source is `ccdash_synthetic`/`ccdash_aar_review` **and** the content reads as a shipped
   feature's end-to-end story (spans multiple sessions, has a completion moment) rather than a
   single incident, use `feature-story`.
3. If the content is short, single-session, and has no real wins/losses arc (a status note, not a
   story), use `build-note`. Prefer this over forcing a thin AAR into `after-action` shape.

This is a heuristic, not a classifier; override by hand for ambiguous cases (see SKILL.md
"Deferred / Do Not Say" section "Known gaps").

## 3. Provenance

| Field | Rule |
|---|---|
| `automated` | `true` unless a human has materially rewritten the piece beyond this skill's chain (rare; default and leave `true` in normal operation). |
| `sourceAar` | A safe **label**, never a filesystem path; see `pipeline-contract.md` §3. Something like `"AAR: <feature-slug-or-title>, <date>"`. |

## 4. Discovery fields (`projects[]` / `aos` / `aosAreas[]`)

All three must resolve against `src/data/taxonomy.ts`; never invent a slug.

- **`projects[]`**: match `pointer.project` and any AAR-body project/system names against
  `PROJECTS_REGISTRY` slugs (case-insensitive, slugified). Also check `pointer.domains` for a
  project-shaped hint (e.g. `"skillmeat"`, `"intenttree"`). Unmapped candidates are omitted; do not
  add a look-alike slug that isn't in the registry.
- **`aos`**: `true` if any resolved `projects[]` entry has `aos: true` in `PROJECTS_REGISTRY`, or
  the AAR body explicitly frames the work as Agentic OS/AOS work. Otherwise omit (the schema
  default is `optional`, not `false`; omitting is correct when genuinely unknown, but prefer
  explicit `false` only when you've positively determined it's NOT AOS work, not just unsure).
- **`aosAreas[]`**: only populate when `aos: true`. Keyword-match AAR body/domains against
  `AOS_AREAS_REGISTRY` slugs:

  | Signal in AAR/domains | `aosAreas` slug |
  |---|---|
  | operator, routing, classify, dispatch, tier | `orchestration` |
  | persona, memory, recall, judgment | `memory` |
  | research foundry, `rf`, evidence, claim | `research` |
  | meatywiki, wiki, knowledge, compile | `knowledge` |
  | skillmeat, skill, agent package, artifact | `artifacts` |
  | dev-execution, sdlc, gate, review, plan/execute | `execution` |
  | intenttree, `itt`, intent, task graph | `intents` |
  | node, infra, deploy, service, podman, systemd | `infra` |
  | story, blog chain, publish, signal to system | `publishing` |

  Multiple areas may apply; include every area with real signal, not just the first match.

## 5. `workflow{}` backfill

Every subfield is optional; omit rather than guess. Source precedence, high to low:

1. `forensic.ccdash` (parsed `ccdash report aar --json` shape, if the raw markdown forensic blob
   was instead fetched as JSON via `enrichment-sources.md`'s CCDash step): most trustworthy for
   `tokens`, cost/timing-derived fields, and `commits` (via its cost_breakdown/session data).
   Cross-check against the AAR body when both are present rather than blindly preferring one.
2. The AAR body itself: many AARs already state their own tier, points, commit count, model, and
   orchestrator name in prose (see the `after-action-report-fable-5-one-shot-command-center-build`
   example under `src/content/stories/`, which states "6 commits", "XHigh effort", orchestrator
   name, and delegate count directly in its TL;DR).
3. `pointer.metrics` (populated only for `ccdash_synthetic`/`ccdash_aar_review` sourced pointers).

| Subfield | Source example |
|---|---|
| `version` | An AAR-stated workflow/loop version (e.g. `"v4"`), if named. Often absent, omit. |
| `orchestrator` | Named orchestrator/agent identity if the AAR states one (e.g. a Claude Code session alias). |
| `model` | Primary model named in the AAR; if multiple models were used, name the primary and note the rest in prose, not here. |
| `tokens` | Numeric token spend, from CCDash cost data or an AAR-stated figure. |
| `tier` | Numeric AOS tier (T0-T4 style), if the AAR/intent names one. |
| `points` | Story points, if the AAR/intent names them. |
| `commits` | Commit count, from `forensic.git` line count or an AAR-stated figure; cross-check both when available. |
| `runId` / `intentId` | Only when the AAR or `itt` lookup names a concrete run/intent id; never fabricated. |

## 6. Appendix markup

Wrap the scrubbed AAR verbatim in a native `<details>` block at the end of the body, after the
"How it fits the AOS arc" section:

```mdx
<details>
<summary>Raw AAR (unedited)</summary>

<AAR body, verbatim, exactly as received on the `aar` field>

</details>
```

Do not summarize, trim, or re-flow the AAR inside the appendix; the entire point is that the raw
material stays inspectable underneath the narrative. `<details>` renders natively in MDX/HTML; no
frozen component is needed for it.
