# M0 public-boundary contract freeze

**Status:** frozen for M0. These are contracts for subsequent implementation, not a public API shipped by this milestone.

## Ownership

| Boundary | Owner | Rule |
| --- | --- | --- |
| Editorial MDX, route manifest, static rendering | Signal to System | The site owns canonical public URLs and emits only reviewed static files. |
| Research claims/runs/sources | Research Foundry | RF remains authoritative; S2S may consume a reviewed, versioned export only. |
| Artifact/version metadata | SkillMeat | SkillMeat remains authoritative; S2S may consume an allowlisted projection only. |
| Notes/folio candidates | MeatyWiki | MeatyWiki remains private; an explicit editorial approval is required before projection. |
| Approval and withdrawal decisions | Nick | Human-only. No model creates or approves a release receipt. |

## DTO freeze

Future public projections use narrow, closed DTOs: `publication-record`, `claim-card`, `notebook-leaf`, `artifact-card`, `relationship`, `contribution-submission`, `film-card`, `approval-receipt`, and `tombstone`. Unknown fields are rejected at the boundary. A tombstone is a separate shape and must not retain withdrawn statement or source text.

A public renderer receives only an approved snapshot. The build-time sequence is private adapter → allowlisted DTO → schema/semantic validation → exact-byte human approval receipt → immutable repository snapshot → static route or `/data/v1` output. Missing, invalid, stale, fixture, or withdrawn material fails closed; browsers never call LAN services or carry private credentials.

## Compatibility and change control

Stable identifiers and the M0 migration manifest are the URL compatibility authority. Changes require a versioned DTO review, fixture and contract tests, and explicit migration entries; redirects require collision, chain, and loop tests. The five site-adapter obligations are `catalog`, `getRecord`, `getLifecycle`, `getDependencies`, and `getReleaseManifest`; they are site obligations, not claims about upstream API names.
