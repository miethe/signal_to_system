# S2S graphics standards v1

Status: implementation-ready taxonomy and delivery contract, not final visual-style design.

## 1. Class definitions

| Class | Purpose; is/is not | Use and requirements | Density/text |
|---|---|---|---|
| hero | Primary page or story frontispiece; not a dense diagram or card thumbnail. | One opening scene, focal subject, copy-safe crop. | Low. Essential titles, ledes, and CTAs stay live HTML. |
| figure | Diagram, chart, map, evidence, or explanatory plate; not mood art. | Use when relationships, data, or method must be understood. Alt; caption unless prose identifies it; credit when applicable; long description when complex. | Medium/high. Intrinsic labels allowed. |
| illustration | Conceptual/metaphorical support; not required instruction. | Interpretive section anchor; meaningful alt when it conveys an idea. | Low/medium. No tiny labels or essential prose. |
| spot | Small ornament, icon, badge, or transparent sticker; not hero/figure. | Navigation, metadata, divider, or empty state. | Low. No essential embedded text. |
| social-card | Standalone social/listing representation of one canonical URL; not responsive hero. | One 1.91:1 metadata/build artifact with mark, route type, title. | Low/medium. Baked title permitted. |

## 2. Surface x class matrix

`R` required; `O` optional; counts are maxima unless a content brief justifies more.

| Surface | hero | figure | illustration | spot | social-card |
|---|---|---|---|---|---|
| essay | O: 1 opening | O: 0-12 beside explanation | O: 0-2 | O: inline/divider | R: 1 |
| home | R: 1 opening | — | O: 0-2 modules | O | R: 1 |
| lab | O: 1 research context | O: 0-6 evidence/method | O: 0-1 | O | R: 1 |
| projects | O: 1 frontispiece/demo | O: 0-6 | O: 0-2 | O | R: 1 |
| notebooks | O: 1 field scene | O: 0-4 | O: 0-1 | O | R: 1 |
| studio | O: 1 language scene | O: 0-4 | O: 0-2 | R/O: marks/icons | R: 1 |
| series | O: 1 series hero | O: 0-2 | O: 0-1 | O | R: 1 |

Heroes open a surface. Figures sit beside explanatory passages. Illustrations never replace needed figures. Spots remain peripheral. Social cards are route metadata/build outputs.

## 3. Scheme policy

S2S is dark-first. `signal-dark` uses Observatory semantic variables rather than compatibility aliases. `paper-light` supports the existing Figure engineering-plate precedent: a luminous explanatory card within a dark reader, not a reader-theme switch.

| Role slot | signal-dark existing token | paper-light |
|---|---|---|
| ground | `--s2s-canvas` (`src/styles/tokens/observatory.css:100`) | TBD by design-language package |
| ink | `--s2s-ink` (`src/styles/tokens/observatory.css:109`) | TBD by design-language package |
| accent-1 | `--s2s-accent` (`src/styles/tokens/observatory.css:114`) | TBD by design-language package |
| accent-2 | `--s2s-secondary` (`src/styles/tokens/observatory.css:119`) | TBD by design-language package |
| accent-3..6 | `--s2s-viz-3..6` (`src/styles/tokens/observatory.css:149-152`) | TBD by design-language package |
| muted | `--s2s-ink-muted` (`src/styles/tokens/observatory.css:111`) | TBD by design-language package |
| grid/rule | `--s2s-viz-grid` (`src/styles/tokens/observatory.css:154`) | TBD by design-language package |
| highlight | `--s2s-accent-strong` (`src/styles/tokens/observatory.css:116`) | TBD by design-language package |
| annotation | `--s2s-accent-label` (`src/styles/tokens/observatory.css:118`) | TBD by design-language package |

Default schemes: hero, illustration, spot, and social-card use `signal-dark`; figure uses `paper-light`. A figure may use signal-dark only when its brief proves contrast and export readability.

## 4. Variant policy

Exact vocabulary: `single | dark+light pair`.

- All classes default to `single`. Use `dark+light pair` only where embedded callout meaning or a light context loses contrast. Figures retain a paper-light canonical asset; a dark pair is exceptional.
- Select through `data-theme`, `prefers-color-scheme`, and/or `<picture>` sources. `V2Image.astro` is the existing AVIF/WebP, intrinsic-size, responsive delivery precedent.
- If a requested variant is absent, serve the canonical single asset; it must remain legible. Never hide explanatory information.
- Name assets `<slug>--<class>--<purpose>--<scheme>.<ext>`; omit scheme for `single`; append `--<width>w` for responsive derivatives.

## 5. Technical specification

| Class | Ratio and master | Export / ground / safe area | Directory and max weight | Accessibility |
|---|---|---|---|---|
| hero | 16:9; 2400x1350. 3:2 permitted editorially. | AVIF + WebP; grounded; 35% copy-side crop zone and 8% outer safety. | `public/images/<surface-or-slug>/hero/`; AVIF 180 KB, WebP 260 KB. | Meaningful alt when content-bearing; decorative hero has empty alt; no caption by default. |
| figure | 16:9 or 4:3; 1600x900 or 1600x1200. | SVG for labelled/vector work; PNG/WebP for evidence; paper-light default; 6% label edge, 10% caption clearance. | `public/assets/<kind>/<slug>/`; SVG 250 KB, raster 350 KB. | Alt and caption rules above; Figure supports credit, mobile source, ID, long description. |
| illustration | 3:2 or 1:1; 1800x1200 or 1600x1600. | AVIF/WebP/SVG; transparent only when designed to float; 10% edge safety. | `public/images/<surface-or-slug>/illustrations/`; AVIF 160 KB, WebP/SVG 240 KB. | Meaningful alt when conceptual; caption optional. |
| spot | 1:1/3:2/natural; 512x512 raster maximum. | SVG preferred, transparent, 8% breathing room. | `src/assets/icons/`, `src/assets/ornaments/`, or `public/images/.../spots/`; SVG 30 KB, raster 60 KB. | Decorative empty alt/aria-hidden; controls own functional labels. |
| social-card | 1.91:1; 2400x1260 master, 1200x630 render. | PNG build output, grounded, 10% edge safety and title in central 70%. | `/og/<family>/<slug>.png` or `public/og/`; 350 KB. | Metadata title/description; not content image. |

Use lowercase kebab-case. Do not add new root `public/assets/` files. Existing oversized legacy inventory is current state, not prospective compliance.

## 6. Token package and storyboard contract

```yaml
imagery_tokens:
  schemes:
    signal-dark: [ground, ink, accent-1, accent-2, accent-3, accent-4, accent-5, accent-6, muted, grid/rule, highlight, annotation]
    paper-light: [ground, ink, accent-1, accent-2, accent-3, accent-4, accent-5, accent-6, muted, grid/rule, highlight, annotation]
  shared: [frame-rule, frame-rule-strong, figure-card-shadow, hero-veil, hero-veil-strong, annotation-font, label-font, body-font, figure-number-style, safe-area-hero, safe-area-figure, safe-area-social-card, radius-figure-card]
```

```yaml
brief:
  id: <slug--class--purpose>
  surface: <essay|home|lab|projects|notebooks|studio|series>
  class: <hero|figure|illustration|spot|social-card>
  purpose: <reader job>
  scheme: <signal-dark|paper-light>
  variant_policy: <single|dark+light pair>
  ratio_and_master: <ratio and pixels>
  focal_subject: <subject and hierarchy>
  information: <labels/data/relationships or none>
  live_html_copy: <must not bake>
  safe_areas: <crop/label exclusions>
  grounding: <transparent|grounded|paper-light card>
  accessibility: <alt, caption, long description, credit>
  exports: <formats and widths>
  acceptance_checks: <contrast, label legibility, crop, weight, filename>
```

## 7. Open questions for Nick

1. Should paper-light be warm-paper or neutral technical-white?
2. Is English-only intrinsic SVG text acceptable for v1 figures?
3. Must Labs screenshots always remain `figure`, even in a hero slot?
4. Should Projects eventually gain a `demo` class, or use hero/figure by role?
5. Which social-card families require bespoke art rather than generated Observatory composition?
6. Is the 350 KB social-card budget acceptable for GitHub Pages and crawlers?

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
