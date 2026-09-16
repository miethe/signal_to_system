# Reading path + WhereThisSits — build notes

Leg brief: public reading-path page + "Where this sits" component. Branch `feat/reading-path-page`.

## Files touched

- `src/data/reading-paths.json` — new. One path (`agentic-systems-engineering-core`,
  `pageSlug: "agentic-systems-engineering"`) with 5 ordered `steps`, mirroring
  `agentic_meta_dev/.wt/chat-0915-theses/infra/lab-timeline/timeline.json` →
  `reading_paths[0]` + `program.umbrella_term`. Each step: `slug` (null for the unwritten
  Deterministic Envelope), `title`, `whatItAnswers`, `state` (`published` | `next`). No
  `date` field anywhere — the Envelope's `date_proposed` in the source timeline is
  explicitly not a commitment and must never surface publicly; keeping dates off every
  step (not just the Envelope) avoids re-introducing that risk by omission elsewhere.
- `src/components/content/WhereThisSits.astro` — new. Props: `slug` (the current essay's
  slug). Looks itself up in `reading-paths.json`, renders prior → this → next plus a link
  to the path page. Throws a build-time error (same pattern as `Term.astro`) if the slug
  isn't in any path — this is deliberate: it means a future path edit or essay rename that
  breaks the link fails the build instead of silently rendering nothing.
- `src/pages/series/agentic-systems-engineering.astro` — new static page. Reads
  `reading-paths.json` directly (not the `series` content collection — a reading path is
  cross-series by design, so it doesn't fit that collection's per-series schema). Astro
  resolves static routes before the `series/[...slug].astro` catch-all, so this file and
  that dynamic route do not conflict; `[...slug]`'s `getStaticPaths()` only ever enumerates
  the `series` collection's ids ("ai-workflows", "governed-agentic-sdlc"), which don't
  include this page's slug anyway.
- `src/pages/series/index.astro` — added a "Reading Paths" section (new `<section>`, not a
  nav restructure) above the existing Active/Complete/Planned lists, reusing `SeriesCard`
  with `slug="agentic-systems-engineering"` (its href is always `/series/${slug}/`, which
  resolves to the new page).
- `src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx`,
  `agentic-operations-flow.mdx`, `the-contract-is-the-work.mdx` — each got an
  `import WhereThisSits from '../../components/content/WhereThisSits.astro';` and one
  `<WhereThisSits slug="..." />` line near the end, before any footnotes/sources section.
  **Registry Wave essay was deliberately left untouched** (being rewritten on
  `post/registry-wave-sept-edition`; brief said not to touch it).
- `src/content/CLAUDE.md` — fixed the stale `<dfn>**Term**</dfn>` note (the live
  convention is the `<Term id="...">**word**</Term>` component, backed by
  `src/data/glossary.ts`) and documented `<WhereThisSits slug="..." />` usage in the same
  Formatting Conventions section.

## How to add a path step

1. Edit `src/data/reading-paths.json` → the path's `steps` array. Insert in reading order;
   `WhereThisSits` derives prior/next purely from array position, not from any `episode`
   or `seriesOrder` field.
2. If the step is a published essay, set `slug` to its post id and `state: "published"`.
   If it isn't written yet, set `slug: null` and `state: "next"` — `WhereThisSits` and the
   path page both render that as an unlinked "next, in progress" label, never a date.
3. Add `<WhereThisSits slug="that-posts-slug" />` near the end of the post's MDX (import
   the component first). Only published, in-path posts should carry it.
4. The path page (`series/agentic-systems-engineering.astro`) re-renders from the same
   JSON automatically — no page edit needed for a step addition, only for headline/copy
   changes.
5. If a *second* reading path is ever added, give it its own `id`/`pageSlug` in the JSON
   array and its own page file under `src/pages/series/`; `WhereThisSits` already searches
   across all paths in the array, so no change is needed there.

## What a build-check leg must verify

- `npm run check` (Astro type check) passes — I did not run it per the brief (sandboxed
  Node gives a false green); this needs a real check.
- Routes render: `/series/agentic-systems-engineering/`, `/series/` (new "Reading Paths"
  section), and the three edited essay pages (`/essays/governed-agentic-sdlc-01-productivity-paradox/`,
  `/essays/agentic-operations-flow/`, `/essays/the-contract-is-the-work/`).
- `WhereThisSits` renders three working states on those three pages: has-prev/has-next
  (Graph), start-of-path/has-next (Paradox), and has-prev/end-with-next-in-progress
  (Contract, since Envelope is unwritten).
- Confirm the ternary/ternary-in-JSX-position syntax in `WhereThisSits.astro` (nested
  `{next ? (...) : (...)}` with an inner ternary) actually compiles — I avoided the `<>`
  Astro fragment shorthand (swapped for a plain `<span>`) because I found no precedent for
  fragment shorthand inside `.astro` files in this repo (only in `.tsx` islands), but I
  could not run the Astro compiler myself to confirm either way.
- `npm run build` succeeds and the JSON import (`import pathsData from '../../data/reading-paths.json'`)
  resolves correctly under Astro's Vite pipeline.

## Uncertainties / things I was not fully sure of

- Whether `Astro.props` destructuring with a typed `Props` interface plus a runtime
  `pathsData as { paths: ReadingPath[] }` cast is idiomatic enough for this codebase's
  strict TS config — I mirrored `Term.astro`'s error-throwing pattern but this is the
  first component here that imports a `.json` data file directly (existing lib helpers
  read the content collections instead), so there's no local precedent to match against.
- The "Attention Is All We Have" series has no `series` collection entry yet, so the
  closing note on `series/agentic-systems-engineering.astro` mentions it by name only
  (no link) alongside linked `Governed Agentic SDLC` / `AI Workflows`. If that series gets
  its own `src/content/series/*.mdx` entry later, this page's closing paragraph should be
  updated to link it too.
- I did not add the reading-path page to any top-level nav (only to `/series/`'s own
  index), per the brief's "do not restructure nav" instruction — worth confirming that's
  the right read of "discoverable."
