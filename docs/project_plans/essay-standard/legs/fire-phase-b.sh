#!/usr/bin/env bash
# Phase B fire batch: E1, E2, E4 polish chains in parallel. Each chain runs three legs in order:
#   1-migrate (Codex gpt-6-luna) -> 2-voice (ICA claude-opus-5-5[1m]) -> 3-review (Codex gpt-6.1-sol)
# in its own linked worktree, and this script (not the sandboxed leg) commits each stage by pathspec.
# Run as ONE background call from the front. Summary: legs/out/phase-b.summary (exits, per-stage
# check-essay result, commit sha, and output-artifact byte sizes; 0 or MISSING = investigate).
set -uo pipefail
set -m
set -a; . "$HOME/.config/aos/secrets.env"; set +a
export PATH="$HOME/.pyenv/shims:$PATH"
[ -s "$HOME/.nvm/nvm.sh" ] && . "$HOME/.nvm/nvm.sh" >/dev/null 2>&1 && nvm use 22 >/dev/null 2>&1
AMD=/Users/miethe/dev/homelab/development/agentic_meta_dev
W=/Users/miethe/dev/homelab/development/.wt
L=$W/s2s-essay-standard/docs/project_plans/essay-standard/legs
P=$L/phase-b
OUT=$L/out; mkdir -p "$OUT"
SUM=$OUT/phase-b.summary
LEG=$AMD/infra/dispatch/leg
cd "$AMD" || exit 2

# bash 3.2 (macOS /usr/bin/env bash): no associative arrays.
slug_of() { case $1 in e1) echo governed-agentic-sdlc-01-productivity-paradox;; e2) echo agentic-operations-flow;; e4) echo the-contract-is-the-work;; esac; }
node_of() { case $1 in e1) echo node_01M3YVPKEDPA3Z2M23P22FAA6Z;; e2) echo node_01M3YVPKM3EE8N43SKV2BQM3F4;; e4) echo node_01M3YVPKSNG346KKGHAQSVT45R;; esac; }

log() { echo "$*" >> "$SUM"; }

stage_commit() { # $1 essay $2 stage
  local wt=$W/s2s-polish-$1 slug=$(slug_of $1)
  git -C "$wt" add -A "src/content/posts/$slug.mdx" src/data/glossary.ts "docs/blog-work/$slug" 2>/dev/null
  if git -C "$wt" diff --cached --quiet; then echo none; return; fi
  git -C "$wt" commit -q -m "polish($slug): stage $2 (leg output, lead reviews before PR)

Part of $(node_of $1).

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>" && git -C "$wt" rev-parse --short HEAD
}

run_stage() { # $1 essay $2 stage
  local e=$1 s=$2 wt=$W/s2s-polish-$1 lane args rc
  case $s in
    1-migrate) export AOS_MANIFEST_REF=$L/packs/codex/execution-manifest.yaml AOS_CONTEXT_BUNDLE_PATH=$L/packs/codex/pack.md
               args=(--lane codex --model gpt-6-luna --effort medium) ;;
    2-voice)   export AOS_MANIFEST_REF=$L/packs/ica/execution-manifest.yaml AOS_CONTEXT_BUNDLE_PATH=$L/packs/ica/pack.md
               args=(--lane ica --model 'claude-opus-5-5[1m]' --effort medium --ica-authorized-repo "$wt" --ica-authorized-path "$L/packs/ica/pack.md") ;;
    3-review)  export AOS_MANIFEST_REF=$L/packs/codex/execution-manifest.yaml AOS_CONTEXT_BUNDLE_PATH=$L/packs/codex/pack.md
               args=(--lane codex --model gpt-6.1-sol --effort medium) ;;
  esac
  "$LEG" "${args[@]}" --task-class write --node "$(node_of $e)" --cwd "$wt" \
    --prompt-file "$P/$e-$s.prompt.md" --timeout 3300 > "$OUT/$e-$s.log" 2>&1
  rc=$?
  local sha; sha=$(stage_commit "$e" "$s")
  local chk; chk=$(cd "$wt" && node scripts/check-essay.mjs "src/content/posts/$(slug_of $e).mdx" 2>&1 | head -1)
  log "$e $s exit=$rc commit=$sha check=[$chk]"
  [ "$rc" -eq 0 ] || [ "$sha" != none ]
}

chain() { # $1 essay
  local e=$1
  for s in 1-migrate 2-voice 3-review; do
    if ! run_stage "$e" "$s"; then log "$e STOPPED at $s (non-zero exit and no output); later stages skipped"; return; fi
  done
}

log "PHASE-B-START $(date -u +%FT%TZ)"
chain e1 &
chain e2 &
chain e4 &
wait
for e in e1 e2 e4; do
  slug=$(slug_of $e); wt=$W/s2s-polish-$e
  for f in "docs/blog-work/$slug/thread-beats.md" "docs/blog-work/$slug/polish/migration-notes.md" \
           "docs/blog-work/$slug/polish/voice-notes.md" "docs/blog-work/$slug/polish/stale-claims.md" \
           "docs/blog-work/$slug/polish/review.md"; do
    if [ -f "$wt/$f" ]; then log "$e $f bytes=$(wc -c < "$wt/$f" | tr -d ' ')"; else log "$e $f bytes=MISSING"; fi
  done
  log "$e essay diffstat: $(git -C "$wt" diff --shortstat 45e7274 -- "src/content/posts/$slug.mdx")"
  log "$e uncommitted: $(git -C "$wt" status --short | wc -l | tr -d ' ') path(s)"
done
log "PHASE-B-DONE $(date -u +%FT%TZ)"
cat "$SUM"
