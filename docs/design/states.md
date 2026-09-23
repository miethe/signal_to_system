# States (node_01M35CKMYGY080GKHKBGR7F1J2)

One primitive — `src/components/primitives/StateNotice.astro` — for every non-content
state on the site: an empty collection, a filtered-to-nothing search, a broken fetch,
a withdrawn piece, a Labs investigation that hasn't published yet, or a page that
doesn't exist. Preview every kind at `/studio/states/` (noindex).

## Kinds

| `kind` | When to use it | Status tint | Notes |
|---|---|---|---|
| `empty` | A real collection or list has zero entries (not a filter — nothing exists yet) | none | Icon: `notebooks`. |
| `no-results` | A search or filter matched nothing | none | Icon: `search`. `role="status"`. |
| `error` | A fetch, build, or client action genuinely failed | danger (red) | Icon: `reproduce`. `role="alert"` — the only kind that is an alert. |
| `withdrawn` | A published piece was retracted after the fact | warn (amber) | Icon: `claims`. Reads as a serious editorial notice, never as an error — no red. Pass `meta` (a date); it renders as "Withdrawn `<meta>`" in mono under the title. |
| `in-preparation` | A section (e.g. Labs) exists but has no published entry yet | accent | Icon: `labs`. `art` defaults on (the `notebook-vista` hero band). |
| `not-found` | The route itself doesn't exist (404) | none | Icon: `sparkle`. `art` defaults on. |

## Shape

A Card-like panel: 1px `--s2s-rule`, `--s2s-radius-card`, `--s2s-surface`. On
≥640px the icon well (40px, `--s2s-inset`, 1px `--s2s-rule-strong`,
`--s2s-radius-control`), a tracked-caps `s2s-label`, a Newsreader title
(`--type-title`, weight 400 via `--type-heading-weight`), a muted body capped at
60ch, and an actions row sit in a row; below 640px they stack. Status reads as a
2px rule at the panel's leading edge — `withdrawn` gets the warn rule,
`error` the danger rule, `in-preparation` the accent rule; `empty`,
`no-results` and `not-found` carry no rule.

When `art` is on, a `notebook-vista` hero (`V2Image kind="hero"`) sits above the
panel body at 180px (140px on `compact`/mobile), veiled into the surface with a
bottom gradient so it reads as part of the same panel, not a separate photo.

`compact` shrinks the icon well, title size and padding for use inside a rail or
a secondary preview (see the article template's inline withdrawn example).

## Where it's used

- **404** (`src/pages/404.astro`) — `kind="not-found"`, with a compact hero above
  it and the real `site.nav` destinations below as quiet links.
- **Search** (`src/components/global/SearchBox.tsx`) — the empty-query state
  (real suggested links: Start here, Series, the newest essay) and the
  no-results state (icon + message + a link to `/tags/`) are hand-built in the
  dialog's own Tailwind-on-`--s2s-*` styling, not the Astro primitive (the
  dialog is a React island).
- **Studio preview** — `/studio/states/` shows every kind, full and compact, at
  realistic copy.

## Article page proposal — reader stays pre-v2 until M2

`src/pages/studio/templates/article.astro` is a **design proposal only**, built
against `DetailRailLayout` and rendered with the newest published post's real
title, excerpt, date, tags, series and (when present) `whyItMatters` /
`leaderTakeaway`. It is not wired into the live essay route. The live reader
(`PostLayout`/`StoryLayout`, `.reader-legacy`) intentionally keeps its pre-v2
look and CSS until M2 — do not point real essay URLs at this template, and do
not change reader CSS to match it. The proposal includes one `StateNotice
kind="withdrawn" compact` example inline, labeled as a state preview, so a
reviewer can see how a retraction would read inside an essay body without
implying this particular essay was withdrawn.
