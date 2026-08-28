---
filed_nodes: none — no findings requiring a tracker node beyond this document + the gaps node evidence
---

# Findings — Retroactive Editorial Pass, "The Contract Is the Work"

Plan: `docs/project_plans/implementation_plans/features/exec-contract-essay-editorial-retro-2026-08-28.md`
Gaps node: `node_01M12FHAX3EC3C7STM8H9JQ7E0`

## Stages run

| Stage | Status | Notes |
|---|---|---|
| Taste pass (5b.1) | RAN (Codex gpt-5.6-terra, read-only) | Verdict: blocking structural fix on the companion (see below), main essay publish-worthy in voice/structure. |
| Weakest-claims pass (5b.2) | RAN (Codex gpt-5.6-terra, read-only) | 30+ findings enumerated, severity-tagged. |
| ARC council pass (5b.3) | **RAN** (follow-up, 2026-08-28) | `research-claim-council` (evidence-quality-scribe / skeptic-market-red-team / domain-research-reviewer / adjudicator-validation-planner), scoped to published-essay quality: argument soundness, evidence-claim binding, voice/register, reader-trust risks. No blocking findings. 1 accepted (medium, gap), 3 watchlist (low). See "ARC council pass" section below. Full schema-valid run: `agentic-research/runs/2026-08-28-exec-contract-essay-arc-pass-2026-08-28/` (`arc validate` passes clean). |
| Egress check (5b.4) | RAN | Grep for `$`-figures, employer/company names, email/PII patterns: clean, zero matches, both files. `op scrub check`: companion clean; main essay flags 2 pre-existing `[host]` redactable issues that predate this pass (confirmed present on `origin/main` before any edit here) — not introduced by this revision, but not previously resolved either (PR #123's test plan reported scrub clean at merge time; the denylist appears to have grown since, or the check now catches something it previously missed). Filed as a should-fix below, not fixed in this pass (redaction content is unknown since `op scrub check` masks the flagged text itself). |
| AI-involvement classification (6c) | RAN | Level 3: substantive synthesis, adversarial reasoning, research assistance; thesis and evidence are Nick's own operating observations. |
| Method/Provenance note (6d) | Already present pre-pass ("Research and authorship note"); left as-is. |
| Provenance block (6e) | **ADDED** | Was missing; added structured block (Author/Thesis/Evidence/AI roles/Human verification/Research artifact/Version/AI-involvement level) after the existing note. This is the first post on the site to carry one (site convention was TBD per the skill). |

## Findings by severity

### Blocking (2, both fixed)

1. Companion example ("A Fully Populated Feature Contract") claimed all 4 acceptance criteria
   met, but only criteria 1/3 had bound evidence; criteria 2 and 4 had none. **Fixed**: added
   ev-05/ev-06 checklist evidence items for criteria 2/4, added explicit `supports:` fields to
   every evidence item, updated the acceptance-decision basis accordingly.
2. The acceptance decision's root-cause reasoning conflated "ev-03 supports criterion 1" with
   "therefore criterion 3's causal claim is covered," when ev-03 supports non-recurrence, not
   root cause. **Fixed**: reworded to point at ev-04 (independently verified, root-cause-linked)
   as what actually closes criterion 3, with ev-01 recast as corroborating, not blocking.

### Should-fix (applied: 3 of ~25 enumerated; rest logged, not applied)

Applied (main essay): added `[Proposed]` tag + scope qualifier to "characteristic failure mode"
claim; softened "the receipts... prove the mechanism holds" to "show the mechanism operating in
my home environment"; tagged the "next generation of reliable agentic systems" forecast as
`[Proposed]`/"my bet."

**Not applied in this pass** (time-boxed; full Codex weakest-claims report has ~22 more
should-fix items, mostly requesting `[Proposed]` tags or scope qualifiers on individual
sentences throughout the essay body — e.g. "Governance often becomes unpopular...", "The
ecosystem already contains capable planners...", "Contract-as-spec scales because..."). Full
list is in the Codex session transcript (see `/tmp/codex-review-output.log` at time of this run,
not durably retained). Recommend a follow-up pass if Nick wants the remaining tagging fixes
before any further revision.

### Nice-to-have

Several stylistic softenings suggested (modal-verb qualifiers on "these elements bind the
stages," "a durable workflow should survive all four," etc.) — not applied, purely stylistic,
consistent with the essay's existing register.

## Egress / node-id check

- No raw internal node ids (`node_01…`) present in either file, before or after this pass
  (verified by grep on the diff and the full files).
- No `$`-figures, employer names, or email/PII patterns in either file.
- `op scrub check` [host] flags on the main essay: pre-existing, not introduced here, unresolved
  content unknown (tool masks the match). Logged above as a should-fix follow-up.

## ARC council pass (follow-up, 2026-08-28)

Completes the pipeline stage that was deliberately time-box-skipped above. Council:
`research-claim-council` (chosen for the essay's research-claim shape: evidence sufficiency,
citation quality, claim strength). Reviewers: evidence-quality-scribe, skeptic-market-red-team,
domain-research-reviewer, adjudicated by adjudicator-validation-planner. Target: both files at
commit `3278577` (this branch's current HEAD at the time of the pass). Full schema-valid run
directory (evidence pack, per-reviewer findings, adjudication record, scorecard, risk register,
decision record, validation plan, trace bundle, provenance/skillbom, certification — all pass
`arc validate`): `agentic-research/runs/2026-08-28-exec-contract-essay-arc-pass-2026-08-28/`.

**Verdict: proceed_with_conditions. No blocking findings.**

Scorecard (0-5): argument_soundness 4.5, evidence_claim_binding 4, voice_register 5, reader_trust 4.

**Accepted (1, medium):**

1. **41-source landscape review has no citable source list.** The essay's strongest research
   claim ("we did not identify a direct equivalent... in a bounded review of 41 current
   open-source agent-tooling sources") and the companion's Provenance block both cite this review,
   but neither the essay nor any linked appendix names the 41 sources or gives a locator. The essay
   explicitly invites a reader to bring a counterexample but gives no way to see what was already
   checked. Recommendation: publish a short source list/appendix, or soften the claim to state the
   list is unpublished. Not fixed in this pass (findings only, per this pass's scope) — Nick's call.

**Watchlist (3, low, not blocking):**

2. `"Contract-as-spec scales because..."` (line ~210) is an unqualified scaling claim in tension
   with the essay's own later market disclaimer. Independently confirmed, but this is already
   named verbatim above in the ~22-item deferred should-fix list from the Codex weakest-claims
   pass — not a new item, recorded to keep it visible past the ARC skip, not double-counted.
3. The "what if the contract is wrong" objection (lines 89-95) is answered honestly but doesn't
   name who/what performs the meta-review of the contract-writer — an optional tightening, not a
   correctness defect.
4. The companion's evidence-item vocabulary (verified/pending) doesn't map explicitly onto the
   main essay's four-state verification vocabulary (supported/contradicted/unresolved/limited) —
   cosmetic, since the companion is an explicitly simplified worked instance.

**Positive finding:** both previously-fixed blocking bugs in the companion (unsupported
acceptance-criteria claims, conflated root-cause reasoning) were independently re-derived by the
ARC pass and confirmed correctly resolved. Em-dash and raw-node-id checks were independently
re-verified (0 matches, both files), matching this file's earlier egress section.

No fixes were applied in this ARC pass — findings only, per its scope. Merge/publish decision
remains Nick's, unchanged from the rest of this pipeline pass.

## Zero em-dash gate

`npm run check:prose` passes before and after this pass (0 em dashes, 6 files scanned).

## Build verification

`npm run build` (Node 22 via nvm) succeeds: 66 pages, both `/essays/the-contract-is-the-work` and
`/essays/contract-as-spec-worked-example` routes present and rendering.
