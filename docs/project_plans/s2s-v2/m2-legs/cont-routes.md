# Leg brief — cont-routes (node_01M35CKN8R7RH3AH8XR9MGXQGC, S2S-002)

Read `_common.md` first. Base commit: `53ca251` (or later on this branch). Lane: gpt-5.6-terra, workspace-write.

## Goal
Make the migration manifest executable for redirects, with tests, without authorizing any redirect.
Today every route is `preserve` or `add` and `policy.redirects` says none are authorized; keep it so.

## Files
- `docs/project_plans/s2s-v2/migration-manifest.json` — schema only: document that an entry with
  `"action": "redirect"` carries `"target"` (a canonical path that exists in the build). Do NOT add
  any redirect entry and do NOT change any existing route.
- `docs/project_plans/s2s-v2/migration-manifest.md` — document the redirect contract (one short section).
- New `scripts/redirects.mjs` — pure module: `redirectsFrom(manifest)` returns `[{from, to}]` for
  `action === 'redirect'`; `validateRedirects(redirects, canonicalPaths)` throws on:
  collision (two entries with the same `from`, or a `from` that is also a canonical path),
  chain (a `to` that is itself a `from`), loop (any cycle, including self), dangling (a `to` not in
  `canonicalPaths`).
- Emitter: an Astro integration or a small post-build step wired into `astro.config.mjs` /
  `npm run build` that writes, for each redirect, `dist/<from>/index.html` as a static redirect page
  (`<meta http-equiv="refresh" content="0; url=...">`, `<link rel="canonical" href="<site><to>">`,
  `<meta name="robots" content="noindex">`, and a plain link). With zero redirects it writes nothing.
- `scripts/route-snapshot.mjs` — manifest routes with `action: redirect` are expected in the build
  output like any other route (keep today's behavior for all other actions identical).
- `astro.config.mjs` sitemap `filter` — exclude redirect sources (read from the manifest) in
  addition to the existing `/workflow-showcase` and `/studio/` exclusions. `/portfolio/ui/*` stays
  canonical and in the sitemap; `/workflow-showcase/` stays unlisted.
- New test `tests/m0/redirects.test.mjs` (node:test, no dist needed) with fixtures proving each
  failure class above is detected, a valid set passes, and the real manifest validates (0 redirects).
- New test in the same file or `tests/m0/sitemap.test.mjs` that, when `dist/sitemap-0.xml` exists,
  asserts every sitemap URL is a manifest path whose action is not `redirect`, and contains no
  `/studio/` or `/workflow-showcase` URL (skip with a clear message when dist is absent).

## Pattern to follow
Test style: `tests/m0/series-integrity.test.mjs` (pure functions + fixtures + a real-repo check).
Script style: `scripts/route-snapshot.mjs`.

## Acceptance
- `npm run verify` exits 0; route snapshot unchanged (same 13x routes).
- `node --test tests/m0/redirects.test.mjs` shows the collision, chain, loop, self-loop and
  dangling cases each failing validation.
- `git diff --stat` touches only the files above.
