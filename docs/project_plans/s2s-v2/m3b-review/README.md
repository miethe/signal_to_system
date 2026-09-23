# M3b Labs — visual review

Captured 2026-09-22 with Playwright (Chromium). Desktop 1448 CSS px, mobile 390, `device_scale_factor` 1, full page.
Fixture pages come from the dev server (`astro dev`) and from a fixture build (`S2S_LABS_FIXTURES=1 astro build`). The empty-state pages come from the production `dist/`.
`sbs-*.webp` put the storyboard image (`docs/design/s2s-v2-visual/labs-storyboard/images/`) above the build, both cropped to their top 1000 px (`scripts/compose-review.py`).

Every Lab shown here is synthetic fixture data. The production build emits only `/labs/`, in its empty state.

| Image | Route | What was seen |
|---|---|---|
| `index-empty-dark-1448` / `-390` | `/labs/` (production) | The hero, quote and rail match the storyboard. The main column is an in-preparation StateNotice ("The first Lab is in preparation."), followed by the "Inside an investigation" strip, which fits all 7 tiles on one row. The rail has Start in Labs and How a Lab is released, with no domain list and no counts. The nav marks Labs as current. Nothing is overlapping or clipped at 390. |
| `index-dark-1448` / `-390` | `/labs/` (fixture) | The synthetic-fixture banner sits above the hero. The filter row (Domain, Method, Conclusion, Sort) matches the storyboard. The featured investigation is a wide card whose media is Figure 1, drawn from the released data rather than a photo. There is an All investigations grid, a Withdrawn releases list, and the Inside strip. The rail has Start in Labs, the Domain constellation (moved into the rail, because the storyboard's side-by-side squeezed the card at the real main-column width), How a Lab is released, and Domains with counts. The second Lab has no released chart, so its card shows a glyph, not an invented image. |
| `report-dark-1448` / `-390`, `report-light-1448`, `report-instrument-1448` | `/labs/<id>/` | Sections: summary; bounded conclusion, which always shows uncertainty and scope; Largest limitation callout; key claims covering all five statuses side by side (contested ones are not moved to an appendix); the featured figure with its data table, digests and "What the evidence is"; method; reproduce; timeline, including a correction. The light theme and the Instrument skin both hold contrast and hierarchy. At 390 the hero rail is hidden and the tabs scroll horizontally, with no page-level overflow (scrollWidth equals the viewport). |
| `claims-dark-1448` / `-390` (`sbs-claims`) | `/labs/<id>/claims/` | The claim column and the evidence column match the storyboard layout. The storyboard's generic "Verified" is replaced with each item's own review state. Denied evidence (E5) renders only the fixed `ACCESS: DENIED` token. Receipts sit on their own line under each claim. "Not reviewed · illustrative only" is shown in italics for C4 and C5. |
| `claim-record-dark-1448` | `/labs/<id>/claims/c3/1.0.0/` | Exact-version record: scope, uncertainty, limitations and dated receipts. Evidence is grouped as Supports, Contradicts and Qualifies. The rail has this claim's network, the pinned `publicId@version`, and the other claims with their statuses. |
| `resources-dark-1448` (`sbs-resources`) | `/labs/<id>/resources/` | Sources grid: the denied source shows only its token, and the metadata-only source is labelled. Figure 1 is drawn. Figure 2's data is not gate-approved, so it shows a "Figure data not released" plate and no chart. Figure 3 is a described, non-data figure. Artifact cards show digests, and only gate-approved artifacts appear. The rail has resource counts and the Research lineage (source → claim → figure → artifact). |

## No-JS check

Checked against the fixture build's static HTML, not a screenshot:
- The claims page has all 5 claim cards and all 5 evidence items, and none is hidden.
- The index has both investigation cards, and none is hidden.
- Charts are server-rendered `<svg>` elements, and data tables are `<details>` elements in the HTML.

The filters and the sort are progressive enhancement only.

## Deliberate differences from the storyboard (honesty rules)

- The quote is unattributed. The storyboard attributes it to Nick, and we do not invent attributions.
- Lab heroes have no quote.
- There is no generic "Verified" badge anywhere.
- Card media is a figure drawn from released data. There are no photographic thumbnails, and cards without released data show a glyph.
- These storyboard panels are deferred because no records back them yet: Research programs, "Reuse in essays", search, and the grid/list toggle.
- The nav still points Labs at `/aos/` until the first real Lab ships. `/labs/` now highlights it.
