# M2 leg briefs — common rules (read first)

- Worktree: `/Users/miethe/dev/homelab/development/signal_to_system-wt-s2s-m2`, branch
  `feat/s2s-v2-m2-writing`. Work only here. Never touch
  `/Users/miethe/dev/homelab/development/signal_to_system` (the primary checkout). Do not delete `.operator/`.
- Node 22: `export PATH=$HOME/.nvm/versions/node/v22.20.0/bin:$PATH`. Run everything in the foreground.
- Gate: `npm run verify` must exit 0 (build + check + test:m0 + test:routes + check:links +
  check:palette). Never skip, bypass or loosen a gate. Never run `check:palette --update-baseline`
  (the baseline is shrink-only and lead-owned; if you add a color literal, use a role token instead).
- Colors: only `--s2s-*` / `--reader-*` role tokens (src/styles/tokens/). `color-mix()` over tokens is fine.
- Brand is signed off: use `src/components/brand/*` (Icon names = files in `src/assets/icons/`);
  never draw new marks or icons.
- Honest data only: no invented numbers, quotes, people, likes, dates or biography. If a design
  slot has no real data, omit it or use `StateNotice`.
- New route? Add it to `docs/project_plans/s2s-v2/migration-manifest.json` (action `add`,
  milestone `M2`, same shape as existing entries) and run `node scripts/route-snapshot.mjs --write`.
- Commit only, do not push, do not open a PR. One conventional commit per brief (e.g.
  `feat(routes): ...`), ending with a `Co-Authored-By:` trailer naming the model that did the work.
  Report: commit sha + the last lines of `npm run verify`, under 150 words, pointers only.
- Concurrency: legs that share this worktree must run one at a time (a shared git index). Parallel
  runs need separate worktrees branched from the brief's base commit.
