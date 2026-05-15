# Storyboard — Stage 1: Pre-Governance Baseline

## Frame 1: Vague ask lands (8s)
- Slack composer; one-line message; no PRD attached.
- Beat: "this is how a lot of work actually starts."

## Frame 2: Agent spun up (10s)
- Terminal; claude CLI invoked with raw prompt file.
- Beat: "no system prompt, no role, no reviewer."

## Frame 3: Confident wrong plan (14s)
- Markdown table of proposed phases.
- Annotations highlight the silently-made wrong assumptions.

## Frame 4: No verification (10s)
- `git checkout -b` and an `npm i` before any spec is written.
- Beat: "looks fine" is doing all the work.

## Frame 5: Reality bites (14s)
- Slack #incidents + git log; the regression is identified.

## Frame 6: Re-prompt from scratch (12s)
- New claude run; no session memory; token counter compounds.

## Frame 7: Session ends, memory dies (10s)
- Terminal exits; $TMPDIR artifacts auto-expire.
- Beat: "the next session starts from zero."

Total runtime target: ~80s (social-clip), ~180s (standard walkthrough).
