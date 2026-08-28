# Plan — Retroactive Editorial Pass: "The Contract Is the Work" (exec-contract essay)

**Tier:** L (thin milestone plan per node ...9YQG's 08-27 planning rule)
**Trigger:** Nick, 2026-08-27 night, evidence GKGD6RV on gaps node ...J7E0 — the essay shipped
08-25 via PR #123 without going through the editorial pipeline that landed as PR #130 twelve
minutes after the last revision. This plan runs the piece through that pipeline retroactively.
**Repo:** signal_to_system. **Target:** `src/content/posts/the-contract-is-the-work.mdx` +
`contract-as-spec-worked-example.mdx`.
**Scope boundary:** editorial pass and revision only. Series placement is decided separately,
after this pass, per the dispatching instruction. Not touched here.

## Milestone 1 — Editorial Review Sequence (blog-drafter Phase 5b)

Run against the essay's own current published text, in order, stating any skip explicitly:

1. Taste pass (whole-piece read against site conventions, nugget-mosaic vs generic essay prose)
2. Weakest-claims pass (enumerate skeptic attacks per claim; fix or tag [Proposed]/[Observed])
3. ARC council pass, when available, against this post's own draft (not a sibling document)
4. Egress check (binary identifier/PII/employer/dollar-figure leak check)

**Acceptance:** each of the 4 checks has a stated verdict (ran + finding, or explicit skip reason);
findings are severity-tagged and filed.

## Milestone 2 — Revisions + Disclosure Classification (Phase 6c/6d/6e)

1. Apply fixes from Milestone 1 findings that are in-scope for a revision pass (no thesis rewrite).
2. Classify AI-involvement level (Phase 6c four-level standard) against what actually happened.
3. Verify/complete Method-Provenance note (6d) and Provenance block (6e) for the classified level.
4. Confirm zero em-dashes (site gate) and no raw internal node ids in public text.

**Acceptance:** revised MDX passes `npm run check:prose`; disclosure level stated with rationale;
Provenance block present and accurate for that level.

## Milestone 3 — Record + Verify

1. Findings file committed to repo (or `~/.local/share/aos/s2s/`).
2. Evidence added to gaps node `node_01M12FHAX3EC3C7STM8H9JQ7E0` (label <=280 chars, detail in --ref).
3. Draft PR opened against `main`; body states which pipeline stages ran vs. skipped, with reasons.
4. `npm run build` + `npm run check:prose` re-verified on the final branch state.

**Acceptance:** PR is draft-only, never merged; PR body enumerates stage-by-stage what ran.

## Explicitly out of scope

- Series placement (Nick decides after this pass).
- Merge/publish (Nick's verdict is the gate).
- Rewriting the thesis or restructuring sections beyond claim-level fixes.
