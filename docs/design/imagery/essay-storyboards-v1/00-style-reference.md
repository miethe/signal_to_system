# Registry Wave — Visual Style Reference

**Images opened and documented** (complete list; Read tool used on each):

**main worktree** — `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/`
- `hero-governed-cube.png`
- `agentic-os-artifact-estate-before-and-after.png`
- `diagram-artifact-taxonomy.svg`
- `diagram-registry-control-plane.svg`
- `diagram-intent-outcome-chain.svg`
- `registry-wave-detecting-silent-drift.png`
- `registry-wave-drift-across-five-days.png`
- `registry-wave-from-source-to-outcome.png` (Thread 02 Deployment)
- `registry-wave-incident-resolution-flow.png` (Thread 01 Incident)
- `registry-wave-presence-vs-behavior.png` (Thread 03 Use)
- `registry-wave-run-level-provenance-infographic.png` (Thread 06 Outcome)

**rw-v2-essay worktree** — `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/`
- `not-every-difference-is-drift.png`
- `some-copies-must-change.png`
- `the-agentic-os-artifact-estate.png`

**rw-v2-features worktree** — `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/`
- `diagram-market-wave.svg` (SVG source, read as text)
- `diagram-thread-01-incident.svg` (SVG source, read as text)

---

## Per-image documentation

### hero-governed-cube.png

**What's in frame:**
An airy atelier/workshop rendered as a paper-light illustration. Four workers sit at drafting tables in the lower half, each holding or inspecting a colored 3D cube. A supply-chain network radiates from a central hub (document-with-cube icon, approx 50% x / 28% y) down to four dashed-circle nodes (at approx 20%, 35%, 65%, 80% x / 42% y) via navy curved arcs with orange connection-dot waypoints. Each circle contains a distinct cube variant: white outlined, copper/warm, electric-blue solid, navy solid. Dashed arrows descend from circles to the workers. Background left: faint graph/network (uncontrolled-copies reference). Background right: faint document fans with dashed connectors. Foliage/plants at outer edges. No baked text.

**Composition grid:**
```
+-------------------------------------------------------------------+
| [faint graph network]   [HUB: doc-cube]   [faint doc fans]      |
|                     arc arcs radiate outward                     |
|          [o cube]    [o cube]    [o cube]    [o cube]            |
|         /dashed down  dashed down  dashed down  dashed down\     |
| [plant] [worker/desk] [worker/desk] [worker/desk] [worker/desk]  |
+-------------------------------------------------------------------+
```

**Motifs:** Hub-and-spoke governance (registry as distributor); 3D cube = tangible governed artifact; atelier = craft and care, not automation throughput.

**Line / shape language:** Gently curved 2-3px navy arcs; orange filled circle waypoints at arc midpoints (not arrowheads); thin dashed navy descending arrows from circles to workers; dashed-border node circles (soft, not hard engineering lines).

**Labeling style:** No baked text. Icon language only: document-with-cube at hub; solid colored cube inside each node circle; physical cube on each table.

**Density:** Low. Six focal elements, generous negative space.

**Ground treatment:** Warm cream / paper-light (NOT signal-dark). Daylit interior.
NOTE: This conflicts with `graphics-standards-v1.md` §3 which defaults heroes to `signal-dark`. The Registry Wave hero is an established paper-light exception. See Alignment Rule A-1.

**Palette roles:**
- ground: paper-light (warm cream)
- ink: navy dark arc lines approx `--s2s-ink`
- accent-1: electric blue (node circle icons, solid cube variants) approx `--s2s-accent`
- accent-2: warm copper/orange (connection dots, copper cube) approx `--s2s-secondary`
- muted: warm grey (background faint graph, foliage) approx `--s2s-ink-muted`

**How the hero differs from inline figures:** Atmospheric, scene-based, figurative — no data, no node labels, no baked technical terms. Paper-light ground. Large negative space. Meaning conveyed through visual metaphor, not labels.

---

### agentic-os-artifact-estate-before-and-after.png

**What's in frame:**
Full-bleed 16:9 comparison infographic. Header band: "THE REGISTRY WAVE" small-caps centered; "IDEAS / SYSTEMS / EVIDENCE / OUTCOMES" stacked upper-left; "A MORE CAPABLE / TOMORROW" stacked upper-right. Display headline: "One Estate, Before and After" — bold navy serif + copper accent on "After". Subtitle: "From uncontrolled copies to governed deployment." Two-column body separated by right-facing arrow. BEFORE (left ~48%): red-dashed border region, two actor circles (person "Nick · laptop / DEVELOPER" and robot "Agent · ICA / AUTONOMOUS AGENT"), four repo boxes with divergent version labels and hash IDs, three red X badge callouts (VERSION DRIFT / NO VERIFICATION / FRAGMENTED KNOWLEDGE). AFTER (right ~48%): teal/navy bordered region, single "SkillMeat Registry" circle at top labeled "VERSIONED / VERIFIED / TRACEABLE / DEPLOYABLE", four repo boxes each showing matching v1.4 #c4a747 with green checkmarks (SAME BYTES EVERYWHERE / AUDITABLE LINEAGE / SAFE EVOLUTION). Footer: rule + center arrow + tagline.

**Composition grid:**
```
+-------------------------------------------------------------------+
| IDEAS/SYSTEMS/...    THE REGISTRY WAVE    A MORE CAPABLE...      |
|              "One Estate, Before and After"                      |
|         "From uncontrolled copies to governed deployment."       |
+-------------------------------+---+-------------------------------+
| BEFORE                        | > | AFTER                        |
| [Nick] <--cross-links--> [ICA]|   | [SkillMeat Registry top]     |
| [repo][repo][repo][repo]      |   | [repo][repo][repo][repo]     |
| X VERSION DRIFT               |   | check SAME BYTES EVERYWHERE  |
| X NO VERIFICATION             |   | check AUDITABLE LINEAGE      |
| X FRAGMENTED KNOWLEDGE        |   | check SAFE EVOLUTION         |
+-------------------------------+---+-------------------------------+
| PEOPLE TOOLS...  ---arrow---> one source + verifiable deploys   |
+-------------------------------------------------------------------+
```

**Labeling style:** Large bold serif display headline (navy + copper); ALL-CAPS section labels; monospace version/hash strings (v1.4, #c4a747, v0.9-stale); small role labels under actor icons.

**Density:** Medium-high. Structured by panel regions, every label earns its place.

**Palette roles:**
- ground: paper-light (cream)
- ink: navy `--s2s-ink`
- accent-1: navy for AFTER panel borders
- accent-2: copper/orange for headline accent, center arrow, actor connectors
- warning: red dashed borders, X badges, stale version fills
- success: green checkmarks (accent-3 or `--s2s-accent-strong` equivalent)

---

### Serialized numbered figures: 01 Incident / 02 Deployment / 03 Use / 04 Drift / 05 Detection / 06 Outcome

These six images share one template. The 5-node horizontal pipeline is the family signature.

**Template composition grid:**
```
+-------------------------------------------------------------------+
| IDEAS/SYSTEMS/... THE REGISTRY WAVE  A MORE CAPABLE TOMORROW    |
|                                                                   |
|    "Registry Wave -- [NN] [Beat Name]"   (NN in orange)          |
|    [subtitle sentence]                                           |
|                                                                   |
|  01          02          03          04          05              |
| [O icon]-o-[O icon]-o-[O icon]-o-[O icon]-o-[O icon]            |
| Source   Registry   Deployed   Agent      Run                    |
| repo               copies     session    record                  |
|                                                                   |
| +----- beat-specific content (varies by figure) ---------------+ |
| | timeline / split panels / table / banner / decision diamond  | |
| +--------------------------------------------------------------+ |
|                                                                   |
| PEOPLE/TOOLS...  ---o---  tagline  ---o---  TRUST/TRANSPARENCY  |
+-------------------------------------------------------------------+
```

Beat-specific lower sections:
- 01 Incident: key-point card + lightbulb: "A fix can exist in the source and registry before any deployed copy receives it." Nodes 1+2 green, node 3 red/X.
- 02 Deployment: warning banner: '"task-completion-validator" now means two different things.' Node 3 explodes into prod/staging/dev sub-boxes, all red X.
- 03 Use: split panel: "WHAT WE CAN VERIFY" (presence, green check) vs "WHAT WE CANNOT VERIFY" (behavior, orange ?).
- 04 Drift: two-row horizontal timeline chart, Day 1-5: green line (Registry = guard present) vs red shaded (Deployed = guard missing).
- 05 Detection: decision diamond "compare bytes" with "expected bytes" left and "actual bytes" right; date label "Aug 6, 2026"; red outcome banner "DRIFT DETECTED -- 3 copies stale".
- 06 Outcome: run records table (RUN_ID / VERSION LOADED / GUARD PRESENT / OUTCOME), three rows: unknown/incident; stale/policy-violation; v1.4.0/success.

**Line / shape language:**
- Pipeline: large ~70px circles with inner icon (code-doc / database / stacked cubes / person / document)
- Orange filled circles (~10px) at arc midpoints as "connection waypoints" — the family's distinctive connector language
- State coloring: green border+fill for OK; red border+X for failed; amber/orange for stale-transitional; grey outline for inactive
- Dashed orange arc + "not yet deployed" text annotation for pending-deployment scenarios
- Red banners: full-width rounded-rect outcome callouts
- Corner text: very small stacked tags at all four corners

**Labeling style:**
- Title format: "Registry Wave -- " navy bold; "[NN]" in copper/orange; "[Beat Name]" navy bold
- Node labels: bold name below circle; small descriptive text below name
- Numbers 01-05: small numerals + tick mark above

**Density:** Medium. Pipeline zone always sparse; lower half varies.

**Palette roles:**
- ground: paper-light (warm cream)
- ink: dark navy `--s2s-ink`
- accent-2: orange/copper — node connector dots, title beat number
- highlight: green — ok node fills, checkmarks approx `--s2s-accent-strong`
- warning: red — failed fills, X marks, outcome banners
- grid/rule: footer horizontal rule approx `--s2s-viz-grid`

---

### not-every-difference-is-drift.png

**What's in frame:**
Large bold ALL-CAPS title "NOT EVERY DIFFERENCE IS DRIFT" with red underline rule beneath "DRIFT". Subtitle "SAME LINEAGE. DIFFERENT REASONS. DIFFERENT ACTIONS." Left column: "Upstream Source (v2.4.0, latest)" box arrow-to "Curated Collection (v2.3.0, date)" labeled "INGEST CURATE PUBLISH". Right: three project rows (Project A Behind Update; Project B Useful Local Improvement; Project C Deliberate Older Pin), each a four-card row: INTENDED BINDING -> DEPLOYED CONTENT -> RUNTIME STATE -> DECISION (orange bordered). Footer: four-part legend.

**Composition grid:**
```
+-------------------------------------------------------------------+
| NOT EVERY DIFFERENCE IS DRIFT (red underline on DRIFT)          |
| SAME LINEAGE. DIFFERENT REASONS. DIFFERENT ACTIONS.             |
+---------------------+---------------------------------------------+
| [Upstream Source]   | Project A -- BEHIND (UPDATE)               |
|    |                |  [Intended]->[Deployed]->[Runtime]->[Update]|
|  INGEST             |                                             |
|  CURATE             | Project B -- USEFUL LOCAL IMPROVEMENT       |
|  PUBLISH            |  [Intended]->[Deployed]->[Runtime]->[Reconcile]|
|    |                |                                             |
| [Curated            | Project C -- DELIBERATE OLDER PIN           |
|  Collection]        |  [Intended]->[Deployed]->[Runtime]->[Preserve]|
+---------------------+---------------------------------------------+
| -> LINEAGE  [i] INTENDED  [c] DEPLOYED  [>] RUNTIME  [D] DECISION|
+-------------------------------------------------------------------+
```

**Density:** High. Four-column project grid x three rows.

**Palette roles:**
- ground: paper-light (cream)
- ink: navy `--s2s-ink`
- accent-2: copper/orange — DECISION card borders
- warning: light-red fills for stale version cells
- title accent rule: red underline on key term

---

### some-copies-must-change.png

**What's in frame:**
Near-square plate. Crosshair registration marks at four corners; tick marks at top/bottom center; thin edge rules. Display headline (two centered lines): "Some copies must / change." in navy bold serif, with "change" in copper. "Some differences / must survive." below, "survive" in copper. Abstract data-flow in lower two-thirds: many small squares (navy filled, navy outlined, orange/copper filled, grey muted outlined) clustered left, converging through sinuous bezier curves to a central registration point, re-dispersing as five bullseye target circles (navy outline + navy dot center) at varying heights right. Bottom center: "THE REGISTRY WAVE" small serif caps.

**Composition grid:**
```
 (+)                                                       (+)
 +-----------------------------------------------------------+
 |                                                           |
 |          "Some copies must                                |
 |               change."                                   |
 |          "Some differences                               |
 |               must survive."                             |
 |                                                           |
 |  [squares]               [o]                            |
 |  [squares] ~curves~  *  [o]                             |
 |  [squares]               [o]                            |
 |                           [o]                           |
 |                           [o]                           |
 |                THE REGISTRY WAVE                         |
 +-----------------------------------------------------------+
 (+)                                                       (+)
```

**Motif:** Convergence through governance, controlled divergence; precision instrument / cartographic aesthetic.

**Density:** Low-medium. Text dominant upper half; abstract diagram lower half.

**Palette roles:** navy ink + copper/orange accent words + cream ground; no additional colors.

---

### the-agentic-os-artifact-estate.png

**What's in frame:**
Full-bleed 16:9 dense reference plate. Title "The Agentic OS Artifact Estate" with subtitle "What is built, what is partial, and what is still designed." Seven labeled zones: WORKTREES/PROJECTS (left column, four project boxes feeding PROPOSE/SYNC/PUBLISH arrow into center); THE AGENTIC OS center section (SkillMeat box + verb list + AOS CATALOGS row); PROVENANCE & SUPPLY CHAIN + EXTERNAL ECOSYSTEMS + SCOPES & INSTANCES (right column); GOVERNED ARTIFACT TYPES horizontal icon row (10 artifact types); AUTONOMY & OPERATIONS (lower left, two cards); OUTCOMES (lower center, four icons); LINEAGE/STATE LEGEND (lower right, three line variants: solid Built/Running; dashed orange Partial; dotted navy Designed).

**Density:** Very high. Reference document; not for re-rendering as a new image.

**Palette roles:** navy + copper/orange (dashed partial lines, Agent-Mode card border) + cream ground + muted dotted designed lines.

---

### SVG diagrams: diagram-artifact-taxonomy / diagram-registry-control-plane / diagram-intent-outcome-chain

**Shared substrate:** fill="#f8fafc" background (near-white); font-family Inter/Arial; title 34px bold #0f172a; subtitle 18px #475569; node labels 20-28px bold in accent color; body 15-16px #334155; arrows 3px #64748b.

**diagram-artifact-taxonomy:** Taxonomy tree. Root box "Agentic Artifacts" (dark fill, white text) at center-top; six category nodes in two rows: Instruction/Tool/Context (top) and Governance/Execution/Evidence (bottom), each with category-color border. Vertical trunk from root to horizontal bar; six drops.

**diagram-registry-control-plane:** Two-column comparison. Left: "Registry" (blue border) with discover/install/update/publish verbs and blue bullet circles. Right: "Control Plane" (green border) with approve/certify/deploy/observe/revoke verbs and green bullet circles. Headline: "A registry is not the same thing as a control plane."

**diagram-intent-outcome-chain:** Seven-stage horizontal chain: Human intent -> Governed context -> Approved artifacts -> Agent session -> Code/docs/tests -> PR/release/change -> Evidence/outcome. Each in its accent-color bordered box; 3px grey arrows connecting. Headline: "The enterprise unit is intent to outcome."

---

## Alignment rules checklist

Every new image in this family must pass ALL of these before approval:

### A. Scheme and ground
1. **The Registry Wave essay uses paper-light throughout, including the hero.** This is the visual-authority fact. New essay heroes outside the Registry Wave family may use signal-dark per the standards. Do not apply signal-dark to images destined for the Registry Wave essay.
2. **SVG diagrams use #f8fafc or equivalent near-white.** Both read as paper-light in context.
3. **Illustrations that float** use paper-light or transparent; never signal-dark.

### B. Typography and labels
4. **One legible claim per image** in the title + subtitle pair. Captions advance the argument; never restate the title.
5. **Headline color:** navy primary + copper/orange for ONE semantic accent word or beat number per title line. Never all-orange titles.
6. **Section labels in ALL-CAPS** small sans. Body text sentence case. No prose paragraphs baked into images.
7. **Version strings, IDs, hashes** in monospace; stale states in light-red fill; verified states in light-green fill.
8. **Maximum two text lines per node label.**

### C. Composition and layout
9. **Thread-series figures always use the 5-node horizontal backbone** as structural spine.
10. **Comparison plates use strict two-column layout** with a centered directional separator. Red dashed = uncontrolled/bad side; teal/navy solid = governed/good side.
11. **Heroes are scene-based and low-density.** No baked labels, large negative space, one focal subject.
12. **Corner text (IDEAS/SYSTEMS/EVIDENCE/OUTCOMES etc.)** is reserved for the numbered-thread infographic template only.

### D. Nodes and connectors
13. **Orange filled circle dots** are the transition-waypoint language for the pipeline series. Use between nodes; do not substitute arrowheads alone.
14. **State semantics:** green circle/check = verified/ok; red circle/X = failed/stale/missing; orange/amber = transitional; grey outlined = inactive.
15. **Dashed lines = pending/not-yet-deployed.** Dotted = designed/not-built. Solid = active.
16. **Connector weight:** 3px primary flow; 2px secondary; 1.5px annotation.

### E. Density and negative space
17. **Heroes:** max six focal elements; no baked labels.
18. **Thread figures:** pipeline zone sparse; lower beat zone may be medium-dense when data requires.
19. **Comparison plates:** every label earns its place; no decorative filler or lorem ipsum.
20. **copper/orange (`--s2s-secondary`) is a semantic accent**, not a background fill or primary text color. One semantic use per image maximum.

## Token slots (do not invent final hex values)

Consume semantic roles from `src/styles/tokens/observatory.css`. Refer to them as:
- ground (`--s2s-canvas` for signal-dark; paper-light TBD)
- ink (`--s2s-ink`)
- muted (`--s2s-ink-muted`)
- accent-1 (`--s2s-accent`)
- accent-2 (`--s2s-secondary`)
- accent-3..6 (`--s2s-viz-3..6`)
- highlight (`--s2s-accent-strong`)
- annotation (`--s2s-accent-label`)
- grid/rule (`--s2s-viz-grid`)

Final palette and type values arrive with the design-language package. `src/styles/tokens/bridge.css` confirms new work uses `--s2s-*` directly.
