#!/usr/bin/env bash
# Phase D: E1 premise re-argument only (Nick, 2026-10-02: "Narrow the claims").
#   6-premise (ICA claude-opus-5-5[1m]) -> 7-premisecheck (Codex gpt-6.1-sol). Summary: legs/out/phase-b.summary.
ESSAYS="e1" STAGES="6-premise 7-premisecheck" exec bash "$(dirname "$0")/fire-phase-b.sh"
