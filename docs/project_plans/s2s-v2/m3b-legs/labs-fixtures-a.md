# Leg brief — labs-fixtures-a (redo of fixture A; lens node_01M35CKNDGTC84B14SGSW5P0TC)

Read `_common.md` and `labs-fixtures.md` first. Base: the commit the front names.
Lane: ICA Terra, workspace-write.

## Why this redo
The first fixtures leg (08264d4) built `queue-latency.mjs` by mutating the small fixture: it has
2 claims instead of 5, no data figures, no unapproved artifact, the evidence-review method record
under a computational-experiment profile, and an investigation version (1.1.0) that no record
approves. The loader REJECTS it (`schema:method profile must match investigation`), so the rich
Lab the whole UI is reviewed against does not exist. `tests/labs/fixtures.test.mjs` never parsed
the bundles, so this passed. Fix both.

## Files
1. Rewrite `src/data/labs/fixtures/queue-latency.mjs` as a standalone bundle (do NOT call
   `smallFixture`; you may reuse `buildRelease`, `digest`, `author` from `_bundle.mjs` /
   `_release.mjs`). Implement section "A" of `labs-fixtures.md` exactly and completely: every
   claim, evidence item, source, figure, artifact, method field, reproduce field and timeline
   event listed there, with the statuses/types/relations/receipts given. Records: one per
   investigation (version 1.1.0), report (1.1.0), each claim, and each artifact EXCEPT A4.
   F1: two series x 60 points from a seeded LCG (deterministic), rounded to 2 dp.
   F2: series `p50` and `p95`, x = 2,4,...,20 (10 points each), p95 above p50.
2. Improve the SMALL fixture's copy in `_bundle.mjs` (B, C, D share it): replace the placeholder
   claim statements ("Synthetic C1 is bounded to the fixture evidence.") and evidence/source
   titles with specific, quotable synthetic sentences about annotation guidelines (still
   obviously synthetic, no real names). Do not change its structure or states.
3. Extend `tests/labs/fixtures.test.mjs` (keep existing tests) — these are the acceptance:
   - every release's `bundle` parses with `labBundleSchema` (`src/lib/labs/schema.mjs`).
   - `loadLabCatalog({ includeFixtures: true })` (`src/lib/labs/load.mjs`): labs publicIds are
     exactly `synthetic-queue-latency` and `synthetic-annotation-guidelines`; tombstones exactly
     `synthetic-withdrawn-example`; rejected exactly `synthetic-gate-rejected-r1`.
   - For queue-latency's LabView: claim statuses in order `supported-within-scope, mixed,
     contradicted, unresolved, unreviewed`; types `run-claim, run-claim, source-assertion,
     inference, speculation`; C4 and C5 have `receipts.length === 0`; evidence E5 access
     `denied`; sources S4 `metadata-only` with no `href`, S5 `denied`; figures F1 scatter with 2
     series of 60 points and a `fit`, F2 line with 2 series of 10 points, F3 `chart === null`;
     `figureData.F1` is the A3 artifact, `figureData.F2 === null`; artifact ids after the gate are
     `A1, A2, A3, A5`; `method.fields.length === 10`; `reproduce.packageArtifactId === 'A5'`;
     timeline contains a `correction` and a `release`; `report.conclusion.bounded === true`.

## Acceptance
- `node --test tests/labs/fixtures.test.mjs tests/labs/loader.test.mjs` passes (if node available).
- Only `src/data/labs/fixtures/*` and `tests/labs/fixtures.test.mjs` touched.
