# Numeric claim ledger

All source paths below are relative to `_sources/`. Repeated claims share a row. Rounding is explicit. Hypothesis, task, protocol, deviation and section identifiers are locators, not measured quantities. “Lab #1” is the requested editorial designation, not an empirical claim.

| Numeric claim in lab.md | Source file | Field or section |
|---|---|---|
| H1, H2 and H3 all INCONCLUSIVE | `main__osf-results__SCORE.json` | `confirmatory.{H1,H2,H3}.verdict`; corroborated by `main__osf-results__VERDICTS.md`, Confirmatory outcomes |
| Continuation of the same design and materials | `PREREG-v4.md` | Section 0, History and disclosures, opening paragraph |
| Sonnet refusal stop; no rerun, replacement or schedule change | `DEVIATIONS.md` | V4-DEV-0003, `protocol_ref`, `description`, `disposition`; public verdicts summarize the panel outcome |
| Incorrect earlier split: 6 layered / 6 copies; correct split: 7 layered / 5 copies | `DEVIATIONS.md` | V4-DEV-0003, `description`, superseded by V4-DEV-0005, `description` and `disposition` |
| Correction was posted | `main__OSF-RECEIPT-2026-09-30.md` | Addendum: V4-DEV-0005 correction; confirms posted corrected split despite `DEVIATIONS.md` V4-DEV-0005 `public_osf_ref` still pending |
| Sonnet: 36 valid of 384 scheduled primary T2/T3 observations; about 9.4 percent | `main__osf-results__SCORE.json` | `all_lane_H3_coverage.claude-sonnet-5.{valid,scheduled,rate}`; rate 0.09375 rounded to 9.4 percent; corroborated by VERDICTS Confirmatory outcomes |
| H3 coverage floor: 50 percent | `PREREG-v4.md` | Section 3, H3 verdict row and completeness paragraph; also SCORE `confirmatory.H3.reason` |
| Haiku recovery change: 0.0000 | `main__osf-results__SCORE.json` | `descriptive_nonconfirmatory_completed_lanes.claude-haiku-4-5.H1_operational_mean_paired_delta_R` |
| Gemini recovery change: 0.0000 | `main__osf-results__SCORE.json` | `descriptive_nonconfirmatory_completed_lanes.gemini-3.5-flash.H1_operational_mean_paired_delta_R` |
| Luna recovery change: -0.0417, approximately -0.04 | `main__osf-results__SCORE.json` | `descriptive_nonconfirmatory_completed_lanes.gpt-5.6-luna.H1_operational_mean_paired_delta_R` = -0.041666666666666664, rounded; all lane deltas corroborated by VERDICTS Descriptive observations |
| No descriptive recovery gain in completed lanes | `main__osf-results__SCORE.json` | Same three lane delta fields: each is nonpositive; descriptive only |
| H2 missing-arm bounds include zero | `main__osf-results__SCORE.json` | `confirmatory.H2.{A_missing_arm_bounds,B_missing_arm_bounds}.{lower,upper}`; corroborated by VERDICTS Confirmatory outcomes |
| Panel Brier approximately 0.3225, constant baseline approximately 0.2421; panel worse | `main__osf-results__SCORE.json` | `confirmatory.H3.panel_brier` = 0.3224928075396825; `constant_baseline_brier` = 0.24212301587301588; rounded to four decimal places; direct comparison |
| Registered separation of primary observations and decoy-only controls | `PREREG-v4.md` | Sections 3 and 7, schedule and analysis rules |
| Failed and unsent opportunities assigned operational R=0 | `PREREG-v4.md` | Section 4, Missingness, inference and analysis; DEVIATIONS V4-DEV-0003 `analysis_impact` |
| Held-out materials remain held out; closure released none | `DEVIATIONS.md` | Release-timing extension record, `decision`, `supersedes`, `exposure_state`; receipt Notes corroborates extension |
| A later protocol must disclose its place in design history | `PREREG-v4.md` | Section 8.6, FINAL-ATTEMPT paragraph; conditional, not a claim that a later protocol exists |

Source boundary: the supplied public SCORE has only panel Brier and baseline values. Neither it nor VERDICTS supplies per-lane Brier comparisons. The requested assertion that every completed lane is worse than its constant baseline is therefore unverified and omitted. The refusal-as-outcome direction is mentioned only as a conditional next-design proposal, with no v5 design detail asserted as a finding or posted fact.
