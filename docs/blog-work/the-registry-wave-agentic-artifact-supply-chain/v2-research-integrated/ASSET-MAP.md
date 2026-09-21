# Asset map — review-v4 PNG integration (W2)

Date: 2026-09-18. Author: W2 (assets leg).

Destination: `public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/`.
Optimization tool: **`sharp`** (already a transitive dependency of `astro@6.0.7`, invoked directly
via a throwaway Node 22 script — `sharp-cli` is not installed and `npx` refused to auto-install it
without a `--yes`, so the underlying library was used instead of the CLI wrapper). Method:
`sharp(src).png({ quality, compressionLevel: 9, effort: 10, palette: true })`, stepping `quality`
down from 90 until the output cleared the 400 KB budget. Dimensions were left at source resolution
(no resize) for all nine files. **Did not touch** the MDX manuscript, `threads.ts`, or any
`.astro`/`.tsx` component — that wiring is W1/W3's job.

## Beat / figure map

| Beat / role | Destination filename | Width × height | Bytes (decimal) | Text-defect note |
|---|---|---|---|---|
| 1 — Incident | `registry-wave-incident-resolution-flow.png` | 1672 × 941 | 379,180 | none |
| 2 — Divergence | `registry-wave-from-source-to-outcome.png` | 1672 × 941 | 281,384 | none |
| 3 — Detection (primary) | `registry-wave-detecting-silent-drift.png` | 1672 × 941 | 323,398 | none |
| 3 — Detection (secondary, five-day frame) | `registry-wave-drift-across-five-days.png` | 1672 × 941 | 323,747 | none |
| 4 — Reconcile (also movement-2 signature figure, D5) | `not-every-difference-is-drift.png` | 1448 × 1086 | 355,941 | none — confirmed below |
| 5 — Use | `registry-wave-presence-vs-behavior.png` | 1672 × 941 | 367,921 | none |
| 6 — Outcome | `registry-wave-run-level-provenance-infographic.png` | 1672 × 941 | 245,908 | none |
| Closing figure 1 (movement 6, inline) | `agentic-os-artifact-estate-before-and-after.png` | 1672 × 941 | 316,468 | **yes — see below, caption must correct it** |
| Closing figure 2 (inside "Inside my lab" `<details>`) | `the-agentic-os-artifact-estate.png` | 1672 × 941 | 358,809 | none |

All nine files were opened with the Read tool at full resolution both before and after
copy/compression; the post-compression re-read confirmed no legibility loss at the chosen quality
(lowest was q50/q55 on the two closing figures — small caption text stayed sharp).

## D5 verification — `not-every-difference-is-drift.png`

**Confirmed.** The image is the three-project A/B/C story exactly as D5 specifies, no fallback SVG
needed:

- **Project A — Behind (update).** Intended binding v2.3.0, deployed v2.2.1 (older), decision
  **Update**.
- **Project B — Useful local improvement.** Intended v2.3.0, deployed v2.3.0+local (local patch),
  decision **Reconcile + preserve**.
- **Project C — Deliberate older pin.** Intended v2.1.0 (pinned), deployed v2.1.0 (as intended),
  decision **Preserve pin**.

Header line: "SAME LINEAGE. DIFFERENT REASONS. DIFFERENT ACTIONS." This is the managed-variation
thesis stated in the image itself, not just compatible with it — no contradiction, no
"one canonical version everywhere" framing anywhere in the frame.

## D4 text-defect finding — `agentic-os-artifact-estate-before-and-after.png`

**Flagging, not silently placing.** This image's own baked-in copy contradicts D4's constraint.
The "AFTER — Governed estate" panel reads:

- Subhead: **"One source of authority. Verified deployments of the same bytes."**
- Callout tile: **"SAME BYTES EVERYWHERE — Identical, verified copies deployed to each project."**

That is precisely the "one canonical version everywhere" framing D4 says the caption must never
imply. The image is otherwise the right shape for a before/after closing figure (four projects,
one registry, hash-verified) and the "BEFORE" panel content (version drift, no verification,
fragmented knowledge) is fine and worth keeping.

**What this means for W3 (manuscript, not done here):** the caption placed under this figure needs
to do the correcting work the image itself doesn't — something like: *the diagram compresses "same
bytes everywhere" into a punchy after-state, but the actual claim this essay makes is narrower:
verified lineage back to one governed source, with declared, auditable intent for the copies that
do legitimately diverge (see "Not every difference is drift" above). "Same bytes everywhere" is the
lucky case, not the definition of governed.* Do not caption this figure with language that repeats
the image's own "same bytes everywhere" framing at face value.

## Closing pair (movement 6)

Per D4: `agentic-os-artifact-estate-before-and-after.png` is the inline closing figure in movement 6
(with the corrective caption above); `the-agentic-os-artifact-estate.png` goes inside an expandable
"Inside my lab" `<details>` immediately after it, with no optional text-free pair inline. The
second image's own footer copy ("NOT EVERY DIFFERENCE IS DRIFT." / "SOME COPIES MUST CHANGE. SOME
DIFFERENCES MUST SURVIVE." / "COMPOUNDING INTENT.") is consistent with the managed-variation thesis
and needs no corrective caption.

## Not touched (explicitly out of scope for this leg)

- `diagram-thread-0*.svg`, `diagram-market-wave.svg`, `diagram-estate-before-after.svg` and the
  other pre-existing SVGs in the destination directory — retirement waits for the manuscript leg
  (D4), after every reference is confirmed gone via `grep -rn`.
- `src/data/threads.ts`, the MDX manuscript, and every `.astro`/`.tsx` component.
- `hero-governed-cube.png` and `some-copies-must-change.png` (pre-existing in the destination
  directory, already sized — not part of this task's nine-file list).
