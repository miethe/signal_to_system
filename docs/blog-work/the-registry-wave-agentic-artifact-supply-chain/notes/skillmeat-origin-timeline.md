# SkillMeat Origin Timeline

Read-only sidecar inspection completed July 1, 2026 against `/Users/miethe/dev/homelab/development/skillmeat`. No files were edited there.

## Public-Safe Chronology

- 2025-10-18, `4a1760730`: earliest visible focus was local skill/artifact management. Initial README described `skillman` as a CLI for installing, versioning, verifying, listing, updating, syncing, and cleaning Claude skills across user/project scopes.
- 2025-11-07, `8529984e9` to `e49307f9f`: SkillMeat MVP reframed the project from skill installer to unified artifact manager with collections, GitHub/local sources, artifact records, deployment tracking, sync, and snapshots.
- 2025-11-17 to 2025-11-20: registry/discovery/deployment expanded through MCP orchestration, server APIs, marketplace browse/install/publish, compliance/audit trail, and artifact version tracking.
- February 2026: memory/context work introduced context as managed packaging: context modules, context entities, context pack preview/generation, and provenance anchors.
- March 2026: governance/provenance became explicit through SkillBOM, attestation, signing, trust levels, provenance UI, and enterprise governance planning.
- June 2026: enterprise/import/deploy work matured into bundle materialization, federated import, artifact repository/storage parity, cross-runtime overlays, enterprise BOM/attestation, audit query, context sync, and Codex projection. Treat scheduled reconciliation work as branch-local/unreleased unless separately verified.

## Public-Safe Essay Line

SkillMeat started as a local skill manager and evolved into a reference implementation for treating agent capabilities as supply-chain artifacts: acquired from sources, curated in collections, materialized into runtimes, and governed with provenance, policy, and evidence.

## Feature Framing

- SkillMeat is best described as a control plane for agentic artifacts, not an agent runtime.
- Public-safe artifact scope: skills, commands, agents, hooks, MCP servers, bundles, workflows, context entities, and plugins.
- Public-safe control surface: source, import, registry, deployment, versioning, provenance, and evidence.
- Import/discovery can be framed as GitHub/local artifact acquisition with pinned source identity.
- Deployment can be framed as materializing curated artifacts into project/runtime surfaces.
- Governance/provenance can be framed as immutable versions, content hashes, audit trail, signed bundles, BOMs, attestations, and trust policy.
- Enterprise should be framed as validation-gated or controlled-pilot direction, not broad production SaaS.

## Keep Abstract

- Exact schemas, migration names, internal endpoint paths, repository interfaces, model names, and route layouts.
- Discovery/ranking heuristics, trust scoring internals, context selection algorithms, token budgeting mechanics, and provider-routing logic.
- Signing/key-management implementation details, secret handling, key storage, and planned HSM/KMS mechanics.
- Security bugs, route gaps, stale remote-node details, internal hostnames/IPs, PAT workflows, and remediation specifics.
- Patent-like mechanics: cross-runtime overlay internals, portable context-pack resolution, write-authority chokepoints, reconciliation invariants, and artifact graph algorithms.
- Avoid claims of anonymous public marketplace downloads, one-click public pack install, or broad multi-tenant production readiness unless current public site/docs support them.
