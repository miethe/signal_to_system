# Registry Wave — Visual Style Reference

Read this before generating anything. It describes what the Registry Wave images **actually do**
(re-read image by image in the Opus taste pass, 2026-09-23), names the four reusable templates
every new board is built from, and gives the night-twin recipe that makes a paper-light hero work
in the dark site. Role names come from `../graphics-standards-v1.md` §3.1. No hex values here.

---

## 1. Which images are the authority

All paths are under `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/`
(identical on main and the `rw-v2-essay` worktree).

| Tier | Files | Use as |
|---|---|---|
| **Family core** (attach as style refs) | `hero-governed-cube.png`; `registry-wave-incident-resolution-flow.png` (01 Incident); `registry-wave-presence-vs-behavior.png` (03 Use); `agentic-os-artifact-estate-before-and-after.png`; `some-copies-must-change.png` | The look. Attach these five to every generation call, chosen per template (§4). |
| Family, secondary | `registry-wave-from-source-to-outcome.png` (02), `registry-wave-drift-across-five-days.png` (04), `registry-wave-detecting-silent-drift.png` (05), `registry-wave-run-level-provenance-infographic.png` (06) | Lower-section variations of the serial plate. |
| Reference only, **do not imitate** | `the-agentic-os-artifact-estate.png` | A dense map; right for its job, too dense to be a template. |
| **Off-family outlier** | `not-every-difference-is-drift.png` | Condensed grotesk all-caps title, no plate frame, no reticles. Its *content structure* (rows to a decision card) is good; its *type and frame* are not the family. Never attach as a style ref. |
| Coded twins, **not style authority** | `diagram-*.svg` (main) and `diagram-thread-0N-*.svg`, `diagram-market-wave.svg` (rw-v2-features) | Slate-on-white Inter drawings. They carry structure and accessibility, not the look. |

Where the essay uses them today: main and `rw-v2-essay` open with `hero-governed-cube.png` and
place the before/after and estate plates as `variant="technical"` Figures; `rw-v2-features`
swaps in the SVG twins. The PNG plates are the crafted language Nick pointed at.

---

## 2. What the images actually do

### 2.1 The hero — `hero-governed-cube.png` (template: atelier-hero)

- **Medium:** pencil drawing with loose watercolor wash on warm paper. Figurative, human, daylit.
  Faint drafting construction lines (compass arcs, circles, ruled grids) float in the background
  like pinned-up studies.
- **Scene:** an airy studio. Four people at four drafting tables in the lower half, each working on
  a physical cube. Plants at the edges, windows left, shelving right, a foreground table of
  rolled drawings and books slightly out of focus (depth, not clutter).
- **The overlay:** a crisp ink diagram drawn *in the air* above the people: a central hub (a
  document holding a cube, on a disc) sends four curved lines down to four dashed-circle badges,
  one above each worker, each badge showing that worker's cube variant; short dashed drop-lines
  fall from badge to desk. Small `waypoint` dots sit on the curves. Left, a faint node graph (the
  ungoverned past); right, a fan of documents (the outputs).
- **Why it works:** the metaphor is a *scene with a diagram in it*. Human craft below, the
  governing structure above, no words anywhere. The overlay is the only saturated element: ink and
  paper-light accent-1 cobalt for governed solids, paper-light accent-2 copper on one cube and the waypoints.
- **Density:** six focal elements. Large calm areas of paper.

### 2.2 The serial plate — threads 01-06 (template: serial-plate)

- **Frame (`plate-frame`):** tracked-caps eyebrow `THE REGISTRY WAVE` top centre over a short
  accent-2 rule; four corner tag stacks in tiny tracked caps (top-left `IDEAS / SYSTEMS / EVIDENCE
  / OUTCOMES`, top-right `A MORE / CAPABLE / TOMORROW`, bottom-left `PEOPLE / TOOLS / POLICY /
  INFRASTRUCTURE`, bottom-right `TRUST / TRANSPARENCY / COMPOUNDING / VALUE`), each with a thin
  vertical rule and a faint dot grid; a footer tagline in tracked serif caps between two accent-2
  rules that end in dots.
- **Title:** high-contrast bold **serif** display, ink: `Registry Wave — ` then the beat number and
  beat name in accent-2 (copper shading to rust). Subtitle: one sentence in wide-tracked light sans.
- **Backbone:** five `reticle-node`s in a row, numbered `01`-`05` in accent-2 above each. A
  reticle is a solid ring with an icon, inside a dotted orbit with four tick marks (a registration
  / instrument mark). Between nodes: a line, a `waypoint` (small ring with an accent-2 centre
  dot), then a small ink arrowhead. Bold serif node name below, two short lines of sans below that.
- **State:** state-ok = green ring, pale green fill, check; state-danger = red ring, pale red fill,
  X; the **active** node gets a heavier ring and a highlight fill; state-inactive = empty ring;
  pending = dashed accent-2 connector with a short italic serif annotation (`not yet deployed`,
  `loads`).
- **Lower section (the beat):** one of: a `key-point-band` (reticle icon, `KEY POINT` label, one
  display-serif sentence); two split panels with tracked-caps headers and a display-serif verdict
  in the state color (03 Use); a five-day timeline (04); a decision node (05); a small table (06).
- **Density:** backbone sparse; lower section medium. Every label is a real noun from the essay.

### 2.3 The comparison plate — `agentic-os-artifact-estate-before-and-after.png` (template: comparison-plate)

Same `plate-frame` and serif title (`One Estate, ` ink + `Before and After` accent-2). Two panels
separated by a circled arrow: **BEFORE** in a red dashed border (tracked caps label in
state-danger, serif panel title, crossing dashed red lines between actors and repo cards, three
X-badged failure notes along the bottom); **AFTER** in a fine ink dashed border (one hub, a clean
tree to identical cards, green checks, three check-badged outcome notes). Versions and hashes in
mono; stale values on pale red, verified on pale green. Footer tagline states the transition.

### 2.4 The thesis plate — `some-copies-must-change.png` (template: thesis-plate)

Square. Crosshair registration marks at the corners, tick marks on the edges, a faint centre
crosshair. Two-line display-serif thesis, ink with the key verb in accent-2 (`change.`,
`survive.`). Below, an abstract flow: many small squares (ink solid, ink outline, accent-1,
accent-2, muted) stream through curves into one centre reticle and fan out to five target rings,
some accent-1, some accent-2. Eyebrow at the bottom. Precision-instrument feel, no labels.

### 2.5 What the first draft of this file got wrong

- The connector language is not "orange filled circles instead of arrowheads". It is a
  **waypoint ring on the line followed by an arrowhead**, and the nodes are **reticles** (dotted
  orbit + ticks). The reticle is the family's signature; the draft never named it.
- Titles are **serif**, not Inter. The draft's README told the generator to use Inter.
- The plate ground is near-white warm paper; the hero is warmer cream with watercolor. Both are
  paper-light; they are not the same paper.
- The draft mapped copper to `--s2s-secondary` and cobalt to `--s2s-accent`. In the live site
  those are sage green and violet (`observatory.css:131,139`). Imagery roles are now defined in the
  standards §3.1; paper-light values are not site tokens.
- `not-every-difference-is-drift.png` was listed as a style reference. It is the one outlier.

---

## 3. Night twin recipe (paper-light hero to signal-dark hero)

Every essay hero is delivered as a pair (standards §4). The twin is **the same composition at night**, not a new image. The Registry Wave atelier has windows and desk lamps; subject-specific heroes use the equivalent background and practical-light treatment described in their board.

1. **Same camera, same composition, same objects, same overlay geometry.** Generate the twin by editing the approved paper-light master, never from the prompt alone.
2. **Ground and practical light:** move the surrounding field to signal-dark and retain readable paper/material texture under the board-specific practical lights.
3. **Overlay:** the diagram becomes pale ink linework with a soft glow. The actual dark-mode `accent-1` value is **decided by design-language package**; do not select violet or copper. Copper remains only the current paper-light Registry Wave reference.
4. **Contrast:** overlay lines >= 3:1 against the dark surround; the focal object remains readable.
5. **Nothing added, nothing removed.** If the twin needs a new element to read, the master is wrong.

Social art (standards §5) is cut from the approved night twin: recompose to a 1520x1260 **art-only** plate with the focal object in the right 60%. No title, mark, or other text is baked; the site OG renderer composes the title live.

---

## 4. Templates (reuse these blocks verbatim in prompts)

Storyboards reference a template by name and then give only what is specific to the board.

### T1 atelier-hero — Registry Wave only

> **Registry Wave only.** Editorial illustration, pencil drawing with loose watercolor wash on warm cream paper, daylit
> architectural studio, calm and spacious. People at work in the lower half, drawn with care and
> individuality, doing real craft with physical objects. Above them, drawn in the air in crisp
> deep-navy ink, a sparse technical diagram that explains what they are doing: thin curved lines,
> small ringed waypoint dots with a copper centre, dashed circular badges, one hub. Faint
> drafting construction lines in the background. Accent color only in the overlay and on one or
> two objects: cobalt blue for governed solids, copper for one accent. No text, no letters, no
> numbers, no logos, no UI. 16:9. Keep the centre-third crop and centred square crop meaningful.
> Style references: hero-governed-cube.png.

Negative (all heroes): text, lettering, numbers, logos, screens with UI, robots, glowing
brains, circuit boards, stock-office clichés, neon, dark background (master), photorealism, 3D
render, isometric blocks, more than six focal elements.


### T1b subject-hero — non-Registry-Wave essays

> Editorial illustration on warm paper with the Registry Wave family’s sparse deep-ink `hero-overlay`: ringed reticle nodes, dotted orbits with ticks, thin curved connectors, and waypoint rings. Build the **essay-specific subject and setting** from its storyboard; do not stage people at drafting tables, a studio, or the Registry Wave governed-cube scene. No text, letters, numbers, logos, UI, robots, or decorative filler. Keep the centre-third and centred-square crops meaningful. The paper-light reference may describe cobalt and copper as observed Registry Wave rendering; the signal-dark `accent-1` value is decided by design-language package.

Negative (all subject heroes): text, lettering, numbers, logos, screens with UI, robots, glowing brains, circuit boards, stock-office clichés, neon, photorealism, 3D render, isometric blocks, more than six focal elements.


### T2 serial-plate

> Registry Wave serial plate, 16:9, near-white warm paper ground. Plate frame exactly as in the
> reference: tracked-caps eyebrow `<EYEBROW>` top centre over a short copper rule; four corner tag
> stacks in tiny tracked caps with thin vertical rules and faint dot grids; footer tagline in
> tracked serif caps between two copper rules ending in dots. Title in bold high-contrast serif,
> deep navy, with the beat number and beat name in copper-to-rust. One-sentence subtitle in wide
> tracked light sans. A row of `<N>` reticle nodes (solid ring with a line icon, inside a dotted
> orbit with four tick marks), numbered above in copper, bold serif name and two short sans lines
> below; connectors are a line, a small ring with a copper centre dot, then a small navy
> arrowhead. State colors: green ring+pale green fill+check = ok; red ring+pale red fill+X =
> failed; heavier ring+pale fill = active; empty ring = inactive; dashed copper connector with
> italic serif note = pending. Lower section as specified. Style references:
> registry-wave-incident-resolution-flow.png, registry-wave-presence-vs-behavior.png.

Corner tags are family furniture. For a non-Registry-Wave essay keep the four stacks and replace
their words with the essay's own four-word stacks given in the board (never reuse the Registry
Wave words on another essay).

### T3 comparison-plate

> Same plate frame, title and subtitle rules as T2. Two panels side by side separated by a circled
> navy arrow. Left panel `BEFORE — <name>` in a fine red dashed border, red tracked-caps label,
> crossing dashed red connectors, three red X-badged failure notes along its bottom. Right panel
> `AFTER — <name>` in a fine navy dashed border, one hub and clean tree, green checks, three
> green check-badged outcome notes along its bottom. Mono for any version or ID. Style
> reference: agentic-os-artifact-estate-before-and-after.png.

### T4 thesis-plate

> Square 1:1, warm cream paper, crosshair registration marks in the corners, edge ticks, faint
> centre crosshair. Two-line thesis in bold high-contrast serif, deep navy, with the key word of
> each line in copper. Below, an abstract flow diagram of small squares and rings, no labels.
> Eyebrow in tracked caps at the bottom over a short copper rule. Style reference:
> some-copies-must-change.png.

Negative (all plates): condensed grotesk titles, all-caps titles, Inter/Helvetica titles,
gradients, drop shadows, 3D, isometric blocks, clip-art icons, emoji, stock photos, dashboard
chrome, dark ground, more than one accent color family, paraphrased or invented labels,
lorem ipsum.

---

## 5. Alignment checklist (every board must pass)

**A. Ground and scheme**
1. Essay heroes: paper-light master **and** a night twin made by §3. Figures: paper-light single.
2. Plates and thesis plates use the same warm near-white; heroes may be warmer cream.
3. Nothing in the family uses a dark ground except night twins and social art.

**B. Type and text**
4. One claim per image: title + subtitle for plates; the scene for heroes.
5. Titles: serif display; ink with **one** accent-2 phrase (beat number + name, or one key word).
6. Tracked caps for eyebrows, panel headers, corner tags. Sentence case for node sub-labels. Mono
   for versions, IDs, hashes, file names.
7. Node labels: bold serif name + at most two short sans lines.
8. Exact on-image text is verbatim. Heroes and social art carry **no** text.
9. Word budget for the beat's own content (excluding frame furniture and backbone labels):
   serial plate <= 40 words, comparison plate <= 70. The Registry Wave before/after carries ~90
   and is the ceiling, not the target. Past the budget, split the plate or move text to caption.

**C. Structure**
10. Serial plates use the reticle backbone; the active node is marked; the lower section shows the
    beat's one idea.
11. Comparisons use the two-panel T3 split with the circled arrow; red dashed = ungoverned,
    navy dashed = governed.
12. Plate frame and corner stacks appear on plates only, never on heroes.

**D. Marks and state**
13. Connectors: line, waypoint, arrowhead. Weight: primary 3, secondary 2, annotation 1.5 (px at
    1600 wide).
14. State semantics fixed: green ok, red failed, heavier ring active, empty ring inactive, dashed
    accent-2 pending, dotted = designed/not built.
15. accent-2 is a semantic accent: one phrase, the waypoint centres, the eyebrow and footer rules.
    Never a fill, never body text.

**E. Density**
16. Heroes <= six focal elements. Backbone zone sparse. No decorative filler anywhere.

## 6. Role slots

Use the role names in `../graphics-standards-v1.md` §3.1 (`ground`, `surface`, `ink`, `muted`,
`accent-1`, `accent-2`, `rule`, `highlight`, `annotation`, `state-*`). The words "navy", "cobalt", "copper", "cream" in prompts describe the observed **paper-light** Registry Wave rendering for a generator that cannot read tokens; final values arrive with the design-language package. The signal-dark `accent-1` value is **decided by design-language package**.
