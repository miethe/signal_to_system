# S2S Lab #1: M3b v4: a preregistered null on layered handoffs

<aside aria-label="Bounded conclusion">

**Bounded conclusion.** H1, H2 and H3 are all **INCONCLUSIVE** at panel level. Sonnet reached the preregistered refusal stop; its incomplete lane prevents the planned panel conclusions. There was no rerun. The completed lanes show no descriptive recovery gain, but this run establishes neither benefit nor harm from layering. [VERDICTS](https://osf.io/53ymt)

**History.** This continued the same design and materials. Its source-ID ordering rule changed after ordering failures closed the preceding readiness screen. That choice was outcome-informed; preregistration does not erase it. [Registration](https://osf.io/pw95u)

**Uncertainty.** The incomplete panel cannot settle recovery, authority discrimination or confidence calibration. The cause of refusal is unresolved.

**Scope.** The fixed model configurations, synthetic handoff design and committed schedule of M3b v4. No inference to model populations or arbitrary projects. Confidence in a general layering effect is not assessed here.

</aside>

## Overview

The main run stopped short of the comparison it was designed to make. Sonnet refused enough scheduled requests to trigger a rule written before collection. Haiku, Gemini and Luna completed their lanes, but their completion could not repair the registered panel. That is where this report starts: with the result the protocol permits us to report.

The question was whether layered handoffs preserve recoverable project identity and state as context erodes, compared with copies. The protocol also asked whether layering changes unauthorized simulated action and whether expressed confidence tracks correctness. These are related questions, but recovering information, respecting authority and knowing when an answer is likely wrong require separate measurements.

The title's “null” names an absence of confirmatory support in this report. It is not a statistical null finding or an equivalence claim. **INCONCLUSIVE** is the registered outcome. Treating that word as a verdict against layering would replace the experiment's decision rule with an interpretation chosen afterward.

There is an earlier judgment to keep visible, too. The v4 validator stopped rejecting source-ID arrays solely for their order, and the scorer sorted those arrays before comparison. Raw responses remained unchanged. The protocol disclosed that this change followed the preceding screen's failure on ordering. It carried the scientific design and expectations forward, while accepting a disclosed change to validation. This was a continuation with history, not an untouched first test. [Registered protocol](https://osf.io/pw95u).

## Evidence

The public verdict document gives a different completeness reason for each hypothesis. H1 is inconclusive because a scheduled lane is incomplete. H2 is inconclusive because Sonnet missed the required paired-observation floors, leaving full-panel point estimates undefined; the conservative missing-arm bounds include zero. H3 is inconclusive because Sonnet supplied only 36 valid observations from 384 scheduled primary T2/T3 observations, about 9.4 percent, below the 50 percent coverage floor. Those are task observations, not counts of sent calls. [MAIN-VERDICTS](https://osf.io/53ymt).

The stop itself is documented in V4-DEV-0003. Explicit provider refusals triggered the preregistered stopping rule. Collection ended with scheduled work incomplete; the disposition accepted the stop, with no rerun, replacement or schedule change. [VERDICTS](https://osf.io/53ymt) [DEVIATIONS](https://osf.io/65zb8)

The refusal split is **7 layered / 5 copies**. V4-DEV-0003 originally reported 6 layered / 6 copies, a transcription error superseded by V4-DEV-0005. The posting receipt confirms the correction reached the public deviations file, despite the local correction entry retaining a pending-posting field. The stop decision and scored quantities did not change. [DEVIATIONS](https://osf.io/65zb8).

The completed lanes provide narrower descriptive context:

| Completed lane | Operational mean paired recovery change, layered minus copies |
|---|---:|
| Haiku | 0.0000 |
| Gemini | 0.0000 |
| Luna | -0.0417 |

These values come from the public score's explicitly nonconfirmatory completed-lane summaries. Luna's value is approximately -0.04 when rounded more coarsely. There is no observed recovery gain in these summaries. They cannot replace the registered panel or establish that layering helps or hurts. [MAIN-SCORE](https://osf.io/kyg9w).

Confidence also needs a careful boundary. The public score reports a panel Brier score of approximately 0.3225 against a constant-confidence baseline of approximately 0.2421. Lower is better, so the reported panel score is worse than that baseline. However, this aggregate file contains no per-lane Brier values or per-lane baseline values. It therefore cannot substantiate a claim that each completed lane individually performed worse than its baseline. The panel comparison remains descriptive alongside an inconclusive H3 verdict; failing a support criterion alone does not establish contradiction.

## Method

This was a preregistered computational experiment with a fixed convenience panel: Claude Haiku and Sonnet through Amazon Bedrock, Gemini through Google, and GPT Luna through the OpenAI API. The frozen configurations differed in output mode and budget, which limits comparisons between models. Calls were fresh and tool-less, and actions were simulated. The experiment did not grant authority to act on a real project.

The registered schedule separated primary observations from decoy-only controls. Only primary observations entered the hypothesis estimates. Seeded presentations represented isomorphic variants, not independent worlds. [PREREG-v4, design and schedule](https://osf.io/pw95u).

Recovery, R, measured substantive exact-claim correctness at T2/T3. Source-set and uncertainty accuracy were separate secondary measurements; confidence did not enter R. A structurally valid response could still be semantically wrong. Operational scoring retained failed and unsent scheduled opportunities with R=0; conditional recovery used complete strict-valid design pairs. This keeps availability and content failure in the operational denominator without pretending to know an unobserved answer.

H1 compared paired recovery between designs under the specified erosion conditions. H2 compared unauthorized simulated action between designs and across erosion conditions, subject to paired completeness floors and adverse missing-arm bounds. H3 compared confidence with correctness using the registered confidence map and a constant-confidence baseline evaluated on matching observations and weights. Missing action and confidence fields were not invented for failed calls.

### What did not work

Sonnet's refusal stop prevented the panel comparison. The remaining lanes continued, preserving their scheduled observations without silently removing the stopped lane from the study.

The deviations log also records a pilot-only custody boundary crossing and a pilot key-file formatting change. Neither is reported as affecting confirmatory scoring. A separate main-score input preparation problem prevented discovery of the custodian's scoring inputs. The recorded remedy supplied a deterministic locator wrapper; the log states that the frozen scorer, committed source bytes, expectations and analysis rules were unchanged. This report relies on that disclosure and does not claim to have independently audited private inputs.

The refusal-split transcription error was another failure, this time in reporting. An append-only correction preserves both the mistaken statement and the corrected record. Readers should use the correction when interpreting the stop.

## Reproduce

The public package supports checking the aggregate report. It does not, by itself, support rerunning the private scorer or independently replicating the experiment.

Start with the [OSF component](https://osf.io/cbeaj/) and [registration](https://osf.io/pw95u). Read the prospective verdict rules, then compare the verdict document's reasons with the public score's `confirmatory` fields. Check the completed-lane recovery values under `descriptive_nonconfirmatory_completed_lanes`. Read the correction and release-timing extension in the deviations log before interpreting its older entries.

The supplied posting receipt records matching local, stored and re-downloaded digests for the posted files. Its addendum confirms posting of the refusal correction. Those checks concern artifact identity and posting. They do not establish scientific validity or constitute an independent replication. The receipt also states that the row-level score was not uploaded.

Expected result: the public aggregates and rules reconcile to inconclusive panel verdicts, with descriptive completed-lane summaries. A full scorer rerun needs the original bound execution and scoring inputs; those are not supplied in this aggregate package. Independent replication would require new execution and its own protocol. No reproduction or replication result is established by this draft.

## Limitations

The largest limitation is the incomplete registered panel. Selecting only completed lanes would change the scope of the planned test. Keeping those summaries visible is useful; promoting them into confirmatory findings would be misleading.

The panel is fixed and small, with configuration and budget confounding. World and seed dependence remains a limitation, and the protocol claims no population inference. The source-ID ordering change was outcome-informed. Contract validity and readiness success do not establish semantic correctness or guarantee that later collection will meet completeness requirements.

The refusal record establishes that the stop fired. It does not explain why Sonnet refused or show that the model lacks the underlying capability. Likewise, the aggregate confidence comparison does not identify a cause of poor calibration.

All held-out worlds remain held out. The public release-timing extension superseded the earlier promise that deferral would end at v4 closure, retaining the materials for a possible later addendum. Closure released none of them. This report discloses no world content, stimuli, keys or expected answers.

## What this licenses / does not license

This licenses a bounded report of an unsuccessful confirmatory comparison, the descriptive aggregates actually available, and the documented conditions that prevented stronger conclusions. For a technical leader, the decision consequence is simple: this run supplies no confirmatory basis for choosing layered handoffs over copies, or copies over layering.

It does not license a claim that layering works, fails or is equivalent. It does not license a model ranking, a general account of refusal behavior, or a lane-specific calibration claim absent from the public package. Preregistration makes the interpretation accountable to declared rules; it does not make an incomplete panel conclusive.

Next: the public record leaves room for a possible later addendum. PREREG-v4 section 8.6 says a new protocol would have to disclose its place in this design's history. Any refusal-as-outcome proposal belongs to that next design discussion, not to the findings here; no later preregistration or posting is established by these sources.

An honest negative report earns its place by preserving the boundary between what happened and what can be concluded. Here, that boundary is the result worth keeping.
