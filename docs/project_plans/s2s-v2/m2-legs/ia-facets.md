# Leg brief — ia-facets (node_01M35CKN7GTP6JSNT4V8QP3W9F, S2S-015/016)

Read `_common.md` first. Base commit: `53ca251`. Lane: gpt-5.6-terra, workspace-write.
The lead owns visual QA; you apply established patterns, you do not invent new visual language.

## Part A — re-host the remaining old-design facet routes onto the v2 shell
Already v2 (do not redesign): `series/index`, `series/[...slug]` (via `SeriesLayout`),
`tags/*`, `topics/[topic]`, `/writing/`, `/dev-stories/`.
Still on the pre-v2 design (Tailwind literals, `var(--bg-*)`, `InteractiveNetwork` headers):
- `src/pages/series/agentic-systems-engineering.astro`
- `src/pages/systems/index.astro`, `src/pages/systems/[project].astro`
- `src/pages/aos/index.astro`, `src/pages/aos/[area].astro`
- `src/pages/dev-stories/orchestrator/[orchestrator].astro`, `src/pages/dev-stories/workflow/[version].astro`
- `src/pages/essays/index.astro`
- `src/pages/glossary.astro`

Patterns (read the diffs):
- Detail/listing facet page: commit `b026060` — `src/pages/tags/[tag].astro` and
  `src/pages/topics/[topic].astro` (BaseLayout + `PageHero` + `SectionHeading` + `Card` rows,
  `StateNotice` for empty).
- Card listings of writing: commit `53ca251` — `src/pages/dev-stories/index.astro`
  (`CollectionPanel`, `FeatureCard layout="stack"` with `pills`, `MetaLine`, `FacetRail`,
  `PathList`, `RailCard`) and `src/components/family/README.md`. For story lists (orchestrator,
  workflow pages) reuse exactly the dev-stories card: type pill (AAR / Feature story / Build note),
  provenance pill (Human + agent | Automated, plus Reviewed only when `reviewed: true`).
- `/essays/` index: `HubLayout` without a photo, one `CollectionPanel` per format present among
  posts (read model `getPublications()` / `byFormat()` from `src/lib/writing.ts`), featured
  `FeatureCard` + `EntryRow` list, like `src/pages/writing/index.astro` (commit `2bf4153`).
Keep every URL, every piece of real data and every filter behavior the old page had (query-param
filters: keep them working via progressive enhancement like `/dev-stories/`). Remove
`StoryCard`/`InteractiveNetwork` imports only from pages you migrate; do not delete components.

## Part B — feeds and search contracts
- `src/pages/rss.xml.ts` and `src/pages/search.json.ts`: fields and item shape must stay
  byte-compatible for existing consumers. Add `tests/m0/feeds-contract.test.mjs` that (when `dist/`
  exists) parses `dist/rss.xml` and `dist/search.json` and asserts the exact field sets per item
  type as they are at base commit `53ca251` (record them from a build of that commit, in the test).
- Per-format feeds: `src/pages/feeds/[format].xml.ts` emitting one RSS feed per format that has
  published items (essay, dev-story, and any other format with items), built from
  `getPublications()`, same channel metadata as `rss.xml`. Add the new routes to the manifest
  (action `add`, family `feeds`, milestone `M2`) and re-write the route snapshot. Add
  `<link rel="alternate" type="application/rss+xml">` for the matching format feed on `/essays/`
  and `/dev-stories/` only. Test: each feed parses as RSS 2.0 and every item link is a built route.

## Acceptance
- `npm run verify` exits 0; `grep -l "var(--bg-\|InteractiveNetwork" <the migrated pages>` is empty.
- `node scripts/check-palette-literals.mjs` reports no new literals (baseline unchanged).
- No overflow at 390px on migrated routes (report any you could not fix).
- Two commits are fine here: `feat(facets): ...` (Part A) and `feat(feeds): ...` (Part B).
