---
schema_version: '0.2'
id: rw-research-20260917-05_visual_asset_review
type: artifact
artifact_kind: visual_review
title: 'Generated images: semantic review and revision contracts'
project: Signal to System
domain: agentic_systems_engineering
status: candidate_artifact
owner: Nick Miethe
created_at: '2026-09-17'
updated_at: '2026-09-17'
system_of_record: GitHub
current_location: downloadable handoff; not committed or published
related_systems:
- Agentic OS
- SkillMeat
- IntentTree
- CCDash
- Research Foundry
- MeatyWiki
- AOSBench
source_context: Four supplied Deep Research reports; retrieved 2026-09-16 local handback;
  prior narrative handoff; bounded primary-source checks on 2026-09-17. See 09_sources.md.
intended_use: Human-reviewed local-agent editorial integration; not publication authority
  or current runtime attestation.
next_action: Apply the research overlay to the current local manuscript and manifests
  without overwriting author edits.
review_cadence: Before publication or any product-state claim
confidentiality: work_sensitive
tags:
- registry-wave
- research-integration
- prior-art
- editorial-handoff
---

# Five originals included; not five approved figures

The originals are copied unchanged into `assets/originals/`. Their hashes and image dimensions are recorded in `assets/manifest.yaml`. This pass reviewed their visible labels against the research and local handback. It did not generate replacements or authentic product screenshots.

## Disposition

| Asset | Decision | Why |
|---|---|---|
| A01: capability workshop hero | **Concept candidate** | It communicates shared origin and purposeful variation without making detailed product-state claims. |
| A02: Not every difference is drift | **Hold for revision** | Invented date/versions, unsupported runtime “observed” labels, unconditional preservation language. |
| A03: four assurances | **Hold for revision** | Acceptance authority is missing; bottom copy implies unsupported beneficial outcomes. |
| A04: five-essay arc | **Hold for rebuild** | Wrong ADF expansion, wrong SkillMeat responsibility, invented market claims and no planned-state distinction. |
| A05: Some copies must change | **Concept candidate** | Useful editorial proposition; it is not an empirical or novelty claim. |

**Concept candidate is not publication approval.** The author still selects final art and placement.

## A01: hero treatment

Keep the workshop metaphor. It is not a photograph of the author's lab and should never be captioned as one. It has several workbenches; that is acceptable for an illustration, but it is not an exact visualization of the three-project test configuration.

Suggested placement: above the title, moderate height, with the title remaining easy to reach on mobile. Use a dedicated social crop rather than assuming this image works for all aspect ratios. Keep artifact lineage metaphorical and put exact semantic content in a separate technical figure.

## A02: semantic contract for replacement

The visible generated date `2024-05-10` has no source and must be removed. “Observed” runtime states were also invented during generation. Do not put a disclaimer beneath false observation labels and call that corrected; change the labels themselves.

### Approved illustrative data model

This is **proposed diagram data**, not a SkillMeat API or a production record:

| Field | Project A | Project B | Project C |
|---|---|---|---|
| Shared lineage | Example source S1 → shared revision C1, then C2 | Same shared lineage | Same shared lineage |
| Intended binding | C2 | Project variant P1, based on C1, pending review against C2 | C1, deliberately pinned |
| On-disk state in illustration | C1 | P1 = C1 plus a local change | C1 |
| Runtime identity | Not captured | Not captured | Not captured |
| Question | Why has intended C2 not arrived? | How should the shared change interact with the local change? | Does current policy still allow this pin? |
| Candidate decision | Update to intended revision through the approved path | Review/reconcile; do not overwrite unexplained local work | Retain only while valid under applicable policy |

Do not call P1 “valuable” without evidence, and do not treat the target variant P2 as already created or tested. Show a dotted optional candidate edge for reconciliation, not a successful automatic merge.

**Exact preferred labels:**
- Title: **Not every difference is drift**
- Subtitle: **Compare with the intended binding. Review the reason for the difference.**
- Project A: **Update needed**
- Project B: **Local change needs review**
- Project C: **Deliberate pin, subject to policy**
- Runtime state in all three: **Not captured**
- Caption: **Illustrative configuration. An older version is not automatically stale, and a local difference is not automatically approved.**

### Build prompt for the local visualization agent

Create an editable SVG and a matching text equivalent from the table above. Use warm ivory, navy/cobalt structure and restrained copper emphasis. Show lineage separately from intended binding and observed deployment. Keep runtime identity visibly unknown. Do not invent dates, semver, approval badges or native product UI. Reflow three project cards vertically on mobile. Include worktree destinations only if they materially help the example, never as an invented additional product tier.

## A03: acceptance needs authority

The existing composition's last panel contains results, validation and evidence, but not the authority that accepts the request. Revise it to:

| Question | Supporting records |
|---|---|
| Which capability? | Artifact identity; exact version/digest; declared dependencies |
| Permitted here? | Principal and delegated authority; policy and mode; context/scope |
| What actually ran? | Loader/runtime observations; actions; limits of observation |
| Did it meet the request? | Acceptance criteria; independent checks where required; accepting authority and decision |

Remove “Safer agents / Brighter outcomes.” Label the diagram **Conceptual assurance relationships**. Arrows carry references and obligations; they are not proof that one stage establishes the next. A permit is not evidence of correctness; a trace is not an acceptance decision. [R03]

**Build prompt:** recreate the four questions as a compact editable figure with the records above. Make the difference between declaration, observation and decision visible. Use a neutral caption rather than a guarantee of trust. Keep accepting authority in real text, not only a checkmark icon.

## A04: reading path, not product maturity map

The generated graphic expands ADF as “Artifact Development Flow.” The intended acronym in this project is **Agentic Delivery Factory**. The enriched handback also deliberately excludes consultancy-offer material. Therefore omit ADF from this public graphic unless the author explicitly approves an appropriate public-safe reference. Do not simply correct the spelling while preserving a misleading proof claim.

SkillMeat manages reusable artifacts and their lifecycle; task decomposition belongs to IntentTree. Supporting projects should not be placed into a one-to-one row that suggests each proves the essay below it. AOSBench is not evidence that all thesis claims have been validated.

The bottom market rail invents generic claims about model costs, policy, investment and ecosystem maturity. Delete it. Research citation cards can be supplied as actual HTML outside the graphic, with source dates and scope, rather than filling decorative boxes with unsupported assertions.

### Replacement copy

**Heading:** A reading path through the architecture of agentic work

| Station | Reader's question | Essay label | Status |
|---|---|---|---|
| E1 | Why can local gains fail to become delivery gains? | Productivity Paradox | Published per local handback; date disputed |
| E2 | What must survive the session? | Work Is a Graph | Published per local handback; date disputed |
| E3 | How can shared capability evolve without erasing local learning? | Registry Wave | Revised; current local edit is authoritative |
| E4 | Who decides what completion must prove? | Contract Is the Work | Published per local handback |
| E5 | Which decisions still need a model? | Deterministic Envelope | Planned |

Public graphic can omit dates entirely. Use **Planned** visibly on E5. The status fields are source-recorded, not fresh website checks. The strip is a path through parallel sub-series, not a request to renumber all essays.

**Build prompt:** make an accessible reading-path component from the table. Use concise title/question pairs, real HTML links to verified published destinations, and no link to an invented E5 URL. Highlight E3 on Registry Wave. Add one optional lab-receipt card under the current essay, not a universal proof rail. Do not imply a completed single product or guaranteed business outcomes.

## A05: social card

The central copy can remain:

> Some copies must change. Some differences must survive.

Keep the essay name and add accessible text in the surrounding post. No novelty or performance language is needed. Human approval remains required. A future 1200×630 crop is a derivative with its own filename and checksum, not a replacement for the square original.

## Proposed additional E5 graphic, not generated here

**Working label:** From resolved exception to maintained automation.

**Flow:** observed resolution → candidate procedure → scope/preconditions → held-out and regression checks → authorized promotion → bounded execution → monitor → retain/revise/withdraw.

Include a rejection path at candidate validation and a withdrawal path after deployment. Include a separate human/stop route for unresolved or unauthorized cases. Do not depict every exception turning into a rule or every rule becoming autonomous. Use **PROPOSED lifecycle** in the figure itself.

The small companion mode diagram should distinguish the existence of a control, its attachment, its evaluation, its effective blocking mode and its actual effect. This suits the lab's observe-only receipt. It must not show that receipt as a blocking gate. [H02; R04; V13]

## Site implementation retained from the prior handoff

Add a reusable, accessible image enlargement component with caption and focus restoration, not ad-hoc click handlers. Preserve static and reduced-motion paths. Keep hero/social assets independent in the content schema and route. Remove repeated taxonomy/architecture diagrams from the main reading path. Inspect the current repository before applying prior component observations. These are retained design requirements, not fresh implementation tests. [L03]

## Open items

The A02-A04 repairs, authentic capture availability and human visual approvals remain open. The originals in this bundle are historical generation outputs, not cleared publication assets.
