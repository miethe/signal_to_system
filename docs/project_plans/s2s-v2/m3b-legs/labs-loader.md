# Leg brief — labs-loader (rec-coll node_01M35CKNAJH5MKJKPKFFAE68H8, S2S-019; + rec node_01M35CKNA0WWQ15YPM4AQDFC4H AC)

Read `_common.md` first. Base: the commit the front names (contains `src/lib/labs/types.ts`).
Lane: ICA Terra, workspace-write. Mechanical: schema + loader + tests. No UI.

## Goal
A Lab builds ONLY from its release snapshot after the M3a gate approves it. Implement the strict
schema for `LabBundle` and the loader that returns a `LabCatalog` (all shapes in
`src/lib/labs/types.ts` — mirror it exactly, field for field).

## Files (create)
1. `src/lib/labs/schema.mjs` — zod (v4, `import { z } from 'zod'`) schemas, every object `.strict()`
   (unknown fields rejected), mirroring `types.ts`:
   - `labBundleSchema` (+ nested). Enums exactly as the TS unions.
   - `exactVersion`: same regex as `gate.mjs` (refuses `latest`/`main`/`HEAD`, case-insensitive).
     Use it for every `version` field.
   - `publicId` fields: `^[a-z][a-z0-9-]{2,79}$`. `digest`: `^sha256:[a-f0-9]{64}$`.
   - Dates `IsoDate`: `^\d{4}-\d{2}-\d{2}$`.
   - `Source.href`, `Artifact.href`: https URL or site-relative path starting with a single `/`.
   - Cross-field refinements (superRefine on the bundle), each with a clear message:
     a. `method.profile === investigation.methodProfile`, and `method.fields` keys equal the
        profile's field keys from `METHOD_PROFILES` (`src/lib/labs/profiles.mjs`) in order.
     b. Every id referenced resolves inside the bundle: claim.evidence[].evidenceId -> evidence.id;
        claim.figureIds -> figures.id; evidence.sourceIds/figureIds/artifactIds; figure.claimIds ->
        claims.label; figure.dataArtifactId/codeArtifactId -> artifacts.id;
        reproduce.packageArtifactId -> artifacts.id; investigation.featuredFigureId -> figures.id.
        (Artifact references may resolve to an artifact the gate later removes; that is fine.)
     c. Ids unique within each list (claims by label and by publicId, evidence, sources, figures,
        artifacts by id and by publicId).
     d. `access: 'denied'` items (evidence and sources) carry NO title/origin/period/summary/href/
        publisher/license/version (reject if present).
     e. A figure with `chart !== null` must have `dataArtifactId`.
     f. `timeline` entries may not use kind `release` (release events come from receipts, below).
     g. `report.conclusion.uncertainty` non-empty (min 1).
2. `src/lib/labs/load.mjs` — export `async function loadLabCatalog({ includeFixtures, sources })`:
   - Sources: an array of `{ manifest, receipts, records, bundle, fixture: boolean }`. When `sources`
     is not passed, read the real store + (if `includeFixtures`) the fixtures:
     - Real store: each directory `src/data/labs/releases/<releaseId>/` holding `manifest.json`,
       `receipts.json`, `records.json`, `lab.json` (resolve the path from `import.meta.url`; a
       missing or empty directory yields no sources).
     - Fixtures: `await import('../../data/labs/fixtures/index.mjs')` -> its `releases` array (same
       shape, `fixture: true`). Import ONLY when `includeFixtures` is true (dynamic import).
   - Per source: `evaluateReleaseGate(manifest, receipts, records)`.
     - If it fails and every error starts with `withdrawn:` -> a `LabTombstone`
       (`publicId` = the manifest's `lab-investigation` entry publicId, its version,
       `withdrawnAt` = the withdraw receipt's `approvedAt`, `reason` = receipt.reason if any,
       `synthetic` = source.fixture, `href` = `/labs/<publicId>/`).
     - Any other failure -> `rejected.push({ releaseId, errors })`.
     - Passed -> parse `bundle` with `labBundleSchema` (failure -> rejected with `schema:<message>`).
       Then bind to records (fail closed -> rejected with a named error):
       `bundle.releaseId === manifest.releaseId`; `bundle.synthetic === source.fixture`
       (error `synthetic-mismatch`); investigation -> approved `lab-investigation` record with same
       publicId+version; report -> `lab-report`; every claim -> `rf-claim` with same publicId+version.
       Artifacts: keep only those with an approved `lab-artifact` record matching publicId AND
       version (`Artifact.digest` is the file-bytes digest, not the record digest; do not compare them); drop the rest silently from `artifacts` (this is the designed "data not
       released" state, not an error).
   - Build `LabView`: bundle + filtered `artifacts`; `figureData[figure.id]` = the kept data
     artifact or `null`; `counts` from the (filtered) lists; `href` = `/labs/<investigation.publicId>/`;
     append to `timeline` one `{ kind: 'release', date: <lab-report release receipt approvedAt,
     YYYY-MM-DD>, label: 'Released', version: report.version }` and sort timeline by date ascending.
   - Sort `labs` by `investigation.updatedAt` descending. Return
     `{ labs, tombstones, rejected, fixtures: Boolean(includeFixtures) }`.
3. `src/data/labs/releases/README.md` — 10 lines: what goes here (one directory per approved
   public release, the four files above, produced by the Lab release pipeline, never hand-edited,
   never synthetic). Plus `.gitkeep`.
4. Tests `tests/labs/loader.test.mjs` (node:test; build tiny in-test fixtures with
   `digestProjection`; do NOT import `src/data/labs/fixtures/` — a sibling leg writes those):
   - valid source -> one lab; counts right; release timeline event appended and sorted.
   - bundle with an unknown field -> rejected (`schema:`); `version: 'latest'` / `'HEAD'` -> rejected.
   - claim without an approved `rf-claim` record -> rejected; investigation/report likewise.
   - artifact without its record, or with a version mismatch -> removed; its figure's
     `figureData` is null; lab still renders.
   - denied evidence carrying a title -> rejected.
   - withdraw receipt -> tombstone, not a lab, not rejected.
   - unapproved release (no release receipt) -> rejected, absent from labs.
   - `synthetic: true` bundle from a non-fixture source -> rejected `synthetic-mismatch`.
   - `loadLabCatalog({ includeFixtures: false })` with no `sources` -> labs `[]` (the real store is
     empty today) and never imports the fixtures module.
5. `scripts/check-labs-production.mjs` — run after build: fail (exit 1) if any file under `dist/`
   contains the string `data-lab-fixture` or `"synthetic":true`, or if `dist/labs/` has any
   subdirectory while `src/data/labs/releases/` has no release directory. Print a one-line pass.
6. `package.json` — add `"test:labs": "node --test tests/labs/*.test.mjs"`, `"check:labs":
   "node scripts/check-labs-production.mjs"`; insert `npm run test:labs && npm run check:labs`
   into `verify` right after `npm run test:m0`. Change nothing else in package.json.

## Acceptance
- `node --test tests/labs/loader.test.mjs` passes (if node available).
- `git diff --stat` touches only the files above.
- Report any `types.ts` field you could not express in the schema.
