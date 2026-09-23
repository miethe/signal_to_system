# S2S graphics standards v1

Status: implementation-ready taxonomy and delivery contract, not final visual-style design.
Revised by the Opus taste pass (2026-09-23); see `REVIEW-opus-taste-pass.md` for what changed and why.

**What this document decides:** which kind of image goes where, on which ground, in how many
variants, at what size, and which role slots a design-language package must fill.
**What it does not decide:** palette values, typefaces, stroke weights, or illustration style.
Those arrive with the design-language package (§6). No hex values are defined here.

## 1. Class definitions

Five classes. Figures carry a `form` attribute because the three forms are produced by
different hands and fail in different ways; they are not separate classes because they share
placement, caption, and accessibility rules.

| Class | Purpose; is/is not | Use and requirements | Density/text |
|---|---|---|---|
| hero | Frontispiece of one page; sets the page's metaphor. Not a diagram, not a card thumbnail. | One scene, one focal subject, crop-safe for the listing card (§5). | Low. **No baked text.** Title, dek, CTAs stay live HTML. |
| figure | Explains a relationship, sequence, comparison, or evidence. Not mood art. | Sits beside the passage it explains. Alt + caption; long description when dense. | Medium/high. Intrinsic labels allowed and expected. |
| illustration | Interprets an idea (a thesis image, a section anchor). Never carries required instruction. | Optional; never substitutes for a needed figure. | Low/medium. A short baked thesis line is allowed (Registry Wave `some-copies-must-change.png`); no small labels. |
| spot | Ornament, icon, badge, sticker, divider. Not a hero or figure. | Peripheral: navigation, metadata, empty states. | Low. No essential text. |
| social-card | Link-preview art for one canonical URL. Not a responsive hero. | Art plate composited by the build renderer (`src/lib/og/render.ts`), which sets the title live. | Art: none. Title/mark: set by the renderer. |

### 1.1 Figure forms

| form | What it is | Produced by | Registry Wave precedent |
|---|---|---|---|
| `plate` | Typeset explanatory plate: title, eyebrow, frame furniture, labelled diagram, key-point band. Raster. | External image generator from a storyboard. | `registry-wave-incident-resolution-flow.png`, `agentic-os-artifact-estate-before-and-after.png` |
| `diagram` | Coded vector drawing with live-ish text; the accessible, editable twin of a plate or a standalone schematic. | Code (SVG). | `diagram-*.svg` (main) and `diagram-thread-0N-*.svg` (rw-v2-features) |
| `evidence` | A screenshot, chart, map, or capture of a real artifact. | Capture or live chart. | Labs mockup map card |

A `plate` is the house style for essay figures. A `diagram` is the fallback when exact text
fidelity, localisation, or edit-in-place matters more than finish; it must follow the plate's
structure (same backbone, same state semantics) even though it cannot match its finish.

## 2. Surface x class matrix

`R` required; `O` optional; counts are maxima unless a content brief justifies more.

| Surface | hero | figure | illustration | spot | social-card |
|---|---|---|---|---|---|
| essay | O: 1 opening | O: 0-8 beside explanation | O: 0-2 | O: inline/divider | R: 1 (art may be the hero's night twin, §4) |
| home | R: 1 opening | — | O: 0-2 modules | O | R: 1 |
| lab | O: 1 research context | O: 0-6 evidence/method | O: 0-1 | O | R: 1 |
| projects | O: 1 frontispiece/demo | O: 0-6 | O: 0-2 | O | R: 1 |
| notebooks | O: 1 field scene | O: 0-4 | O: 0-1 | O | R: 1 |
| studio | O: 1 language scene | O: 0-4 | O: 0-2 | R: marks/icons | R: 1 |
| series | O: 1 series hero | O: 0-2 | O: 0-1 | O | R: 1 |

Essay figure maximum lowered from 12 to 8: past eight, a figure family stops being a family and
becomes a deck. A companion post (e.g. a worked example) may reuse its parent's social card.
Listing thumbnails (the 4:3 and 1:1 crops on Writing/Home cards in the v2 mockups) are **crops of
the hero**, not a sixth class; the hero spec reserves their safe area (§5).

## 3. Scheme policy

S2S is dark-first (`<html class="dark">`, `src/styles/tokens/observatory.css:1-17`). Two image
schemes:

- **signal-dark** — images that sit unmatted in the dark site: home/lab heroes, social art,
  night twins. Consumes Observatory roles directly.
- **paper-light** — images drawn on paper and **matted on paper in both themes**. This is not a
  proposal; it is shipped behaviour: `Figure.astro:5-7` renders "a warm-paper plate … light in both
  themes on purpose", and `src/styles/tokens/reader.css:56` keeps `--reader-paper` as the one
  literal because "the artwork is drawn on light paper, so its mat stays paper in both themes".
  In a dark reader a paper plate reads as a lit drawing card, which is what the v2 mockups do with
  Notebook sheets (`01-site-mockups/signal_to_system_better_questions_brighter_futur.png`).

### 3.1 Role slots

Role names are shared by both schemes. signal-dark references existing Observatory roles where they are already settled; its `accent-1` value is **decided by design-language package**. paper-light names the role the Registry Wave plates actually use; values are for the design-language package.

| Role | Job in an image | signal-dark token | paper-light (observed in Registry Wave; value TBD) |
|---|---|---|---|
| ground | field behind everything | `--s2s-canvas` (:112) | warm paper; precedent `--reader-paper` (`reader.css:56`) |
| surface | cards/panels inside the image | `--s2s-surface` (:114) | lifted paper, one step off ground |
| ink | titles, node rings, primary lines | `--s2s-ink` (:125) | deep navy |
| muted | sub-labels, secondary copy | `--s2s-ink-muted` (:127) | slate navy |
| accent-1 | primary mark: active path, focus, governed solids | **decided by design-language package** | cobalt blue (current Registry Wave paper-light reference) |
| accent-2 | **the one semantic accent**: beat number, accent phrase, waypoint centre | `--s2s-viz-5` (:152), current token reference only | copper to rust (current Registry Wave paper-light reference) |
| accent-3..6 | categorical series only | `--s2s-viz-1..4, -6` (:148-153) | TBD |
| rule | hairlines, dotted orbits, grid | `--s2s-viz-grid` (:154), `--s2s-rule` (:120) | navy hairline at low opacity |
| highlight | a lit fill behind one element | `--s2s-accent-strong` (:133) | pale wash of accent-1 |
| annotation | small tracked caps, eyebrows, corner tags | `--s2s-accent-label` (:137) | muted navy caps |
| state-ok | verified / present | `--s2s-status-ok` (:142) | green ring + pale green fill |
| state-warn | stale / transitional / pending | `--s2s-status-warn` (:143) | amber / copper dashed |
| state-danger | failed / missing / drift | `--s2s-status-danger` (:144) | red ring + pale red fill |
| state-inactive | not in play | `--s2s-ink-subtle` (:128) | navy outline, empty ring |

Two corrections to the first draft, both deliberate:

1. **The dark imagery `accent-1` is not selected here.** Its value is **decided by design-language package**; do not infer violet from `--s2s-accent` or copper from Registry Wave. Copper remains the current paper-light Registry Wave reference. `--s2s-secondary` is sage green and remains unsuitable for the semantic imagery accent because green already means `state-ok`.
2. **paper-light is not an alias of the site's light mode.** The site's derived light tokens
   (`observatory.css:21-79`) are violet-on-grey UI colors; the plates are navy-and-copper on warm
   paper. Aliasing one to the other would repaint every plate the day the UI palette moves.

### 3.2 Default scheme by class and surface

| Class | Default | Exceptions |
|---|---|---|
| hero (essay, series) | paper-light master **plus** signal-dark night twin (§4) | — |
| hero (home, lab, projects, notebooks, studio) | signal-dark single | Studio skins may override per skin |
| figure | paper-light (matted) | `lab` surface: signal-dark, because lab evidence (maps, charts) is authored against the dark Observatory data palette |
| illustration | paper-light in the reader; signal-dark in home/studio modules | Transparent only when designed to float |
| spot | scheme-agnostic: SVG using `currentColor` | Raster spots follow the host surface |
| social-card | signal-dark single | — |

## 4. Variant policy

Vocabulary: `single | dark+light pair`.

A pair exists only where an image sits **unmatted** against the page ground, so the page mode
changes what surrounds it. That is exactly one class in practice:

- **Essay and series heroes: `dark+light pair`, required for new work.** The paper-light master is
  the illustration; the signal-dark twin is the same scene, same camera, same composition, at
  night (§3 of `essay-storyboards-v1/00-style-reference.md` gives the night-twin recipe). A cream
  16:9 slab at the top of a dark page is the single loudest mismatch on the current site; the twin
  removes it without abandoning the Registry Wave language.
- **Figures: `single`.** They are matted on paper in both themes (§3), so a dark twin would put a
  dark drawing on a paper mat. Do not pair figures. If a figure genuinely cannot live on paper,
  change its scheme to signal-dark, do not pair it.
- **Illustrations: `single`**, unless the illustration is unmatted full-bleed (then treat as hero).
- **Spots:** no raster pairs; use `currentColor` SVG.
- **Social cards: `single`.** Crawlers have no color scheme.

Selection: `<picture>` with `media="(prefers-color-scheme: dark)"` plus the `html.dark`/`.light`
class the theme toggle sets (`observatory.css:4-6`); `src/components/media/V2Image.astro` is the
AVIF/WebP, intrinsic-size delivery precedent. If one half of a pair is missing, serve the other;
it must remain legible alone. Never hide explanatory information in one variant.

Naming: `<slug>--<class>--<purpose>--<scheme>.<ext>`; omit `--<scheme>` for `single`; append
`--<width>w` for responsive derivatives. Example pair:
`the-contract-is-the-work--hero--relay--paper-light.avif` /
`the-contract-is-the-work--hero--relay--signal-dark.avif`.

## 5. Technical specification

| Class | Ratio and master | Export / ground / safe area | Directory and max weight | Accessibility |
|---|---|---|---|---|
| hero | 16:9; 2400x1350. 3:2 permitted editorially. | AVIF + WebP from PNG master; grounded; 8% outer safety. **Listing-crop safe zone:** the focal subject must survive a centred 4:3 crop (1800x1350) and a centred 1:1 crop (1350x1350). | `public/images/<slug>/hero/`; AVIF 180 KB, WebP 260 KB per variant. | Decorative when the page title carries the meaning (empty alt); meaningful alt otherwise. No caption by default. |
| figure (`plate`) | 16:9 or 4:3; 2000x1125 or 2000x1500 master. | PNG master, WebP delivery; paper-light; 6% label edge; smallest label >= 14px at 720px render. | `public/assets/posts/<slug>/`; raster 350 KB delivered. | Alt, caption, and a long description that reproduces every baked label (plates are raster). |
| figure (`diagram`) | 16:9 or 4:3; viewBox 1600x900 / 1600x1200. | SVG; paper-light ground rect; text as `<text>`. | `public/assets/posts/<slug>/`; 250 KB. | `<title>` + `<desc>`; caption. |
| figure (`evidence`) | natural | PNG/WebP; host surface ground. | `public/assets/<kind>/<slug>/`; 350 KB. | Alt describes the finding, not the pixels. |
| illustration | 3:2, 1:1, or 16:9; 1800x1200 / 1600x1600 / 2400x1350. | AVIF/WebP; transparent only when designed to float; 10% edge safety. | `public/images/<slug>/illustrations/`; AVIF 160 KB, WebP 240 KB. | Meaningful alt when conceptual; caption optional. |
| spot | 1:1/3:2/natural; 512x512 raster maximum. | SVG preferred, `currentColor`, transparent, 8% breathing room. | `src/assets/icons/`, `src/assets/ornaments/`, or `public/images/.../spots/`; SVG 30 KB, raster 60 KB. | Decorative empty alt/aria-hidden; controls own functional labels. |
| social-card (art) | **1520x1260 art plate** (the 760x630 right panel the renderer places, at 2x). | PNG/JPEG; signal-dark; focal subject in the right 60% of the plate; left 20% may be veiled to ground (`render.ts:166`). | `public/images/<slug>/social/`; 300 KB. | Renderer supplies title/description metadata. |

Social-card assets are **art-only plates**: no baked title, mark, or other text. The site OG renderer composes the title live. The build renderer (`src/lib/og/render.ts:118`) currently loads one fixed image for every card; per-essay art needs a later small renderer change (read a per-post art path, fall back to the current image while preserving live-title composition). That change is out of scope here and is listed as a dependency in the manifest.

Use lowercase kebab-case. Do not add new root `public/assets/` files. Existing oversized legacy
inventory is current state, not prospective compliance.

## 6. Token-package interface

The contract between these standards and a design-language package. The package fills slots; it
does not re-open decisions made above.

**The package supplies (per scheme unless marked shared):**

```yaml
imagery_tokens:
  schemes:
    signal-dark: [ground, surface, ink, muted, accent-1, accent-2, accent-3, accent-4, accent-5, accent-6,
                  rule, highlight, annotation, state-ok, state-warn, state-danger, state-inactive]
    paper-light: [ground, surface, ink, muted, accent-1, accent-2, accent-3, accent-4, accent-5, accent-6,
                  rule, highlight, annotation, state-ok, state-warn, state-danger, state-inactive]
  type:            # shared
    display: <family, weight>   # plate titles, key-point line (Registry Wave: high-contrast serif)
    label: <family, tracking>   # eyebrows, section caps, corner tags (tracked caps)
    body: <family>              # node sub-labels, captions inside plates
    mono: <family>              # versions, hashes, IDs, file names
  stroke:          # shared, in px at master size
    primary: <n>                # main flow
    secondary: <n>
    annotation: <n>
    orbit: <dash pattern>       # dotted reticle orbit around nodes
  motifs:          # shared: named shapes the package draws once, storyboards reference by name
    - reticle-node       # ringed node + dotted orbit + four tick marks
    - waypoint           # small ring with accent-2 centre dot, sits on a connector before the arrowhead
    - plate-frame        # eyebrow + rule, four corner tag stacks, dot grids, footer tagline rule
    - key-point-band     # full-width bordered band: icon reticle + label + one display-type sentence
    - hero-overlay       # the ink diagram drawn "in the air" over a hero scene
  night_twin:      # shared: the recipe that turns a paper-light hero into its signal-dark twin
    sky: <role>          # window/background treatment
    interior_light: <role>
    overlay_ink: <role>  # the in-air diagram in the dark twin
  surfaces:        # shared
    radius-figure-card: <n>
    figure-card-shadow: <value>
    hero-veil: <value>
    hero-veil-strong: <value>
```

**The package must not decide:** the class set, form set, which scheme a class uses, where pairs
exist, safe areas, text-baking rules (heroes and social art bake none), state semantics (green =
ok, red = failed, amber = pending, grey = inactive), or the Registry Wave structural templates
(5-node backbone, two-column comparison, key-point band). Changing any of those is a revision of
this document.

**The package must provide proof:** one reference render per scheme of `reticle-node`,
`waypoint`, and `plate-frame`, so storyboards can point a generator at a picture rather than at
prose.

## 7. Storyboard brief contract

```yaml
brief:
  id: <slug--class--purpose>
  surface: <essay|home|lab|projects|notebooks|studio|series>
  class: <hero|figure|illustration|spot|social-card>
  form: <plate|diagram|evidence>        # figures only
  purpose: <reader job, one sentence>
  placement: <section heading + existing Figure number it replaces, or "new after <heading>">
  scheme: <signal-dark|paper-light>
  variant_policy: <single|dark+light pair>
  ratio_and_master: <ratio and pixels>
  template: <atelier-hero (Registry Wave only)|subject-hero|serial-plate|comparison-plate|thesis-plate|social-art>
  focal_subject: <subject and hierarchy>
  exact_text: <verbatim strings, or "none">
  live_html_copy: <what must not be baked>
  safe_areas: <crop/label exclusions>
  accessibility: <alt, caption, long description>
  acceptance_checks: <contrast, label fidelity, crop, weight, filename>
```

## 8. Open questions

Consolidated for Nick in `REVIEW-opus-taste-pass.md` §5. Resolved by this pass: warm paper vs
technical white (warm paper; it is already shipped in `reader.css:56`), Labs screenshots in a hero
slot (they stay `figure`, form `evidence`; a lab hero is a scene), and the social-card budget
(art plate 300 KB; the renderer emits the PNG).

## Appendix A. Current image inventory

Derivative AVIF/WebP pairs are grouped as one visual asset. Generated OG paths are included as build outputs.

| Path(s) | Where used/current treatment | Class |
|---|---|---|
| `public/images/v2/hero/observatory-*` | Home/About PageHero; night scene, live HTML and veil | hero |
| `public/images/v2/hero/notebook-vista-*` | responsive V2 notebook scene | hero |
| `public/images/v2/backdrop/observatory-backdrop.*` | decorative backdrop | illustration |
| `public/images/v2/stickers/*` | transparent V2 module art | spot |
| `public/assets/nick-miethe-portrait.webp` | author/about profile | illustration |
| `public/assets/1M.png`; `s2s.svg`; `signal-to-system.svg` | legacy/unassigned static assets | illustration/spot |
| `public/assets/sdlc-governance-series.png` | governed SDLC series front matter | hero |
| `public/assets/posts/the-contract-is-the-work/hero-maturity-model.svg` | essay explanatory hero | figure |
| `public/assets/posts/governed-agentic-sdlc-01/*` | productivity-paradox hero, art, diagrams | hero/illustration/figure |
| `public/assets/posts/dev-stories-b2-enterprise-multi-tenancy/*` | dev-story diagrams | figure |
| `public/assets/posts/agentic-operations-flow/hero-artifact-graph.jpg` | essay/series opening | hero |
| `public/assets/posts/agentic-operations-flow/evidence-stack.jpg`; `deck/*` | evidence and deck plates | figure |
| `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/hero-governed-cube.png` | Registry Wave reader opening | hero |
| `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/*.png`; `*.svg` | Registry Wave infographics and technical diagrams | figure |
| `public/workflow-showcase/**/thumbnail.*` | workflow thumbnails | social-card |
| `public/brand/*`; `public/favicon.svg` | header/footer/OG/Studio/browser marks | spot |
| `src/assets/icons/*.svg` | navigation, cards, controls | spot |
| `src/assets/ornaments/*.svg` | section dividers | spot |
| generated `/og/<family>/<slug>.png` | ReaderShell metadata fallback | social-card |
