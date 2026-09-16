# Receipt rail — The Deterministic Envelope

Built from the 2026-09-15 triage pass already on disk (`agentic_meta_dev` chat-0915-theses
`receipts.md`/`exploration-brief.md`) plus two additional receipts independently located this leg
(sandbox-probe report, base-layer sha256 pin in the leg dispatcher). Every commit hash/date below
is either carried verbatim from that prior triage or freshly confirmed by this leg via
`git log -1 --format='%H %ad' -- <path>` or direct file read; none invented.

## The rail (2-4 receipts for the essay body)

Recommended set, in the order the outline uses them:

| # | Receipt | Date | Flag | Proves |
|---|---|---|---|---|
| 1 | Token-budget gate reports `used=0` while an autonomous loop actually moved 26.56M input / 135,905 output tokens (195:1) over ~26h | 2026-09-09 (db4b78ae) | method-only, strip $/vendor specifics | A control that exists but doesn't observe the thing it's meant to bound (opening hook) |
| 2 | Base-layer sha256 pinned at dispatch; a stale digest is never silently reused | dispatcher script, confirmed live this leg | public (mechanism); method-only if the literal path is quoted | The simplest instance of a deterministic envelope: one fixed fact wrapped around a probabilistic executor |
| 3 | Sandbox primitive probed and receipted against five explicit contracts (mount, UID, network, resource, cleanup) on the real node, rootless Podman + SELinux `:Z` | 2026-09-15 | method-only; **unmerged** (branch `fix/orch-m3-1-sandbox-probe-0915`, not yet on `main`) | The sustained example's proof layer: an envelope whose guarantees are tested, not assumed |
| 4 | A front-dispatch guard is fully wired and firing (registered in `settings.json`, ledger actively writing) but its enforcement mode defaults to shadow: it records `would_deny` and blocks nothing | 2026-09-04 (per prior revalidation pass) | method-only | "Registered is not enforced," and the "same inputs, two outcomes" beat for section 6 |

If trimmed to 2 for space, keep #1 (the hook) and #3 (the sustained example's spine); #2 folds into
#3's narration and #4 can be a one-sentence callback rather than its own paragraph.

## Longer candidate list (all receipts surfaced, publicability flagged)

### `public` — safe to use as-is
| Receipt (commit, date) | What it shows | Essay-5 relevance |
|---|---|---|
| `check_agents_md_parity.py` (4c1850e8, 2026-09-10) | Pre-commit gate refuses a commit staging one doc without its mirror, written after stale doctrine shipped unnoticed for six weeks | Drift between declared and enforced |
| `check_spine_staleness.py` (cc0fda2e, 2026-09-10) | Repo-wide grep for assertive claims naming a superseded model, exempting only dated point-in-time records | Same drift class, broader sweep |
| `check_global_artifact_drift.py` (9a430766, 2026-09-11) | Classifies every deployed artifact as symlink/tracked-copy/justified-copy, fails on drift, written after a validator agent ran 5 days on a frozen deployed copy | Backup/secondary sustained example if the primary needs trimming |
| `AUTONOMY-RELEASE.md` ladder (0df1f99f, 2026-09-10) | 5-rung autonomy ladder on two binary questions, `agent_may_execute: false` pinned so no agent can self-widen its own rung | Decision authority cannot be self-granted; supports the gradient's zone boundaries |
| `aos-operating-rules.md` (50f21e82, 2026-09-06) | Every operating rule tagged `[enforced]`/`[advisory]`/`[instruct-only]`; an advisory row must never be cited as a gate | The enforced/advisory taxonomy itself, as a governance primitive worth naming |
| `intenttree` `claim_node` atomic lease (10241a35, 2026-09-11) | Row-locked claim with declared TTL, hardened after a measured concurrency bug (two simultaneous claims both returned 200 in 6/6 trials before a fix) | A deterministic primitive built because a probabilistic assumption ("agents won't collide") failed measurably |
| `research-foundry` `governance.py` (576778ab, 2026-08-05) | Deterministic, network-free policy guard returning one of three frozen exit codes; no agent-writable path can mark a blocked class "cleared" | A gate that structurally cannot be talked past, contrast case for the shadow-mode guard |
| `skillmeat` `registration_scan.py` (885b1b07, 2026-08-24) | Scans deployed artifacts against the catalog to surface unregistered/drifted entries | Registry-as-check, not registry-as-listing; ties back to Registry Wave |

### `method-only` — strip internal names/paths/dollar figures before use
| Receipt (commit, date) | What it shows | Essay-5 relevance |
|---|---|---|
| `fable-front-guard.md` (4c1850e8, 2026-09-10) | Hook-based guard, shadow mode, regression-tested against a replayed real incident | Primary "registered ≠ enforced" receipt |
| `PAUSED-AGENT-LOOPS.md` (db4b78ae, 2026-09-09) | 195:1 token-ratio measurement, gate blind to the traffic shape it was meant to bound | Opening hook |
| `artifact-registration.md` self-declared gap (78d0aa78, 2026-09-10) | States its own fleet-wide compliance-scan clause is "target state," not built | Second "lied to us" instance |
| `m3-1-sandbox-probe.md` (this leg, 2026-09-15, unmerged branch) | Five tested contracts for a rootless-Podman sandbox on the real node | Sustained example's proof layer |
| `infra/dispatch/leg` sha256 base-layer pin (confirmed this leg, live on `main`) | Refuses to silently reuse a stale base image | Simplest envelope instance |

### `ibm-derived-withhold`
None surfaced beyond the dollar/vendor figures already flagged inside `PAUSED-AGENT-LOOPS.md`
above (mechanism is public; cost/gateway-meter specifics are not). No standalone IBM-derived
receipt found this pass either.

### `unknown` — flag for human review, do not use
| Receipt (commit, date) | Why unknown |
|---|---|
| `agentic-research/arc_cli/clinical_policy.py` (72ab6f69, 2026-07-19) | Belongs to a separate pediatric-clinical-decision-support workstream with its own reviewer roster; not evaluated for publicability |

## Coverage notes / UNMEASURED
- **SkillMeat deploy manifests/hashes**: not independently re-derived this pass beyond the two
  `skillmeat` receipts already carried from the prior triage (`registration_scan.py`,
  `artifact-registration.md`). A dedicated manifest/hash example (e.g. a specific artifact's
  digest history across versions) was not located in the time available; UNMEASURED, not
  confirmed absent.
- **`meatywiki`**: no governance/gate-shaped receipt surfaced in either this pass or the prior
  triage. UNMEASURED, not confirmed absent (permission-blocked in the prior pass per its own
  `archaeology.md`).
- **The sandbox-probe report is unmerged.** It lives on branch `fix/orch-m3-1-sandbox-probe-0915`
  in a worktree, not on `main`, as of 2026-09-15. Any essay text using it must say so plainly
  ("a dated internal probe, not yet merged to the main branch") rather than implying shipped
  production behavior. Flag for Nick: confirm this has landed (or landed since) before the essay
  publishes, or keep the caveat sentence in the final draft.
- **GAS-ADF-001 offering charter, SAP/Confluent architecture discussion**: named in the GPT master
  doc as Essay 5 primary sources but not independently re-read this leg (out of scope for a
  code-repo sweep; these are separate document artifacts, not repos). UNMEASURED here; the essay
  can still use the generic, already-sanitized architecture pattern from the recommendations
  bundle (`data contract -> deterministic validation -> ... -> repeated resolution becomes rule`)
  without re-verifying the source documents, since that pattern is already stated as intentionally
  generic/sanitized in the source material itself.
