# Opus taste pass: S2S imagery standards and essay storyboards

Reviewer: Opus 5.5, acting as design owner for S2S imagery. Date: 2026-09-23.
Inputs reviewed: the ICA drafts at `889837e` (standards) and `c626563` (storyboard depth pass).
What I looked at directly, not in prose: all 14 Registry Wave raster and SVG assets, the
`rw-v2-essay` and `rw-v2-features` MDX image references, three v2 site mockups
(`_s2s-v2-handoff/signal-to-system-visual-handoff-v2/01-site-mockups/`), `observatory.css`,
`reader.css`, `Figure.astro`, `src/lib/og/render.ts`, and all five essay MDX files.

## 1. Verdict per document

| Document | Verdict | Summary |
|---|---|---|
| `graphics-standards-v1.md` / `.yaml` | **Sound skeleton, wrong in three load-bearing places. Fixed.** | The class set and technical table held up. The token mapping was wrong, the variant policy paired the wrong things, and the token interface had no type, motif, or state slots. |
| `00-style-reference.md` | **Described the images from a distance. Rewritten.** | It missed the reticle (the family's signature), called the serif titles Inter, listed the one off-family plate as a reference, and mapped copper to a green token. |
| Four essay storyboards | **Not yet in the Registry Wave language. Rewritten.** | They put a "Registry Wave" label on generic diagrams: no plate frame, no reticles, no serif, and heroes with baked labels, which breaks the draft's own rule. Two essays got invented content (failure names, a figure the essay doesn't have). 10 of the 14 quoted placement anchors don't exist in the essays; placements now name real section headings. |
| RW storyboard | **Exemplar docs fine; new boards weak. Revised.** | Kept the exemplar documentation (role lines patched, hex removed). Replaced the new boards. |
| `manifest.yaml`, `README.md` | **Rewritten** to match. |

## 2. What I changed and why

**Standards**

1. **Token mapping corrected.** The draft set accent-2 (copper) to `--s2s-secondary`, but on the
   live site that token is sage green, the "quiet link" color (`observatory.css:139`). Inside an
   image, green already means "ok", so a green accent would read as a verdict. accent-2 now maps
   to `--s2s-viz-5` (copper, `:152`). Every line citation was also 12 to 20 lines off; all are
   re-cited now.
2. **paper-light is its own palette, not the site's light mode.** The Registry Wave plates are
   navy and copper on warm paper. The site's light mode is violet on grey. The reader already
   keeps figure artwork on paper in both themes (`Figure.astro:5-7`, `reader.css:56`), so I wrote
   that shipped behavior down as the rule.
3. **Pairs now go only where the image sits unmatted.** In practice that means essay heroes.
   Figures never get a pair: they sit on a paper mat in both themes, so a dark twin would put a
   dark drawing on a paper mat. Heroes always get a pair: a paper-light master plus a night
   twin. The night twin fixes the loudest mismatch on the site today (a cream 16:9 slab at the top
   of a dark page) without giving up the Registry Wave language.
4. **Figures now have a `form` attribute: plate, diagram, or evidence.** A generated raster plate,
   a coded SVG twin, and a capture are made by different hands and fail in different ways. It is
   an attribute, not new classes, because all three share the same placement and accessibility
   rules.
5. **Social cards became art-only.** The build already renders OG cards with a live title over a
   right-hand image (`render.ts:166-181`), so the art plate is 1520x1260 with no text, cut from the
   hero's night twin. That removes the four baked-title generation jobs.
6. **The token interface now says what the package supplies and what it must not decide.** It
   gained type roles (display, label, body, mono), stroke weights, named motifs (`reticle-node`,
   `waypoint`, `plate-frame`, `key-point-band`, `hero-overlay`), night-twin roles, and state roles.
   The "must not decide" list keeps classes, schemes, pairs, safe areas, and state semantics out
   of the package.
7. Listing thumbnails are hero crops, not a sixth class; the hero spec now reserves a 4:3 and a
   1:1 safe zone for them. The essay figure cap went from 12 to 8.

**Style reference:** I re-described each image from the pixels. It now has four templates with
prompt blocks you paste as-is (atelier-hero, serial-plate, comparison-plate, thesis-plate), a
night-twin recipe, and a revised 16-point checklist. The word budget is now realistic: the first
draft's 45-word limit would have failed every Registry Wave plate.

**Storyboards:** each essay now has a table that accounts for every current image. Each essay is
built as a Registry Wave-style family: one atelier hero pair, plus a serial plate set that shares
one backbone.

- *The Work Is a Graph:* seven deck slides become "01-05" serial plates on one five-node
  backbone. I cut two slides, because the new hero and the interactive already cover them.
- *Productivity Paradox:* the plates use the essay's real failure modes (Volume Trap, Context
  Collapse, Accountability Gap, Shadow AI) placed where each one bites on the delivery pipeline.
  The essay's real three-transitions argument gets its own plate, and the swarm-gate image
  becomes a before/after comparison plate.
- *Contract Is the Work:* I cut the redundant "four rails" hero and the quadrant figure. The new
  hero is one sheet worked on by four roles. There is a new handoff comparison plate, and the
  maturity model moves inline with no arrowheads, because the essay says "dimensions, not a
  ladder".
- *Worked example:* one optional claim-binding matrix plate. It reuses the parent essay's social
  art.
- *Registry Wave:* adds the night twin and social art. I cut the threaded-loop board, which
  repeated the six threads and contradicted itself. There is an optional re-set of the one
  off-family plate.

## 3. Asset count

Renders go from 21 in the draft to 23. Pairs moved off figures and onto heroes, and the AOF
essay now replaces all five of its surviving deck slides instead of two, so no deck slide is
left sitting beside the new family.

- 7 hero renders: 3 new paper-light masters, plus 4 night twins (one for each of those masters,
  and one for the existing Registry Wave hero)
- 4 social art plates, recropped from the twins, with no text
- 10 plates, plus 2 optional

## 4. Remaining risks

- **Text fidelity on dense plates.** `aof-plate-02-autonomy` and `worked-plate-claim-binding`
  carry the most exact text. The rule is re-render, never retouch. The worked plate has a coded
  SVG fallback.
- **Night-twin drift.** The twin must be an edit of the approved master. An edit model that
  re-draws the geometry will fail the side-by-side check.
- **Hero sameness.** Four atelier interiors in a row could read as one image repeated. Each
  storyboard gives a different staging (bench line, narrow door, one long sheet, hub), but this
  should be judged on the first two masters before the rest are made.
- **De facto palette.** Until the design-language package lands, the first approved renders set
  the paper-light values. Prompts describe the Registry Wave rendering, which keeps it
  consistent, but the package should sample from the approved renders, not start fresh.
- **Landing work is out of scope and not done.** Landing needs: MDX edits (the AOF renumber, new
  Figures in the Contract essay), `<picture>` wiring for hero pairs, and the per-post art change
  in `render.ts`. All three are listed as dependencies in the manifest.
- **Nothing was generated or rendered in this pass.** Every judgment above comes from reading the
  existing images and the essays, not from test renders.

## 5. Questions only Nick can answer

1. **Is the atelier scene the house hero for every essay, or Registry Wave's alone?**
   **Resolved 2026-09-23:** Registry Wave alone uses the studio/atelier hero. Every other essay gets a subject-specific hero within the shared plate/ringed-node/serif-title family.
2. **Should copper stay the imagery accent in dark mode, instead of the site's violet?**
   **Resolved 2026-09-23:** Neither is selected. Retain the `accent-1` role; its dark-mode value is **decided by design-language package**. Copper remains only the current paper-light reference.
3. **Are the corner stacks brand furniture or per-essay?**
   **Resolved 2026-09-23:** Per-essay. Each storyboard lists its exact subject-tied corner-word set verbatim; Registry Wave's set is not reused.
4. **Can the deck provenance go?** **Resolved 2026-09-23 — keep the cut (Nick).** The AOF essay's source note says it is built from your deck.
   The plan cuts two deck slides and redraws the rest; losing the "original deck frame" is OK.
5. **Should social cards be built or bespoke?**
   **Resolved 2026-09-23:** Build art-only plates. The site OG renderer composites titles live; a later `render.ts` change must resolve per-post art with fallback. Do not generate baked-text cards.
