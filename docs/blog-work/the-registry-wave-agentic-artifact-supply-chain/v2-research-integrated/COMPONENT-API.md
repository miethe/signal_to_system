# Registry Wave review-v4 — frozen component API

Frozen by the key agent before W1/W3 fan-out. W1 implements exactly these signatures; W3 (manuscript)
codes MDX against them without waiting on W1's internals. If a leg finds a genuine blocker, it may
extend (never break) a signature and must say so plainly in its leg report.

House style: every new/changed `.astro`/`.tsx` file gets a short header doc-comment in the existing
style (see `PostSidebar.astro`, `LeaderTakeaway.astro`).

## 1. `src/data/threads.ts` — extend `ThreadBeat`

```ts
export interface ThreadBeatImage {
  src: string;       // "/assets/posts/<slug>/<file>.png"
  alt: string;
  caption?: string;
}

export interface ThreadBeat {
  id: string;         // unchanged; anchor id is `thread-${id}`
  n: number;
  label: string;
  recap: string;      // 1-2 sentences; storyboard is now the ONLY place this renders
  image: ThreadBeatImage;
  secondaryImage?: ThreadBeatImage; // beat 3 (Detection) only: the five-day elapsed frame
}
```

Beat order/content per D3 (six beats: Incident, Divergence, Detection, Reconcile, Use, Outcome) with
images per the direction's table. `secondaryImage` on the Detection beat uses
`registry_wave_drift_across_five_days.png` (shown as a second panel or merged caption within that
beat, not a separate beat/anchor).

## 2. `ThreadStoryboard.astro` (new) — `src/components/content/`

```ts
interface Props {
  slug: string;
  initialBeat?: string; // beat id; defaults to beats[0].id
}
```

- Single instance per post, rendered once in movement 4 ("From artifact to use").
- Root element: `<section data-thread-storyboard data-slug={slug} id="thread-storyboard">`.
- One panel per beat, each `id={`thread-${beat.id}`}` (this is the anchor every other component
  targets — ThreadBeat marker links, ThreadRail links, and plain `#thread-<id>` URLs all point here).
- Selector row: plain `<button type="button" aria-pressed={...}>` per beat (no `role="tab"` — D10
  killed that pattern for ArtifactTaxonomy/ArtifactControlPlane too), plus explicit Prev/Next buttons.
  Left/Right arrow keys move focus+selection between beat buttons (roving tabindex or simple
  focus-follows-selection; either is acceptable).
- Selecting a beat expands it in place to show: beat label (real heading, e.g. `<h3>`), the recap (1-2
  sentences, exactly `beat.recap`), the beat's `Figure` (using `beat.image`; Detection also renders
  `secondaryImage` as a second frame/caption), and the caption. No separate ThreadBeat card duplicates
  this content anywhere else in the body (see ThreadBeat marker variant, below).
- No autoplay, ever. Respect `prefers-reduced-motion`: swap panels instantly, no slide/fade transition
  when reduced motion is requested (or simplest: no animated transition at all, matching ThreadRail's
  existing `reduceMotion()` helper pattern).
- **No-JS fallback**: markup ships as an ordered list of all beats (label + recap, always visible text)
  with only the *first* beat's `Figure` actually inlined; script then upgrades this into the interactive
  single-frame selector and lazy-reveals the other beats' figures on selection. (A `<details>`/`<summary>`
  per beat, with the first one `open`, is an acceptable and encouraged base markup — it satisfies the
  no-JS ordered-list requirement for free and gives JS something concrete to progressively enhance
  instead of fighting against.)
- On mount and on `hashchange`, if `location.hash` matches `#thread-<id>` for one of its beats, select
  that beat (this is how ThreadBeat's marker variant and ThreadRail links "jump to" a specific beat —
  plain anchor navigation, no custom event contract needed between components).
- Dispatch `new CustomEvent('threadstoryboard:beatchange', { detail: { beatId }, bubbles: true })` on
  its root element every time the active beat changes (selection click, keyboard, or hash match). This
  is ThreadRail's only sync signal — see below.

## 3. `ThreadBeat.astro` — add marker variant (breaking-free addition, not a rewrite)

```ts
interface Props {
  slug: string;
  beat: string;
  variant?: 'card' | 'marker'; // default 'card' (today's full-card behavior, untouched)
}
```

`variant="marker"` renders a light inline marker only: a real heading element (fixes the D10 a11y note
— today's `<p>` under `aria-labelledby` becomes e.g. `<h4>` or a heading-level appropriate to context),
text `"{n}/{total} · {label}"`, wrapped in an `<a href={`#thread-${beat.id}`}>` to the ThreadStoryboard
panel. No recap text, no figure, no border-card chrome. This is the only ThreadBeat usage in this
essay's new manuscript (used sparingly, e.g. once near the movement-4 heading or not at all if the
storyboard's own selector row already carries this signal — W3's call, record it in the closeout if
omitted). The existing `variant="card"` full-card rendering must keep working unchanged for other posts.

## 4. `ThreadRail.astro` — sync with storyboard, drop nested scroll

Props unchanged (`{ slug: string }`). Behavior changes only:

- Remove the six-target-section `IntersectionObserver` machinery (`visibilityObserver`/`stepObserver`
  keyed to `#thread-<id>` sections) — those sections no longer exist as separate scroll stops; they are
  panels inside one `ThreadStoryboard`. Replace with:
  - **Active-link sync**: listen for `threadstoryboard:beatchange` (bubbles, so listen on `document` or
    the nearest common ancestor) and set `aria-current="step"` on the matching rail link, matching
    today's visual treatment for the current step.
  - **Auto open/close**: keep a single `IntersectionObserver` on the `#thread-storyboard` root element
    (not six targets) driving the existing `threadrail:auto` open/close event, same 250 ms close-delay
    pattern as today.
  - Rail links keep `href={`#thread-${beat.id}`}` — clicking one is a plain anchor jump; the storyboard's
    own `hashchange` listener (see above) does the rest. No new custom event needed from rail → storyboard.
- **Single scroll owner (D10)**: remove `.thread-rail__nav { overflow-y: auto; }` (drop the nested
  scroll region). The existing `computeListWindow`/`fitList` windowing (already implemented) is the
  only mechanism for fitting the beat list into available height; it already shows "+N more"
  above/below instead of scrolling. If six beats plus header genuinely cannot fit even windowed to 1
  visible row, that is an acceptable edge case — do not reintroduce an inner scrollbar to solve it.
- `PostSidebar.astro`'s accordion coordination code (TOC vs rail) does not need to change — it only
  measures/toggles the rail's outer panel, which still exists with the same wrapper markup
  (`[data-thread-rail-wrap]`, `[data-thread-rail]`, badge/collapse buttons all keep their current ids
  and data-attributes).

## 5. `ExecutiveSignal.astro` (new) — `src/components/content/`

```ts
interface Props {
  whyItMatters: string;
  takeaway?: string;
  showTakeaway?: boolean; // PostLayout passes this based on takeawayPlacement + viewport-independent SSR rule below
}
```

Two-column on desktop (`sm:grid-cols-2` or similar), stacked on mobile: left "Why this matters" (uses
`whyItMatters`), right "Carry this forward" (uses `takeaway`, only rendered when `showTakeaway` is
true). Replaces the current ad-hoc `whyItMatters` `<aside>` block and the `LeaderTakeaway` render
inside `PostLayout`'s body flow. Since Astro has no client-side viewport conditional at SSR time, render
both the rail takeaway card (in `PostSidebar`) and this component's takeaway half unconditionally in
markup and let CSS (`xl:hidden` / `hidden xl:block`, mirroring the existing author-card pattern in
`PostLayout`) decide which one shows at a given breakpoint — `showTakeaway` here should just gate
"does this essay want a takeaway rendered at all" (from `takeawayPlacement`), not viewport.

## 6. `RevisionNote.astro` (new) — `src/components/content/`

```ts
interface Props {
  note: string;       // thin one-line summary, e.g. "thesis revised after external review and a deployment failure"
  revisedDate: string;
  changelogHref?: string;
}
```

Thin single line under the metadata row (not a `Callout`-style box): the line plus a `<details>`
`"What's changed?"` disclosure. Replaces `EditionBanner` for this post only; `EditionBanner.astro`
itself is untouched and stays available for other posts.

## 7. `BoundaryGrid.astro` (new) — `src/components/content/`

```ts
interface Props {
  items: Array<{ left: string; right: string }>; // e.g. { left: "Authenticity", right: "Safety" }
}
```

Renders the four non-equivalences (`Authenticity ≠ Safety`, etc.) as a visually distinct grid, not a
plain bullet list or table. Reuse the house "engineering plate" corner-tick visual language if it fits
(see `.figure-plate` / `.thread-beat__corner` precedent in existing components) or a simpler bespoke
treatment — leg's call, documented briefly in its own header comment.

## 8. `ImplementationStatus.astro` (new) — `src/components/content/`

```ts
interface Props {
  rows: Array<{
    label: string;
    status: 'IMPLEMENTED' | 'PARTIAL' | 'PROPOSED' | 'TO TEST';
    detail?: string;
  }>;
}
```

Rows with a status chip (four distinct visual treatments, colorblind-safe — do not rely on color alone;
pair with text/icon). Replaces the current "What this looks like in my lab" prose list.

## 9. `ReceiptDisclosure.astro` (new) — `src/components/content/`

```ts
interface Props {
  label: string;     // e.g. "Evidence receipt · Aug 6 · drift check"
  summary: string;   // the finding, stays in prose too — this is not the ONLY place it appears
}
// slot: raw YAML / shell output content, wrapped in <details>
```

Native `<details>` wrapping raw evidence; label + summary are visible without expanding.

## 10. `ClaimBadge.astro` (new) — `src/components/content/`

```ts
interface Props {
  kind: 'observed' | 'measured' | 'proposed' | 'related-work' | 'external' | 'hypothesis'; // same vocabulary as Evidence.astro
}
```

Small inline badge replacing literal `[Observed]`-style bracket labels in prose. Can wrap/reuse
`Evidence.astro`'s existing kind-to-label/definition map (`evidenceClasses`) rather than duplicating it
— either export that map from `Evidence.astro` or have `ClaimBadge` render an `<Evidence kind={kind} />`
internally with adjusted inline styling. `EvidenceLegend.astro` becomes a small legend placed near the
first `ClaimBadge` usage (or a footer disclosure) instead of its current full-callout treatment; the
component itself needs no prop changes, just a new call site and lighter surrounding wrapper.

## 11. `RelatedWork.astro` (new) — `src/components/content/`

```ts
interface Props {
  summary: string; // one sentence, always visible
  citations: Array<{ text: string; href?: string }>; // 2-4 items, sourced ONLY from 03_prior_art_and_attribution.md / 09_sources.md
}
```

One sentence + `<details>` disclosure with 2-4 citations. W3 owns sourcing the citations (never invent
one; if a needed source isn't in those two files, omit it and name the gap in the closeout).

## 12. `PullQuote.astro` (new) — `src/components/content/`

```ts
interface Props {
  variant?: 'quote' | 'thesis-marker'; // 'thesis-marker' for "Trusted artifact ≠ trusted use."
}
// slot: the quote text
```

Wide-margin display treatment; `thesis-marker` variant is visually distinct from an ordinary blockquote
(no quotation marks/attribution chrome — it reads as a stated thesis line). At most 4 uses in this
essay, drawn only from the review's pull-quote shortlist.

## 13. `Figure.astro` — extend, keep every existing call site working unchanged

```ts
interface Props {
  src: string;
  alt: string;
  caption?: string;
  number?: string;
  credit?: string;
  creditHref?: string;
  variant?: 'default' | 'hero' | 'inline' | 'wide' | 'technical'; // 'default' and 'hero' behave exactly as today
  expandable?: boolean; // default true for 'default'/'wide'/'technical'; the hero variant has no caption today and stays non-expandable unless a caption is also passed
  width?: number;
  height?: number;
  mobileSrc?: string;
  longDescription?: string;
}
```

- `default`/`hero` variants: unchanged visual output from today (existing lightbox/dialog stays).
- `wide`: breaks out of the `.prose-custom` measure (full-bleed or near-full-bleed) — for technical
  SVGs/diagrams that need more than 72ch.
- `technical`: like `wide` but with whatever distinct visual treatment (thinner plate border, different
  label style) the leg judges reads as "schematic" vs "editorial photo/illustration" — house style call.
- `expandable`: the existing dialog/lightbox mechanism (already implemented) gated by this prop instead
  of always-on; when `false`, render the figure without the enlarge affordance/dialog at all.
- `width`/`height`: pass through to the `<img>` to reserve aspect ratio (prevents CLS); required
  whenever known (W2 records each PNG's actual dimensions when placing it).
- `mobileSrc`: when present, use a `<picture>` element with a mobile breakpoint source instead of a
  bare `<img>`.
- `longDescription`: rendered as visually-hidden text associated with the figure (e.g. `aria-describedby`
  pointing at a visually-hidden paragraph) for screen readers on dense technical figures.
- Every current caller (`PostLayout.astro`'s hero call, any other post using `Figure`) must keep working
  with zero changes to their existing prop lists — this extension is additive only.

## 14. `PostSidebar.astro` — new takeaway slot

```ts
interface Props {
  slug?: string;
  headings?: Heading[];
  takeaway?: string;       // NEW
  showTakeaway?: boolean;  // NEW — from post's takeawayPlacement === 'rail'
}
```

When `showTakeaway` is true, render a compact takeaway card at the top of the column (above
`AuthorProfile`), which collapses to a one-line expandable pill once the same `IntersectionObserver`
that collapses the author card fires (reuse that existing observer/signal rather than adding a second
one — see `PostSidebar`'s current header comment on the author-card/TOC coupling).

## 15. `PostLayout.astro` / `src/content.config.ts` — new options

Schema additions (posts collection only, additive/optional):

```ts
takeawayPlacement: z.enum(['body', 'rail']).optional(), // default 'body' (today's behavior)
heroPlacement: z.enum(['default', 'frontispiece']).optional(), // default 'default' (today's behavior)
ogImage: z.string().optional(), // NEW distinct field; already partially wired (route currently sets ogImage = heroImage)
```

`PostLayout.astro` Props gain `takeawayPlacement?`, `heroPlacement?` alongside existing `ogImage`
(already a field, currently always overwritten with `heroImage` by `[...slug].astro` — that page must
stop doing that and instead pass `post.data.ogImage ?? post.data.heroImage`, and forward `heroAlt`
which already exists in the schema but isn't threaded through today... check: `[...slug].astro`
currently does NOT pass `heroAlt` in its frontmatter object at all — add it).

- `heroPlacement: 'frontispiece'`: render the hero `Figure` (variant `hero`) BEFORE the `<header>` block
  entirely (title/dek/meta), instead of its current position (inside the body column, after the
  desktop/mobile author context, following the header). `'default'` keeps today's exact position.
- `takeawayPlacement: 'rail'`: do not render `LeaderTakeaway` in the body flow; instead pass
  `takeaway`/`showTakeaway={true}` to `PostSidebar` (desktop `xl+`) AND to `ExecutiveSignal`
  (below-`xl`, via CSS visibility as described in ExecutiveSignal's entry above) so nothing is lost on
  mobile. `'body'` (default) keeps today's `LeaderTakeaway` render exactly as-is and passes
  `showTakeaway={false}` everywhere else.

## Integration notes for W3 (manuscript)

- Only `ThreadStoryboard` renders beat recaps/figures now; body prose must not restate a beat's recap
  verbatim (D2). A light `ThreadBeat variant="marker"` mention is optional, not required, if the
  storyboard's own heading/selector already signals position.
- Anchor scheme is `#thread-<beat-id>` everywhere (storyboard panel ids, ThreadRail links, ThreadBeat
  marker links) — reuse the exact `id` strings already in `threads.ts` (`incident`, `divergence` [renamed
  from `deployment`/`use` per D3's new order — W1 updates `threads.ts` ids/labels to match D3's six-beat
  sequence], `detection`, `reconcile`, `use`, `outcome`).
