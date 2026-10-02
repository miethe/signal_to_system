#!/usr/bin/env bash
# Phase C: one fix round per essay after the lead's own blocker fixes.
#   4-voice2 (ICA claude-opus-5-5[1m]) -> 5-review2 (Codex gpt-6.1-sol), E1/E2/E4 in parallel.
# Same machinery and summary file as Phase B (legs/out/phase-b.summary, new START block).
STAGES="4-voice2 5-review2" exec bash "$(dirname "$0")/fire-phase-b.sh"
