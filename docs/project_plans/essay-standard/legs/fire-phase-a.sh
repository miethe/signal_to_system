#!/usr/bin/env bash
# Phase A fire batch: A2 (ICA Opus voice profile), A3 (Codex Sol gap matrix), A4 (Codex Sol E5 packet).
# Run as ONE background call from the front. Legs run in parallel; the script waits for all three
# and writes a summary to legs/out/phase-a.summary. Job control (set -m) keeps SIGINT un-ignored so
# dispatch_preflight does not refuse the children as backgrounded.
set -uo pipefail
set -m
set -a; . "$HOME/.config/aos/secrets.env"; set +a
export PATH="$HOME/.pyenv/shims:$PATH"
AMD=/Users/miethe/dev/homelab/development/agentic_meta_dev
W=/Users/miethe/dev/homelab/development/.wt
L=$W/s2s-essay-standard/docs/project_plans/essay-standard/legs
OUT=$L/out; mkdir -p "$OUT"
LEG=$AMD/infra/dispatch/leg
cd "$AMD" || exit 2

(
  export AOS_MANIFEST_REF=$L/packs/ica/execution-manifest.yaml AOS_CONTEXT_BUNDLE_PATH=$L/packs/ica/pack.md
  "$LEG" --lane ica --model 'claude-opus-5-5[1m]' --effort medium --task-class write \
    --node node_01M3YVPJSFE7MXRHEF28P3N4XQ --cwd "$W/s2s-essay-a2-voice" \
    --ica-authorized-repo "$W/s2s-essay-a2-voice" --ica-authorized-path "$L/packs/ica/pack.md" \
    --prompt-file "$L/a2-voice.prompt.md" --timeout 3300 > "$OUT/a2-voice.log" 2>&1
  echo "a2-voice exit=$?" >> "$OUT/phase-a.summary"
) &
(
  export AOS_MANIFEST_REF=$L/packs/codex/execution-manifest.yaml AOS_CONTEXT_BUNDLE_PATH=$L/packs/codex/pack.md
  "$LEG" --lane codex --model gpt-6.1-sol --effort medium --task-class write \
    --node node_01M3YVPJZY5SSMRNBNNEEH09QK --cwd "$W/s2s-essay-a3-gap" \
    --prompt-file "$L/a3-gap.prompt.md" --timeout 3300 > "$OUT/a3-gap.log" 2>&1
  echo "a3-gap exit=$?" >> "$OUT/phase-a.summary"
) &
(
  export AOS_MANIFEST_REF=$L/packs/codex/execution-manifest.yaml AOS_CONTEXT_BUNDLE_PATH=$L/packs/codex/pack.md
  "$LEG" --lane codex --model gpt-6.1-sol --effort medium --task-class write \
    --node node_01M3YVPK7T83HNFRFAMGNYBR3X --cwd "$W/s2s-essay-a4-envelope" \
    --prompt-file "$L/a4-envelope.prompt.md" --timeout 3300 > "$OUT/a4-envelope.log" 2>&1
  echo "a4-envelope exit=$?" >> "$OUT/phase-a.summary"
) &
wait
for f in "$W/s2s-essay-a2-voice/docs/authoring/essay-voice-profile.md" \
         "$W/s2s-essay-a3-gap/docs/project_plans/essay-standard/gap-matrix.md" \
         "$W/s2s-essay-a4-envelope/docs/blog-work/deterministic-envelope/READY-TO-DRAFT.md"; do
  printf '%s bytes=%s\n' "$f" "$(wc -c < "$f" 2>/dev/null || echo MISSING)" >> "$OUT/phase-a.summary"
done
echo "PHASE-A-DONE $(date -u +%FT%TZ)" >> "$OUT/phase-a.summary"
cat "$OUT/phase-a.summary"
