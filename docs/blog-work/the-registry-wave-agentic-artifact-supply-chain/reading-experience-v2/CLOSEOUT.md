# Registry Wave reading-experience v2 closeout

Date: 2026-09-20.

Branch: `post/registry-wave-v2-research-integrated` (PR #145).

## QA result

The headless Playwright harness at `_handoff/rw-v2/qa/run_qa.py` covers 24 browser-observable tests: N01-N12, A01-A04, C01-C04, and V01-V04. The orchestrator independently re-ran it after the Astra pass on 2026-09-20. V02 remains PENDING by design: browser DOM inspection can verify rendered evidence fields, not source provenance or absence of fabricated claims.

| ID | Status | Measured result |
|---|---|---|
| N01 | PASS | open=True; settledDeltaY=0px; focus=A:'Explore this thread beat →' |
| N02 | PASS | beats=incident:0px/True,deployment:0px/True,use:0px/True,drift:0px/True,detection:0px/True,outcome:0px/True |
| N03 | PASS | figureURL=/essays/the-registry-wave-agentic-artifact-supply-chain/figure/incident/; restoredTitle='Incident'; expected='Incident' |
| N04 | PASS | nested chain exposed |
| N05 | PASS | figure=/essays/the-registry-wave-agentic-artifact-supply-chain/figure/incident/; back=thread; forward=figure; rootDialogOpen=False |
| N06 | PASS | freshURL=/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/; heading='Incident'; dialogOpen=False |
| N07 | PASS | reloadURL=/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/; heading='Incident' |
| N08 | PASS | newTabURL=http://localhost:4399/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/ |
| N09 | PASS | blockedJS=True; scenes=6; images=6; evidenceLinks=2; directHeading='Incident' |
| N10 | PASS | pushState=throws; URL=/essays/the-registry-wave-agentic-artifact-supply-chain/thread/incident/; dialogOpen=False |
| N11 | PASS | backDeltaY=0px; readSceneTop=96px |
| N12 | PASS | returnViewport=390x844; anchorTop=0px |
| A01 | PASS | tabSteps=16; contained=True; escapeFocus=A:'Explore this thread beat →' |
| A02 | PASS | mediaReduce=True; railTransition=1e-05s |
| A03 | PASS | 320x844:0px; 844x320:0px |
| A04 | PASS | dialogLabel='Incident'; semanticTables=4; sourceLinks=209 |
| C01 | PASS | activeLocationMarkers=1 |
| C02 | PASS | visibleNoteBefore=1; visibleNoteAfterDismiss=0 |
| C03 | PASS | collapsed=false; held=true; heldAfterScene=true |
| C04 | PASS | threadRailChildren=2; evidenceRailChildren=2 |
| V01 | PASS | threadScenes=6; sceneImages=6; figureRoutes=6 |
| V02 | PENDING | Browser DOM can confirm rendered evidence fields, but cannot certify source provenance or absence of fabricated claims. |
| V03 | PASS | lightBg=#ffffff; darkBg=#071425; mobileContents=1; appTablists=0 |
| V04 | PASS | htmlBytes=796096; articleH2=11; scenes=6 |

Counts: PASS 23, FAIL 0, PENDING 1.

History: initial QA was 15 PASS, 8 FAIL, 1 PENDING (`results.txt`); QA fixes reached 23/0/1 (`results-fix.txt`, `54b9849`); visual round 1 regressed to 15/8/1 after an unrequested `src/lib/focus-host.ts` edit, then reverted that file and restored 23/0/1 (`results-visual-1b.txt`, `5855b3f`); visual rounds 2-3, Astra, and the orchestrator verification held 23/0/1 (`9b48ae0`, `eec442d`, `results-astra-verify.txt`).

## Build and visual gates

- `npm run build` passed on 2026-09-20 after Astra: 92 HTML pages plus `search.json`. The `projects collection empty` warning is pre-existing.
- `Term.astro` changed from `set:html` to a slot. Glossary Term rendering was verified in all four essays that use it.
- Headless Playwright verified light and dark at 1440x900, 1440x1400, and 390x844: rail ExecutiveSignal visible and body copy hidden at `xl`; body copy visible and rail hidden on mobile; hero, seven section markers, and six thread scenes present; no horizontal overflow; frontispiece caption present.

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
| QA fixes | `54b9849` | Restored root return after focus close; fixed dialog tab loop, 320px overflow, contextual note, and nested Evidence to Figure links. |
| Visual fidelity round 1 | `5855b3f` | Added entry shell, rail stack, section markers, plates, and instant jump honoring `scroll-margin-top`. |
| Visual fidelity rounds 2-3 | `9b48ae0` | Added rail signal variant, revision strip, section marker tiles, light-theme parity, and fixed the ExecutiveSignal dark override. |
| Astra visual polish | `eec442d` | Added the essay-scoped `registry-wave-v2.css` system; real image aspect ratios via sharp; FigureViewer path resolution; non-scrolling ReadingCompanion; RevisionNote `p` to `div`; Term slot rendering; focus surfaces; frontispiece caption; and the Astra atlas. |

## Direction delivery

| Decision | Status | Reason |
|---|---|---|
| V1 | done | Shared data and evidence surfaces maintain the stated provenance and fabrication boundary. Browser confirmation remains pending. |
| V2 | done | Canonical six beats are implemented: Incident, Deployment, Use, Drift, Detection, Outcome. |
| V3 | done | Six inline ThreadScenes and one data-driven Thread Focus surface are delivered. |
| V4 | done | Root and anchor return semantics pass N01, N02, N11, and N12 since `54b9849`. |
| V5 | done | Desktop companion rail and mobile Contents sheet are delivered. |
| V6 | done | Section markers and active reading state work; 320px and landscape overflow pass A03. |
| V7 | done | Figure Viewer and route work, including nested Evidence to Figure links exposed by N04. |
| V8 | done | Managed variation is inline HTML and the closing asset treatment follows the direction. |
| V9 | done | Evidence data, disclosure entry, Evidence Focus, and record anchors are delivered. |
| V10 | partial | Both themes are verified; fidelity to the Tier A composites remains short. |
| V11 | done | Prototype semantics were adapted into Astro components rather than copied wholesale. |
| V12 | partial | Six-movement integration landed. The Opus voice pass is deferred: ICA Claude Bedrock authentication was broken on 2026-09-19 and 2026-09-20. |
| V13 | done for scoping | V2 furniture is gated by `.post-layout--registry-wave` and essay slug checks; build and Term checks confirm other essays render. Cross-essay visual spot checks were not run. |

## Tier A fidelity

Sol with vision scored the named states 01 entry, 02 first scroll, 04 thread focus, 05 evidence focus, 06 figure viewer, 07 managed variation, 08 conclusion, and 09 mobile, in that order.

| Review | Scores by state | Evidence |
|---|---|---|
| Round 0, after QA fixes | 4, 2, 5, 3, 4, 2, 4, 3 | `atlas/final/FIDELITY-REVIEW-sol-round0.md` |
| Round 1, after visual round 1 | 6, 3, 4, 4, 3, 2, 4, 4 | `atlas/final/FIDELITY-REVIEW-sol-round1.md` |
| Rounds 2-3 | 6, 3, 5, 4, 4, 3, 3, 3 | `atlas/final/FIDELITY-REVIEW-sol.md` |
| After Astra | 6.5, 4, 4, 5, 4, 4, 4, 4 | `atlas/astra/FIDELITY-REVIEW-sol.md` |

Astra self-scored the same states at 7-8 in `atlas/astra/INDEX.md`. Sol grades largely against component order and manuscript structure in the mock, which a CSS pass cannot change. ICA Terra could not view the targets; fidelity therefore plateaued on ICA and the Astra pass was sanctioned. The gap to the composites remains open: Nick's bar is "everything around the Title page, the hero, the executive takeaway, the section lines, the sections."

## Open items carried forward

| ID | Carried item | Current boundary |
|---|---|---|
| O01 | Latest canonical technical PNG availability | Confirmed rendering and final visual comparison remain pending. |
| O02 | Current manuscript and component/router state | Preserve current author edits and recheck before any follow-up change. |
| O03 | Original lab captures and public source URLs | Continue to show bounded summaries and do not invent logs or hashes. |
| O04 | Research-handoff date conflicts | Preserve event, receipt, and revalidation distinctions. |
| O07 | Safari, iOS, Firefox, and assistive-technology validation | Not performed. |
| O08 | Final hero crop and approved portrait | Remains with Nick or visual owner. |
| O09 | Semantic holds on optional raster assets | Keep labeled HTML treatment and do not imply clearance. |
| O10 | Final manuscript length, read time, and publication metadata | Editorial closure pending. |
| O11 | Detail-route indexing and canonical policy | Site-owner decision pending. |
| O12 | Exact cross-browser font matching | Final browser comparison pending. |
| O13 | Tier A visual fidelity gap | Top carried item: the composite gap described in Tier A fidelity remains open. |
| O14 | Tracked Astra captures | `eec442d` tracks 4.84 MB of Astra JPEG captures despite the earlier markdown-only decision. A follow-up may drop them from history before merge. |
| O15 | CCX Codex shim | The shim drops tool calls and lacks `input_image` translation. Agentic legs stayed on beta; Nick is fixing the shim in another session. |

## Deferred work and known boundaries

- The Opus voice pass on V12 prose remains deferred because ICA Claude Bedrock authentication was broken on 2026-09-19 and 2026-09-20.
- The asset-map warning remains binding: the closing PNG contains `SAME BYTES EVERYWHERE`. Its caption must keep the corrective framing that governed lineage and declared, auditable divergence are the claim; identical deployed bytes are only the lucky case, not the definition of governance.
- There is no per-record evidence route by design: records are anchors within `/evidence/`.
- The first-scroll mobile capture requires a settle wait. A blank lower half in a capture is a capture artifact, not a render hole.
- The browser-pane tab is `document.hidden`; rAF-dependent restore tests must run in headless Playwright.

## Lanes used

| Leg | Lane |
|---|---|
| Taste-fix A3-A9 | Nick's personal Codex, `gpt-5.6-terra`. |
| QA legs, visual rounds 1-3 | ICA beta gateway, `gpt-5.6-terra-dzus` via CC2. |
| Closeout update | ICA beta gateway, `gpt-5.6-terra-dzus` via CC3 (CC2 returned 429, budget exhausted, on 2026-09-20). |
| Sol fidelity scoring, four rounds | ICA ccx, `gpt-5.6-sol` with vision via CCx3; direct chat completions. |
| Astra visual polish | Nick's personal Codex, `gpt-6-astra`; sanctioned by Nick as "ICA first, Astra after"; 326,873 tokens; session `01a0bcfe-f3b2-7370-9147-ed003c0b55ef`. |

`eec442d` (the Astra capture commit) was made by a separate session, not this orchestrator.

## Atlas

| Atlas | Contents | Tracking state |
|---|---|---|
| [`atlas/final/INDEX.md`](atlas/final/INDEX.md) | 34 JPEG captures. | `final/*.jpg` are untracked; only `INDEX.md` and the three `FIDELITY-REVIEW-sol*.md` files are intended to commit. |
| [`atlas/astra/INDEX.md`](atlas/astra/INDEX.md) | 35 JPEG captures, 4.84 MB; includes Astra self-assessments. | Tracked in `eec442d`. |
| [`atlas/astra/FIDELITY-REVIEW-sol.md`](atlas/astra/FIDELITY-REVIEW-sol.md) | Sol's after-Astra state scores and gap list. | Tracked in `eec442d`. |
