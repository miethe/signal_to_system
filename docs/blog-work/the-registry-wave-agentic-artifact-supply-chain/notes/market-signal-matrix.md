# Market Signal Matrix

Verified July 1, 2026.

| Surface | Artifact scope | Versioning | Governance | Provenance | Deployment | Context handling | Outcome evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GitHub `gh skill` | `SKILL.md` folders in GitHub repos/local dirs | Tags, default branch, pin by tag/SHA, update via tree SHA | CLI validation on publish, no curation claim | GitHub repo metadata in frontmatter | Installs into agent host dirs | Host loads selected skill instructions/resources | CLI behavior, not outcome proof |
| JFrog Skills | Skill packages in Artifactory | Package versions and latest resolution | Access control, signing, Xray/AI Catalog scan gates where configured | Fingerprints, signing, artifact metadata | Installs to supported harnesses/paths | Metadata parsed from `SKILL.md` | Scan/publish/install results |
| Red Hat skills | Curated skill packs/task skills | Public pages/source repos | Red Hat curation/subscription framing | Catalog/source URLs | Bootstrap/install instructions | Task-specific skill material | Catalog descriptions |
| OpenShift AI MCP Catalog | MCP servers as deployable cluster assets | Product/release lifecycle | Curated catalog, lifecycle operator, gateway, preview controls | UBI/scanned image claims, partner/community tiers | Deploys to OpenShift | MCP gateway aggregates tools | Per-tool metrics claimed, preview-stage |
| Official MCP Registry | Public MCP server metadata | Immutable server versions | Namespace auth, moderation, downstream curation | Reverse-DNS/GitHub/domain ownership | Metadata points to packages/remotes | Not a context loader itself | API metadata |
| Agent Skills spec/research | Open skill folder format | Host-defined | None by itself | Host-defined | Filesystem/host-specific discovery | Progressive disclosure pattern | Research identifies risks |
