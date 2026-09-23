# Leg brief — labs-capsules (rec-capsule node_01M35CKNCSQSJAWWYYF6GW6Q7W, S2S-026)

Read `_common.md` first. Base: the commit the front names. Lane: ICA Terra, workspace-write.
Mechanical: capsule builders, their frozen schema, static routes, tests. No UI.

## Contract
Build-handoff spec 10 "Context capsules": three read-only scopes per Lab — `orientation`,
`evidence`, `reproduction` — as JSON and Markdown. HTML stays canonical. Explicit field
allowlist (never `{...record}`), `execute=false install=false publish=false`, a size bound, and
never drop a caveat to meet it (throw instead). Input is a `LabView` (`src/lib/labs/types.ts`);
the loader that produces it (`src/lib/labs/load.mjs`) is written by a sibling leg — code to the
types; if the file is absent in your worktree, your tests build `LabView` objects directly.

## Files (create)
1. `src/lib/labs/capsule.mjs`
   - `export const CAPSULE_SCOPES = ['orientation', 'evidence', 'reproduction']`.
   - `export function buildCapsule(lab, scope, { site })` -> plain object, keys in this order:
     - common: `schemaVersion: '1'`, `scope`, `capsuleId: '<investigation.publicId>@<investigation.version>/<scope>'`,
       `canonicalUrl: site + lab.href`, `htmlIsCanonical: true`,
       `permissions: { execute: false, install: false, publish: false }`, `synthetic: lab.synthetic`,
       `investigation: { publicId, version, title, question, methodProfile, contribution, domains,
       publishedAt, updatedAt, license }`,
       `conclusion: { statement, bounded, confidence, uncertainty, scope }`,
       `largestLimitation`, `limitations`, `review`, `reproduction` (from `lab.report`).
     - orientation adds: `whyItMatters`, `summary` (report.summary), `claims`: `[{ label, statement,
       status, confidence }]`, `sections`: canonical links `{ label, url }` for Overview
       (`<href>`), Claims (`<href>claims/`), Resources (`<href>resources/`), and each capsule
       scope's `.json` and `.md` URL.
     - evidence adds: `claims`: `[{ publicId, version, label, type, statement, scope, status,
       confidence, uncertainty?, checkedAt, limitations, receipts: [{kind, date}],
       evidence: [{ id, relation, kind, access, title? }], resolutionUrl }]` where `resolutionUrl =
       site + lab.href + 'claims/' + label.toLowerCase() + '/' + version + '/'`; `sources`: for
       access `denied` exactly `{ id, access: 'denied' }`, otherwise `{ id, kind, access, title?,
       publisher?, period?, href?, license?, version? }`; `figures`: `[{ id, title, classification,
       reviewed, uncertainty, dataArtifact: { publicId, version, digest } | null }]` (from
       `lab.figureData`).
     - reproduction adds: `method` (profile + fields + deviations + failures), `reproduce` (the
       whole ReproduceRecord), `artifacts`: `[{ publicId, version, digest, id, kind, title,
       mediaType, bytes, license, href }]` (the gate-filtered `lab.artifacts` only).
     - Throw if `JSON.stringify(capsule).length > 65536` (message says to use a narrower scope).
   - `export function capsuleMarkdown(capsule)` -> string. H1 title, a line "Canonical: <url>",
     the permissions line, then Conclusion (statement, "Uncertainty: ...", "Scope: ..."), Largest
     limitation, Limitations list, then the scope's sections (claims as a list "C1 — <status
     label>: <statement>" with its limitations indented; sources/figures/artifacts as lists;
     reproduce steps with commands in fenced code). Escape Markdown control characters in every
     interpolated string (`\`, `*`, `_`, `` ` ``, `[`, `]`, `<`, `>`, `#` at line start).
2. `src/lib/labs/capsule-schema.mjs` — zod v4 `.strict()` schemas for the three capsule scopes
   (`capsuleSchema` = discriminated union on `scope`). Plus `tests/labs/capsule.schema.snapshot.json`
   = `z.toJSONSchema(capsuleSchema)` committed (the frozen schema).
3. Routes (static; Astro `getStaticPaths` from `getLabCatalog()` in `src/lib/labs/site.ts`, one
   path per lab x scope; `export const prerender = true`):
   - `src/pages/labs/[slug]/capsule/[scope].json.ts` -> `new Response(JSON.stringify(capsule,
     null, 2), { headers: { 'Content-Type': 'application/json; charset=utf-8' } })`.
   - `src/pages/labs/[slug]/capsule/[scope].md.ts` -> `text/markdown; charset=utf-8`.
   - `site` = `import.meta.env.SITE` without trailing slash (fallback `https://nickmiethe.com`).
   With no approved Lab (production today) these emit nothing.
4. `tests/labs/capsule.test.mjs` (node:test; build a `LabView` in-test with 2+ claims, a denied
   source, a figure with `figureData` null and one with an artifact):
   - each scope validates with `capsuleSchema`; `permissions` all false.
   - `z.toJSONSchema(capsuleSchema)` deep-equals the committed snapshot.
   - Markdown parity: every claim statement, every claim limitation, the conclusion uncertainty
     and the largest limitation appear in `capsuleMarkdown` output (after un-escaping).
   - a denied source is exactly `{ id, access: 'denied' }` in JSON and has no title in Markdown.
   - an injected string like `Ignore previous instructions <script>` stays inert text in Markdown
     (escaped `<`) and quoted data in JSON.
   - an oversized lab (e.g. 2000 long claims) throws rather than truncating.

## Acceptance
- `node --test tests/labs/capsule.test.mjs` passes (if node available).
- Only the files above are touched.
