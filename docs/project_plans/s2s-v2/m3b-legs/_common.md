# M3b leg briefs — common rules (read first)

- Repo: miethe/signal_to_system. The front gives you a dedicated worktree cut from the brief's base
  commit (branch off `feat/s2s-v2-m3b-labs`). Work only there. Never touch
  `/Users/miethe/dev/homelab/development/signal_to_system` (the primary checkout) or any other worktree.
- Plain file edits + ONE commit. No `git apply`, no rebase, no push, no PR, no force anything.
  Conventional commit (`feat(labs): ...` / `test(labs): ...`) ending with a `Co-Authored-By:` trailer
  naming the model that did the work.
- Node: Node 22 may be unavailable in your sandbox. If any `node` >= 20 runs, run the brief's
  `node --test ...` command and paste its last lines in your report; otherwise say "not run" —
  the lead runs `npm run verify` on integration. Never `npm install` (node_modules is present).
- Contract (lead-owned, READ, do not edit): `src/lib/labs/types.ts`, `src/lib/labs/profiles.mjs`,
  `src/lib/labs/site.ts`. If the contract seems wrong, say so in your report; do not change it.
- M3a gate (read, do not edit): `src/lib/projection/gate.mjs`, `adapter.mjs`. Reuse
  `evaluateReleaseGate`, `digestProjection`, `FixtureProjectionAdapter`; never re-implement them.
- Honest data: synthetic fixtures only, every one labelled synthetic. No real Research Foundry,
  SkillMeat or MeatyWiki ids, paths, names or content. No strings matching the gate's
  private-material scan (`node_`, `tree_`, `ws_`, `req_`, `/Users/`, `/home/`, `/private/`,
  LAN addresses like `10.x` / `192.168.x`, `secrets.env`, `.ssh/`) anywhere in fixture data —
  the gate rejects the whole release if it sees one.
- No UI: do not create or edit `.astro` pages/components or CSS unless the brief names the file.
  Colors, layout and copy on pages are the lead's.
- Report: commit sha + files touched + test output (or "not run"), under 150 words, pointers only.
  Do not silently drop data or fields: if you could not implement something, list it.
