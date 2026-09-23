# 06 — Qualification digest (P1, 2026-09-23)

Four read-only ICA legs qualified the handoff's integration assumptions against the pinned,
node-deployed revisions. Full reports live in the private handoff mirror
(`~/dev/homelab/development/_research-lab-handoff/qualification/`), not in this public repo.

| Report | Node | Pinned revision | Verdict for the Lab |
|---|---|---|---|
| a-research-foundry.md | node_01M35TR9WCMZH6GRTC2BQZWZ3T | RF 436e72c | RF covers source→claim→verify→bundle; `clm_*` run-local (composite key required); verify/bundle fails closed; no `lab.*` fields → sidecar; node HTTP launch scaffolds only; writes unqualified |
| b-meatywiki.md | node_01M35TRA1XVPZYN9BN5ECVM28T | MW a4b9a3d | `/research` external-research workflow exists; frontmatter extras can carry `lab.*`; upload not idempotent; `complete` ≠ reviewed science; no MW→RF client; health is `/api/admin/health` |
| c-arc-itt-skillmeat.md | node_01M35TRA7AD1Y7TZFYZNBEEFXP | ARC 823017b | ARC digest-pins targets, async execute, fail-closed driver; not a held-out evaluator; ITT execution-contract fields render via `op hop`, `meta` does not; lease fencing unqualified; SkillMeat CLI works now |
| d-s2s-labs.md | node_01M35TRACR19CX54ACRMX5YX60 | S2S a285901 | no Labs collections yet; M3a gate merged (fail-closed, 11 tests); schema deltas vs handoff release schema; prior films lack machine scene→claim maps |

Lead live probes (00-live-probe-receipts.md): RF API health 200, 74 runs, none on the film topics;
ARC health 200 (16 runs, reviewers on ICA, adjudication on Codex); MeatyWiki loopback health on the
guessed routes 404 (code says `/api/admin/health`).

## Open questions carried into milestones

| Question | Closed by |
|---|---|
| Node RF config (assertion ledger, canonical claims) equals pinned config? | M2 |
| RF write path idempotency / auth on the node | M2 (M1 uses a local workspace) |
| MeatyWiki Portal auth + frontend `/research` parity | M2 |
| ITT lease fencing sufficient for sole task authority | M2 |
| ARC direct MeatyWiki target acceptance | M2 (M1 stages files under ARC `inputs/`) |
| RF `s2s-public` profile / governed static export | M4 with the Projection tree |
| Merged v0.2.1 archive (mentioned by the additions) | not found in the handoff folder; v0.2.0 + additions used |
| The "metis-topics" film-planning artifact (2026-09-20) | not located among recent artifacts; PROGRAM_CONTEXT covers its substance |
