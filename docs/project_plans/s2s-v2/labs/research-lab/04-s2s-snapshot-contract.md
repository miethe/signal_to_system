# 04 — S2S Labs public snapshot contract

S2S consumes **approved, immutable, public-only snapshots**. No browser request reaches a private
service; the site builds if the Lab is offline. Visual decisions (Labs pages, components, film look)
are **not** made here — they belong to the Labs visual authority (the visual pack's
`signal_to_system_labs_index.png` mockup and the Labs storyboard) and to an Opus 5.5 / gpt-6-sol
design owner (M3b). This document fixes only the data contract those pages consume.

## 1. Reports primary, films optional

A **report** is the primary authored output: a versioned interpretation of a frozen evidence
state (question, method, results, limitations, evidence, reproduce). A **film**, figure or
interactive model is an optional *view* computed from the same pinned result and may never carry a
stronger claim than the report (ADR-005, S2S_LABS §1). An investigation with no film is complete.
Film types (PROGRAM_CONTEXT §8): A executable explainer · B reproduction/verification · C
investigation-to-experiment. Each declares its type; a type-A film is never labelled as evidence.

## 2. Snapshot layout (private candidate → public release)

```text
releases/<rel_id>/                       # Lab workspace (private candidate store)
  release.json          # Lab release record: investigation, report revision, snapshot_digest,
                        #   reviews[], gates[], unresolved_references[], approval, deployment_receipt
  public/                                # the ONLY directory that crosses to S2S
    manifest.json       # M3a releaseManifest (schemaVersion '1')
    records/*.json      # M3a projection records (one per public object)
    receipts/*.json     # M3a approval receipts (human:nick release; withdraw by nick/metis)
    report.md           # reviewed Markdown + allowlisted components only (no imported MDX)
    claims.json         # public, version-pinned claim projection (never an editable status)
    evidence.json       # permitted public metadata/excerpts; denied sources absent entirely
    experiments.json    # episodes/attempts summary: protocol version, digests, outcome, limits
    artifacts.json      # public assets: digest, size, media type, rights, url
    figures/ film/ transcript.md captions.srt scene-map.json
    checksums.sha256
```

`release.json` stays private (it carries review ids, unresolved refs and receipts that may name
private systems). `public/` is what the S2S adapter reads.

## 3. Mapping onto the M3a projection gate (as merged, `a285901`)

M3a validates `{publicId, kind, version, digest, lifecycle, sourceRefs, dependencies, destinations,
summary}` records, a manifest, and Nick-only release receipts, and fails closed on any error
([code] P1d §6). The Lab conforms to it rather than bypassing it. Required **additive** gate changes
(a Projection-tree node, not a Lab-side workaround):

| Need | M3a today | Change |
|---|---|---|
| Lab object kinds | `rf-claim`, `skillmeat-artifact`, `wiki-ref` | add `lab-investigation`, `lab-report`, `lab-experiment`, `lab-artifact`, `lab-film` |
| RF composite claim key | `sourceRef` = `rf:<type>:<id>@<version>`; `@version` forbids `:` so `sha256:` cannot appear | encode as `rf:claim:<run_id>.<claim_id>@l<ledger-digest-hex>`; workspace is carried in the private `release.json` only (workspace names are private) |
| Reviews, assets rights, unresolved refs, deployment receipt | absent | keep in private `release.json`; public records carry only the result (e.g. `summary`), and the gate adds a `release-sidecar-digest` check that the private record exists and matches |
| Canonical digest | `JSON.stringify` of the record with `digest` removed (key-order sensitive) | Lab emits records with a fixed key order and the same function; M4 adds a canonical-JSON test on both sides |
| Private-material scan | regex over `node_|tree_|ws_|req_|agentic-nuc|/private/|.ssh/|secrets.env` | Lab additionally scans for LAN addresses, local home paths, workspace names, and any id listed as `denied` |

Every row above is enforced by an executable fail-closed test in M1d, not only documented (RLARC-003); the sidecar check is a digest match between the public manifest and the private `release.json`, and private-only fields (reviews, workspace, unresolved refs) are asserted absent from `public/`.

Record `publicId`s are slugs (`^[a-z][a-z0-9-]{2,79}$`), e.g. `continuity-typed-succession`,
`continuity-typed-succession-report`. Lab ULIDs never appear publicly.

## 4. Release gates (all independent; any failure = nothing publishable)

1. **Structural** — schemas valid; every ref resolves or is listed unresolved; artifact digests match bytes.
2. **Evidential** — every material statement has RF-verified support or an explicit
   inference/hypothesis label; evidence-access level shown; common upstream counted once.
3. **Scientific** — methods, numbers and conclusions match the result records; report-only topics
   use a source-review rubric, never fabricated execution status.
4. **Rights/privacy** — per-field rights (metadata, excerpt, model processing, distribution);
   private-material scan (§3); denied sources absent, not placeholdered.
5. **Editorial** — contribution/novelty labels, limits, dates, scope.
6. **Media/accessibility** — captions/transcript, reduced-motion/static fallback, figures bound to data.
7. **Human approval** — Nick approves `(snapshot_digest, destination)`; any byte change invalidates.
   Then publication needs a deployment receipt and a live URL check (G-publish).

## 5. Scene → claim → result map (`scene-map.json`)

One row per film scene (and per interactive/figure view, same shape):

| Field | Meaning |
|---|---|
| `scene_id`, `start_ms`, `end_ms` | identity and timing |
| `purpose` | explain / show-evidence / show-experiment / transition |
| `narration_digest` | digest of the narration text for the scene |
| `claim_refs[]` | public claim ids (→ `claims.json`), each with evidence-access level |
| `result_refs[]` | `res_` public projections with artifact digests the visual was computed from |
| `computed_from` | artifact digest + generator code digest (visuals of experiments must come from the data) |
| `evidence_status` | established / reproduced / model-output / illustrative / speculative |
| `ambiguity_ids[]` | open ambiguities touching this scene (PROGRAM_CONTEXT §3) |
| `restrictions` | rights/visual restrictions (e.g. a figure that must be redrawn) |

**Rule:** a factual scene whose `claim_refs` or `result_refs` do not resolve is paused or cut, and
an ambiguity task is filed; the film does not invent the missing quantity (handoff agent contract).
The prior films carry evidence-status ledgers but no machine-resolvable scene→claim ids (P1d §8),
so none of them passes this map today; they enter the Lab as *history-only* media.

**Denied evidence in previews (RLARC-005).** A denied source renders as a fixed access-state token (`access: denied`) — no title, locator, count, id or derived summary — in both the private preview and `public/`; a snapshot test pins this.

## 6. Corrections, freshness, withdrawal

A new release supersedes by id; old snapshots stay addressable with a notice. Withdrawal uses an
M3a `withdraw` receipt (Nick, or Metis with reason + follow-up report). A serious film error
withdraws that film version while keeping the explanatory page. Freshness is per claim type
(a theorem does not expire; a policy status does).
