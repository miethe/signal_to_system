---
schema_version: 1
doc_type: analysis
title: "S2S v2 Integration Architecture"
status: draft
created: 2026-09-22
feature_slug: s2s-v2-integration-architecture
---

# S2S v2 integration architecture

## Decision in brief

Build Signal to System (S2S) as a static, reviewed public projection of the
Agentic OS—not as a public window into the operational node. The first release
should pull approved, allowlisted records at build time into versioned JSON and
Astro content collections. LABS then renders a site-owned investigation/release
and cites exact RF claim projections; PROJECTS renders the public project
registry and cites exact SkillMeat artifact-version projections. Neither route
depends on RF, SkillMeat, or MeatyWiki being up.

This is a refinement of the handoff's static-public-projection ADR, not a new
canonical store. Research Foundry (RF) remains authoritative for research
identity, claim/evidence semantics, and source rights. SkillMeat remains
authoritative for artifact identity, manifests, versions, and package
eligibility. MeatyWiki remains the private, file-first knowledge vault. S2S
owns editorial composition, canonical public paths, release receipts, and the
small DTOs at the public boundary. See handoff
[`specs/08-data-model-and-public-contracts.md`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/specs/08-data-model-and-public-contracts.md)
and [`adrs/002-static-public-projection.md`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/adrs/002-static-public-projection.md).

The key security fact is non-negotiable: RF's current `rf serve` surface is a
local/loopback viewer API and can be LAN-accessible with token configuration;
it has operational routes, internal identities, audit records, and draft/write
operations. It is not the public data plane. A sensitivity threshold redacts
some content but is not a human rights or publication approval. The public
boundary must therefore be a separate, reviewed projection with its own
allowlist, immutable releases, revocation handling, and static hosting.

## 1. Subsystem inventory and usable surfaces

### Research Foundry

RF's file-first run is the source object for a public Lab, but an RF run is not
itself a public release. A run may contain research brief/routing material,
source cards, extractions, a claim ledger, reports, verification, a governance
bundle, telemetry, and writeback state. The durable object types relevant to
S2S are:

| Publishable candidate | Authoritative schema / model pointer | Existing export or API surface | Public treatment |
| --- | --- | --- | --- |
| Run and bounded report | [`docs/dev/architecture/rf-run-export-schema.md`](../../../../../research-foundry/docs/dev/architecture/rf-run-export-schema.md), `runs/*/run.yaml` | `rf run export --json --run-id …` emits `run.json`; `GET /api/runs`, `GET /api/runs/{id}` in [`api/routers/runs.py`](../../../../../research-foundry/src/research_foundry/api/routers/runs.py) | Select an exact run/release as the evidence input; project only approved title, method, limitation, report passages, and identifiers. |
| Run-local claim | [`schemas/claim_ledger.schema.yaml`](../../../../../research-foundry/schemas/claim_ledger.schema.yaml); export schema §6 | Export `claims[]`; `GET /api/runs/{id}/claims` | Preserve `claim_id`, text, type/status/materiality, scope/qualifiers, and cited source references. Do not reclassify a claim as canonical. |
| Canonical claim, source assertion, inference | [`schemas/canonical_claim.schema.yaml`](../../../../../research-foundry/schemas/canonical_claim.schema.yaml), [`schemas/source_assertion.schema.yaml`](../../../../../research-foundry/schemas/source_assertion.schema.yaml) | Export can carry `persistent_references` when input explicitly contains them; assertions/knowledge routers exist | Project only when the corresponding record and exact version have individually cleared review. Keep types distinct: grouping is not support. |
| Source card, source edition, evidence point/passage | [`schemas/source_card.schema.yaml`](../../../../../research-foundry/schemas/source_card.schema.yaml), [`schemas/source_attribution.schema.yaml`](../../../../../research-foundry/schemas/source_attribution.schema.yaml) | Resolved, denormalized `claims[].sources[]`; `GET /api/runs/{id}/sources/{source_card_id}` | Prefer bibliographic metadata, locator, short permitted context, and outbound source link. Do not redistribute source bytes/quotes merely because metadata is public. |
| Evidence bundle, verification, governance/rights posture | [`schemas/evidence_bundle.schema.yaml`](../../../../../research-foundry/schemas/evidence_bundle.schema.yaml), export schema §§4–5 | Export includes `governance` and `verification`; `rf redact … --target public` exists | A prerequisite for curation, not an approval. Expose specific review/verification receipts and limits, not a generic “verified” badge. |
| Catalog and audit records | [`api/routers/catalog.py`](../../../../../research-foundry/src/research_foundry/api/routers/catalog.py), [`api/routers/audit.py`](../../../../../research-foundry/src/research_foundry/api/routers/audit.py) | `GET /api/catalog/{stats,search,items/{id}}`; `GET /api/audit` (owner/admin) | Catalog can help a private exporter select records. Audit is not a public source: it contains actor/workspace/policy/failure detail. |

The concrete export is strong input for a projection: it is deterministic,
denormalized, versioned, redacts quote and summary text above a sensitivity
threshold before serialization, and preserves dangling evidence references
honestly. The complete contract and its `status_derived` rules are in
[`rf-run-export-schema.md`](../../../../../research-foundry/docs/dev/architecture/rf-run-export-schema.md)
and implementation is [`services/export_service.py`](../../../../../research-foundry/src/research_foundry/services/export_service.py).
Its sensitivity ordering (`public < personal < work_sensitive < client_sensitive`)
is implemented in [`services/sensitivity.py`](../../../../../research-foundry/src/research_foundry/services/sensitivity.py).
It is only one gate: rights summaries are deliberately non-authoritative; RF
documents point to separate rights/permission records for authority.

RF's current HTTP API is useful private integration evidence, not a proposed
public contract. `runs`, `reports`, `catalog`, and `audit` are mounted under
`/api`; `reports` includes draft CRUD and publish-preview, catalog includes
import mutations, and audit is owner/admin-only. The factory calls itself a
“Loopback read API” in
[`src/research_foundry/api/app.py`](../../../../../research-foundry/src/research_foundry/api/app.py).
The operational documentation confirms static export is the default and live
loopback API is opt-in: [`README.md`](../../../../../research-foundry/README.md)
“Serving Runs Live.”

### SkillMeat

SkillMeat owns reusable agent capability/artifact state, not the S2S project
copy. Its canonical data model includes an artifact identity, type, source and
collection metadata, files/content, snapshots/versions, dependency or
SkillBOM/attestation data, deployments, upstream bindings, and lifecycle or
eligibility state. The best implementation pointers are
[`skillmeat/models.py`](../../../../../skillmeat/skillmeat/models.py),
[`api/schemas/artifacts.py`](../../../../../skillmeat/skillmeat/api/schemas/artifacts.py),
[`api/schemas/version.py`](../../../../../skillmeat/skillmeat/api/schemas/version.py),
and [`docs/dev/architecture/artifact-architecture-source-of-truth.md`](../../../../../skillmeat/docs/dev/architecture/artifact-architecture-source-of-truth.md).

| Publishable candidate | Existing surface / schema pointer | Public treatment |
| --- | --- | --- |
| Artifact summary and exact artifact version | `GET /api/v1/artifacts`, `GET /api/v1/artifacts/{artifact_id}`, history/version/content/file/download routes in [`api/openapi.json`](../../../../../skillmeat/skillmeat/api/openapi.json) | Export a narrow card: stable upstream identifier, artifact type/name, exact version/digest, short approved summary, license, capability/permission declaration, compatibility, lifecycle, and verified destinations. |
| Released bundle/assembly and member list | Bundle endpoints including export, version, materialize and publish; assembly export endpoints in the same OpenAPI contract | Treat a released bundle as an artifact version with its own digest. Do not imply that its members are independently approved public artifacts. |
| SkillBOM / attestations / signature and outcome metadata | [`docs/dev/api/bom-api.md`](../../../../../skillmeat/docs/dev/api/bom-api.md), `bom/{snapshot,verify}`, governance signing, analytics routes | Useful supporting provenance. A signature establishes integrity/publisher association in its scheme, not safety, correctness, or actual runtime use. |
| Marketplace listing/catalog item | `GET /api/v1/marketplace/catalog/search`, item, recipe, download; schemas in [`api/schemas/marketplace.py`](../../../../../skillmeat/skillmeat/api/schemas/marketplace.py) | A discovery source only. Public catalog visibility, package download, and an S2S “recommended” label are distinct approvals. |
| Project relationship / deployment evidence | artifact associations, deployments, metrics, and outcome routes | Publish only an approved, bounded relationship such as `uses_artifact` or `produced_artifact`; never infer use from catalog membership or an outbound-click event. |

SkillMeat has a broad authenticated operational API (OpenAPI 3.1, current
checked-in version 0.83.0), CLI export/bundle/marketplace facilities, and rich
enterprise semantics. It does not have a qualified, narrow S2S public export
contract. The handoff was right to require an adapter rather than invent an
installer or expose this API verbatim; see
[`specs/09-native-integrations-and-deployment.md`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/specs/09-native-integrations-and-deployment.md).

### MeatyWiki

MeatyWiki is an Obsidian-compatible, file-first vault. Its primary public-like
objects are actually private knowledge artifacts: raw input, compiled wiki
notes (concept/entity/topic/summary/synthesis/evidence/glossary), blog
artifacts, project context packs/specs/sessions/decisions/intents, and graph
edges. The vault layout is explicit in
[`src/meatywiki/vault/layout.py`](../../../../../meatywiki/src/meatywiki/vault/layout.py).
Its validated frontmatter envelope carries artifact ID, title, type, workspace,
lifecycle, provenance, taxonomy, relationships, and additive correlation
fields; see [`schema/frontmatter.py`](../../../../../meatywiki/src/meatywiki/schema/frontmatter.py)
and [`schema/lifecycle.py`](../../../../../meatywiki/src/meatywiki/schema/lifecycle.py).

The thin service has read-mostly endpoints for health, search, artifact detail,
and graph traversal in
[`src/meatywiki/service/routes.py`](../../../../../meatywiki/src/meatywiki/service/routes.py),
and describes mutation as CLI-only in
[`src/meatywiki/service/app.py`](../../../../../meatywiki/src/meatywiki/service/app.py).
The larger Portal can track Blog workspace publication state, but that is a
private authoring workflow, not a public-site export. There is no existing
general-purpose public projection/publish API to adopt. A note may be source
material for a Notebook leaf or method/glossary page only after deliberate
editorial selection and independent rights/privacy review.

### Current S2S surface

S2S currently has Astro collections for posts, projects, series, stories, and
UI in [`src/content.config.ts`](../../../../src/content.config.ts). Projects have
only basic title/type/visibility and simple destination fields; stories already
hold optional project and AOS slugs plus workflow run/intent IDs. The requested
LABS records and public projection DTOs are therefore new site work, not an
existing hidden integration. A source search found prose references to RF and
SkillMeat, but no RF/claim/evidence/SkillMeat data adapter in `src/`.

## 2. Integration patterns considered

| Pattern | Trust/privacy boundary | Freshness and failure behavior | Hosting/cost | Verdict |
| --- | --- | --- | --- | --- |
| **A. Build-time pull into versioned JSON/content collections** | A private exporter reads upstream data, applies an explicit field/record allowlist, validates DTOs, then writes a reviewed release snapshot. The public site sees no node credential, private ID, source path, or upstream API. | Fresh at the last successful approved build. Upstream outage leaves the last eligible snapshot online; revocation is an exception that must purge/rebuild before cache fallback. | Works with the existing static host/CDN; near-zero idle cost and no request coupling. | **Recommend now.** It matches the static-first site and ADR 002. |
| **B. Public read-only projection service behind reverse proxy** | Safe only if it serves an isolated, pre-projected store using a separate service identity. A reverse proxy in front of RF/SkillMeat does not turn their full APIs into a public boundary. | Near-live lifecycle/search data, but introduces availability, DDoS/rate-limit, auth, cache invalidation, observability, backup, and incident duties. Fail closed for withdrawn/unknown eligibility. | A continuously operated public service plus database/object store; higher cost and operational ownership. | **Later, if justified** by needs static files cannot meet (e.g., rapid revocation resolution or bounded public search). |
| **C. Client-side live embeds/iframes** | Browser obtains direct access to upstream service or its proxy; tokens, CORS, referrer data, API shape, and outage behavior become public concerns. An iframe also displaces S2S's accessible evidence reading. | Current when available, but blank/error-prone offline; difficult to retain a coherent historical citation. | Cheap to prototype, expensive in privacy/reliability debt; third-party JS and service availability on every reader path. | **Reject for core LABS/PROJECTS.** Native static cards can link to an optional deeper view later. |
| **D. MCP or agent-native endpoints** | MCP is a protocol surface, not a publication gate. Remote MCP must receive the same restricted projection store and scoped credentials; it must not proxy filesystem, RF operations, installations, or private search. | Can be live after the projection service exists; must return lifecycle/receipt state and bounded results. | Adds tool hosting, abuse controls, telemetry, versioning, and evaluation costs. | **Phase last.** Static JSON/Markdown endpoints first; optional read-only MCP only after public isolation is proven. |

Recommended phases:

1. **Static release (now):** RF and SkillMeat private export adapters generate approved S2S
   DTOs and a manifest; Astro renders LABS/PROJECTS plus `/data/v1/*` JSON and Markdown.
2. **Curated search/rapid lifecycle (later):** if release cadence becomes inadequate, publish
   the same immutable projections to an isolated store and add a small read-only resolver/catalog
   service. Do not point it at the agentic node's live files or operational APIs.
3. **Agent access (last):** add a remote read-only MCP adapter only against that public store,
   with fetch/search caps, lifecycle checks, no tools that execute/install/publish, and a test
   suite for prompt-injected source passages and withdrawn IDs.

This sequence directly implements the handoff topology
“private authoring/research → approved export/release → isolated public
snapshots/catalog → Astro build + CDN → optional read-only status/API”
([`specs/09`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/specs/09-native-integrations-and-deployment.md)).

## 3. Public projection contract

### Release gate and receipts

The projection pipeline must be a protected, deterministic release job:

```text
RF / SkillMeat / MeatyWiki (private authorities)
          │ selected exact source refs
          ▼
private adapter → allowlisted DTOs → validation + rights/privacy/editorial review
                                          │ human approval + byte digests
                                          ▼
                         immutable S2S public snapshot + approval receipt
                                          │
                                          ├── Astro pages and content collections
                                          └── /data/v1 JSON + Markdown + indexes
```

A model may propose selection, summarize, map fields, or flag a possible
sensitivity/rights issue. It cannot change `publicationState` to approved,
create the approval receipt, or approve its own output. A named human approver
must approve the exact candidate bytes. The receipt binds `publicId`, entity
type, exact version, SHA-256 digest, approval time/authority, schema version,
and source refs. It also records clearance/review scope without exporting a
private rights file. This follows the handoff's approval-receipt model in
[`schemas/approval-receipt.schema.json`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/schemas/approval-receipt.schema.json)
and the reference adapter in
[`contracts/adapters.ts`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/contracts/adapters.ts).

Validation has two layers. JSON Schema/Zod validates shape; a semantic release
gate validates exact referenced versions, public eligibility of every endpoint,
rights/reuse policy, URL safety, no private paths/IDs, cross-record references,
and denied fixture records. Renderers receive only the approved DTO—not the
unfiltered RF export. A build must fail closed on missing approval or unknown
eligibility. The relevant boundary schemas are
[`claim-card.schema.json`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/schemas/claim-card.schema.json),
[`artifact-card.schema.json`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/schemas/artifact-card.schema.json),
[`publication-record.schema.json`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/schemas/publication-record.schema.json),
and [`relationship.schema.json`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/schemas/relationship.schema.json).

### Identity, claims, corrections, and withdrawal

Every public reference uses `{ authority, type, id, version }`; titles and
statement similarity never join records. Version is exact—never `latest`,
`main`, or `HEAD`. S2S gets an independent stable public ID and canonical path,
but preserves the upstream RF or SkillMeat typed reference. Example relationship
IDs can be site-owned, while endpoints retain the authority that owns their
meaning.

For a LAB claim, the public card records: S2S claim-card ID/version; the exact
RF run ID and exported run schema/release; RF `claim_id`; `persistent_references`
when genuinely present; statement, claim type/status, scope/qualifiers,
evidence cutoff, permitted sources, review/reproduction state, and current
publication lifecycle. A source pointer resolving is a source receipt, not
proof that the claim is supported. Claims must visibly retain `mixed`,
`contradicted`, `inference`, `speculation`, and unresolved states where
applicable; RF's claim statuses are specified in its
[`README.md`](../../../../../research-foundry/README.md) “Claim-status model.”

Corrections create a new public version and a typed `corrects` or `supersedes`
edge; the original remains addressable with a notice and its original cited
version. A rights/privacy or safety withdrawal removes statement/source bytes,
search documents, generated Markdown/JSON, assets, and caches; it returns only
a permitted minimal tombstone. Reverse-dependency indexes identify all S2S
pages, cards, captions, feeds, and data files needing re-render. This is the
explicit difference in [`adrs/006-corrections-versus-withdrawal.md`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/adrs/006-corrections-versus-withdrawal.md),
not a stale-banner policy.

### Citation examples

A Lab page should contain readable prose first, then a `ClaimRef` linking to a
site resolution URL such as `/labs/<investigation>/claims/<public-id>/<version>/`.
The resolved card cites `rf:run:<run-id>@<export-release>` and
`rf:run-claim:<claim-id>@<ledger-version>`, shows qualified evidence links,
and exposes methods/limitations. That conforms to the LABS requirement that
run-local claims, source assertions, inferences, and canonical groupings remain
distinct ([`specs/04-labs-experience.md`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/specs/04-labs-experience.md)).

To cite a SkillMeat artifact, a Lab or Project relation is `uses_artifact` or
`produced_artifact` with an endpoint like
`skillmeat:artifact:<artifact-id>@<exact-version-or-digest>`. The visible card
states whether it was **used in the bounded run**, **produced**, or merely
**recommended**, and gives only verified docs/source/download destinations.
“Used” additionally requires a captured runtime receipt; catalog presence,
signature, or click-through never establishes it. This supports the handoff's
agent-native project-card requirement in
[`specs/06-projects-and-portfolio.md`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/specs/06-projects-and-portfolio.md).

## 4. Deployment topology and owner choices

The checked-in site deployment is GitHub Pages: [`.github/workflows/deploy.yml`](../../../../.github/workflows/deploy.yml)
builds `dist/` on pushes to `main` and deploys with `actions/deploy-pages`.
The workflow and [`astro.config.mjs`](../../../../astro.config.mjs) currently set
the Astro site URL to `https://nickmiethe.com`. Repository guidance separately
mentions `https://signaltosystem.com`; reconcile that inconsistency before
canonical URLs, sitemaps, or public data URLs are released.

The Phase-1 projection store can be versioned JSON/MDX in this repository (or
an immutable release-asset manifest fetched by CI and committed only after the
same approval gate). The public site deploys the generated snapshot with the
rest of `dist/`. Large approved media/downloads can live in a controlled object
store/CDN, referenced only by digest-bearing manifest entries. The private
exporter and approval artifacts stay off the public host.

Do not select a domain here. Nick must choose among: keeping all resolver and
data paths on the primary site domain; a dedicated public data/assets subdomain;
or a separate future API domain. For a later service, he must separately choose
managed-cloud versus self-hosted infrastructure, the owning account, DNS/TLS,
CDN/cache purge provider, and the public service's operational owner. None of
these choices authorize exposing the LAN agentic node.

## 5. Work items and sizing

| Owner | Work item | Size | Notes |
| --- | --- | --- | --- |
| RF | Define a reviewed `s2s-public` export profile that consumes `run.json` but produces only selected run/claim/source/review fields plus source revision receipt. | M | Reuse export redaction; add rights/publication approval input. Do not change `rf serve` into the public API. |
| RF | Add deterministic fixtures and contract tests for redaction, dangling references, mixed/contradicted claims, exact-version mapping, and withdrawn-source denial. | S | Required before first Lab release. |
| SkillMeat | Define a stable public artifact-version projection (including version/digest, license, capability/permission, compatibility, destinations, lifecycle/revocation). | M | Adapter must qualify actual version/source/signature semantics against current OpenAPI and storage truth. |
| SkillMeat | Produce a receiptable export/fixture path for approved artifact cards and runtime-use evidence. | M | Marketplace/API output alone is insufficient; no installer command belongs in S2S. |
| MeatyWiki | Define an explicit editorial export candidate/approval marker for selected note/folio material, if Notebook publishing is desired. | S | Keep vault and portal private; no general public mirror. |
| S2S | Add public projection schemas, release manifest/approval/tombstone validation, adapters, generated `/data/v1` endpoints, and release/purge checks. | L | Integration owner owns shared IDs, relation schemas, nav/path files, and lifecycle matrix. |
| S2S | Add LABS collection/routes/components (`ClaimRef`, card, evidence/method/reproduce views) and enrich the projects registry/mapping from existing portfolio data. | L | LAB prose must work without JS; claims and limits remain in server-rendered HTML. |
| S2S | Add site-only project mapping, canonical-ID migration, old-path aliases, link checks, and static search indexes. | M | Follow the handoff migration sequence; do not merge by display title. |

## 6. MediaWiki versus MeatyWiki

MediaWiki is not warranted for Phase 1. The handoff only proposes it when a
maintained collaborative public reference has a real need. Current needs are
an editorial site, bounded Lab evidence, project catalog, glossary/method
pages, and selected notebook material. Astro MDX plus reviewed public DTOs
serves these without another public identity, permissions, revision-history,
licensing, moderation, and operations system.

MeatyWiki is more relevant as private knowledge infrastructure: its vault and
compiled artifacts help develop and link material, but its lifecycle
`raw → classified → compiled → reviewed → published` is not equivalent to a
public release approval. Do not make MeatyWiki the public data authority, and
do not mirror its vault to the web. Revisit MediaWiki only if external,
multi-author collaboration and public revision history are substantive product
requirements; then cite a MediaWiki page by page ID and exact revision, with
attribution/license and a sanitized excerpt, while RF/S2S retains immutable
evidence identity. This matches
[`specs/09-native-integrations-and-deployment.md`](../../../../../../../WIP/project-ideation/signal-to-system/S2S-v2/signal-to-system-build-handoff-v2/specs/09-native-integrations-and-deployment.md).

## 7. Open decisions for Nick

| Decision | Recommended default |
| --- | --- |
| Which person(s) can approve a public projection and withdrawal? | Nick is the sole named human approver initially; require a separate named reviewer for high-consequence Labs when practical. Models never self-approve. |
| Which RF classes are eligible for the first LABS release? | Only a small curated set of `public`-sensitivity runs with explicit source reuse review, passed verification, visible limitations, and complete release receipts. |
| Where do immutable public projection snapshots live? | Keep compact versioned JSON/MDX in S2S for Phase 1; use a digest-addressed asset store only for large approved media/downloads. |
| What freshness promise is shown to readers? | Display snapshot generation time and source/release version; publish on reviewed release cadence, not “live.” Revocations bypass normal cadence. |
| What public domain layout is wanted? | Decide primary-site paths versus a data/assets subdomain before generating canonical data URLs; do not expose the LAN node under any option. |
| When is a public resolver/API or MCP justified? | Only after static releases, withdrawal drills, isolated store, rate limits, observability, and agent-evaluation fixtures work; default to no runtime public service. |

## Pointers and implementation confidence

This design is grounded in current checked-in contracts rather than live calls:
the handoff LABS/PROJECTS/data/deployment/agent-native/security specs;
RF's export schema, routers, and sensitivity code; SkillMeat's checked-in
OpenAPI and artifact architecture; MeatyWiki's vault/frontmatter/lifecycle
and thin service; and S2S's current collections/deployment workflow.

Confidence checks: no existing S2S data adapter duplicates this proposal;
the architecture preserves the existing Astro/GitHub Pages static model; the
relevant RF, SkillMeat, and MeatyWiki local contracts were inspected; and the
privacy root cause is identified—the operational node has richer internal
surfaces than a public reader should ever receive. Confidence is high for the
static-first boundary. Public-service and domain choices remain intentionally
unmade owner decisions.
