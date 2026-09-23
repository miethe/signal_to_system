# Leg brief — labs-fixtures (lens node_01M35CKNDGTC84B14SGSW5P0TC; data for rec-method / rec-repro / lens-*)

Read `_common.md` first. Base: the commit the front names. Lane: ICA Terra, workspace-write.
Mechanical: author synthetic release fixtures that exercise every Labs state. No UI.

## Why
The flagship Lab is undecided, so every Labs page is built and reviewed against synthetic
releases. They load only in dev / `S2S_LABS_FIXTURES=1` preview builds, never in production.
They must look like plausible research records in SHAPE, and be unmistakably synthetic in CONTENT:
every title starts with `Synthetic:`; no real people, institutions, journals, datasets, DOIs or
URLs (use `https://example.invalid/...` for every href); contributors are
`{ name: 'Fixture author', role: 'Synthetic author' }` style.

## Files (create)
- `src/data/labs/fixtures/_release.mjs` — helper `buildRelease({ releaseId, bundle, recordSpecs,
  approve = true, withdraw })` returning `{ manifest, receipts, records, bundle, fixture: true }`:
  - one projection record per spec, key order EXACTLY: publicId, kind, version, lifecycle,
    sourceRefs, dependencies, destinations, summary; then
    `digest = digestProjection({ ...record, digest: undefined })` (copy the pattern in
    `src/lib/projection/fixtures/synthetic-approved.mjs`). `sourceRefs` like
    `rf:claim:synthetic-queue.c1@1.0.0` / `rf:report:synthetic-queue@1.0.0` (must match the gate's
    sourceRef regex). `destinations: ['https://example.invalid/labs/<publicId>']`.
  - manifest `{ schemaVersion: '1', releaseId, records: [{publicId, kind, version, digest}] }`.
  - a `release` receipt per record: approver `human:nick`, `approvedAt` given per release.
  - `withdraw`: `{ approvedAt, reason }` adds a `withdraw` receipt (approver `human:nick`) for the
    `lab-investigation` record.
  - records: `lab-investigation` (investigation), `lab-report` (report), one `rf-claim` per claim,
    one `lab-artifact` per artifact EXCEPT artifacts listed in `unapprovedArtifacts`.
- `src/data/labs/fixtures/queue-latency.mjs`, `annotation-guidelines.mjs`, `withdrawn.mjs`,
  `gate-rejected.mjs` — one release each (below). `bundle.synthetic: true`.
- `src/data/labs/fixtures/index.mjs` — `export const releases = [ ...all four ]`.
- `src/data/labs/fixtures/README.md` — 8 lines: synthetic only, loaded only in dev or with
  `S2S_LABS_FIXTURES=1`, what state each fixture exercises.
- `tests/labs/fixtures.test.mjs` — for each release: `evaluateReleaseGate` result matches intent
  (A, B pass; C fails only with `withdrawn:`; D fails); every bundle parses with
  `labBundleSchema` from `src/lib/labs/schema.mjs` (a sibling leg writes it: if that file does not
  exist in your worktree, still write the test and say so). Assert no string in any release
  matches `/(node_|tree_|ws_|req_|\/Users\/|\/home\/|10\.\d|192\.168)/`.

Every bundle must satisfy `src/lib/labs/types.ts` `LabBundle` field for field (all required
fields present, no extra fields), and the method record must list exactly the profile's field keys
from `src/lib/labs/profiles.mjs`, in order.

## A — `synthetic-queue-latency` (release `synthetic-queue-latency-r1`, approvedAt 2026-08-01)
Rich report. Topic: a toy discrete-event simulator of a code-review queue (entirely synthetic).
- investigation: title `Synthetic: Queue Depth and Review Latency`; question "How much does each
  additional queued change slow a review in a simulated review queue?"; dek (<=200 chars);
  whyItMatters (1-2 sentences); domains (8): Systems, Queueing theory, Software engineering,
  Statistics, Operations research, Human factors, Simulation, Developer tooling; methodProfile
  `computational-experiment`; contribution `original-finding-proposed`; version `1.1.0`;
  publishedAt 2026-07-20, updatedAt 2026-08-01, readMinutes 9, license `CC BY 4.0`,
  featuredFigureId `F1`.
- report: version `1.1.0`; summary 2 paragraphs; conclusion bounded true, confidence `moderate`,
  statement "In the simulator, each additional queued change adds about 3.2 minutes of median
  review latency across depths 1 to 40.", uncertainty "95% interval 2.8 to 3.6 min per change
  across 30 seeds; behaviour above depth 40 was not simulated.", scope "Synthetic simulator only,
  depths 1 to 40, single reviewer pool."; largestLimitation "The arrival process is synthetic; no
  real review queue was measured."; limitations (3); review `author-reviewed`; reproduction
  `local-rerun`.
- claims (5), versions `1.0.0`, publicIds `synthetic-queue-latency-c1`..`c5`, checkedAt 2026-07-28:
  C1 run-claim, supported-within-scope, high, uncertainty set; evidence E1 supports, E2 supports,
     E4 qualifies; figureIds [F1]; receipts source-pointer-resolved + author-reviewed.
  C2 run-claim, mixed, moderate; E2 supports, E3 contradicts; figureIds [F2]; receipt author-reviewed.
  C3 source-assertion, contradicted, low; E3 supports, E1 contradicts, E2 contradicts; receipt
     author-reviewed. (A claim the report argues against.)
  C4 inference, unresolved, not-assessed; E4 qualifies; receipts [] (not reviewed).
  C5 speculation, unreviewed, not-assessed; no evidence; receipts [].
  Each claim: statement (<= 180 chars, a quotable sentence), scope, 1-2 domains, 1-2 limitations.
- evidence (5): E1 experiment (30-seed simulation sweep) review author-reviewed, sources [S1],
  artifacts [A3]; E2 analysis (regression of latency on depth) author-reviewed, figures [F1],
  artifacts [A2]; E3 study (a synthetic prior report, `Synthetic Reference Group`, 2024) access
  `excerpt`, review unreviewed, sources [S2]; E4 notebook (sensitivity test) automated-checks-passed,
  artifacts [A2]; E5 source-passage with access `denied` (id/kind/access/review/empty lists ONLY).
- sources (5): S1 dataset (simulator output, version `1.1.0`), S2 journal-article (synthetic,
  access excerpt), S3 software (the simulator, version `0.4.2`), S4 web (access `metadata-only`,
  title + publisher only, no href), S5 access `denied`.
- figures (3):
  F1 number 1, scatter, measured, reviewed true; x "Queue depth" unit "changes", y "Median review
     latency" unit "min"; two series "Batch review off" / "Batch review on", 60 points each,
     generated deterministically in the module (seeded LCG, y ~ 6 + 3.2*x (+/- noise), second
     series ~ 5 + 2.6*x), round to 2 dp; fit {slope 3.2, intercept 6.1, r2 0.87, note "OLS across
     both series"}; uncertainty text; dataArtifactId A3, codeArtifactId A1; claimIds [C1].
  F2 number 2, line, simulated, reviewed FALSE; x "WIP limit" unit "changes", y "Latency" unit
     "min"; series "p50" and "p95" over x = 2,4,...,20; dataArtifactId A4 (UNAPPROVED -> "data not
     released" state); claimIds [C2].
  F3 number 3, chart null, illustrative, reviewed false; a diagram of the simulated pipeline
     (caption + alt only); claimIds [].
- artifacts (5), versions `1.1.0`, digests = `sha256:` + 64 hex chars derived deterministically
  (e.g. sha256 of the artifact title via node:crypto), hrefs `https://example.invalid/...`:
  A1 code `synthetic-queue-sim` (text/x-python, 48213 bytes, Apache-2.0); A2 notebook
  (application/x-ipynb+json); A3 dataset CSV (text/csv); A4 dataset CSV — listed in
  `unapprovedArtifacts`; A5 package (application/zip) = reproduction package.
- method: all 10 computational-experiment fields filled with synthetic but specific values
  (seeds "0-29", environment "Python 3.12, lock digest sha256:..., CPU only", etc.);
  deviations 1; failures 2.
- reproduce: scopes rerun `local-rerun`, reproduce `not-attempted`, replicate `not-applicable`
  (note: "The phenomenon is the simulator's own behaviour; there is nothing independent to
  replicate."); environment 4 chips; prerequisites 2; steps 3 with commands (prefix each command
  with a `# synthetic` comment line); expected output text; unavailable 1; packageArtifactId A5.
- timeline: run 2026-06-02 (v1.0.0 sweep), review 2026-07-01, run 2026-07-10, correction
  2026-07-24 ("Corrected F1 y-axis unit from s to min", version 1.1.0). (No `release` events.)

## B — `synthetic-annotation-guidelines` (release `synthetic-annotation-guidelines-r1`, approvedAt 2026-06-15)
Minimal report, NO bounded conclusion. evidence-review profile (7 fields), domains (3):
Linguistics, Data quality, Human factors. contribution `synthesis`. conclusion bounded FALSE,
confidence `not-assessed`, statement states the present uncertainty ("The reviewed guidelines
disagree on ..."), uncertainty set. review `author-reviewed`, reproduction `not-applicable`.
2 claims (C1 source-assertion unresolved low with 1 receipt; C2 inference mixed moderate, no
receipts), 3 evidence (one `metadata-only`), 3 sources, 1 figure (chart null, illustrative,
reviewed false), 1 artifact (document). reproduce: scopes rerun `not-applicable`, reproduce
`not-attempted`, replicate `not-attempted`; no steps with commands; no package. timeline 2 events.
publishedAt/updatedAt 2026-06-15, version `1.0.0`.

## C — `synthetic-withdrawn-example` (release `synthetic-withdrawn-example-r1`)
A small valid release (copy B's shape, new ids/titles, `Synthetic: Withdrawn Example`), approvedAt
2026-05-01, plus `withdraw: { approvedAt: '2026-05-20T00:00:00.000Z', reason: 'Synthetic fixture:
exercises the withdrawal notice.' }`.

## D — `synthetic-gate-rejected` (release `synthetic-gate-rejected-r1`)
A small valid bundle whose `lab-report` record has lifecycle `candidate` (so the gate refuses the
whole release). Must never render anywhere.

## Acceptance
- `node --test tests/labs/fixtures.test.mjs` passes (if node available).
- Only files under `src/data/labs/fixtures/` and `tests/labs/fixtures.test.mjs` are touched.
