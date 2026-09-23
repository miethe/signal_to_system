---
title: Research Lab — design package (S2S Labs)
status: draft-for-review
date: 2026-09-23
owner: Nick Miethe (decisions) · Research Lab lead (design)
itt_tree: tree_01M35TQZAK0M0WCBP8KEQ2AKMN   # subtree of Labs tree_01M35C7VGM7T1BCE089Q3SD0YQ
answers_request: req_01M35C53MSYM0R8A1MG0D77EF8   # flagship Lab (still open)
source_handoff: research-lab-handoff v0.2.0 (2026-09-22) + additions (PROGRAM_CONTEXT, PORTFOLIO_GUIDE)
qualification: P1 reports a–d (private mirror, see 06-qualification-digest.md)
---

# Research Lab — design package

**What this is.** The design for a thin, local-first Research Lab coordinator that takes an idea
through question → protocol → runs → evaluation → release, and publishes reviewed, immutable
snapshots on S2S Labs. It reuses the existing AOS services as its core rather than rebuilding them:

| Concern | Owner (authoritative) | Lab's relationship |
|---|---|---|
| Sources, editions, passages, assertions, run-local claims, verify, bundle | **Research Foundry** | calls; stores composite references only |
| Raw notes, imported reports, research packages/results, drafts | **MeatyWiki** | calls; attaches `lab.*` frontmatter refs |
| Adversarial review at four stages | **ARC** councils | requests digest-pinned runs; stores run ids |
| Runnable task state, execution contracts, human decisions | **IntentTree** | one node per runnable unit; HumanRequests for gates |
| Reusable protocols, evaluator packs, film contract, templates | **SkillMeat** (enterprise) | versioned releases of promoted protocols |
| Investigations, episodes, attempts/receipts, results, reviews-index, releases | **Research Lab** (new, thin) | single writer |
| Public pages | **S2S** | consumes approved static snapshots through the M3a gate |

**The rule that governs everything:** nothing is inferred from the step before it. A request is
not an execution, a report is not a result, a result is not a validated result, a validated result
is not a released one, and a merged PR is not a deployment. Every hop leaves a receipt.

## Read in order

1. [01-architecture.md](01-architecture.md) — topology, per-field ownership (with qualification
   evidence), storage, identity, reconciliation, and where the coordinator lives.
2. [02-lifecycle.md](02-lifecycle.md) — idea → question → protocol → runs → evaluation → release,
   each step mapped onto real `rf` / MeatyWiki / `arc` / `itt` calls.
3. [03-loops-and-gates.md](03-loops-and-gates.md) — knowledge, methods and portfolio loops; the
   gate table; the four ARC review stages.
4. [04-s2s-snapshot-contract.md](04-s2s-snapshot-contract.md) — the public snapshot, its mapping
   onto the M3a projection gate, reports-primary, films as optional views, scene→claim→result map.
5. [05-implementation-plan.md](05-implementation-plan.md) — four thin milestones; M1 is the
   handoff's vertical slice; node contracts and lanes.
6. [06-qualification-digest.md](06-qualification-digest.md) — what P1 measured, what it did not,
   and the open questions each milestone must close.

## Decisions (Nick)

| Decision | Request | Design default while pending |
|---|---|---|
| Coordinator home | `req_01M35W258PW07TDNSE9S9KXS5M` — **decided: new private `research-lab` repo** | — |
| Where this design package may live (this repo is **public**) | `req_01M35W25DSYX3DYZQ5DPWRE1Q8` — **approved for this repo** | — |
| Flagship Lab | `req_01M35C53MSYM0R8A1MG0D77EF8` (open) | M1 uses the handoff's own first-slice choice (Machine Continuity packet) privately; flagship selection only matters at M4 |
| Snapshot store, RF eligibility, approver | answered on the S2S spine requests (`…S8EDMH`, `…S3D4E8`, `…YAWVA3`) | snapshot store deferred to this handoff → the Lab workspace `releases/` is the private candidate store; RF eligibility = synthetic fixtures until the flagship; Nick releases, Metis may withdraw |

## Status boundaries

This package is **designed**. Nothing here is implemented, tested, qualified against live services,
deployed, or published unless a later receipt says so. The source handoff is a private
implementation handoff, not an approved public release.
