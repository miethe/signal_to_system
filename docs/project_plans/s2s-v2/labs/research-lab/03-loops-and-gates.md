# 03 — Three loops and their gates

Three separate loops, each with its own evidence and approval (handoff POV §2). None of them is a
"self-improving agent"; each produces inspectable records.

## 1. Knowledge loop — better-supported views of a topic

`investigation → evidence episode (RF) → experiment episode (Lab) → result → claim-change proposal
(RF native) → report revision → release`.

- Improvement does not mean more positive or more certain. A contradiction can split or invalidate
  a claim and mark releases stale (02 S7).
- Shared upstream origins are counted once: five syntheses of one paper are one line of evidence.
  MeatyWiki's `research_compiled_first` ranking boost ([code] P1b §1) is navigation only; the Lab
  never uses a ranked summary as corroboration.
- **Gates:** RF verify; ARC result review; named reviewer sets the outcome; release gates (04).

## 2. Methods loop — better protocols and tools, promoted as versions

`defect observed in a run → improvement proposal (templates/PROTOCOL_CHANGE.md, imp_…) → candidate
protocol/tool version → frozen regression cases + held-out tasks scored by the FIXED evaluator →
ARC review → Nick promotes → SkillMeat release (workflow / context-entity / bundle)`.

- Running experiments keep their original protocol version; promotion never rewrites them.
- The candidate cannot see or modify its evaluator or holdout; the evaluator pack is its own
  SkillMeat artifact with its own version, and its digest is recorded on every score.
- ARC is a **reviewer**, not the evaluator: P1c found ARC digest-pins its target and fails closed
  on driver mismatch, but it is not qualified as a held-out scorer (P1c §1). Promotion authority is
  Nick (HumanRequest), recorded with the evaluation digest.
- Operational improvements (fewer lost artifacts, fewer duplicate runs, cleaner restarts) and
  scientific improvements (hidden-error recovery, calibration) are measured and reported separately.
- **Gates:** held-out evaluation receipt; ARC review; Nick promotion; rollback = re-pin prior version.

## 3. Portfolio loop — which uncertainty to resolve next

- **Where it lives:** IntentTree. Each investigation (RL-001…RL-010 from PORTFOLIO_GUIDE §4) is a
  `work_area` node under the Research Lab tree's *Portfolio* pillar, carrying the guide's card:
  question, evidence status, what to inspect, next research, Labs presentation, publishing boundary.
  Priority is a vector in node scores (`consequence`, `uncertainty_reduction`, `tractability`,
  `infra_value`, `cost`, `owner_interest`) — never a single novelty score.
- **Cadence:** a portfolio review at milestone boundaries (not a scheduler): the lead prepares a
  read-only `lab next --explain` digest across investigations; Nick decides via HumanRequest.
- **Research priority ≠ publication priority** (ADR-013): the flagship Lab (publication) and the
  first scientific pilot (research) are separate choices.
- PORTFOLIO_GUIDE §8 priorities are the seed: P0 recover and normalize, P1 one new bounded
  experiment, P2 one complete published exemplar, P3 physical/human studies (approval-gated).

## 4. ARC review stages

| Stage | When | Council (live list) | Target (digest-pinned) | Output used by |
|---|---|---|---|---|
| Design review | before building a milestone | `architecture-review-council` | design package tree | lead folds findings in |
| Preregistration review | before S4 on a confirmatory episode | `research-claim-council` + `red-team-council` seat | frozen protocol + evaluator ref | Nick's run approval |
| Result review | after S5 | `research-claim-council` | result record + raw-output digests | reviewer outcome decision |
| Release review | before approval | `release-certification-council` | candidate snapshot tree | Nick's release approval |

ARC server execution is **degraded** (RLARC-004, finding `node_01M35WVAPN1G02V0A24QV7H17G`): until it qualifies, a stage review may run as a labelled *substitute* — the same council YAML, reviewer roles and finding schema executed as isolated seat passes on an ICA leg — and the review record says `substitute`, never `arc-executed`. ARC runs are created with `POST /api/runs` (council, target, `target_sha256`, objective,
constraints, AOS correlation ids) and executed async (`POST /api/runs/{id}/execute` → 202, poll
`/execute/status`) — [code] P1c §2. The target must sit inside ARC's root on the node, so the Lab
stages a read-only copy under ARC `inputs/` and pins its digest. Lane disclosure: reviewers run on
the ICA provider, adjudication on Codex (P1c §1) — so the private-evidence release review must
check that no material is sent that its rights fields forbid for model processing.

## 5. Gate table

| Gate | Trigger | Decider | Mechanism | Blocks |
|---|---|---|---|---|
| G-verify | claim used as supported | RF verify | `rf verify` exit code + bundle digest | report binding |
| G-prereg | confirmatory episode | ARC + Nick if spend/provider/physical | ARC run id + HumanRequest | S4 |
| G-budget | any attempt | protocol caps | attempt refuses beyond cap | S4 |
| G-outcome | result exists | named reviewer (never the executor) | `rev_…` with independence statement | outcome field |
| G-promote | protocol change | Nick | HumanRequest + evaluation digest | SkillMeat release |
| G-release | candidate snapshot | gates 1–6 then Nick | M3a receipt bound to digest + destination | S2S build input |
| G-publish | approved release | deployment receipt + URL check | S2S deploy path | `published` state |

Every gate that needs Nick is a HumanRequest with an id — never a question in prose.
