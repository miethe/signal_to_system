# Essay imagery storyboards v1 — External image-generation handoff

This is a **handoff document for an external image generation agent**, not an implementation request for a developer. No site build or code change is required from you.

---

## Order of work

Generate in this sequence:

1. **Social cards first** (all 4 required `status: required-net-new` entries in `manifest.yaml`): `aof-social-card`, `productivity-social-card`, `contract-social-card`, `rw-social-card`. These are blocking publishing gaps.
2. **Heroes** (replace-existing, one per essay): `aof-hero-artifact-path`, `productivity-hero-control-gap`, `contract-hero-binding`. These are the primary visual identity of each essay.
3. **Core figures** (replace-existing, two per essay): `aof-first-artifact-route`, `aof-execution-graph`, `productivity-four-failures`, `productivity-governance-transition`, `contract-four-obligations`, `contract-maturity-path`.
4. **Optional net-new figures**: `worked-contract-record`, `worked-claim-binding`, `registry-threaded-control-loop`, `worked-example-social-card`.

Do not start the next group until the previous group is approved.

---

## Style reference inputs

Before generating any image, read `00-style-reference.md` in full. It contains:
- Observations of every existing Registry Wave image (what the generator must match)
- The 20-rule alignment checklist

**Registry Wave reference image paths to pass as style references** (attach these to every generation call):

```
public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/hero-governed-cube.png
public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/agentic-os-artifact-estate-before-and-after.png
public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-detecting-silent-drift.png
public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/not-every-difference-is-drift.png
public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/some-copies-must-change.png
```

These images are the visual authority. Match their:
- Ground treatment (warm paper/cream for figures; dark canvas for signal-dark heroes/social cards)
- Typography: mixed navy + copper/orange for titles; ALL-CAPS section labels; monospace for IDs
- Connector language: orange filled circle waypoints between pipeline nodes
- Density: heroes low; figures medium; no decorative filler

---

## Per-image format

Each storyboard board section contains:
- `id` — unique asset identifier
- `class` — one of: hero · figure · illustration · spot · social-card
- `scheme` — signal-dark or paper-light
- `variant` — single or dark+light pair
- `aspect` — ratio and master pixel dimensions
- `EXACT ON-IMAGE TEXT` — the verbatim strings that must appear in the rendered image, letter-for-letter
- `Element list` — what goes where in the frame
- `Layout diagram` — ASCII wireframe of the frame with labeled zones
- `Conceptual diagram` — Mermaid flowchart showing the logical structure (for figures; attach as reference, not as something to render literally)
- `Generator prompt` — the generation prompt
- `Negative prompt` — what to suppress
- `Acceptance checks` — the criteria the output must pass before use

---

## EXACT ON-IMAGE TEXT rule

Preserve all `EXACT ON-IMAGE TEXT` strings **verbatim and completely**. Do not:
- Paraphrase or abbreviate
- Add punctuation not shown
- Substitute synonyms
- Omit any string from the list

If a string does not fit in the allotted zone, reduce font size or line-break at a word boundary — do not truncate.

---

## Return format

For each approved board, return:
- **Heroes / social-cards:** master PNG at specified dimensions + AVIF and WebP derivatives
- **Figures / illustrations:** master SVG (preferred for labeled/vector work) or PNG + WebP
- **Generation metadata:** model, seed, sampler settings (for reproducibility)
- **Contact-sheet proof:** the image rendered at intended article width (~720px for figures, ~1200px for social cards)

`single` variant: one approved render.
`dark+light pair`: two composition-matched outputs — one paper-light (canonical), one signal-dark. Submit for review as a pair.

---

## Naming convention

From `graphics-standards-v1.md` §4:

```
<slug>--<class>--<purpose>--<scheme>.<ext>
```

Omit `--<scheme>` for `single` variant assets. Append `--<width>w` for responsive derivatives.

Examples:
```
agentic-operations-flow--hero--artifact-path.avif
governed-agentic-sdlc-01--figure--four-structural-failures--paper-light.svg
governed-agentic-sdlc-01--figure--four-structural-failures--signal-dark.svg
the-registry-wave--social-card--listing.png
```

Target paths are specified in `manifest.yaml`.

---

## Conflicts to be aware of

The following known conflicts between the existing Registry Wave imagery and `graphics-standards-v1.md` are intentional style decisions, NOT errors to fix:

1. **Registry Wave hero is paper-light**, not signal-dark. The standard defaults heroes to signal-dark. For the Registry Wave essay specifically, paper-light is correct. For other essays (governed-agentic-sdlc, the-contract-is-the-work, agentic-operations-flow), use signal-dark heroes per the standard.
2. **SVG diagrams use `#f8fafc`** (near-white), not exactly the warm cream PNGs use. Both are paper-light for intent; this is a substrate choice, not a design difference.

---

## Out of scope

- Final palette hex values (arrive with the design-language package; use token slot names only)
- Final typeface specifications (use Inter or equivalent geometric sans as a stand-in)
- Site build, code changes, or MDX edits
- Promotion of rw-v2-features SVGs (separate approval gate)
