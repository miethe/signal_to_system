# P0-B / P0-C Opus taste review — Tier A fidelity fix list

Date: 2026-09-18. Reviewer: Opus (read-only visual judgment leg). Branch
`post/registry-wave-v2-research-integrated`, worktree `.wt/rw-v2-essay`.
Scope: `DIRECTION.md` V4-V10 + `ARCHITECTURE.md`, judged against Tier A
`01_CANONICAL_COMPOSITE_MOCKUPS/*.png` and `IMAGE-GUIDE.md` §7.

**No code was changed by this leg.** Every item below is a report, not an edit.

## Method and evidence

`nvm use 22 && npm run build` (exit 0, 93 pages) → `npm run preview --port 4600`
→ Playwright (Python, chromium) at desktop 1440x900 and mobile 390x844, light and
dark theme forced via `localStorage['s2s-theme']` (the mechanism at
`src/layouts/BaseLayout.astro:97`). Screenshots and two capture logs are in this
directory. Computed styles and element counts were measured in-page rather than
inferred from source; where a claim rests on a measurement the number is quoted.

⚠️ **Read this before trusting the first dark-theme screenshots.** Playwright
defaults to `prefers-color-scheme: light`. Finding **A1** below means that
default silently disabled every Tailwind `dark:` utility on the page. So the
files named `*__desktop-dark.png` / `*__mobile-dark.png` show the site theme set
to dark **with `dark:` utilities inert** — which is a real reader state (any
reader on a light OS who picks the dark theme), but not the intended one. The
`*-dark-osdark.png` set (items 12-14) is the fair dark-theme render. `13b` is the
deliberate A/B of the same region in the broken state. Judgments below are made
against the `osdark` set unless stated otherwise.

---

## A. Must-fix before P1

Ordered by leverage: A1 and A2 are each a handful of characters and each changes
how most of the page looks.

### A1. Tailwind's `dark:` variant is bound to the OS media query, not the site's `.dark` class

**File:** `src/styles/global.css` (no `@custom-variant dark` declared anywhere in
the project — verified across `global.css`, `astro.config.mjs`; there is no
`tailwind.config.*`).

**What's wrong.** Tailwind v4 compiles `dark:` into
`@media(prefers-color-scheme:dark){…}` unless a custom variant says otherwise.
Verified in the built CSS: `dist/_astro/BaseLayout.*.css` contains exactly one
`prefers-color-scheme` block, and 47+ `.dark\:…` utilities sit inside it. The
site's own theme is a `.dark` **class** on `<html>`
(`BaseLayout.astro:36,97-105`). The two never meet. There are **370** `dark:`
utilities in `src/`.

Measured proof, same element, site theme dark both times:

| OS `prefers-color-scheme` | `[class*="bg-blue-50"]` computed background |
|---|---|
| light | `oklch(0.97 0.014 254.604)` — i.e. `bg-blue-50`, near-white |
| dark | `oklab(0.282 … / 0.3)` — i.e. `dark:bg-blue-950/30`, correct |

**Reader-visible consequence.** Six `Callout` blocks on this essay
(`src/components/content/Callout.astro:34,42,50,58`) render as a near-white panel
while their contents keep dark-theme text tokens (`--text-secondary`
`rgb(199,196,215)`). The "Evidence labels" callout wrapping `EvidenceLegend`
(essay MDX line 406-407) is the worst case: light-grey body text on a white
panel, effectively unreadable. See
`06-conclusion-where-this-sits__desktop-dark.png` (broken) against
`13-callout-legend__desktop-dark-osdark.png` (correct).

**What it should be.** V10: dark matches Tier A midnight/navy with restrained
violet structure, and theme is never hardcoded. Fix is one line —
`@custom-variant dark (&:where(.dark, .dark *));` — after which all 370
utilities follow the user's choice.

**Scope note:** this is pre-existing site-wide infrastructure, not something
P0-B/P0-C introduced. It is listed first anyway because until it is fixed, no
dark-theme fidelity judgment on this essay is trustworthy, and it is the cheapest
fix on this list.

### A2. `--accent` is clobbered by a leftover shadcn HSL-triple block, so the violet accent never paints

**Files:** `src/styles/global.css:116` (`:root { --accent: #6366f1 }`) and `:170`
(`.dark { --accent: #c0c1ff }`) — the real editorial accent — are both overridden
later in the same file at equal specificity by `:1770` (`:root { --accent: 210
40% 96.1% }`) and `:1792` (`.dark { --accent: 217.2 32.6% 17.5% }`).

**What's wrong.** Those later values are shadcn-style raw HSL triples intended
for `hsl(var(--accent))`. Used directly as a colour they are invalid, so the
declaration is dropped and the element falls back to inherited colour. Measured
on `.reading-companion__header`: the token resolves to `217.2 32.6% 17.5%` and
the computed `color` is `rgb(218,226,253)` — that is `--text-primary`, not an
accent. **19** live elements on the essay page ask for `var(--accent)` as a
colour; 29 `text-[var(--accent)]` usages exist across `src/components` and
`src/layouts`, plus ~8 `color: var(--accent)` rules inside `global.css` itself
(`:334, :491, :509, :576, :621`).

Also `src/layouts/PostLayout.astro:106` — the reading-progress bar is
`bg-[var(--accent)]`, so it paints no background at all and the progress
indicator is invisible.

**What it should be.** Tier A 01/02/03 use violet consistently for the eyebrow
("EXECUTIVE SIGNAL", "READING COMPANION"), the active outline bullet and the
section rule. Today only the components reaching for the *other* accent tokens
(`--accent-subtle`, `--accent-text`, `--cyan` — all real hex) show colour, which
is why "RUNNING EXAMPLE" is violet but "ON THIS PAGE" is near-white in
`01-entry__desktop-dark.png`. Delete or namespace the `:1756`/`:1779` block.

### A3. `ReadingCompanion` never actually sticks — the rail is absent for ~90% of the essay

**Files:** `src/layouts/PostLayout.astro:211` (`xl:self-start` on the rail
column) and `:125` (`items-start` on the `.post-layout` grid); the sticky wrapper
is `:215`.

**What's wrong.** The wrapper's computed style *is* `position: sticky; top: 96px`,
but `align-self: start` makes the grid item exactly as tall as its own content,
so the sticky element has no travel inside its containing block and cannot pin.
Measured: companion rect `top` goes 457 → -402 across 859px of scroll — a 1:1
move, i.e. no pinning at all — and it is fully off-screen (`bottom: -1473`) by
`scrollY ≈ 2462`, while `.post-layout` is **23306px** tall.

**Reader-visible consequence.** `02-threadscene-incident__desktop-dark.png`
shows the entire right column empty at reading depth.

**What it should be.** V5 and `IMAGE-GUIDE.md` §7 item 3: "Reading Companion is
the only sticky essay sidebar surface at depth." Tier A 02 and 08 both show it
pinned beside mid-essay and conclusion content. The grid item needs to stretch to
the row height (`xl:self-stretch`, or drop `xl:self-start` given the column
already spans both rows) so the sticky child has somewhere to travel.

### A4. Evidence Focus is unreachable from the essay — every evidence link is inside a `<template>`

**Files:** `src/components/content/FocusTemplates.astro` (emits the fragments),
`src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx` (no
evidence entry point), `src/components/content/ReceiptDisclosure.astro` (built,
imported by nothing).

**What's wrong.** Measured two independent ways. Static: stripping
`<template>…</template>` from the built essay HTML leaves **0** of 24
`/evidence/<record>/` links and **0** of 5 `/essays/<slug>/evidence/` links.
Live DOM at all four viewport/theme combinations: `evidenceLinks_live: 0`. The
`FocusHost` pathname interception works correctly (`src/lib/focus-host.ts:74-78`
handles both evidence shapes), but there is no anchor on the page for a reader to
click. `grep -rln ReceiptDisclosure src` returns only the component file, and
`claim-badge` appears 0 times in the built output.

**What it should be.** V9: "The essay keeps a concise 'Receipts behind the
argument' section with `ReceiptDisclosure` summaries; Evidence Focus holds the
full set." `IMAGE-GUIDE.md` §7 items 9-10 both presume the reader can get there.
Needs a real in-flow entry point in the MDX (and/or a rail slot) that links to
`/essays/<slug>/evidence/`.

### A5. Section markers (V6) do not exist

**Files:** no `SectionMarker` component exists — `ls src/components/content/`
has no match for `section`/`marker`, and `grep -rln SectionMarker src` is empty.
Heading rendering is plain `prose-custom` (`PostLayout.astro:249`).

**What's wrong.** Measured on the essay page: `[class*="section-marker"],
[data-section-marker]` → **0** elements; `[aria-current="location"]` → **0**.
There is no ordinal, no reserved-width left rule, and no active state.

**What it should be.** V6 and spec §5: ordinal plus reserved-width left rule,
exactly one active with the violet accent, `aria-current="location"` in the
outline, observer- or rAF-driven, no history pushes. Tier A 02 shows the ordinal
in a bordered box (`01`) beside an eyebrow (`THE STALE REVIEWER · 1 OF 6`); Tier
A 03 shows the active violet rule running the section's full height; Tier A 08
shows `11 / CONCLUSION`. This is the most visible piece of missing editorial
furniture in the static shell — every section currently starts with bare prose
(`02-threadscene-incident__desktop-dark.png`,
`06-conclusion-where-this-sits__desktop-dark.png`).

Reserved-width matters: `IMAGE-GUIDE.md` §7 item 4 requires the active treatment
"without layout shift", so the gutter must be reserved whether or not the marker
is active.

*Scope honesty:* `DIRECTION.md`'s package list assigns "active-section styling"
to **P1**. The static ordinal/eyebrow/gutter is P0-B composition and is what
makes Tier A 02/03 legible as an editorial page, so it belongs here; the active
observer can land in P1 as planned.

### A6. The frontispiece hero is not enabled, so entry does not match Tier A 01

**Files:** `src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx`
frontmatter (lines 16-17 set `heroImage`/`heroAlt` but **no** `heroPlacement`);
mechanism at `src/layouts/PostLayout.astro:71,74,117-123`;
schema at `src/content.config.ts:41`.

**What's wrong.** `heroPlacement` defaults to `'default'`, so `isFrontispiece` is
false and the hero renders in the body column below the header
(`PostLayout.astro:229-237`). Measured: `h1` at y=159, hero plate at y=552 — the
title comes first. Tier A 01 opens with the illustration above the breadcrumb and
title, with an overlaid `Editorial illustration • not a product screenshot`
caption strip. `DIRECTION.md`'s reconciliation table is explicit: "frontispiece
hero stays (spec §4 Entry)". One frontmatter line.

**Latent bug the flip will expose.** `PostLayout.astro:119` wraps the
frontispiece in `max-w-[var(--measure)]`, but that div sits **outside**
`article.post-layout` and `--measure` is defined only on `.post-layout`
(`global.css:409,414`). Verified: the only element resolving `--measure` today is
`.post-layout` itself (84ch → 1280px at xl). So the frontispiece wrapper's
`max-width` would be invalid and dropped, leaving it full-viewport-width below
1280px while the article body stays at 72-84ch. Fix both together.

### A7. `ExecutiveSignal` is in the body column, not the rail

**File:** `src/layouts/PostLayout.astro:242-246`, inside the `min-w-0
xl:col-start-1` div opened at `:220`.

**What's wrong.** Measured at y=1102 — below the 900px fold at entry — and in the
main column, rendered as a two-column `executive-signal--split` card ("WHY THIS
MATTERS" / "CARRY THIS FORWARD"; see
`13-callout-legend__desktop-dark-osdark.png`).

**What it should be.** V5: "`AuthorCard` and `ExecutiveSignal` are in-flow at the
top of **the rail** and scroll away". Tier A 01 puts it second in the right rail,
directly under the author card, as a single violet-tinted serif statement card —
visible at entry, which is the point of a leadership takeaway. The current
placement satisfies "scrolls away" but not "in the rail", and it is not visible
at entry at all. `IMAGE-GUIDE.md` §7 item 2 is about persistence, which is met;
Tier A 01's composition is what is missed.

### A8. The Evidence Focus index route is a bare list with no `h1`

**File:** `src/components/content/EvidenceFocus.astro` — it references only
`record.id`, `record.title`, `record.evidenceClass`, `record.captureType`.

**What's wrong.** `/essays/<slug>/evidence/` has **no `h1` and no `h2`** — the
only headings in the built page are the two rail-card `<h3>`s. The body is a lede
line plus four undifferentiated rows. Meanwhile `src/data/evidence.ts` carries
`supports`, `limitations`, `publicability`, `verifiedAt`, `captureType`,
`evidenceClass` for **12** records, and the per-record route
`/evidence/<slug>/` renders them well (`10-evidence-record-route-full__desktop-dark.png`
— honest "Not stated" values, "WHAT THIS SUPPORTS", "LIMITS", and a correct
"No standalone capture asset is published for this record" note). The data exists;
the index does not use it.

**What it should be.** Tier A 05 makes Evidence Focus itself a full receipt
surface — `RECEIPT SUMMARY` card with title, date, claim badge, the two-column
supported-claim / limitations split — with the index in the rail. At minimum this
route needs its own `h1` and the selected receipt rendered in full.

**Related inconsistency:** the index calls itself "The full receipt set behind
this essay's argument" and lists 4, while the record route's rail lists all 12.
Pick one framing.

### A9. Figures render as a near-white slab in dark theme

**File:** `src/styles/global.css:830-832` — `.dark .figure-plate { background:
#f3f5fa; }` (light value `:822` is `#f6f8fb`).

**What's wrong.** This is a real `.dark` class rule, so unlike A1 it is
deliberate, not a cascade accident — which is why it is phrased as a design
decision to revisit rather than a defect. Measured: **15** `.figure-plate`
elements on the essay page, all computing `rgb(243,245,250)` in dark theme. In
`14-threadscene__desktop-dark-osdark.png` the plate is the brightest object on
the page and outweighs the prose around it; the hero gets the same treatment plus
corner brackets at entry.

**What it should be.** Tier A 02 and 04 mount figures in a **dark navy bordered
panel** whose header row reads `FIGURE 01 · DEPLOYMENT GAP` with `Enlarge figure
↗` at the right, caption in muted text at the bottom — the artwork stays light,
the container does not. Tier A 01's hero bleeds to the pane edges with a caption
overlay and no plate or brackets at all. Since the thread PNGs are cream-toned,
the intent of a light mount is understandable; it is the *container*, not the
artwork, that should go dark.

---

## B. Nice-to-have — defer to the fidelity-pass rounds

1. **No "Enlarge figure" affordance.** Measured: 0 elements matching
   `/enlarge/i`. The figure is clickable (`Figure.astro:121-122` emits
   `data-kind="figure"`) and the viewer opens correctly, but nothing labels it.
   Tier A 02/04 put `Enlarge figure ↗` in a figure header row. Files:
   `src/components/content/Figure.astro`, `ThreadScene.astro`.
2. **Figure header row missing.** Tier A's `FIGURE 01 · DEPLOYMENT GAP` header
   band is absent; only a bottom `FIG · 01` caption exists.
3. **`ThreadScene` title is right-aligned.** `14-threadscene__desktop-dark-osdark.png`:
   eyebrow `1/6 · HISTORICAL ACCOUNT` left, serif `Incident` flush right. Tier A
   02 stacks ordinal + eyebrow + heading on the left. `src/components/content/ThreadScene.astro`.
4. **Only two of V6's four compositions exist.** Measured:
   `.thread-scene--pane` 4, `--split` 0, `--inset` 0, `--measure` 0 (default is
   unclassed). V6 names `measure` (default), `pane`, `split`, `inset`.
5. **`ThreadOverview` rows lack the kind subtitle and use a grey active fill.**
   Tier A 04 shows `01 Incident / Observed account` per row with the active row in
   a violet tint and a violet left border; implementation shows title only with a
   neutral slate fill (`03b-thread-focus-route__desktop-dark.png`).
   `src/components/content/ThreadOverview.astro`.
6. **Thread Focus header hierarchy.** "← Back to essay" is a plain link, not the
   bordered pill of Tier A 04, and "Read this scene in the essay" sits in the
   header at the same weight as everything else rather than as the closing action
   at the bottom of the content. Tier A also shows a quiet `Thread focus  03 / 06`
   counter. `src/components/content/ThreadFocus.astro`.
7. **That header cluster wraps badly at 390px.** Four near-equal-weight controls
   break onto two lines and `Close` ends up least prominent
   (`03-thread-focus-overlay__mobile-dark.png`).
8. **`What this establishes` / `What it does not establish` is un-styled.** It
   *does* render (`ThreadFocus.astro:91-96`, visible in
   `08-thread-focus-route-full__desktop-dark.png`) as a plain two-column card
   below the figure. Tier A 04 gives it an amber-ruled **Evidence boundary**
   callout, which is what marks it as a claim limit rather than more body copy.
9. **`ClaimBadge` renders nowhere.** `claim-badge` appears 0 times in the built
   essay, thread and evidence pages; the component is imported only by
   `EvidenceGuide.astro`. Tier A 02's `Observed account` and Tier A 04's
   `Conceptual branch` pills therefore have no on-page implementation — the kind
   is folded into the eyebrow instead.
10. **No breadcrumb.** Measured 0. Tier A 01 shows `Essays / AI Agents /
    Infrastructure`, Tier A 08 adds the essay title.
11. **`ReceiptIndex` is plainer than Tier A 05.** No numbered circular badges, no
    per-receipt dates, no "N receipts" count, no row arrows; active row is grey
    rather than violet-filled. `src/components/content/ReceiptIndex.astro`.
12. **`FigureViewer` has no title block.** Tier A 06 opens with a `FIGURE T03`
    eyebrow above a serif title, then the image, then caption + long description,
    with `Download (PNG)` and `View long description →` controls. Implementation
    goes straight to the image. Note V7's *substance* is met — `figure-viewer__metadata`
    and `__long-description` both render, and the built figure route carries real
    file metadata (`1672 × 941`, KB, png) read at build. Download/zoom are the
    "unsupported controls" Tier B says the canonical contract supersedes, so treat
    them as optional; the missing eyebrow + title is the real hierarchy gap.
13. **Light theme has no surface differentiation.** `--bg-base` and `--bg-surface`
    are both `#fff` in light, so every card is white-on-white separated only by a
    border (`01-entry__desktop-light.png`). V10 points at Tier E
    `02_light-editorial-variation.png` as the mood reference, which breathes via a
    warm off-white page against white cards.
14. **Overlay backdrop is light for a midnight theme.** `--color-bg-overlay:
    rgba(15,23,42,0.6)` (`global.css:41`) leaves the essay behind the dialog
    clearly legible (`03-thread-focus-overlay__desktop-dark.png`); Tier A 06 dims
    much harder. Shared token — check other consumers before changing.
15. **Inline code in dark prose renders as a light chip** and breaks mid-token
    across lines (bottom of `14-threadscene__desktop-dark-osdark.png`,
    `/.claude/skills/`). Likely resolves with A1; re-check after.
16. **D4 asset retirement is partial.** `diagram-market-wave` now has 0 references
    and is deletable; `diagram-thread-01` and `diagram-estate-before-after` still
    have 1 reference each, so D4's "delete once unreferenced" is not yet due.

---

## C. Out of scope for P0-B / P0-C — recorded so it is not misattributed

- **Mobile `Contents` affordance is absent.** Measured at 390px: no visible
  contents control (the only candidate, an "All sections" button, is inside the
  hidden rail); `.reading-companion` and `.thread-dock` are both correctly
  invisible. Tier A 09 shows a `Contents` pill in the sticky header on every
  mobile panel and `IMAGE-GUIDE.md` §7 names the mobile surfaces. **`DIRECTION.md`
  assigns mobile + a11y to P0-D**, after V12 — so this is scheduled work, not a
  P0-B/C regression. Flagging only so P0-D definitely picks it up.
  Evidence: `07-mobile-midscroll-no-contents__mobile-dark.png`, `07b-mobile-top__mobile-dark.png`.
- **The rail breakpoint is `xl` (1280px), not V5's "~1000px".** Between 1000 and
  1280 there is no rail and no sheet. Conservative rather than wrong, but V5 says
  "measure with real content" — worth a decision in P0-D.
- **`PullQuote`, `ContextualNote`, `ReceiptDisclosure`, `ClaimBadge` are unwired.**
  Measured 0 of each on the page (`blockquote` 0 too). V12 is the leg that "wires
  every component", and P1 owns ContextualNotes. Listed as a V12 handoff note,
  not a P0-B/C defect. (`ClaimBadge` also appears in B9 because Tier A 02/04 show
  it inside surfaces P0-B built.)
- **Thread Focus `h1` is the bare beat id ("Use").** Tier A 04 uses a full
  sentence ("Present in a file does not mean followed in a run."). V12 writes the
  per-beat prose into `threads.ts`, so this is a data gap for that leg.
- **`Navigation` and `Footer` hardcode `class="dark"`.**
  `src/components/global/Navigation.astro:12`,
  `src/components/global/Footer.astro:13`. Measured: the header background is
  identical in both themes (`oklab(0.286 …/0.8)`), so light theme gets a dark
  slate nav above a white page (`01-entry__desktop-light.png`). Pre-existing and
  site-wide — it reproduces on other essays — but it is the most visible single
  defect in light theme and V10 asks for a coherent light editorial treatment.
- **React hydration error #418 on every page.** Reproduced on both other essays,
  the dev story, and the registry-wave essay. Pre-existing, not introduced here.
- **Template payload.** 17 `<template data-focus-view>` fragments on a 272KB
  essay HTML — `ARCHITECTURE.md` risk 4. Under budget for now; the V04
  "real manuscript density" gate should re-measure, and A4's fix will not reduce it.
- **`Callout.tsx:92` uses `prose prose-sm dark:prose-invert`**, which
  `src/CLAUDE.md` states compiles to nothing (`@tailwindcss/typography` is not
  installed). Pre-existing dead classes; harmless but misleading.

---

## D. What is already right — do not "fix" these

Recording these so a fidelity pass does not regress them.

- **V13 data-gating is clean.** Other essays and the dev story get
  `focusDialog: 0, focusTemplates: 0, threadScenes: 0`; the generic rail still
  renders on essays (`companion: true`) and not on stories. No Registry-Wave
  hardcoding leaked into the layouts.
- **The deletions in `ARCHITECTURE.md` §5 landed.** `ThreadStoryboard`,
  `ThreadBeat`, `ThreadRail`, `PostSidebar` are all gone; `takeawayPlacement` is
  retired to a comment in `content.config.ts:38`.
- **P0-C's overlay behaves as designed.** Thread, evidence and figure overlays
  all open in place at every viewport/theme tested, and the logical parent stack
  works: opening a figure from Thread Focus shows both "← Back to essay" and
  "← Back to thread focus" (`05-figure-viewer-overlay__desktop-dark.png`).
  Pathname interception (`focus-host.ts:67-88`) covers all four route shapes, and
  the four standalone routes render fully server-side.
- **The honesty discipline holds where Tier A would have tempted fabrication.**
  `RunningExampleCard` shows the artifact identity and then states plainly that
  role, scope and provenance "are not captured in this build" instead of copying
  Tier A 04's invented Role/Source/Versions/Scope table. `ThreadOverview` carries
  "an editorial sequence … not a record of six separately observed events". The
  evidence record route prints "Not stated" and "No standalone capture asset is
  published for this record". Evidence classes are honest (`method-summary` vs
  `redacted-original`). This is exactly V1/V9 and it should survive the polish
  pass.
- **Thread beat order is the canonical six** (incident, deployment, use, drift,
  detection, outcome) across data, routes and dock, per V2.

---

## E. What I could not screenshot or verify

- **No-JS behaviour (N09).** Not tested. `ARCHITECTURE.md` risk 6 is right that
  this is per-control, not visual; it needs JS disabled per trigger, which this
  leg did not do.
- **Keyboard focus containment and restoration (V4, N11).** Not exercised — the
  overlays were opened programmatically, so `showModal()` focus trapping, Escape,
  and trigger-restoration are unverified by this leg.
- **Return semantics.** "Back to essay" vs "Read this scene in the essay" were
  read in source (`focus-host.ts:444-456`) but not driven; the distinct
  scroll destinations are untested.
- **The `07b-mobile-top` captures are a few hundred pixels off the true top** —
  the site uses smooth scrolling and `scrollTo(0,0)` had not settled, so the
  category pill is clipped. Not a layout defect.
- **Tier A 03's split composition and expanded ContextualNote** could not be
  compared: `[class*="contextual-note"]` is 0 on the page and no `--split` scene
  exists, so there was nothing to photograph.
- **Tier A 07's managed-variation comparison (V8)** was not located in the
  rendered essay and was not searched for exhaustively; V12 owns that movement,
  so it is out of this leg's scope rather than confirmed missing.
- **`figure-viewer__metadata` was not visible** in the overlay at 1440x900
  (the panel clipped below the caption) although it is present in the built
  route HTML. Whether the overlay shows it at a taller viewport is unverified.
- **Light-theme dark-mode interaction.** Because of A1, the light-theme
  screenshots are the only ones whose Tailwind variants behaved normally; any
  light-theme judgment above is therefore firmer than the dark-theme ones taken
  before the `osdark` re-capture.

---

## Screenshot index

All paths relative to this directory.

| View | Desktop 1440x900 | Mobile 390x844 |
|---|---|---|
| Entry / hero | `01-entry__desktop-{dark,light}.png` | `01-entry__mobile-{dark,light}.png` |
| Entry, fair dark | `12-entry__desktop-dark-osdark.png` | `12-entry__mobile-dark-osdark.png` |
| First scroll into ThreadScene | `02-threadscene-incident__desktop-{dark,light}.png` | `02-threadscene-incident__mobile-{dark,light}.png` |
| ThreadScene, pane variant | `02b-threadscene-pane__desktop-{dark,light}.png` | `02b-threadscene-pane__mobile-{dark,light}.png` |
| ThreadScene, fair dark | `14-threadscene__desktop-dark-osdark.png` | `14-threadscene__mobile-dark-osdark.png` |
| Thread Focus (in-place overlay) | `03-thread-focus-overlay__desktop-{dark,light}.png` | `03-thread-focus-overlay__mobile-{dark,light}.png` |
| Thread Focus (standalone route) | `03b-thread-focus-route__desktop-{dark,light}.png`, `08-thread-focus-route-full__desktop-{dark,light}.png` | `03b-thread-focus-route__mobile-{dark,light}.png` |
| Evidence Focus (index route) | `04-evidence-focus-route__desktop-{dark,light}.png`, `09-evidence-index-route-full__desktop-{dark,light}.png` | `04-evidence-focus-route__mobile-{dark,light}.png` |
| Evidence record route | `04c-evidence-record-route__desktop-{dark,light}.png`, `10-evidence-record-route-full__desktop-{dark,light}.png` | `04c-evidence-record-route__mobile-{dark,light}.png` |
| Figure Viewer (overlay) | `05-figure-viewer-overlay__desktop-{dark,light}.png` | `05-figure-viewer-overlay__mobile-{dark,light}.png` |
| Figure route | `05b-figure-route__desktop-{dark,light}.png` | `05b-figure-route__mobile-{dark,light}.png` |
| Conclusion / WhereThisSits | `06-conclusion-where-this-sits__desktop-{dark,light}.png` | `06-conclusion-where-this-sits__mobile-{dark,light}.png` |
| Mobile contents (absent) | — | `07-mobile-midscroll-no-contents__mobile-{dark,light}.png`, `07b-mobile-top__mobile-{dark,light}.png` |
| A1 evidence pair | `13-callout-legend__desktop-dark-osdark.png` (correct) vs `13b-callout-legend__desktop-dark-oslight-BUG.png` (broken) | `13-callout-legend__mobile-dark-osdark.png` |
| V13 regression spot-check | `11-other-essay-1__desktop-dark.png`, `11-other-essay-2__desktop-dark.png`, `11-other-devstory__desktop-dark.png` | — |

Capture log: `capture-log-2.txt` (pass 2, which carries the per-viewport
`facts = {…}` measurements quoted in A4 and section C). The pass-1 log was not
written — that script raised on the mobile `Contents` probe (the very absence
recorded in section C) before its final write, so only its screenshots survive.
The pass-1 and pass-3 measurements quoted above (accent computed colours, sticky
rects, token dumps, route greps) came from separate probe scripts whose output was
read in-session and is not persisted here.
