# E1 stale-claim sidecar (editorial re-pass, 2026-10-02)

Line numbers refer to `src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx` after this pass. None of these claims was rewritten; each is a flag for author review. Candidate numbers follow the gap matrix's E1 "Stale-claim candidates" table.

## Premise decisions for Nick

These carry the E1 premise hold. Their meaning is unchanged in this pass, and no BoundaryGrid or ImplementationStatus row takes a position on them.

| # | Line | Quote (under 15 words) | Why it may be stale | Recommendation |
| --- | --- | --- | --- | --- |
| P1 | L180 | "We have **zero** Platform Engineering for our cognitive infrastructure." | Literal-absence claim (plus the four "No ..." fragments after it). E3 describes implemented or partial systems in each neighborhood; it could be read as industry rhetoric or as a claim about the lab. | needs-Nick |
| P2 | L192, L201 | "Gate-based governance is *reactive*" / "What's needed isn't more or faster gates." | Reads as "gates can't work" at agent speed; E3's enforced comparisons and E4's acceptance gates are part of the remedy. Is the claim "insufficient alone"? | needs-Nick |
| P3 | L213 | "we have no mechanism for capturing, versioning, and re-injecting what agents learn." | Persistent-memory absence claim. Current architecture has memory and context-fabric systems, so "no mechanism" may no longer fit. | needs-Nick |
| P4 | L23, L44 | "without any infrastructure for managing them at the system level" | The frontmatter `whyItMatters` and the ExecutiveSignal carry the same absence premise as P1, so they should follow whatever you decide there. | needs-Nick |
| P5 | L221 | "the generated code is correct by construction." | Gap matrix: deterministic specs don't establish deterministic or correct model output. It needs a boundary if the premise is re-argued. | needs-Nick |

## Stale-claim candidates

| # | Line | Quote (under 15 words) | Why it may be stale | Recommendation |
| --- | --- | --- | --- | --- |
| 1 | L56-58 | "for over a year now" / "at least not in the last 6 months" | The measurement window floats, the tool mix keeps changing, and the 5-10x+ figure is current-tense author testimony. | rescope (date the window) |
| 2 | L131-133 | "grown to 1,703 markdown files across 50+ subdirectories" | The November origin is dated, but the inventory's as-of date isn't. | keep-as-historical (add an as-of date if one exists) |
| 3 | L50, L145 | "Three agents, one bug, zero shared memory." | This is now the running example that opens and closes the essay. The commit references and same-root-cause reading need confirming before republication. | keep-as-historical (confirm receipt) |
| 4 | L180 | See P1. | Absence claim. | needs-Nick |
| 5 | L211, L213 | "what I call the Harness Engineering Control Plane" | The terminology may predate the current control-fabric / multi-system language, and the absence claim (P3) sits right next to it. This pass reordered the paragraph to open on the layer's job but kept the term. | needs-Nick (validate naming) |
| 6 | L217 | "\"Tests passed\" was the only signal I had" | Historical incident. It doesn't describe today's coverage, and the token-burn implication has no separate measurement. | keep-as-historical |
| 7 | L219 | "I've since built CCDash to address an observability gap." | Implies closure without stating scope. Stage 1 already removed the publication promise. | rescope |
| 8 | L233, L121 | "Parts 2-5 break down the specific patterns" / "More on this in Post 3" | The shipped core path has different questions and a different order from the original five-post series. | needs-Nick (series vs. core-path framing) |

## Other flags noticed in this pass (not in the gap matrix)

| Line | Quote (under 15 words) | Issue | Recommendation |
| --- | --- | --- | --- |
| L143 | "Rewire.it's 2026 *Case for Formal Verification in the Agentic Era*" | The body title doesn't match the footnote title ("When AI Writes the Code, Verification Becomes the Job"). "Sails through review" has no separate support. | needs-Nick (source check) |
| L68 | "Google's internal studies suggest AI tools save measurable time" | No citation. The rail already records it as a source gap. | needs-Nick |
| L153 | "a relatively new attack vector called \"slopsquatting\"" | No dedicated source. | needs-Nick |
| L151 | "Roughly 40% of organizations already have Shadow AI in active use." | No clear support in the IBM governance link. | needs-Nick (source check) |
