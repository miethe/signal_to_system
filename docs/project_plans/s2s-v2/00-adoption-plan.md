---
it_schema: 1
feature_slug: s2s-v2-adoption
title: "Signal to System v2 — adoption plan (fresh shell, same house)"
doc_type: implementation_plan
status: draft
tier: 3
priority: P1
risk_level: high
context_class: C3   # one site repo + three upstream repos (RF, SkillMeat, MeatyWiki) + a URL migration
created: 2026-09-22
intenttree_workspace: ws_01M35C31RAPJX22B33PC4YF7YY
itt_manifest: docs/project_plans/s2s-v2/itt-manifest.yaml
related_documents:
  - docs/design/s2s-v2-visual/README.md
  - docs/project_plans/s2s-v2/analysis/01-build-handoff-digest.md
  - docs/project_plans/s2s-v2/analysis/02-visual-system-and-assets.md
  - docs/project_plans/s2s-v2/analysis/03-current-repo-audit.md
  - docs/project_plans/s2s-v2/analysis/04-integration-architecture.md
decisions:
  - decision: "Fresh shell, same house: new design system, shell, nav, layouts and sections built as a clean layer inside this repo on an integration branch; content, collections, reader, deploy and every URL are lifted."
    rationale: "All three evidence reports recommend evolving in place; the handoff forbids discarding the essay experience (specs/00:47). A new repo would re-create routes, SEO, feeds, deploy and redirects for no runtime gain, and the part worth keeping (the reader) is the expensive part."
    status: accepted
  - decision: "Plan baseline is origin/main (78de390), not local main (3 behind; missing #143-#145 reading-v2 components)."
    rationale: "03 §Executive finding; the Evidence/Receipt/Thread/Focus family exists only on origin/main."
    status: accepted
  - decision: "The handoff starter/ core is a behavioral reference to port, never files to copy."
    rationale: "Its Astro adapters were never compiled (01 §5); ADR 004."
    status: accepted
routing_constraints:
  - "Approval receipts, withdrawal and any publish/purge path MUST stay claude-primary or human; no model creates or approves a receipt."
  - "Every UI leg ends with a CC-native visual review (2-3 inspected captures) per .claude/rules/visual-verification.md."
  - "Mechanical, file-local re-token and SVG legs are offload-eligible (ICA first)."
  - "Upstream repo changes (RF, SkillMeat, MeatyWiki) are separate PRs in those repos; the S2S side consumes fixtures, never live APIs."
  - "No gpt-6-astra. Walk ICA -> Codex gpt-5.6-terra/sol -> CC-native; escalate one step on two misses."
wave_plan:
  waves: [["M0"], ["M1"], ["M2", "M3a"], ["M3b", "M4"], ["M5"]]
  phases:
    - {id: M0, title: "Baseline, safety, migration manifest", depends_on: [], gate_lens: [security, validator], gate_lens_reason: untrusted-input, exit_criteria: ["draft leak + JSON-LD fixed with tests", "manifest covers every dist route", "CI can fail"]}
    - {id: M1, title: "Design system, brand, shell", depends_on: [M0], gate_lens: [validator], exit_criteria: ["every section route matches its authoritative mockup (re-anchored 2026-09-22)", "shell renders every section route"]}
    - {id: M2, title: "Writing on the new shell", depends_on: [M1], gate_lens: [validator], exit_criteria: ["Registry Wave parity signed off", "every manifest route resolves"]}
    - {id: M3a, title: "Projection gate + RF claim projection", depends_on: [M0], gate_lens: [security, validator], gate_lens_reason: irreversible-outward, exit_criteria: ["build fails closed without a receipt"]}
    - {id: M3b, title: "Labs + Notebooks", depends_on: [M1, M3a], gate_lens: [validator], exit_criteria: ["one real Lab released with receipts", "6 real leaves"]}
    - {id: M4, title: "Projects, Studio, SkillMeat projection, withdrawal", depends_on: [M1, M3a], gate_lens: [security, validator], gate_lens_reason: irreversible-outward, exit_criteria: ["dossier artifact panel from approved projection", "withdrawal drill passes"]}
    - {id: M5, title: "Launch, QA, analytics, agent read surface", depends_on: [M2, M3b, M4], gate_lens: [security, validator], gate_lens_reason: irreversible-outward, exit_criteria: ["Nick-approved production release"]}
---

# Signal to System v2 — adoption plan

## Visual authority *(added 2026-09-22, re-anchored)*

The **visual pack** — 10 page mockups, 4 transparent asset sheets, 2 hero backgrounds, 3
reference boards, committed at `docs/design/s2s-v2-visual/` (see its README for the full index) —
is the **design authority** for S2S v2: palette, type, layout, brand marks, iconography. The
separate build-handoff's prototype/design-board material (`approved-prototype.html`,
`approved-design-board.jpg`, `design/*.png`, the Observatory/Folio/Instrument three-language
system as that prototype names it, and its "orbit/trail" header mark) is **behavior/contract
reference only** — interaction patterns, DTO shapes, build tooling — never a visual source.

Two corrections this re-anchoring makes to the sections below:

1. **Primary brand mark is the logo board's "01 Primary Lockup"** (waveform-diamond icon +
   serif wordmark), **not** the prototype's orbit/trail header mark. Favicon is favicon-idea-01
   (waveform bars). Secondary mark is "05 Monogram" (S/S, slash + sparkle). See "Asset and brand
   plan" below and `analysis/02-visual-system-and-assets.md` §3.
2. **The three-language switcher is Studio-scoped, not a global control.** Every mockup header
   (all 10 pages, including the Studio mockup itself) shows only a plain sun/moon dark/light
   toggle. The Observatory/Folio/Instrument 3-up switcher appears exactly once, as a bottom-of-page
   "Design Languages" documentation section on the Studio mockup — a showcase of the design
   system, not a header control visitors use site-wide. Folio is realized in the Notebooks mockup
   as individually cream-toned `NotebookLeaf` cards inside the still-dark shell, not a full-page
   reskin. Treat the three languages as real named skins worth building, but the header keeps its
   single dark/light toggle. See `analysis/02-visual-system-and-assets.md` §2.

Today the site is a polished Astro 6 blog (5 collections, 30 route modules, GitHub Pages) whose
best asset is the essay reader. At the end it is a public practice with primary navigation
**Writing · Labs · Projects · Notebooks · Studio**, three visual languages over one semantic token
system, and Labs/Projects that cite reviewed, static projections of RF claims and SkillMeat
artifacts, with every existing URL still resolving.

## The decision: fresh shell, same house

| Build fresh (new layer, from the mockups) | Lift (re-token, keep behavior and URLs) |
|---|---|
| Semantic tokens + Observatory/Folio/Instrument; type system | Content (5 posts, 10 stories, 7 UI docs) and the 5 collections |
| BaseLayout v2, header/nav/footer, language switcher, section templates | Reader: ReaderShell from PostLayout/StoryLayout, Figure, Term, WhereThisSits, Thread*, Evidence*/Receipt*, editorial set, islands |
| Homepage, About, /writing, /labs, /notebooks, /projects, /studio | Dev Stories cards/pills (StoryCard, StoryMetaHeader, AutomatedDisclaimer already match the mockup) |
| Labs record, claims UI, Notebook folio, dossier, projection pipeline | RSS, search.json, sitemap, deploy, every route in the migration manifest |

Evidence: 03 §6 (in place keeps 65-75% of src/, fresh scaffold 35-45%); 01 §6 (specs/00:47,
ADR 003 no blanket redirects); 04 (static projection fits the existing Pages deploy). Confirmed
by read at origin/main 78de390: the essay getStaticPaths has no draft filter and passes draft to
the layout; BaseLayout emits JSON.stringify inside set:html. Both are real, and both are M0 work.

## Target architecture

- **Routes/IA.** Five primaries are additive routes. Writing is a view over posts+stories with
  format labels (Essay, Field Note, Dev Story, Guide, Companion), not a store (ADR 001). All
  /essays/*, /dev-stories/*, /series/*, /aos/*, /systems/*, /tags/*, /topics/*, /glossary,
  /evidence/*, /portfolio/ui/*, /rss.xml, /search.json keep rendering; redirects only where the
  manifest says so, after collision/chain/loop tests. /workflow-showcase stays unlisted.
- **Tokens and languages** *(re-anchored 2026-09-22: palette sourced from the mockups, not the
  build-handoff prototype tokens; switcher demoted to Studio-scoped)*. One semantic role set
  (canvas, surface, ink, muted, accent, secondary, rule, status.*) replaces today's three
  vocabularies and feeds @miethe/ui through an alias layer. Pixel-sampled from the mockups
  (02 §2): canvas ~#0d1015, card surface ~#0f1317-#141820, chip surface ~#25282d-#26282e, rule
  ~#363a3f, ink near-white, muted ~#b7bac0, accent core in the #7C6FE0-#9B87F5 range (matches the
  logo lockup's own gradient core, ~#915de7), secondary sage ~#8fdca4-#98e8ad. Observatory (dark)
  is the site-wide default shown in every mockup header, which carries only a plain sun/moon
  dark/light toggle — **not** a three-way switcher. Folio and Instrument are real named skins
  (Folio realized as cream-toned `NotebookLeaf` cards inside the Observatory shell on Notebooks;
  Instrument seen only in the Studio mockup's bottom-of-page "Design Languages" showcase, not as
  a full-page route) rather than global themes visitors toggle; that showcase section is
  Studio-scoped design-system documentation, not the shell's header control. Meaning never
  depends on language. Shared: 4..64 space scale, 720 reading width, 280 rail (02 §2).
- **Reader lift.** Extract reader CSS from the 1,197-line global.css into a reader layer;
  collapse two parallel layouts into one ReaderShell; re-token per 03 §3. Registry Wave is the
  acceptance specimen, including the evidence/figure/thread focus flows.
- **Content model.** Existing collections plus: format field on posts/stories; Investigation,
  Run, Release (Labs); Leaf, Folio, Amendment (Notebooks); projects collection as the single
  catalog (portfolioItems migrated by stable id); frozen boundary DTOs from handoff schemas/.
- **Public-projection seam.** private adapter (RF / SkillMeat / MeatyWiki) -> allowlisted DTOs
  -> schema + semantic gate -> human approval over exact bytes -> immutable snapshot + receipt in
  this repo -> Astro pages and /data/v1. Builds fail closed. No live calls from the browser, no
  public path to the LAN node (04 §2-4).

## Milestones

**M0 — Baseline, safety, migration manifest** (Spine node_01M35CKM1NRC4GX1D6HHZFCP52).
Integration branch off origin/main; baseline.json; migration-manifest.json for every route and
fragment; one isPublishable gate; script-safe JSON-LD; blocking astro check, route snapshot,
link check, Registry Wave visual baseline; frozen DTO/ownership contracts; analytics audit.
**AC:** a draft fixture yields no HTML/RSS/search/sitemap output; a </script> title is inert;
every dist route appears once in the manifest; CI fails on a type error.

**M1 — Design system, brand, shell** (Shell tree) *(re-anchored 2026-09-22: brand marks and AC
corrected)*. Tokens + Observatory default (Folio/Instrument as named skins, not a global
switcher); waveform-diamond primary lockup, favicon-01 favicon, S/S-monogram secondary mark, OG
template; asset pipeline and the 02 §4 top-10 SVG recreations; BaseLayout v2, nav, dark/light
toggle, templates, Home, About, primitives; a design pass for everything 02 §6 lists as unmocked
(mobile, the article page, empty/error/withdrawn states, search, series/tag, 404).
**AC (per-page, matches its authoritative mockup — 02 §0):** `/` matches
`signal_to_system_better_questions_brighter_futur.png`; `/about` matches
`signal_to_system_about_nick_miethe.png`; `/labs` matches `signal_to_system_labs_index.png`;
`/notebooks` matches `signal_to_system_notebooks.png`; `/studio` matches
`signal_to_system_observatory_components.png`; `/projects` matches
`signal_to_system_portfolio_dashboard.png`; `/writing` matches
`writing_that_turns_observations_into_systems.png`. Plus: no diagram or UI text ships as raster;
lint blocks new palette literals; inspected captures at 1440/390.

**M2 — Writing on the new shell** (Writing tree). Reader lifted and re-tokened; /writing hub,
Dev Stories zones, facets/feeds; manifest applied; content reclassified; authoring templates.
**AC:** Registry Wave parity signed off by Nick; route snapshot green; rss.xml and search.json
fields unchanged; no duplicate prev/next implementation.

**M3 — Labs + Notebooks, with the projection gate first** (Labs, Notebooks, Projection trees).
M3a: release gate, receipts, snapshot store, site adapter, RF s2s-public profile + fixtures, RF
bridge, MeatyWiki marker. M3b: Investigation/Run/Release, /labs, Lab detail, claims UI,
FigureWithData, reproduce, capsules; first real Lab (S2S-018, content TBD,
req_01M35C53MSYM0R8A1MG0D77EF8); Notebook model, folio layouts, index, links, first leaves.
**AC:** every claim embed resolves to an approved projection version; a missing or mismatched
receipt fails the build; Lab detail works without JS and always shows uncertainty; 6 real leaves.

**M4 — Projects, Studio, SkillMeat projection, withdrawal** (Projects & Studio, Projection).
One catalog; /projects, /portfolio, dossier (Research Foundry first); Studio galleries and
languages tab; SkillMeat artifact-version projection + receiptable export; artifact panels;
corrections versioning; withdrawal purge + drill.
**AC:** dossier renders only from the record + approved artifact cards; used/produced/recommended
stated explicitly; a withdrawn id is absent from HTML, search, /data/v1 and assets, and rollback
cannot resurrect it; /portfolio/ui/* unchanged.

**M5 — Launch, QA, analytics, agent read surface** (Spine). One consent-aware collector;
static /data/v1 + Agent Guide + Pagefind; cross-surface a11y/perf qualification; colophon and
corrections; controlled release to main. Community, programs and the runtime resolver/MCP stay
deferred (spec 17 stop-rules).
**AC:** WCAG 2.2 AA on every template; JS <=100KB per template; every manifest route live;
rollback exercised; Nick approved the release.

Sequencing is load-bearing in three places only: M0 before all build work (the gate and manifest
are what later work is checked against); tokens before any section; the projection gate before
any Labs claim embed. Wired as depends_on links in IntentTree (92 edges).

## Lane plan (walk ICA -> Codex terra/sol -> CC-native; resolve at dispatch)

| Workstream | Start lane | Why it stops there, or why it escalates |
|---|---|---|
| M0 baseline, JSON-LD fix, analytics audit | ICA | Bounded and file-local, with a clear test. |
| M0 manifest, harness, draft gate | Codex terra | Multi-file plus CI; needs workspace-write and exact validation output. |
| M0 contracts, semantic token layer, ReaderShell | Codex sol | Contract and security reasoning across many call sites; terra is the fallback. |
| Language token files, SVG icons, diagrams, favicon/OG | Codex terra (dividers/data-stack: ICA) | Contract-clear geometry from 02 §3-4. Image-type work routes to Codex. |
| Logo master, type choice, Home/About, gap design pass | CC-native | Taste plus owner judgment; needs a browser to look at the result. |
| Reader editorial re-token, content reclass, portfolio view | ICA | Mechanical token swaps and frontmatter edits. |
| Reader core/thread/evidence, Writing IA, routes, Notebooks, Projects, Studio | Codex terra | Contract-clear implementation; CC-native visual review closes each UI leg. |
| Labs collections, claims UI, release gate, site adapter, withdrawal purge | Codex sol | Exact-version identity and fail-closed semantics; the hardest reasoning in the plan. |
| RF profile, SkillMeat projection (upstream repos) | Codex sol, then terra for fixtures | Must qualify real export/OpenAPI truth before defining a projection. |
| First Lab authoring, withdrawal drill, specimen parity, QA, release | CC-native | Owner-facing judgment, real-browser qualification, irreversible outward effect. |

Per node, meta.lane records the start lane. A leg that misses its bar twice moves up one step.

## Asset and brand plan *(re-anchored 2026-09-22 — primary mark corrected to the visual pack's logo board pick)*

Primary mark is the logo exploration board's **"01 Primary Lockup"** — a waveform-diamond icon
paired with the serif wordmark (02 §3), traced/vectorized from
`docs/design/s2s-v2-visual/02-visual-assets-transparent/signal_to_system_logo_exploration_board.png`
(transparent background). Favicon is the **favicon-ideas strip, icon 01** (waveform bars) from
the same board. Secondary mark is **"05 Monogram"** (interlocked S/S, slash + sparkle) for
square-format contexts. The board's other three concepts — "02 Observatory Lockup"
(dome-on-mountain), "03 Constellation Lockup" (node/line network), "04 Compass Lockup" (star
compass) — are alternates, not promoted for UI. This replaces the earlier recommendation to ship
the build-handoff prototype's orbit/trail header mark as primary, which read the prototype as
visual authority; it is behavior/contract reference only (see "Visual authority" above).
Favicons: favicon.svg (favicon-01 waveform bars) with prefers-color-scheme plus PNG
16/32/180/192/512 and maskable 512, all rendered from the master. OG cards are 1200x630 and
always Observatory-dark. The asset list follows 02 §4: two hero backgrounds and four keeper
stickers go through a crop-manifest pipeline to AVIF/WebP. All baked-in hero copy and diagrams
are dropped and rebuilt live. Pills, badges, tabs and chips are code, not images. SVG
recreations follow the 02 §4 top-10: nav/action icons, evidence/rail icons, ProcessLoopDiagram,
SectionDivider ornaments, the data-stack motif, SystemArchitectureDiagram, and the dot-timeline.
They are Shell tree nodes, owner decision req_01M35CNRR6NEYW1VRVXWRRV9QH (resolved 2026-09-22 —
see "Owner decisions" below).

## Risks (sharpest first)

1. **The reader has no mockup, and the shell is new.** The highest-traffic template has no
   visual direction (02 §6). If the reader is only re-tokened, it can look foreign inside the new
   shell. Mitigation: shell-gaps design pass before M2, plus the Registry Wave parity sign-off.
2. **Projection gate slippage leaks unreviewed claims.** If M3b outruns M3a, claims go public
   without receipts. The depends_on edges (lens-claims and first-author wait on gate-manifest)
   and fail-closed builds are the control. Receipts are human-only.
3. **Flagship Lab is undefined.** The longest chain (S2S-018 -> 028) waits on one owner answer.
   Labs UI can proceed on fixtures, but M3 cannot close until then.
4. **URL continuity regressions.** Any route that goes missing costs SEO and breaks inbound
   links. The manifest and route snapshot in M0 are the guard. No blanket redirects.
5. **Three token vocabularies plus @miethe/ui.** Collapsing them can break the external
   component library. Keep a deprecated alias layer until M2 closes.
6. **Over-engineering for a one-person site** (01 §8). There are 9 DTOs and 6 lifecycle axes
   for one Lab. Deferred epics stay closed without an owner decision.
7. **Shared-checkout hazard.** The main checkout carries another session's uncommitted edits.
   All work goes in worktrees off the integration branch.

## Owner decisions (HumanRequests, assigned human:nick)

| Decision | Recommended default | Request |
|---|---|---|
| First flagship Lab | Pick one real RF investigation (candidates: Registry Wave republish, Metis-film) | req_01M35C53MSYM0R8A1MG0D77EF8 |
| Primary logo | **Resolved 2026-09-22 (re-anchored):** logo board "01 Primary Lockup" (waveform-diamond); favicon = favicon-idea-01 (waveform bars); secondary = "05 Monogram" (S/S) | req_01M35CNRR6NEYW1VRVXWRRV9QH |
| Approver for releases/withdrawals | Nick is the sole approver; models never self-approve | req_01M35CNRYAWVA3A4191C9J08WZ |
| First Labs RF eligibility | Curated public-sensitivity runs with source-reuse review | req_01M35CNS3D4E862G28M8EHE4PE |
| Snapshot store + freshness | Versioned JSON/MDX in repo; show snapshot time; not "live" | req_01M35CNS8EDMHMAMSJJQG165ZD |
| Canonical domain + data paths | nickmiethe.com; /data/v1 on the primary domain | req_01M35CNSDFG8V2NG77VSTJAESY |
| Analytics | One GA4 collector with consent, wired in M5; no Firebase Storage | req_01M35CNSJEN2W411HBBT7XVYF1 |
| Runtime resolver/MCP/MediaWiki | None in v2 | req_01M35CNSR6GSC4FTB5D4P3YNK6 |

## Where I disagree with the front

Not on the call itself: the evidence supports "fresh shell, same house." Three refinements:

1. **The projection gate is M3, not M4.** The rough shape put the AOS projection in M4, after
   Labs. But a Lab cannot embed a claim before the gate exists, so the gate, the RF profile and
   the bridge move into M3a. Only SkillMeat, withdrawal and the dossier stay in M4.
2. **"Fresh sections" means fresh layouts, not fresh components.** Dev Stories (StoryCard,
   StoryMetaHeader, AutomatedDisclaimer), Studio (ComponentCard) and Callout/Figure/Badge
   already match the mockups (02 §5). ADR 004 reuse-first applies, and rebuilding them would be
   waste.
3. **The design system cannot be fully clean.** @miethe/ui reads the shadcn HSL token map, so
   the new token layer carries an alias bridge until the reader and the library are migrated.

## Execution ledger

Deviations are logged to .claude/worknotes/s2s-v2-adoption/implementation-notes.md. Mode-D
boundaries (deploy/infrastructure, data deletion via withdrawal purge) halt for Nick.
Worktree -> commit per milestone -> PR to the integration branch; main only through Nick.
