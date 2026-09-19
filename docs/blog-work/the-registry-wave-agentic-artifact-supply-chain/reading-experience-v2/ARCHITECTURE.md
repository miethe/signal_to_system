# P0-C architecture decision: inspection controller + route tree

Decision leg for `DIRECTION.md` V4. Read against `$H/02_EXPERIENCE_SPEC.md` §13,
`$H/03_NAVIGATION_AND_STATE_CONTRACT.md` (all sections), `$H/04_COMPONENTS_AND_ASSETS.md`,
`$H/contracts/types.ts`, `$H/prototype/controller.js`, and the current
`src/layouts/{BaseLayout,PostLayout}.astro`, `src/pages/essays/[...slug].astro`,
`src/data/threads.ts`, `src/content.config.ts`, and `src/components/content/{Figure,PostSidebar,ThreadRail,ThreadBeat,ThreadStoryboard}.astro`.

**Correction to this leg's own brief, stated plainly before the decision:** the brief and
`$H/03_*` both assert "`BaseLayout` uses Astro `ClientRouter`." That is false for the current
codebase. `grep -r ClientRouter src` returns zero hits outside this handoff's own docs;
`BaseLayout.astro` renders no `<ClientRouter />`/`<ViewTransitions />` component, and
`astro.config.mjs` sets no `output`/router config. The `astro:page-load` /
`astro:after-swap` listeners scattered across `Figure.astro`, `PostSidebar.astro`,
`ThreadRail.astro`, the card components, etc. are defensive (`astro:page-load` also fires
once on ordinary first load, ClientRouter or not) — they are not evidence ClientRouter is
wired. The site today does plain multi-page navigation. This doesn't change which option
V4 asks for choosing between — it just means the choice is easier than the brief implies,
because there is no live ClientRouter lifecycle to integrate with in the first place.

## 1. Decision

**Own history directly for this reader route group; do not integrate with Astro
ClientRouter.** The essay route, the three new focus routes, and the figure route are
ordinary Astro static pages navigated with plain `<a href>` links (full page loads). Layered
on top, one `FocusHost` script per page manages `history.pushState`/`replaceState` and a
`popstate` listener under a private `rwFocus` state key — mirroring `$H/prototype/controller.js`'s
design (per V11) — to drive the in-place overlay. No `astro:page-load`/`astro:before-swap`
hooks are added for this feature.

**Why:** `$H/02_*`§13 and `$H/03_*`§4 both state this is the *default* recommendation for
reading routes regardless of what the rest of the site does, and integrating a second
navigation model would only be forced if ClientRouter were actually present and mandatory
site-wide — it isn't. Building this feature against a router that doesn't exist is premature
coupling: it would require inventing lifecycle-adapter code today for a hazard (two competing
`popstate` owners) that the current codebase cannot produce, and it would need redoing anyway
if ClientRouter is ever adopted, since that adoption is its own project with its own lifecycle
contract. Plain multi-page navigation is also what makes N06/N07/N09 (direct URL, refresh,
no-JS) trivially true by construction rather than something the controller has to simulate.

## 2. Route tree

All four routes are `getStaticPaths`-driven static pages (project default `output` is
`'static'`; no adapter is configured) and each renders full content without JS, per V4/N09.

| Route | File (new unless noted) | `getStaticPaths` source |
|---|---|---|
| `/essays/<slug>/` | `src/pages/essays/[...slug].astro` (existing, unchanged) | `getCollection('posts')` |
| `/essays/<slug>/thread/<beat>/` | `src/pages/essays/[slug]/thread/[beat].astro` | Cross product of `getCollection('posts')` filtered to posts with a `threads[post.id]` record, × that thread's `beats` (from `src/data/threads.ts`) |
| `/essays/<slug>/evidence/` | `src/pages/essays/[slug]/evidence/index.astro` | One entry per post with an evidence set — `Object.values(evidence).filter(r => r.relatedSceneIds includes a beat of threads[post.id])` |
| `/evidence/<record>/` | `src/pages/evidence/[record].astro` | One entry per record in `src/data/evidence.ts` (flat, **not** post-scoped — see §4) |
| `/essays/<slug>/figure/<id>/` | `src/pages/essays/[slug]/figure/[id].astro` | Cross product of posts with a thread × that thread's beat ids; figure id === beat id for the six canonical scenes. The two closing figures (before/after estate, deep estate) are **not** routed — V8 keeps them in the closing sequence, never an expandable |

`/evidence/<record>/` is deliberately top-level, not nested under `/essays/<slug>/`, because
evidence records are a site-wide resource per V13 (a second essay's receipts should be able
to reuse a record without a URL implying essay ownership); `/essays/<slug>/evidence/` is the
essay-scoped index into that same flat set. **Risk:** verify neither new top-level segment
(`evidence`, and `essays/[slug]/*` alongside the existing `essays/[...slug]`) collides with
Astro's route-matching before P0-B builds it — `$H` flags this explicitly and it hasn't been
checked here.

Each of the four new page files renders the *same* shared component (`ThreadFocus.astro`,
`EvidenceFocus.astro`, `FigureViewer.astro` — see §3) that also gets rendered inline into the
essay page's `<template>` fragments. One renderer, two mount points; never a second
hand-written view.

## 3. Dialog host design

One `FocusHost` Astro component, mounted once by `PostLayout` (and by the four new route
files, so a direct arrival at e.g. `/essays/x/thread/incident/` still has a working host if the
reader then opens a *child* view — evidence or figure — from there). It owns:

- **One `<dialog>` element**, opened with native `showModal()` — the same primitive
  `Figure.astro`'s existing private lightbox already uses, so there's one focus-trap/Escape/
  backdrop mechanism in the codebase, not two competing ones (see §5, risk 3).
- **Content source: inline `<template>` fragments, not a client fetch.** Since the site is
  static (no SSR endpoint to ask for a fragment at runtime, and no wish to hand-roll one),
  `PostLayout` renders `ThreadFocus`/`EvidenceFocus`/`FigureViewer` once per relevant id
  *inline on the essay page itself*, each wrapped in `<template data-focus-view="thread:incident">`
  etc. — real server-rendered Astro output, not a JS string literal (the prototype's
  `window.RW_DATA.views` object was the same idea, done by hand; `<template>` is Astro's
  native equivalent and isn't parsed/fetched until cloned). `FocusHost.open(kind, id)` clones
  the matching template into the dialog and shows it. This is what lets the exact same
  component author both the standalone route and the overlay content with no second
  explanation (V3).
- **Logical parent stack**, not nested DOM dialogs: an in-memory `Map<key, {kind, id,
  parentKey, scrollTop, focusTargetId}>` plus a `currentKey`/`rootKey`, structurally the same
  shape as `controller.js`'s `entries` map (reused as reference per V11, rewritten in
  TypeScript — the prototype's Georgia/dark-only markup and CSS are not carried over). Opening
  evidence or a figure *from* Thread Focus pushes a child entry under the current thread key
  rather than replacing the dialog's whole state; closing one level pops to `parentKey`.
- **History**: one entry point locks the root (`replaceState` on first open, capturing scroll
  position under `rwFocus.key`), each subsequent open/swap `pushState`s or `replaceState`s a
  child key, and one `popstate` listener reconciles `history.state.rwFocus` back to the
  matching map entry (or calls `restoreRoot()` if the key is the root / unknown). This is the
  transition table in `$H/03_*`§3 implemented directly, not paraphrased.
- **Focus containment/restoration** (V4, `$H/03_*`§5–6): capture `document.activeElement` and
  scroll `{x,y}` before the first open; on full close, restore scroll then
  `.focus({preventScroll:true})` on the original trigger, falling back to the nearest heading
  and then the article `h1` if the trigger no longer exists. Tab stays inside the open
  `<dialog>` for free via `showModal()`; a programmatically-focusable title inside the cloned
  template receives initial focus, never a giant `aria-describedby` wrapper.
- **Return semantics kept distinct** (N11): "Back to essay" always calls the full-chain close
  (`closeAll` → `restoreRoot`, original scroll position); "Read this scene in the essay" closes
  the chain and then does an explicit `scrollIntoView` + focus on `#thread-<beatId>` — a
  different, deliberate destination, never the old scroll position.
- **No-JS / modifier-click safety**: every trigger (`data-kind`/`data-key` on an `<a href="/essays/.../thread/incident/">`)
  is a real link to the standalone route first; the host's click handler only hijacks
  unmodified primary clicks (`!ctrlKey && !metaKey && !shiftKey && !altKey && button===0`),
  matching the prototype's guard. If `history.pushState` throws (storage/navigation
  unavailable), the host degrades to letting the real `href` fire rather than trapping the
  reader in a half-open dialog (N10).

## 4. Data contracts

**`src/data/threads.ts`** is rewritten, not extended: beat order reverts to the canonical six
(`incident`, `deployment`, `use`, `drift`, `detection`, `outcome` — today's file has the wrong
six: `incident, divergence, detection, reconcile, use, outcome`). Each `ThreadBeat` record
gains the fields V3/V12 require so inline and focus rendering share one paragraph: `kind`
(`historical | conceptual | mechanism | proposed`, from `$H/contracts/thread-manifest.json`'s
`mode`), `establishes: string`, `doesNotEstablish: string`, `longDescription: string`, and
`relatedEvidenceIds: string[]` (post-scoped strings — see the risk below, not the contract's
`BeatId[]`). `recap` stays as the one real paragraph both `ThreadScene` (inline) and
`ThreadFocus` (route/dialog) render — neither writes its own version.

**`src/data/evidence.ts`** is new: a flat `Record<string, EvidenceRecord>`, seeded from
`$H/contracts/evidence-records.json` per V9 but reshaped to the fuller field set in
`02_EXPERIENCE_SPEC.md`§8 / `contracts/types.ts`'s `PublicEvidenceRecord` (id, title,
evidenceClass, captureType, sourceUrl, sourceRevision, eventDate, recordedDate, verifiedAt,
supports, limitations, publicability, relatedSceneIds, publicCapturePath) — reuse that
interface directly rather than reinventing a shape, widening `relatedSceneIds` from the
contract's `BeatId[]` to `string[]` (see risk list, §6) so a second post's thread can
reference it later without a type change. P0-A re-grounds each record against the manuscript's
actual receipts before this file is written; this leg only fixes its shape.

**Consumption, one path each:**
- Inline: `ThreadScene.astro` (new — see §5) imports `threads`, looks up its own beat by
  `slug`+`beatId`, renders figure + `recap` + status label + an "Explore thread" link to
  `/essays/<slug>/thread/<beatId>/`, optionally with a `ReceiptDisclosure` for any
  `relatedEvidenceIds`.
- Route + overlay: `ThreadFocus.astro` does the same lookup and renders the fuller
  composition (heading, kind label, `recap`, figure, establishes/does-not, `RunningExampleCard`,
  `ThreadOverview`). It is invoked twice per essay build — once by
  `pages/essays/[slug]/thread/[beat].astro` for the standalone route, once inside a
  `<template>` on the essay page itself for the overlay (§3) — same component, same props,
  zero forked copy.
- `EvidenceFocus.astro` and `FigureViewer.astro` follow the identical two-mount-point pattern
  against `evidence.ts` and `threads.ts` respectively.

## 5. Component reuse vs. replacement

| Component | Disposition | Why |
|---|---|---|
| `ThreadStoryboard.astro` | **Delete.** Confirmed unwired: not imported by the essay MDX, `PostLayout`, or any page — only self-referenced and mentioned in comments elsewhere. | V3 |
| `ThreadBeat.astro` | **Delete.** `grep -rl ThreadBeat src/content` returns only this essay's MDX, and every one of its six call sites uses the default `card` variant (none pass `variant="marker"`) — no other post uses either variant. | V3 ("keep only if grepped reuse elsewhere" — there is none) |
| `ThreadRail.astro` | **Retired as a file; its beat-list markup, active-state styling, and `computeListWindow` windowing logic port into a new `ThreadDock.astro`** inside `ReadingCompanion`. Its current coupling to `ThreadStoryboard`'s `beatchange` CustomEvent is dropped (that emitter is deleted) — `ThreadDock`'s active-beat state instead comes from the same section/scene observer `SectionMarker` needs (V6), one observer, not two. | V3, V5 |
| `PostSidebar.astro` | **Refactored, not deleted, into `ReadingCompanion.astro`.** Same sticky-column ownership role, rebuilt to the three-slot contract (nearby outline + `ThreadDock` + ≤1 `ContextualNote`) instead of today's takeaway-card/author-card/TOC/accordion. The `takeawayPlacement` frontmatter field and its `showRailTakeaway` branch in `PostLayout.astro` are removed with it, since `ExecutiveSignal` now always sits in-flow at entry (V5). | V5 |
| `Figure.astro` | **Props kept unchanged** (`variant`/`width`/`height`/`longDescription`/etc.). Its *own* private `<dialog class="figure-lightbox">` (lines ~150–205) stays as the default for every ordinary figure elsewhere on the site — untouched, so other posts render unchanged (V13). Only when a new `figureId` prop is supplied does `expandable` route the trigger to `FocusHost` (`href="/essays/<slug>/figure/<id>/"`, `data-kind="figure" data-key="<id>"`) instead of opening its private dialog. This is what makes V7 additive rather than a sitewide `Figure` migration. | V7, V13 |

## 6. Risks for P0-B/P0-C to watch

1. **Route collision** — confirm `/evidence/<record>/` and `/essays/[slug]/*` don't collide
   with the existing `src/pages/essays/[...slug].astro` catch-all before writing the four new
   page files; unchecked in this leg (per `$H`'s own instruction).
2. **`relatedSceneIds`/`relatedEvidenceIds` typed too narrowly.** `contracts/types.ts`'s
   `BeatId` is a hardcoded six-value enum for this one thread. Ship `evidence.ts` and the
   `threads.ts` extension with `string[]`, or V13's "site-wide capability, first consumer
   here" is false the moment a second essay gets a thread.
3. **Two dialog mechanisms on one page.** `Figure.astro`'s private lightbox and `FocusHost`'s
   shared dialog must never both be open at once on the essay page. `FocusHost.open()` should
   close any open `[data-figure-dialog]` before showing its own, as a hard invariant, not an
   assumption.
4. **Template payload weight.** Inlining `ThreadFocus`×6 + `EvidenceFocus` + `FigureViewer`×6
   as `<template>` fragments on every essay page adds real HTML weight even though templates
   aren't parsed until cloned — watch page size at the V04 "real manuscript density" QA gate,
   and make sure images inside templates stay `loading="lazy"`/not preloaded.
5. **Dead `astro:page-load` listeners.** Deleting `ThreadRail.astro`/`ThreadStoryboard.astro`
   must also remove their `document.addEventListener('astro:page-load', …)` registrations
   along with the files — they're harmless no-ops once unmounted, not a correctness bug, but
   leaving them is a tell that the delete was partial.
6. **No-JS audit is per-control, not visual.** N09 passes only if every "Explore thread" /
   "Read this scene" / evidence / figure trigger is a real `<a href>` to a working standalone
   route with JS off — check this by disabling JS per control at implementation time, not by
   eyeballing the rendered page.

## Summary

The reading-route group navigates with plain Astro static pages and owns its own
`pushState`/`popstate` history directly, because Astro `ClientRouter` is not actually present
anywhere in this codebase today (the brief's premise was wrong) and both handoff documents
recommend exactly this as the default regardless; a `FocusHost` overlay clones pre-rendered
`<template>` fragments of the same `ThreadFocus`/`EvidenceFocus`/`FigureViewer` components that
back the four new static routes (`/essays/<slug>/thread/<beat>/`, `/essays/<slug>/evidence/`,
`/evidence/<record>/`, `/essays/<slug>/figure/<id>/`), so the overlay and the standalone pages
never diverge into two hand-written explanations. `ThreadStoryboard` and `ThreadBeat` are
confirmed dead/single-use and get deleted outright; `ThreadRail` and `PostSidebar` are
repurposed rather than replaced into `ThreadDock`/`ReadingCompanion`; `Figure.astro` gains an
opt-in `figureId` path into the shared overlay while keeping its existing private lightbox as
the untouched default everywhere else. The open risks that most need a second pair of eyes
before P0-B starts building are the unchecked route collision and the too-narrow `BeatId[]`
typing that would quietly re-hardcode this as Registry-Wave-only.
