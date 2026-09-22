# S2S v2 tokens — Observatory

Source of truth: `src/styles/tokens/observatory.css` (roles), `bridge.css` (legacy aliases +
shadcn bridge), `folio.css` / `instrument.css` (Studio-scoped stubs). Components consume
`--s2s-*` roles only; `npm run check:palette` blocks new raw colors anywhere else in `src/`
(existing ones are grandfathered per file in `scripts/palette-literal-baseline.json`, which may
only shrink).

## How the values were sampled

Pixel-sampled with PIL from the committed mockups in
`docs/design/s2s-v2-visual/01-site-mockups/` (plan branch), 1448×1086 PNGs. Surfaces use the
median of a flat patch; text uses the median of the brightest 8% of pixels in a text box (small
antialiased type reads darker than its true ink, so text roles are nudged up); accents use the
most saturated 10%. Box = `(x0, y0, x1, y1)`.

`H` = `signal_to_system_better_questions_brighter_futur.png` (Home),
`W` = `writing_that_turns_observations_into_systems.png` (Writing).

| Role (dark) | Sampled | File · box | Chosen | Note |
|---|---|---|---|---|
| `--s2s-canvas` | `#0d1015` / `#101317` | W (570,440,580,680) · H (712,665,720,720) | `#0d1015` | frame field between cards |
| `--s2s-canvas-raised` | `#101318` | H (440,20,500,40) | `#101318` | header bar; footer `#0e1116` H (560,1050,640,1070) |
| `--s2s-surface` | `#171b20` / `#12161c` | H (640,630,880,645) · W (360,480,540,490) | `#151a1f` | card fill, between the two samples |
| `--s2s-inset` | `#181b21` | H (1000,40,1150,44) | `#181b21` | search field |
| `--s2s-chip` | `#26282e` | H (516,466,520,474) | `#26282e` | tag chip |
| `--s2s-rule` | `#1b1d23` / `#20232b` | H (903,450,905,640) · H (600,78,800,82) | `#20232b` | card edge, header rule |
| `--s2s-rule-strong` | `#292c33` | H (1164,40,1167,60) | `#2b2e36` | control border |
| `--s2s-rule-emphasis` | `#4a4d52` | H (318,310,321,338) | `#4a4d52` | outline button |
| `--s2s-frame-rule` | `#2d303d` | H getpixel (103,500) | `#2d303d` | site frame edge |
| `--s2s-ink` | `#f8f7f8` | H (180,40,312,62) wordmark | `#f4f3f6` | headings, wordmark |
| `--s2s-ink-soft` | `#b5b7be`* | H (520,45,830,60) nav | `#d9d9df` | *small-text sample; raised to read as the mockup does |
| `--s2s-ink-muted` | `#9fa3a9` / `#b0b2b7` | H (143,238,620,290) · H (437,522,800,552) | `#b3b6bd` | body, deks |
| `--s2s-ink-subtle` | `#707478` / `#686b71` | H (330,46,425,56) byline · H (143,106,365,116) eyebrow | `#7b7f87` | raised for 4.5:1 on canvas |
| `--s2s-accent-strong` | `#d3bbfc` | H (150,312,240,318) | `#d3bbfc` | primary button fill |
| `--s2s-accent` | `#b195d6` / `#c39cf1` | W (520,64,562,72) underline · W (500,175,650,215) "systems." | `#bba0f4` | links, active underline |
| `--s2s-accent-label` | `#6a5686`* | H (175,408,205,418) "LABS" | `#9b87f5` | *antialiased 9px caps; plan range #7C6FE0–#9B87F5 |
| `--s2s-secondary` | `#8fdea4` / `#96f4c5` | H (840,466,852,478) · W (1066,672,1082,688) | `#8fdea4` | sage status dot, facet checks |
| `--s2s-toggle-knob` | `#ebdcd3` | H (1286,46,1296,56) | `#ebdcd3` | header switch knob |
| `--s2s-backdrop` | `#1d1e2c` (mountains) | H getpixel (50,500) | `#11121b` + violet glow | outside the frame; photo backdrop is an asset-pipeline item |

Light values are **derived, not sampled** (no mockup shows light): the same hue relationships on a
warm off-white canvas (`#f7f6f3`), ink `#17151d`, accent darkened to `#5b3fc4` for AA text, and the
same lavender `--s2s-accent-strong` button fill.

## Legacy vocabularies

`--bg-*`, `--border*`, `--text-*`, `--accent*`, `--cyan*`, `--code-*` and the Tailwind
`--color-bg/border/text-*` names are aliases of the roles (`bridge.css`). The shadcn HSL triples
(`--background`, `--muted`, …) are unchanged so `@miethe/ui` renders exactly as before. The essay
reader (`PostLayout`, `StoryLayout`) is pinned to its pre-v2 values by `src/styles/reader-legacy.css`
until M2.
