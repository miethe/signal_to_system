# Publication gate evidence

Target-Node: node_01M3GFEPAGYG9GPDVX33R17PC8

- Baseline: `npm run test:publication-gate` with a future-dated synthetic post and independent dist oracle, exit 1. The fixture appeared in its HTML and OG route, RSS, essay feed, search, sitemap and indexes. See `tests/m0/publication-eligibility.test.mjs` and `scripts/probe-publication-gate.mjs` for the reproducible probe.
- After: `npm run build` exit 0 (100 pages); `npm run test:m0` exit 0 (31 passed, one skipped because synthetic unlisted probe is absent); `npm run test:publication-gate` exit 0 (10 passed, none skipped); `npm run check` exit 0 (zero errors, 153 hints). Commands used Node v22.20.0 with `NODE_USE_SYSTEM_CA` unset; the default Node 20 is unsupported and system CA lookup failed in this sandbox.
- AC 1: future probe absence is checked across built HTML, OG, feeds, search, sitemap, and all text artifacts; the date boundary is also unit-tested.
- AC 2: private and withdrawn synthetic records validate against the schema during the build and are checked for absence across built output; unit tests check the gate.
- AC 3: an unlisted synthetic page is built with noindex and its URL is checked absent from every other built HTML, XML, JSON and text artifact. Both post and story routes use the same route predicate.
- Node runner: dispatch placement receipt records `supervisor_died` on agentic-nuc and laptop-local worktree, with existing validation evidence `evid_01M7T4FKZ05MJ4J0947DCKHRK6` on node_01M7JFFXQ6PS39G7BM0SNC7WBC. Local fallback used; SSH is host-owned and no ops command was authorized in this leg.
- PR URL: pending synchronous wrapper after leg exit; wrapper owns publication and PR creation.
