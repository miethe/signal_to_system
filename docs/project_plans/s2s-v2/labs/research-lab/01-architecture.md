# 01 — Architecture and ownership

Evidence tags follow P1: **[code]** read at the pinned, node-deployed revision · **[live]** a GET or
CLI call returned it · **[documented]** a doc says it · **[unmeasured]**. Report pointers `P1a–P1d`
resolve in [06](06-qualification-digest.md).

## 1. Topology

```text
                 Nick (owner: approvals, protocol promotion, release)
                   │  HumanRequests (itt request)            ▲ receipts / previews
                   ▼                                          │
 MeatyWiki ──────► Research Lab coordinator (lab CLI, thin, single writer) ──────► S2S (static, M3a gate)
 (workshop:        │   investigations · episodes · attempts/receipts ·             public immutable
  notes, packages, │   results · review index · releases · sidecar refs            snapshots only
  imported reports)│
                   ├──► Research Foundry (evidence authority: ingest, extract, claims, verify, bundle)
                   ├──► ARC (digest-pinned council runs at 4 stages)
                   ├──► IntentTree (runnable task state, execution contracts, HumanRequests)
                   ├──► Executor (existing `leg` lanes / local sandboxed process) ──► artifact store (sha256)
                   └──► SkillMeat (versioned promoted protocols, evaluator packs, film contract)
```

The coordinator mediates references and the lifecycle concepts nobody else owns. It never becomes
a second ledger for anything in the right-hand column.

## 2. Per-field ownership (qualified)

| Object / field | Authority | Lab stores | Write path | Evidence |
|---|---|---|---|---|
| Source card, edition `sed_<sha256>`, passage `psg_<sha256>`, assertion `ast_<sha256>` | RF | exact versioned ref | RF ingest/extract (CLI or governed API) | [code] P1a §3 |
| Run-local claim `clm_NNN` + evidence relations | RF run | composite key `(workspace, run_id, claim_id, ledger_digest)` | RF claim-map / native review | [code] P1a §3 — `clm_*` is run-local; same id in two runs is expected |
| Verify / evidence bundle | RF | bundle digest + verify receipt | RF `verify`, `bundle` (fails closed on crash) | [code] P1a §6 |
| Imported provider report (e.g. deep-research file) | MeatyWiki raw artifact **and** RF external synthesis (`platform_synthesis`) | both refs + byte digest | MW result upload; RF ERI import | [code] P1a §1, P1b §1 |
| Research package / external task / result artifact `art_<ULID>`, `ert_<ULID>` | MeatyWiki | ref + byte digest at read time | MW Portal API | [code] P1b §3 |
| Investigation, question revision, program membership | **Lab** | — | `lab` CLI | new |
| Episode, hypothesis, endpoint, protocol version, preregistration | **Lab** (versioned files) | — | `lab` CLI; freeze before confirmatory run | new |
| Execution attempt + receipt (inputs/code/env/output digests) | **Lab** registry; executor attests | — | executor → receipt → reconcile | new |
| Raw output bytes, media | Lab artifact store `sha256/` | digest, size, media type, locator, rights | write-once | new |
| Runnable task / assignment / blocking decision | **IntentTree** | node id | `itt node`, `itt request` | [live] P1c §3 |
| Council findings, scorecard, decision record | ARC run | ARC run id + reviewed digest | `POST /api/runs` + execute | [code] P1c §3 |
| Promoted protocol / evaluator pack / film contract | SkillMeat (enterprise) | artifact name@version | skillmeat workflow / context-entity / bundle | [live] P1c §3 |
| Public release manifest + approval receipt | **Lab** release authority → M3a receipt | — | Nick approves digest + destination | [code] P1d §6 |
| Page layout / components | S2S | — | S2S PRs (visual lane rule applies) | [documented] P1d §3 |

**What the Lab must never hold:** an editable claim status, a copy of source text as its own
record, a verdict about a passage's meaning, a mirrored MeatyWiki body, or a second task queue.

## 3. Identity and references

Lab ids are ULIDs with a type prefix: `inv_`, `epi_`, `att_`, `res_`, `rev_`, `rel_`, `imp_`.
Slugs are display names. Every foreign reference is a structured record, never a bare string:

```json
{ "system": "research-foundry", "workspace": "<ws>", "kind": "run-claim",
  "native_id": "clm_001", "parent_id": "rf_run_2026..._slug",
  "revision": "sha256:<resolved-ledger-digest>|null",
  "resolution": "resolved|unresolved|denied|unavailable",
  "resolved_at": "<utc>", "adapter_version": "<semver>" }
```

- `resolution: denied` carries **no** title, count, or locator — the reference proves only that a
  denial happened (handoff regression case: denied source must not leak metadata).
- `unavailable` is distinct from `denied` and from `unresolved`; an unavailable adapter never falls
  back to another route (P1c §6 shows ARC already has the fail-closed driver pattern to copy).
- Unknown values are `null`, never placeholders.

MeatyWiki refs use `kind: artifact|package|external-task`, `native_id: art_…|ert_…|<run ULID>`,
and a byte digest taken at read time, because MeatyWiki envelopes are mutable and result upload is
not idempotent ([code] P1b §3, §6).

## 4. Storage

```text
research-lab/                      # code: package, schemas, adapters, tests (git)
research-lab-workspace/            # private operational state (NOT in any public repo; backed up)
  investigations/<inv_id>/investigation.json
      episodes/<epi_id>/{episode.json, protocol@v<N>.md, preregistration.json}
      references.json              # foreign refs (section 3), append-only revisions
  execution/<att_id>/{attempt.json, receipt.json}   # intent → operation → receipt
  outbox/                          # pending cross-system operations + idempotency keys
  reviews/<rev_id>.json            # index of ARC run ids + reviewed digests (ARC stays authority)
  releases/<rel_id>/               # candidate snapshots (section 04) — the private snapshot store
  artifact-store/sha256/<digest>   # write-once bytes
  rf-workspace/                    # local file-backed RF workspace for M1 (see 02 §2)
  lock                             # single-writer workspace lock (pilot)
```

The workspace files are **authoritative operational state**, not a cache. A SQLite projection for
search is allowed later and is rebuildable from the files.

## 5. Reconciliation

Cross-system writes use `intent → operation → receipt → reconcile`: persist the intent and an
idempotency key in `outbox/`, call the owner, record the native id and content digest, then update
`references.json`. A timeout after a possible remote write reconciles by key/content before any
retry. MeatyWiki result upload has **no** idempotency key today ([code] P1b §6), so the Lab
serializes uploads and dedups by the byte digest it recorded before calling. The UI/CLI shows
`pending-sync` until receipts agree.

## 6. Adapter availability states

Each adapter advertises exactly one of `available | read_only | preview_only | unqualified |
disabled`, recorded with the deployed revision and test date. It never upgrades itself from
documentation. At design time:

| Adapter | State | Why |
|---|---|---|
| RF read (node API GET `/api/runs`, `/api/runs/{id}/claims`) | read_only | [live] GET 200 (P1a) |
| RF write via node `POST /api/runs` | unqualified | scaffolds capture/triage/plan only, no swarm (P1a §1); no write qualified |
| RF local file-backed workspace (CLI via `uv run`) | unqualified → M1 qualifies | shell Python could not import the package in the leg (P1a §7) |
| MeatyWiki Portal API (`/api/admin/health`, `/api/workflows/...`) | unqualified | loopback on node; health route found in code only (P1b §6) |
| ARC (`POST /api/runs`, execute async + poll) | available for review | [live] health 200; first use = this design's review |
| IntentTree | available (task state) | [live] CLI; lease fencing **unqualified** (P1c §6) → single operator until M2 |
| SkillMeat | read_only | [live] `--help`; no deploy receipt |

## 7. Where the coordinator lives — **Nick decision** (HumanRequest filed; id in 05)

| Option | For | Against |
|---|---|---|
| **A. New private `research-lab` repo** (handoff ADR-001) — recommended | clean authority boundary; own schemas/tests/versioning; nothing public by accident; RF stays the evidence authority rather than growing a coordinator | one more repo to register (SkillMeat/aos-artifacts, estate directory) |
| B. Package inside `research-foundry` | RF already runs on the node; one deploy | blurs "RF = evidence authority" (the Lab would be a writer of investigation state inside the evidence system); RF's schemas are strict and the Lab needs its own evolution |
| C. Package inside `agentic_meta_dev` (`operator_core`) | `op` already routes to rf/arc/itt/meatywiki | the launchpad routes work, it is not an owner of research state (constraint 1: execution is external); mixes the operator's run records with research records |
| D. Inside S2S | — | rejected: S2S is presentation only, and this repo is public |

**Recommendation: A.** Non-blocking design: M1 is built in a local, remote-less staging repo at
`~/dev/homelab/development/research-lab` with no imports from any host; option B or C relocates it
with `git subtree add` preserving history. The private workspace is a separate directory in every
option.

## 8. Sensitivity and rights

MeatyWiki code accepts `public|internal|confidential` (the guide also lists `restricted` — a
doc/code mismatch, [code] P1b §5); RF uses `public|personal|work_sensitive|client_sensitive`. The
Lab keeps a local, explicit mapping table keyed by (source system, workspace, label) and **denies
cross-system export on unknown or missing origin**. Rights are separate fields: ingest, model
processing, excerpting, metadata publication, byte distribution. The node serving RF fully open at
`client_sensitive` is a LAN threshold, not public clearance (P1a §7). Only the release gate
(04) decides public eligibility.

## 9. Explicitly not built

No new database, vector store, graph DB, workflow engine, scheduler, dashboard, public API, or
remote MCP. No Lab UI beyond the CLI in M1–M3; the human workspace is MeatyWiki `/research`, the
public face is S2S Labs.
