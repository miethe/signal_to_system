# Verdict: FIX-THEN-SHIP

Independent re-review of E1 at `b425bcb09b9b5a2fde3d653dfd8ad5dd8be85d50`, with a clean working tree before this report. Read round 1 and voice2-notes; inspected the requested fix diff from `5ac6b3d` and the net essay diff from `45e7274`. The preservation corrections are present, but one fix introduces an unsupported claim about the author's evidence holdings. R09 remains partially open. Existing premise and source decisions remain held for Nick, so structural green isn't publication clearance.

Line references are to the current essay unless another file is named. Review basis: `docs/authoring/essay-standard.md`, `docs/authoring/essay-voice-profile.md`, the hand-edit voice rules, and the published Registry Wave exemplar. The older voice-writer skill's canonical `My Voice.md` path is absent; the repository's explicit, higher-authority voice profile and hand-edit rules supplied the audit criteria. No outside source was freshly verified.

## Findings

| id | severity | line | finding | suggested fix |
| --- | --- | --- | --- | --- |
| RR01 | blocker | L275; related wording L157 | At `5ac6b3d`, the rail says the essay supplies no benchmark or cross-team study. It now says "I don't have a benchmark ... or a cross-team study," asserting that Nick possesses neither. Evidence not supplied here doesn't establish evidence he doesn't have. Likewise, "I can't point to a study for this" turns a documented manuscript support gap into an assertion about his ability to cite one. These are new author-evidence claims, though no incident memory is invented. | Use document-scoped limits: "I don't supply a benchmark ... or a cross-team study here" and "No study is cited here for this claim." Preserve the underlying tier and intervention claims; leave their substantive rescope to Nick. |
| RR02 | major | L68-70, L91-93, L119-121, L131-137, L145-147, L153-157 | R09 is partly open. Concrete openings and the second-movement complication are fixed, but several strong non-held claims still receive their limits only at L267-281. Google/team-gain figures, PR-size creep, inventory coverage, and the review claim remain locally unbounded. The new study disclaimer doesn't limit the categorical "only intervention" assertion. | Move or repeat the already supplied document-scoped boundaries beside their claims without changing numbers, testimony, or conclusions. Keep source verification and any substantive rescope held for Nick. Avoid turning missing supplied evidence into missing evidence everywhere. |
| RR03 | minor | L178, L180; stale-claims.md L3 | The infrastructure movement still carries a long origin/attribution paragraph and the uncontracted "We have built." The sidecar's "None of these claims is rewritten in the current text" remains ambiguous because earlier changes and new boundaries are visible; the item-7 parenthesis helps but doesn't establish a blanket preservation claim. | Split L178 at existing argument turns without deleting asides or attribution. Contract "We have built" only if the lead accepts a purely grammatical change to held prose. Describe the sidecar as retaining candidate claims for author decisions, rather than making a blanket statement about revision history. |
| RR04 | held for Nick | L23/L44, L180, L192/L201, L213, L221; stale-claims.md | P1-P5 still hold the absence, gate, persistent-memory, executive-signal, and correctness premises. Floating windows, receipt confirmation, naming, series/core-path wording, CCDash scope, and Google/Rewire/Shadow AI/slopsquatting support remain author decisions. Their disclosure doesn't validate them. | Resolve or explicitly accept each held decision before publication. This review grants no permission to rewrite the protected claims or held passages. |

## Round-1 disposition

Every round-1 finding is accounted for below. A resolved preservation finding can coexist with a separate substantive question held for Nick.

| id | disposition | current evidence |
| --- | --- | --- |
| R01 | Resolved | L295 retains `a29acda2`, `74f49e3f`, `669cda07`; L297 retains `7c0b2dda`. The thread manifest now accurately says the method note lists references. No fresh commit inspection is implied. |
| R02 | Resolved; coverage rescope held for Nick | L219 restores the original outcome wording and adds a separate scope boundary. Sidecar item 7 records restoration and requests Nick's scope decision. |
| R03 | Resolved | L205 removes the unsupported absence-of-defined-roles claim and preserves missing cross-session knowledge. L285 presents ownership as a need, without asserting that the sessions had no defined process roles. |
| R04 | Resolved; memory premise held for Nick | The general persistent-memory PROPOSED row is gone. L260 concerns the described workflow, says TO TEST, and disclaims a current coverage receipt. It doesn't assign persistent memory a general implementation status. |
| R05 | Resolved | L285 restores the firsthand observation about breaking teams otherwise doing everything right, alongside the incident return and E2 handoff. |
| R06 | Resolved | L178 adds `[^ase]`; L301 supplies the existing Sun/OutSystems attribution sources. Attribution remains narrow and makes no novelty claim. |
| R07 | Resolved | L219 has a first-use CCDash Term; `src/data/glossary.ts` L21-24 contains the entry and human introduction. The checker resolves it. This is a presence check, not independent validation of implementation status. |
| R08 | Resolved | L269-281 carry known dates, explicitly label unstated dates, separate cited studies from unsupported figures, and retain study-versus-lab scope boundaries. No unknown observation date was filled in. |
| R09 | Partly resolved; still open | The second H2 now complicates spec clarity at L95. L99, L119, L143, L161, and L239 ground openings in existing objects. Local limits improve at L58/L79, but RR01-RR03 and the audit below remain. Held-premise failures stay held. |
| R10 | Resolved | L169 is a complete body sentence with the original transition meaning; the fragment PullQuote wrapper is removed. Two supported PullQuotes remain. |
| R11 | Resolved | All five thread-manifest `beside` quotations are verbatim essay substrings. The final one matches L287. |
| R12 | Resolved | Status details, evidence rail, and method notes use first person or direct evidence limits. Editorial-workflow wording and the triple "They needed" are removed. The close preserves record/context/ownership needs and ends its incident paragraph on a first-person bar. RR01 is a new preservation defect in that conversion. |

## Preservation and asides

The four protected strings remain verbatim: observability outcome at L219; firsthand team observation at L285; missing cross-session knowledge at L205 (also capitalized at L147); academic/enterprise attribution with `[^ase]` at L178.

The fix diff restores three base phrases rather than inventing stronger testimony: "Let me be direct about what I'm actually seeing," the original "Anyone who tells you" assertion including its six-month aside, and "I'll lay out the full framework across this series." The amplifier analogy, embarrassment, company-maturity parenthetical, "For three months!", "which is to say, a lot", and deliberate fragments survive. The company parenthetical was reworded in the earlier net migration, but its qualification and conversational role remain. No additional removed personal aside was found in the inspected net diff.

Apart from RR01, the fix diff retains substantive claims, numbers, dates, receipts, source titles, and URLs. Its new FastAPI bridge reuses the existing 204/JSON symptom, three correct fixes, and missing knowledge. Rail dates come from the existing body; new unknown-date labels leave unknowns unknown. The DiffViewer rail restates the supplied three-month account, user complaints, and small fix. No new first-person incident memory, layer chronology, successful inherited-state outcome, or measured remediation result was found.

Programmatic comparisons confirm all three Figure blocks are byte-identical to both reviewed bases. The original ten external footnote definitions are byte-identical to `45e7274`; external definitions, including ASE, are unchanged from `5ac6b3d`. The four receipt identifiers remain in Sources. Hero fields have no fix-round delta. Earlier metadata additions are visible in the net diff and aren't attributed to this fix round.

## Twelve-question voice audit, per section

Columns follow the voice profile exactly: Q1 concrete opening; Q2 dual-reader mechanism; Q3 nearby limit; Q4 corrective; Q5 cadence; Q6 contractions; Q7 earned standalone beat; Q8 owned work; Q9 dates; Q10 supported PullQuote; Q11 hygiene/tells; Q12 incident-return close. Y = yes, N = no, A = not applicable. Any N on Q1-Q6 still needs attention, subject to Nick's higher-authority protection of asides and held claims. Unknown dates explicitly marked in the rail satisfy disclosure, not historical dating.

| Section / lines | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Q11 | Q12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Opening, L48-74 | Y | Y | N | Y | N | Y | Y | Y | N | Y | Y | A |
| Gains by task, L76-95 | Y | Y | N | Y | Y | Y | N | Y | N | A | Y | A |
| Harder-problem setup, L97-115 | Y | Y | N | Y | Y | Y | Y | Y | A | Y | Y | A |
| Volume Trap, L117-123 | Y | Y | N | Y | Y | Y | N | A | Y | A | Y | A |
| Context Collapse, L125-139 | Y | Y | N | Y | Y | Y | Y | Y | N | A | Y | A |
| Accountability Gap, L141-149 | Y | Y | N | Y | Y | Y | Y | Y | Y | A | Y | A |
| Shadow AI, L151-157 | Y | Y | N | Y | Y | Y | N | A | Y | A | Y | A |
| Infrastructure, L159-201 | Y | Y | N | Y | N | N | Y | Y | A | A | Y | A |
| Governed participants, L203-235 | Y | Y | N | Y | N | Y | Y | Y | N | A | Y | A |
| Proof movement/components, L237-263 | Y | Y | Y | Y | Y | Y | Y | Y | A | A | Y | A |
| Evidence boundaries/rail, L265-281 | Y | Y | Y | Y | Y | Y | Y | Y | Y | A | Y | A |
| Close, L285-287 | Y | Y | Y | Y | Y | Y | Y | Y | A | A | Y | Y |
| Sources, L289-321 | A | Y | Y | Y | Y | Y | A | Y | Y | A | Y | A |

The opening still stacks distinct research/team claims at L68, and its windows float. The gains section limits the classifications locally but not its intervention efficacy or current-state window. The third movement's broad system diagnosis still has no nearby scope boundary. Volume's unsupported PR multiplier and Context's inventory lack local evidence limits. Accountability leaves the review assertion's support gap distant. Shadow AI retains the categorical intervention claim even with its new support disclaimer. Infrastructure's held categorical passages explain its Q3/Q6 failures; L178 explains Q5. Governed participants still combine definitions, analogy, and broad assurances, while P3/P5 prohibit an autonomous substantive fix. The rail's Q3 is green because limits are nearby, but RR01 means their factual wording needs correction. Deliberate original fragments and restored conversational asides are not proposed cuts.

## Hygiene and verification

Both required commands completed in the foreground with exit 0:

```text
node scripts/check-essay.mjs src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx
PASS src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx  (0 errors, 0 warnings)

node scripts/check-prose.mjs
check-prose: OK; scanned 8 files under posts and series; 0 em dashes found.
```

The prose result above transcribes its content without reproducing the tool's prohibited U+2014 separator. A separate character count found zero U+2014 in E1. The essay checker confirms imports, Term ids, footnote pairing, allowed component values, and identifier hygiene. The net source inspection shows the existing method references confined to footnotes. No browser capture, Astro build, essay edit, glossary edit, commit, push, or node completion was attempted; completing the shared tracker node would overstate this review-only assignment. Only this report was authored. Inbox check returned exit 3, with no messages consumed.

```json
{"assumptions":[]}
```
