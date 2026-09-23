# Companion Example: A Fully Populated Feature Contract — storyboard

Essay: `src/content/posts/contract-as-spec-worked-example.mdx` (850 words; companion to
"The Contract Is the Work"). Templates and checklist: `00-style-reference.md`.

## Disposition

The companion has no images and does not need a hero: it is a reference page reached from the
parent essay. It gets **one optional plate** and **reuses the parent's social art**.

Cut from the first draft: `worked-contract-record` (a picture of the contract text that the page
already shows as a code block) and `worked-example-social-card` (a companion does not need its
own link-preview art; standards §2 allow reuse).

---

## Family constants

- Template: T2 plate frame, paper-light, single. Eyebrow: `THE CONTRACT IS THE WORK · COMPANION`.
- Corner stacks (verbatim): TL `CLAIM / CRITERIA / EVIDENCE / VERIFIER` · TR `ONE EXAMPLE / BOUND TO / ITS PROOF` · BL `SOURCE / TRACE / CHECK / DECIDE` · BR `PENDING / VERIFIED / ACCEPT / REUSE`.
- Footer: `5 OF 6 VERIFIED · EV-01 CORROBORATING, NOT BLOCKING`.

---

## worked-plate-claim-binding (optional, new)

| Field | Value |
|---|---|
| class / form | figure / plate |
| template | T2 plate frame, no backbone (matrix lower section only) |
| scheme / variant | paper-light / single |
| master | 16:9, 2000x1125 |
| target | `public/assets/posts/contract-as-spec-worked-example/contract-as-spec-worked-example--figure--claim-binding.png` |

**Placement:** "Claims bound to evidence", after the claim/evidence code block.

**Purpose:** the code block lists `supports:` per evidence item; the plate shows the binding as a
matrix, so a reader sees at once that every criterion is covered and which item is still pending.

**Exact text:**
- Eyebrow: `THE CONTRACT IS THE WORK · COMPANION`
- Title: `Worked Example — Claims Bound to Evidence` (accent phrase: `Claims Bound to Evidence`)
- Subtitle: `Every evidence item names the criterion it supports.`
- Claim card (left, mono header `fc-example-041`): `Claim` / `The timeout no longer recurs, because the retry logic no longer double-acquires the pool lock.`
- Column headers: `EVIDENCE` · `KIND` · `C1` · `C2` · `C3` · `C4` · `VERIFIER`
- Rows (mono):
  `ev-01 root-cause-trace.log` `reproduction` (C3) `pending` ·
  `ev-02 fixed-run-repro.log` `reproduction` (C1) `verified` ·
  `ev-03 independent-repro-env.log` `independent_run` (C1) `verified` ·
  `ev-04 pool-lock-diff.patch` `root_cause_link` (C3) `verified` ·
  `ev-05 test-suite-run.log` `checklist` (C2) `verified` ·
  `ev-06 rollback-runbook.md` `checklist` (C4) `verified`
- Footer: `5 OF 6 VERIFIED · EV-01 CORROBORATING, NOT BLOCKING`

**Lower section:** the claim card on the left joined by one line with a waypoint to a six-row
table. In the C1-C4 columns a filled ink dot marks the criterion each row supports (one dot per
row). The verifier cell is a small state-ok check pill for `verified` and a state-warn dashed pill
for `pending`. Row rules are hairlines; no zebra fills.

**Alt:** "Plate: one claim about the checkout timeout is bound to six evidence items. A matrix
shows which of four acceptance criteria each item supports; five items are verified and ev-01
is pending."
**Caption:** `The claim is checked against evidence, not against the surrounding prose.`
**Checks:** every mono string letter-perfect (re-render, do not hand-fix, if any hash or file
name drifts); exactly one dot per row; ev-01 is the only pending pill. If the generator cannot hold
the mono strings, fall back to form `diagram` (coded SVG) with the same layout.

## Social art

Reuse `the-contract-is-the-work` social art; no separate asset.
