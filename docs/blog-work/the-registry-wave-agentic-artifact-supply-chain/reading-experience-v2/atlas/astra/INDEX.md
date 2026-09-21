# Registry Wave v2: Astra visual polish atlas

Captured from the existing development server at http://localhost:4399 on 2026-09-20. Desktop captures are 1440 x 1000; mobile captures are 390 x 844. These are browser screenshots, not generated mockups.

Tier A controls state composition. Tier B informed card depth, borders, glows, icons and miniature diagrams. Prototype labels and desktop wallpaper were ignored. All 9 Tier A and 10 Tier B references, and the prior final atlas, were viewed.

## State comparisons

Each comparison places the canonical reference on the left and the implementation on the right. Scores are visual self-assessments, not automated acceptance gates.

| Tier A state | Comparison | Dark | Light | Fidelity | Changes and remaining gap |
|---|---|---|---|---|---|
| 01: Entry | [Side by side](compare-01.jpg) | [Capture](01-entry--dark.jpg) | [Capture](01-entry--light.jpg) | 8/10 | Hero crop, two-line title, compact metadata, author card and violet executive plate. Remaining: Preserved executive copy makes its card taller than the composite. CSS line 27. |
| 02: First scroll | [Side by side](compare-02.jpg) | [Capture](02-first-scroll--dark.jpg) | [Capture](02-first-scroll--light.jpg) | 8/10 | Number tile, section rule, open narrative surface, figure frame and joined sticky companion. Remaining: The manuscript places the pull quote later; see the separate pull-quote capture. CSS line 78. |
| 03: Artifact and context | [Side by side](compare-03.jpg) | [Capture](03-artifact--dark.jpg) | [Capture](03-artifact--light.jpg) | 7/10 | Full-width taxonomy table, typography, rail context plate and clearer hierarchy. Remaining: The existing contextual note remains in the rail rather than an inline split. CSS line 116. |
| 04: Thread focus | [Side by side](compare-04.jpg) | [Capture](04-thread--dark.jpg) | [Capture](04-thread--light.jpg) | 8/10 | Focused canvas, selected beat tiles, running-example card, bounded figure and evidence boundary. Remaining: The preserved heading is Use rather than the longer mockup sentence. CSS line 163. |
| 05: Evidence focus | [Side by side](compare-05.jpg) | [Capture](05-evidence--dark.jpg) | [Capture](05-evidence--light.jpg) | 8/10 | Receipt plates, support/limits hierarchy, metadata grid and source rail. Remaining: The actual record has no primary capture; the explicit absence remains. CSS line 193. |
| 06: Figure viewer | [Side by side](compare-06.jpg) | [Capture](06-figure--dark.jpg) | [Capture](06-figure--light.jpg) | 8/10 | Single framed overlay, quieter backdrop, canonical artwork and return controls. Remaining: The complete caption and metadata extend below the first viewport. CSS line 216. |
| 07: Managed variation | [Side by side](compare-07.jpg) | [Capture](07-variation--dark.jpg) | [Capture](07-variation--light.jpg) | 8/10 | Three equal cards with distinct update, reconciliation and retained-pin mini diagrams. Remaining: Mini diagrams remain unlabeled because the mockup versions and statuses are absent from the manuscript. CSS line 150. |
| 08: Conclusion and reading path | [Side by side](compare-08.jpg) | [Capture](08-conclusion--dark.jpg) | [Capture](08-conclusion--light.jpg) | 7/10 | Three-column reading path, active violet rule, cyan links and restrained closing rhythm. Remaining: The fixed manuscript places the path before the final paragraphs. CSS line 157. |
| 09: Mobile modes | [Side by side](compare-09.jpg) | [Capture](09-mobile-entry--dark.jpg) | [Capture](09-mobile-entry--light.jpg) | 8/10 | Mobile typography, touch targets, contents sheet and full-height focus surfaces. Remaining: Dense canonical figure labels still need enlargement. CSS line 231. |

Supplemental captures: [pull quote, dark](02-pullquote--dark.jpg), [pull quote, light](02-pullquote--light.jpg).

Mobile modes:
- Entry: [dark](09-mobile-entry--dark.jpg), [light](09-mobile-entry--light.jpg).
- Contents: [dark](09-mobile-contents--dark.jpg), [light](09-mobile-contents--light.jpg).
- Thread: [dark](09-mobile-thread--dark.jpg), [light](09-mobile-thread--light.jpg).
- Evidence: [dark](09-mobile-evidence--dark.jpg), [light](09-mobile-evidence--light.jpg).

## Verification

The final supplied QA suite returned **23 PASS / 0 FAIL / 1 PENDING**. V02 remains pending because browser DOM checks cannot certify source provenance. The supplied suite was run after regional changes and after the final refinements. Full output: [results-astra.txt](../../../../../../_handoff/rw-v2/qa/results-astra.txt).

Supplemental checks confirmed zero horizontal overflow at 320, 768 and 1024 pixels; true width/height attributes on all six scene images; rendered glossary emphasis instead of escaped markup; and zero Registry Wave scope classes on two other essays. `git diff --check` passed. Dark and light screenshots were visually reviewed.

## Implementation and defects

Visual rules live in `src/styles/registry-wave-v2.css`, scoped to this essay and its focus routes. `PostLayout.astro` imports the stylesheet and names the entry elements. The three focus components opt into the same scope. No collection data, manuscript, schema, dependencies or global tokens changed.

Defects corrected:

- Added true canonical image dimensions in `Figure.astro` and corrected the asset metadata path in `FigureViewer.astro`, preventing lazy-image layout shifts and failed scroll restoration. Asset paths are module-relative so the worktree does not depend on the server process working directory.
- Removed passive document scrolling from `ReadingCompanion.astro` active-link updates.
- Corrected the invalid paragraph/details nesting in `RevisionNote.astro`.
- Replaced escaped slot rendering in `Term.astro` with a native slot so glossary emphasis renders normally.
- Fixed author-role wrapping, figure toolbar overlap, light-theme link contrast, and an intermediate duplicate desktop executive fallback.

The managed-variation paths are decorative CSS SVGs. They introduce no versions, statuses, receipts or evidence assertions. Canonical artwork, content ordering, navigation behavior and state membership are retained. The shared Term and RevisionNote changes are markup fixes; all new visual styling is scoped.

## Capture notes

The current first-scroll and managed-variation captures target the actual sections. The prior atlas had captured different scroll positions. Evidence captures use the working canonical evidence route. Instant scrolling, image preload and settled font loading avoid misleading transitional captures. The visible development toolbar belongs to the existing server.

Capture helpers: `_handoff/rw-v2/qa/capture_astra.py` and `compare_astra.py`.

No npm command, production build, deployment, dependency change, manuscript rewrite, component-state reassignment, or Git write operation was performed. Build validation remains with the orchestrator as requested.

The atlas contains 35 JPEGs totaling 4,844,153 bytes (4.84 MB), below the 8 MB limit.
