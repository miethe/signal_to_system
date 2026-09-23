# 02 — Investigation lifecycle mapped onto real calls

Each stage names: the **owner call** (existing system), the **Lab record** it produces, the
**state transition**, and the **gate**. Calls marked *(M-n)* are qualified in that milestone;
until then the adapter state from [01 §6](01-architecture.md) applies.

## 1. Orthogonal state (never one `status` enum)

| Dimension | Values | Held by |
|---|---|---|
| Investigation lifecycle | inbox, shaped, active, parked, concluded, reopened | Lab `investigation.json` (mirrored as ITT node status for runnable work only) |
| Episode stage | planned, preregistered, executing, awaiting-review, reviewed | Lab `episode.json` |
| Attempt process | queued, running, waiting-external, waiting-review, succeeded, failed, cancelled, outcome-unknown | Lab `attempt.json` |
| Scientific outcome | not-assessed, supportive, null, contradictory, inconclusive, invalidated | Lab result, set only by a review |
| Evidence access | history-only, retrieved-text, original-bytes, receipt-inspected, rerun-validated, independently-replicated | Lab per artifact/claim ref |
| Contribution type | reproduction, verification, synthesis, hypothesis, method, candidate-finding | Lab |
| Novelty | not-assessed, search-pending, prior-art-overlap, candidate, independently-reviewed | Lab (never self-rated) |
| Media | unknown, requested, source-present, rendered, decoded, QA-reviewed | Lab per film/figure |
| Publication | private, draft, preview, approved, published, superseded, withdrawn | Lab release + M3a receipt |

`succeeded` (attempt) means the process/output contract was met — not that the hypothesis held.

## 2. Stages

### S0 Idea → capture
- **Owner call:** MeatyWiki capture/note (vault) *or* `rf capture` for a research-shaped idea.
  An idea arriving in chat goes through `op capture` (T0) — the Operator stays the entry point.
- **Lab record:** `lab idea import --ref <mw art_… | rf inbox id>` → `inv_…` in `inbox` with the
  original capture ref and sensitivity. No shaping yet.
- **Task state:** ITT node under the Research Lab portfolio pillar, tag `investigation`, status
  `not_started`.

### S1 Question shaping → investigation `shaped`
- **Owner call:** MeatyWiki `/research` "Shape question" (package + routing analysis:
  `POST /api/workflows/external-research/routing-analysis`, [code] P1b §2) produces an editable
  brief, alternative hypotheses and the smallest useful test. The Lab adds `lab.investigation_id`
  to the package frontmatter (additive extras are allowed, [code] P1b §5).
- **Lab record:** question revision `q@v1`, facets (program, domain, method), evidence inventory,
  open questions, the **ambiguity list** (hidden definitions/predicates/transforms — PROGRAM_CONTEXT §3).
- **Gate:** none (cheap). Portfolio placement happens in the portfolio loop (03 §3).

### S2 Evidence episode (literature / source audit) → `active`
- **Owner call:** RF — `rf intent` / `rf triage` / `rf plan` then `rf ingest|fetch`, `rf extract`,
  `rf claim-map`, `rf synthesize`, `rf verify`, `rf bundle`. Imported provider reports go through
  `rf intake external-report` (ERI: staged as non-authoritative `platform_synthesis`, sources
  re-acquired and verified separately, [code] P1a §1). A swarm is launched only via the existing
  RF swarm path, never by the Lab.
  - ⚠️ `rf triage` also creates an IntentTree node. The Lab passes the existing investigation node
    so RF does not mint a parallel task (to verify in M2; until then use a local RF workspace
    without the ITT hook).
- **Lab record:** `epi_…` (kind `evidence`), references to RF run, claims (composite key), bundle
  digest + verify receipt. Evidence access level per claim.
- **Gate:** RF verify must pass for any claim the Lab later calls supported; a draft bundle is not
  approval ([code] P1a §6).

### S3 Protocol → `preregistered`
- **Owner call:** none upstream; the protocol is a Lab-versioned file from
  `templates/EXPERIMENT.md` (handoff). Reusable protocol skeletons come from SkillMeat.
- **Lab record:** hypothesis + alternatives, endpoint definition (the ambiguity list must be
  closed or explicitly scoped), fixed protocol `protocol@vN`, inputs, stop rule, budget envelope,
  evaluator reference (fixed, held out).
- **Gates:** ARC **preregistration review** (03 §4); Nick approval via HumanRequest when the
  episode spends money, uses a provider beyond the free lanes, or involves physical/human work.
  Freezing is a digest: any edit after freeze is an amendment revision, never an overwrite.

### S4 Runs → attempts
- **Owner call:** the executor is an existing lane — `leg` (ICA/Codex) for agent work, or a local
  sandboxed process for deterministic computation. The attempt gets a frozen context pack
  (`op context pack --destination external`), never a vault mount.
- **Lab record:** `att_…` with protocol/code/input/environment digests, executor identity, times,
  cost, outputs (written to `artifact-store/sha256/`), errors. Receipt is written by the executor
  and reconciled by the Lab (01 §5).
- **Task state:** one ITT node per runnable attempt batch; `op hop render` must be able to render
  the brief from the node alone (execution contract fields, 05 §3).
- **Gate:** budget/attempt caps from the protocol; `outcome-unknown` when reconciliation fails —
  never a fabricated success or failure.

### S5 Evaluation → result + review
- **Owner call:** the fixed evaluator (versioned, SkillMeat-released, held out from the candidate)
  scores outputs; results that should become evidence are registered in RF as a **first-party
  experimental source** via `rf ingest` with a file locator to the artifact-store bytes, and claim
  changes are *proposed* through RF's native claim/review path.
- **Lab record:** `res_…` (observations, analysis, uncertainty, outcome, limits, validation refs,
  claim-change proposals); `rev_…` index pointing at the ARC run.
- **Gate:** ARC **result review** (adversarial) sets nothing by itself; the scientific outcome
  field is set by a named reviewer with an independence statement. Failed and inconclusive runs
  stay in the denominator.

### S6 Report → release candidate
- **Owner call:** MeatyWiki draft (editorial prose, new revision per substantive edit); RF
  `verify` over the report's claim bindings.
- **Lab record:** `rel_…` candidate: report revision + frozen claim/evidence views + assets +
  optional film + scene map (04), with a single `snapshot_digest`.
- **Gates:** release gates 1–6 (04 §4), ARC **release review**, then Nick's digest+destination
  approval (HumanRequest → M3a receipt). Publication is a separate, later receipt.

### S7 Corrections
A changed source/claim/result produces an impact list over releases, figures and film scenes.
A new release supersedes; the old one keeps its identity and gets a visible notice. Withdrawal is
Nick or Metis (spine decision `…YAWVA3`).

## 3. `lab` CLI surface (M1 subset in bold)

`lab doctor` · **`lab import --packet <dir>`** · `lab idea import` · `lab shape` ·
**`lab refs resolve <inv>`** · `lab next <inv> --explain` (read-only) · `lab prepare <task>` ·
**`lab run <task> --approval <id>`** (M1: deterministic local check only) · `lab reconcile <att>` ·
`lab review request <stage>` · **`lab release prepare <inv>`** · `lab release approve <rel>`
(M4, Nick only) · **`lab release export <rel> --target s2s-preview`**.

No verb auto-chains to the next stage. `continue investigation` = `lab next --explain`, which
recommends; it never spends or recurses.
