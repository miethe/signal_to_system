# Technical Architect Variant

## The Short Version

Skills registries are the first package-management layer for agentic capabilities. They solve real discovery, install, publish, update, version, and provenance problems. But they do not solve the full enterprise control-plane problem.

The broader architectural unit is the agentic artifact: any reusable, versionable unit that shapes how an agent reasons, acts, accesses tools, applies context, follows policy, or produces work.

That includes:

- skills, prompts, commands, and hooks
- MCP servers, tool declarations, and API adapters
- context packs, memory bundles, domain packs, and ADR packs
- policies, approvals, eval sets, and permissions
- workflows, agent definitions, sessions, and traces
- provenance records, run manifests, audit events, and outcome links

## Why Registries Are the First Layer

The current market movement is clear:

- GitHub `gh skill` makes skills discoverable, installable, publishable, updateable, and pinnable from GitHub repositories.
- JFrog Skills Repositories and Agent Skills Registry treat skills as governed enterprise artifacts inside Artifactory and AI Catalog flows.
- Red Hat is curating skills, agents, and MCP servers and tying MCP catalog discovery to OpenShift deployment/runtime patterns.
- The official MCP Registry standardizes public MCP server metadata, namespace authentication, REST discovery, and sub-registry compatibility.

That validates package semantics for agentic capabilities.

## Why Registries Are Not Enough

A registry answers:

- where is the artifact?
- how do I install it?
- what version am I using?
- where did it come from?
- can I update it?
- can I publish it?

The enterprise supply-chain layer must also answer:

- who approved it?
- what context does it depend on?
- what permissions does it require?
- which runtime, tool, model, or host is it compatible with?
- which policies apply?
- which evals passed?
- can it be revoked?
- can execution be reconstructed?
- which outputs, PRs, releases, incidents, or business outcomes did it influence?

That is the architectural gap.

## Control Plane Layers

A mature agentic artifact control plane likely needs:

- registry core: identity, versions, metadata, search, install/update
- governance layer: approval, trust, access, revocation, policy
- context layer: reusable, current, domain-specific context as managed infrastructure
- federation layer: adapters across GitHub, JFrog, MCP registries, internal catalogs, IDEs, and agent runtimes
- deployment layer: runtime-specific materialization and compatibility rules
- evidence layer: provenance, traces, run manifests, outputs, and outcome links
- runtime adapters: connection to actual places agents execute

## Enterprise Implication

Enterprises will not want separate governance models for skills, prompts, MCP servers, context packs, policies, evals, workflows, and generated outputs. The likely near-term path is fragmentation by artifact class; the likely durable architecture is federation through a control plane.

SkillMeat is best understood in that frame: a reference implementation for treating agent capabilities as supply-chain artifacts acquired from sources, curated in collections, materialized into runtimes, and governed with provenance, policy, and evidence.

## Architect's Takeaway

Do not stop at a skills registry strategy. Design the artifact lifecycle:

1. Identify artifact classes.
2. Define source and identity semantics.
3. Define versioning and compatibility semantics.
4. Define approval and policy gates.
5. Define runtime materialization.
6. Define revocation and replacement.
7. Define evidence and outcome linkage.

The durable platform layer is not "where do I store skills?" It is "how do I govern the artifacts that shape agent behavior from intent to outcome?"
