# Talking Points — Stage 1: Pre-Governance Baseline

## Hook (one line)
"The token bill is small. The re-work bill is invisible."

## Core points

1. **Ungoverned runs look productive.** Output appears fast, sounds confident,
   and lands as a Slack reply. Nobody pushes back because nobody has a spec
   to push back against.

2. **The agent's confidence is uncorrelated with correctness.** When there is
   no PRD, the agent infers the missing constraints — and the inferences are
   the regression vector.

3. **No persistence, no learning.** Once the session closes, the rationale
   evaporates. The next teammate (or the same engineer next week) repeats
   the loop without the benefit of last week's mistakes.

4. **Re-work is the hidden cost.** Tokens are billed per run; re-runs aren't
   free. Stage 1 metrics show ~487K tokens across two runs to fix what one
   PRD would have prevented.

## What this stage does NOT claim

- It does not claim agents are bad. It claims *unscoped* agents are.
- It does not claim governance is cheap. It claims ungoverned has a hidden
  bill that's bigger than the visible one.

## Bridge to Stage 2

Stage 2 introduces the spec layer: a PRD with frontmatter, an acceptance
checklist, a plan generated from the PRD, and a progress file that survives
the session. Same model, same engineer, different scaffolding.
