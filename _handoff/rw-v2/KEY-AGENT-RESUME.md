# Key agent resume brief — Registry Wave reading experience v2 (2026-09-19)

You are the key agent for the Registry Wave reading-experience v2 build. Your predecessor died on a
subscription 429 right after the Opus taste-review leg finished. Resume from on-disk state. You direct;
ICA legs are the hands. You do no code edits yourself beyond trivial wiring of briefs/logs; you do run
git (commit only, never push) and the build gates.

## Where things are
- Worktree: /Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay, branch
  post/registry-wave-v2-research-integrated (PR #145). `git log --oneline main..HEAD` shows P0-A/B/C landed
  (179fc8c, 4d1d015, f5d8d88). Uncommitted: reading-experience-v2/DIRECTION.md and atlas/p0bc-review/.
- Authoritative direction: docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/DIRECTION.md
  (V1-V13, package order, lanes, QA table). ARCHITECTURE.md beside it. $H = /Users/miethe/dev/WIP/agents/theses/registry-wave/reg-wave-review-v4/registry_wave_experience_v2
- Opus taste review of P0-B/C: .../reading-experience-v2/atlas/p0bc-review/FIX-LIST.md (§A must-fix A1-A9,
  §B defer, §C out-of-scope routed to P0-D/V12, §E unverified). Its log: _handoff/rw-v2/legs/opus-taste-p0bc.log.
- Leg briefs + logs pattern: _handoff/rw-v2/legs/<leg>-brief.txt and <leg>.log (read p0b-shell-brief.txt as the style model).

## Remaining packages, in order (each: ICA leg -> you verify `nvm use 22 && npm run check && npm run build` -> commit explicit paths)
1. taste-fix (Sonnet ICA): close FIX-LIST §A A1-A9 exactly as written. A1 is `@custom-variant dark (&:where(.dark, .dark *));` in global.css. Verify each with a screenshot pair light/dark (leg has Playwright per the taste log; same capture approach) saved to atlas/taste-fix/.
2. V12 content integration (Opus ICA): per DIRECTION V12. Leg must read .claude/skills/voice-writer/SKILL.md and the files it references first, notes/do-not-disclose.md, and `git show 7c4fc4c` (Nick's hand edits, preserve). No emdashes. Wires PullQuote/ReceiptDisclosure/ContextualNote; retires diagram-thread-0*.svg / diagram-market-wave.svg / diagram-estate-before-after.svg references from the MDX (delete files only when `grep -rn` in src/ is clean).
3. P0-D mobile/a11y (Sonnet ICA): mobile Contents bottom sheet, N12 anchor-relative restore, keyboard/focus items from FIX-LIST §E.
4. P1 (Sonnet ICA): ContextualNotes, dock hold/collapse, active-section per DIRECTION.
5. Fidelity pass vs Tier A both themes (Opus ICA, <=3 rounds: review leg -> fix leg). GPT via ICA Codex lane is the fallback for a visual leg Opus can't land. Never Nick's personal Codex without his explicit OK.
6. QA: run DIRECTION's test table (N01-N12, A01-A04, C01-C04, V01-V04) with Playwright in a leg; atlas final screenshots; then write reading-experience-v2/CLOSEOUT.md (what landed, what deferred + why, what unverified, atlas index, the "SAME BYTES EVERYWHERE" PNG caption flag from v2-research-integrated/ASSET-MAP.md).
Atlas hygiene: before committing atlas dirs, keep only the PNGs referenced from a .md (the p0bc-review dir is 35 MB; prune to the screenshot index, target <5 MB per atlas dir). Never commit capture-log or unreferenced PNGs.

## ICA dispatch (the only hands lane; never --dangerously-skip-permissions; never `git push`)
ICA_KEY=CCx3 ~/ica-claude.sh -p "$(cat _handoff/rw-v2/legs/<leg>-brief.txt)" --model 'claude-sonnet-5[1m]' \
  --add-dir /Users/miethe/dev/homelab/development/signal_to_system/.wt/rw-v2-essay \
  --add-dir /Users/miethe/dev/WIP/agents/theses/registry-wave --max-turns 80 \
  --allowedTools "Read Write Edit Grep Glob Bash" \
  --append-system-prompt "Work only inside the worktree. Commit nothing; the key agent commits. No git push. Report: files changed, gates run, what you could not verify." \
  < /dev/null > _handoff/rw-v2/legs/<leg>.log 2>&1 &
Use 'claude-opus-5[1m]' for taste/content legs. On 429 from CCx3 try CC1..CC8. Legs run >10 min: launch in
background, record the pid, then poll with `while kill -0 <pid> 2>/dev/null; do sleep 30; done` in a
foreground Bash under 9 minutes per call, repeating until exit; do not end your turn while a leg runs.
Briefs <500 words, paths not contents. Keep Bash commands in the worktree (absolute paths, no cd to repo root).

## Commit discipline
Explicit paths only (never `git add -A` / `git add <dir>`), one commit per package, message style of the
existing commits, ending with "Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>". Commit DIRECTION.md
with the taste-fix package. Do not push.

## Report back
When all six packages are committed: a <=200-word report: commits, gates, deferred items, unverified items,
CLOSEOUT path. If a package cannot complete after two leg attempts, stop and report the blocker instead of
working around it.
