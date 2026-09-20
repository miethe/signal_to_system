# Registry Wave reading-experience v2 closeout

Date: 2026-09-19.

## QA result

The existing server at `http://localhost:4399` responded and Playwright Chromium launched outside the earlier sandbox. The runner drove every browser-observable acceptance test at the required routes and viewports. It saved the final atlas without opening or inspecting any capture. One boundary remains: V02's provenance and no-fabrication claim requires source review, not browser DOM inspection.

Results below preserve the statuses from `_handoff/rw-v2/qa/results.txt` verbatim.

| ID | Status | Measured result |
|---|---|---|
| N01 | FAIL | open=True; settledDeltaY=1990px; focus=A:'Explore this thread beat →' |
| N02 | FAIL | beats=incident:1963px/False,deployment:7152px/False,use:8523px/False,drift:9544px/False,detection:10740px/False,outcome:14557px/False |
| N03 | PASS | figureURL=/essays/the-registry-wave-agentic-artifact-supply-chain/figure/incident/; restoredTitle='Incident'; expected='Incident' |
| N04 | FAIL | threadToEvidenceLinks=0; evidenceToFigureLinks=0; required nested chain is not exposed |
| N05 | PASS | figure=/essays/the-registry-wave-agentic-artifact-supply-chain/figure/incident/; back=thread; forward=figure; rootDialogOpen=False |
| N06 | PASS | freshURL=/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/; heading='Incident'; dialogOpen=False |
| N07 | PASS | reloadURL=/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/; heading='Incident' |
| N08 | PASS | newTabURL=http://localhost:4399/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/ |
| N09 | PASS | blockedJS=True; scenes=6; images=6; evidenceLinks=2; directHeading='Incident' |
| N10 | PASS | pushState=throws; URL=/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/; dialogOpen=False |
| N11 | FAIL | backDeltaY=1462px; readSceneTop=1598px |
| N12 | FAIL | returnViewport=390x844; anchorTop=14746px |
| A01 | FAIL | tabSteps=16; contained=False; escapeFocus=A:'Explore this thread beat →' |
| A02 | PASS | mediaReduce=True; railTransition=1e-05s |
| A03 | FAIL | 320x844:79px; 844x320:56px |
| A04 | PASS | dialogLabel='Incident'; semanticTables=4; sourceLinks=208 |
| C01 | PASS | activeLocationMarkers=1 |
| C02 | FAIL | visibleNoteBefore=0; visibleNoteAfterDismiss=0 |
| C03 | PASS | collapsed=false; held=true; heldAfterScene=true |
| C04 | PASS | threadRailChildren=2; evidenceRailChildren=2 |
| V01 | PASS | threadScenes=6; sceneImages=6; figureRoutes=6 |
| V02 | PENDING | browser DOM can confirm rendered evidence fields, but cannot certify source provenance or absence of fabricated claims |
| V03 | PASS | lightBg=#ffffff; darkBg=#0b1326; mobileContents=1; appTablists=0 |
| V04 | PASS | htmlBytes=718766; articleH2=11; scenes=6 |

Counts: PASS 15, FAIL 8, PENDING 1.

## Package commits

| Package | Commit | Delivery |
|---|---|---|
| Direction freeze | `d71555f` | Frozen review-v4 direction and component API contract. |
| P0-A | `179fc8c` | Seeded canonical thread beats and evidence records. |
| P0-B | `4d1d015` | Added static shell and reading routes. |
| P0-C | `f5d8d88` | Added FocusHost overlay controller. |
| Taste fixes A1/A2 | `4820a92` | Bound dark variant and namespaced the accent token. |
| P0-B/C taste review | `992d246` | Filed the Tier A fidelity fix list. |
| Taste fixes A3-A9 | `a2fb09d` | Repaired rail, evidence entry, markers, frontispiece, evidence index, and dark plates. |
| V12 content integration | `d05df3e` | Integrated six movements, shared beat records, and retired thread SVGs. |
| P0-D and P1 | `68c0f0d` | Added mobile Contents, accessibility work, and reader polish. |

## Direction delivery

| Decision | Status | Reason |
|---|---|---|
| V1 | done | Shared data and evidence surfaces maintain the stated provenance and fabrication boundary. Browser confirmation remains pending. |
| V2 | done | Canonical six beats are implemented: Incident, Deployment, Use, Drift, Detection, Outcome. |
| V3 | done | Six inline ThreadScenes and one data-driven Thread Focus surface are delivered. |
| V4 | partial | Static routes and one FocusHost history owner are delivered. Browser QA passed history, direct routes, refresh, no-JS, and failure fallback, but root and anchor return semantics fail. |
| V5 | done | Desktop companion rail and mobile Contents sheet are delivered. Final visual fidelity confirmation remains a separate review boundary. |
| V6 | partial | Section markers and active reading state work, but 320px and landscape overflow fail. |
| V7 | partial | Figure Viewer and route work, including Thread to Figure to Escape. Nested Evidence to Figure flow is not exposed. |
| V8 | done | Managed variation is inline HTML and the closing asset treatment follows the direction. |
| V9 | done | Evidence data, disclosure entry, Evidence Focus, and record routes are delivered. |
| V10 | partial | Class-based light and dark implementation is delivered and captured, but Tier A visual fidelity remains a separate review boundary. |
| V11 | done | Prototype semantics were adapted into Astro components rather than copied wholesale. |
| V12 | partial | Six-movement integration landed. The required Opus voice pass on the V12 prose is deferred. |
| V13 | partial | Data-gated reusable machinery is delivered; this leg did not run the required unrelated-post regression spot checks. |

## Open items carried forward

| ID | Carried item | Current boundary |
|---|---|---|
| O01 | Latest canonical technical PNG availability | Confirmed rendering and final visual comparison remain pending. |
| O02 | Current manuscript and component/router state | Preserve current author edits and recheck before any follow-up change. |
| O03 | Original lab captures and public source URLs | Continue to show bounded summaries and do not invent logs or hashes. |
| O04 | Research-handoff date conflicts | Preserve event, receipt, and revalidation distinctions. |
| O05 | Hosted Back/Forward, refresh, and new-tab traversal | Chromium proved these browser paths. Root and anchor return behavior still fail N01, N02, N11, and N12. |
| O06 | Reader-route history ownership | Architecture selects the native route group plus FocusHost owner. Browser history traversal passed N05; root-return behavior remains defective. |
| O07 | Safari, iOS, Firefox, and assistive-technology validation | Not performed. |
| O08 | Final hero crop and approved portrait | Remains with Nick or visual owner. |
| O09 | Semantic holds on optional raster assets | Keep labeled HTML treatment and do not imply clearance. |
| O10 | Final manuscript length, read time, and publication metadata | Editorial closure pending. |
| O11 | Detail-route indexing and canonical policy | Site-owner decision pending. |
| O12 | Exact cross-browser font matching | Final browser comparison pending. |

## Deferred work and known boundaries

- Opus voice pass on V12 prose is deferred from this leg because ICA Claude upstream was down on 2026-09-19.
- The Tier A fidelity round against composites is deferred from this leg because ICA Claude upstream was down on 2026-09-19. It runs as a separate Sol-with-vision leg on the ccx lane and will be appended to this closeout by the orchestrator.
- FIX-LIST section B items were not taken. They are fidelity-pass work, not silently closed by this QA leg.
- Chromium browser tests and the requested final atlas ran outside the prior sandbox. No images were opened or viewed in this leg.
- The asset-map warning remains binding: the closing PNG contains the phrase `SAME BYTES EVERYWHERE`. Its caption must keep the corrective framing that governed lineage and declared, auditable divergence are the claim; identical deployed bytes are only the lucky case, not the definition of governance.

## Lanes used

| Leg | Lane |
|---|---|
| Taste-fix A3-A9 | Nick's personal Codex, `gpt-5.6-terra` |
| Everything after taste-fix A3-A9 | ICA `gpt-5.6-terra` via CC2 |

## Atlas

The final atlas index is [`atlas/final/INDEX.md`](atlas/final/INDEX.md). It contains 34 JPEG captures plus the index, totalling 2.7 MB. The runner saved the captures at JPEG quality 80 and did not inspect them. A human or vision leg should review them against Tier A composites.
