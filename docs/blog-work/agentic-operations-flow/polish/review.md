# Verdict: FIX-THEN-SHIP

Independent stage 3 review, 2026-10-02, against base `45e7274`. The durable-state argument survives, the arc handoff is stronger, and structural checks pass. Unsupported claim changes and unresolved editorial requirements prevent SHIP. References below use the current essay unless another file is named. No essay edits were made.

| id | severity | line | finding | suggested fix |
| --- | --- | --- | --- | --- |
| R1 | blocker | 108 | The base says the transcript has no native knowledge of the workflow rules. The new sentence says nothing in scrollback can tell an agent about them. This strengthens a lack of structured workflow state into an absolute inability to contain instructions, unsupported by the source text. | Restore the narrower native-state claim; distinguish text that mentions a rule from state that routes or enforces it. |
| R2 | blocker | 219, 351 | The new forward seed says every task lands on a reusable agent or skill and assumes its version. The base assigns bounded tasks to agents with model/provider hints; it doesn't establish universal reusable capability or version binding. The next essay's question supports a handoff, not this new implementation claim. | Frame the handoff conditionally: when the graph relies on reusable agents or skills, their intended identity must survive reuse. |
| R3 | blocker | 230, 248 | A council is newly described as stopping a production migration. More seriously, the base's recommendation that stopping is the safer move becomes an attributed claim that the storyboard calls for it across the listed risk classes. The supplied text establishes a council review path and a Mode D requirement separately; it doesn't establish that councils stop work or that the unseen storyboard states this exact list. | Keep council review separate from the stop boundary. Restore the recommendation wording, or supply the actual storyboard passage before attributing it. Preserve the explicit no-enforcement limit. |
| R4 | major | 339 | The conceptual lost-discovery example carries an observed badge even though the same paragraph disclaims a recorded incident. This risks presenting a constructed illustration as empirical evidence. The gap matrix's mixed testimony/example row doesn't make the isolated hypothetical an observed run. | Use proposed for the illustration, or combine it with a narrowly observed documentation claim whose object is explicit. |
| R5 | major | 51-55, 86, 347; missing movements | Standard anatomy rows 3, 6, and 7 remain incomplete: no supplied real first-person incident, no dated first-person origin, and no fair sourced account of external work or RelatedWork. The new academic/enterprise attribution at 347 has no footnote; only the internal design source is defined. Voice notes disclose the incident and origin gaps, but structural green isn't full conformity. | Have the lead explicitly disposition these gaps. Obtain an author account and an actual origin date, and supply relevant primary references for the external-work movement. Cite the already supplied E3 attribution sources if reused after review. Never invent an incident, date, or research. |
| R6 | major | 110, 140, 176, 202, 244, 263, 309 | June-model disclaimers and status rows are helpful, but local sentences still assert current implementation or guaranteed behavior. In particular, the new hypothetical at 309 says the graph would have retained evidence that the fix passed, although the example never establishes a check or passing result. This is a proposed scenario, not an invented historical memory, but its success is overstated. | Scope live-sounding passages to the documented June model and use intended behavior. At 309 state that the graph is meant to retain whatever verification evidence exists; don't add a passing result. Apply stale-sidecar recommendations through the lead. Keep Figures unchanged. |
| R7 | major | 104-110, 198-202, 282-305 | Several sections still open with abstract judgments or maxims before a concrete artifact. The artifact-graph definition and tool/cost subsections remain generic explanation rather than carrying the opening example. Audit Q1 fails; several Q2/Q3 failures are detailed below. | Reorder existing concrete objects or examples ahead of the abstractions; retain claims and the conceptual label. Give tool/cost subsections a concrete routing choice already in the manuscript. |
| R8 | minor | 51, 55, 125-127, 259, 273, 311 | The opening repeats closes/discovery, the conceptual disclaimer is lengthy, the orchestration question remains split into clipped beats, and the evidence opening is another clipped pair. The five-system sentence at 273 and thesis recap at 311 carry too many turns. These are machine-cadence tells despite improved contractions and corrective connectives. | Tighten repetition and join unearned fragment pairs. Split the system catalog into readable sentences; trim the recap while keeping the close's object, harder problem, and first-person bar. |
| R9 | minor | thread-beats.md:7, 9-12 | Five placement quotes are stale after the voice pass: discovery-dies, intent-contracts, dependencies-owned, review-evidence, and next-session-inherits no longer occur verbatim. The six recaps and their limits remain grounded in the conceptual design; no real run or measured outcome is invented in the manifest. | Refresh those five pointers to exact current sentences and line numbers. Retain proposed-success and no-runtime-evidence limits. |
| R10 | minor | 335-343, 355-357 | The receipts rail gives source/method limits but no dated method summaries as anatomy row 13 requests. The text identifies a June model but doesn't establish exact source inspection or receipt dates. | State the documented model's known June scope clearly and record unresolved inspection dates. Add dates only from supplied records; don't turn the publication date into a run or inspection date. |

## Per-section voice audit

Columns correspond exactly to the profile's twelve editor questions. Y means yes; N means no. For conditional questions, Y also means the condition doesn't apply: Q8 when no personal work/failure is asserted, Q9 when no date is asserted, Q10 without a PullQuote, and Q12 outside the close. Q4 accepts the profile's corrective turns in addition to its named connectives. Both H2 and H3 sections are included; the post-WhereThisSits closing paragraphs are audited separately.

| Section / lines | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Discovery / 49-76 | Y | Y | Y | Y | N | Y | Y | Y | Y | Y | Y | Y |
| Harder problem / 78-102 | Y | Y | N | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Durable state / 104-120 | N | N | N | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Triage / 123-147 | N | N | N | Y | N | Y | Y | Y | Y | Y | Y | Y |
| Artifacts / 149-168 | N | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Risk / 170-196 | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Execution / 198-226 | N | N | N | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Review / 228-255 | Y | Y | N | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Evidence / 257-280 | Y | Y | Y | Y | N | Y | Y | Y | Y | Y | Y | Y |
| Tools / 282-297 | N | N | N | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Cost / 299-305 | N | N | N | Y | Y | Y | Y | Y | Y | Y | Y | Y |
| Retention / 307-329 | Y | Y | Y | Y | N | Y | N | Y | Y | Y | Y | Y |
| Proof / 331-343 | Y | Y | Y | Y | Y | Y | N | Y | Y | Y | Y | Y |
| Close / 347-351 | N | N | Y | Y | Y | Y | N | Y | Y | Y | Y | Y |
| Sources / 353-357 | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y | Y |

Q3 failures concern absolute downstream guessing (102), unqualified current-system and gate statements (108-140), universal reusable-task routing (219), council stop attribution (230), and categorical tool/cost advice (286-305). Later disclaimers don't always supply the local boundary the profile requests. The origin at 86 has no date; Q9's conditional pass doesn't satisfy anatomy row 6. The final close itself passes Q12, though the attribution paragraph before it delays the return to the opening object. There is no supplied personal aside to restore. No deleted sentence can be identified as Nick-authored from this net diff alone; retained distinctive lines include the storage-bin image, the boring graph, and the merge-conflict coordinator. Do not manufacture a lost-Nick-sentence finding from assumed authorship.

## Standard, preservation, and hygiene verification

- Frontmatter is complete; updatedDate is added, series membership retained, and ExecutiveSignal matches both frontmatter strings exactly. There are nine H2s including proof and Sources, with declarative body headings. One early thesis marker repeats the argument at 168. One PullQuote is below the suggested rhythm target, which is guidance rather than a gate.
- Anatomy rows 0, 2, 4, 5, 8-10, and 12-17 have their structural hooks. Rows 3, 6, and 7 have R5 gaps; row 13 also has R4/R10 evidence issues. Row 1 doesn't require a RevisionNote for meaning-preserving polish; row 11 is strongly recommended and lacks a real failure receipt. No supplied runtime receipt can be manufactured to fill it.
- E1's prior question is grounded in its local-delivery discussion and lost-memory example at E1:109. E3's question is passed forward in body prose at 351 independently of WhereThisSits. The umbrella is attribution-safe in wording but needs the source treatment in R5.
- Base and current Figure blocks compare exactly: all seven unchanged, including attributes/captions. AgenticOperationsFlow client:visible and the CSS import compare exactly. Existing heroImage is unchanged; heroAlt and heroPlacement were absent in the base and added. No ThreadScene was added.
- Existing numerical values, publication date, tier mappings, code schema, command table, and Figure assets are preserved. The base had no footnotes or runtime receipts to drop. The new design footnote restates existing provenance without adding a public URL or receipt. Removed artifact-definition prose substantially survives in the role table. The separate-series next-post promise was intentionally replaced by the E3 handoff and is explicitly recorded in the stale sidecar.
- The conceptual example is explicitly labeled, so the new first-person framing isn't evidence of an invented historical memory. R1-R3 concern actual unsupported claim changes; R6 concerns added hypothetical assurance. The HTML Capsules introduction is supported by the existing human-capsule role, but the voice notes correctly disclose the mapping as an inference.
- All Term ids resolve and first-use wrappers are no longer duplicated. Internal essay links resolve to existing post files; no fragment anchors are introduced. The sole design footnote reference/definition pairs. No raw tracker ids, PR refs, SHAs, or schema fields occur in body prose; schema fields are confined to the retained code disclosure.
- stale-claims.md has all eight gap-matrix candidates with recommendations, including disposition of the removed next-post promise in candidate 8. Presence is complete; the recommendations still need lead disposition and aren't proof that current claims are verified.
- No browser capture or Astro build was attempted. This review checks source structure and prose, not rendered behavior or the private deck/storyboard contents.

## Required command output

```text
PASS src/content/posts/agentic-operations-flow.mdx  (0 errors, 0 warnings)
check-prose: OK (scanned 8 files under posts and series; 0 em dashes found)
```

The check-essay line is verbatim. The check-prose line is normalized here to avoid writing its output separator, an em dash; the actual foreground command exited 0 and reported those counts. Both commands ran to completion. Inbox checks returned exit 3 (empty); no added messages were consumed.

assumptions: []
