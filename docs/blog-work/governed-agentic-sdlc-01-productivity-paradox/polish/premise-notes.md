# E1 premise notes (premise narrowing, 2026-10-02)

Nick's decision: narrow the claims. Infrastructure is fragmented and incomplete, not absent. Gates are insufficient on their own, not useless. Line numbers refer to `src/content/posts/governed-agentic-sdlc-01-productivity-paradox.mdx` after this pass. Every other claim, number, receipt, footnote, Figure, and incident is unchanged.

## Premise 1: infrastructure fragmented, not absent

| Line | Before | After | Why |
| --- | --- | --- | --- |
| L23, L44 | "without any infrastructure for managing them at the system level" | "with only fragments of the infrastructure needed to manage them" | Frontmatter `whyItMatters` and ExecutiveSignal stated the absolute form. |
| L180 | "We have **zero** Platform Engineering for our cognitive infrastructure." | "For our cognitive infrastructure, we have pieces... But nothing joins them." | Core premise: pieces exist (context files, some observability, some memory); the join doesn't. |
| L180 | "No versioned context management. No agent observability." | "Context files sit in each project... Observability stops at the edge of one tool." | Four absence fragments rewritten as gaps in what exists, not nonexistence. |
| L180 | "No trust tiers for AI-generated artifacts." | "AI-generated artifacts rarely get trust tiers." | Avoids contradicting E3's registry work. |
| L180 | "We have built elaborate infrastructure for everything except..." | "We've built joined-up infrastructure for everything except..." | Closer now turns on the join, matching the narrowed claim. |
| L213 | "we have no mechanism for capturing, versioning, and re-injecting" | "Some tools now keep memory files... but there's no governed mechanism" | Memory exists in tools; what's missing is governed, cross-tool capture. |

## Premise 2: gates insufficient alone, not useless

| Line | Before | After | Why |
| --- | --- | --- | --- |
| L137 | "no amount of after-the-fact code review can adequately catch" | "after-the-fact code review alone can't adequately catch" | Downstream absolute about review gates. |
| L192 | "It doesn't work when an agent can produce in an afternoon" | "Gates still catch things... But a model where the gates do all the governing breaks" | Gates stay valuable; the gate-only model is what breaks. |
| L201 | "What's needed isn't more or faster gates. It's governance that's *proactive*" | "Rather, it's governance that's *proactive* as well... The gates stay" | Upstream as well as at the gates; forward links to E3 and E4. |
| L201 | (new) | "automates comparison checks at promotion and use boundaries" / "acceptance gates at the transitions" | Points forward to E3 (L209, L299) and E4 (L186-L194) without contradicting them. |
| L221 | "The question stops being \"how do we review...\"" | "The question stops being only \"how do we review...\"" | Review speed still matters under the narrowed premise. |
| L229 | "**Governance is embedded, not appended.**" | "**Governance is embedded upstream, and the gates stay.**" | The bullet stated the either/or form. |

## Kept on purpose

- L147 "zero shared memory" / "no mechanism for one session's fix to survive": describes the FastAPI incident's system at that time, which the brief keeps unchanged.
- L217 "no observability layer underneath it": historical DiffViewer incident.
- Figure 03 caption: Figures unchanged per the brief; it reads as reactive-only governance, which matches the narrowed claim.
- Thesis line (L62-L64) states neither absolute, so no RevisionNote.
