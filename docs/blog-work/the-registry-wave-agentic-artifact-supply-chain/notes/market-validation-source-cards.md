# Market Validation Source Cards

Verified July 1, 2026.

## Claim Guidance

Safe thesis: agentic artifacts are becoming package-like, but today's ecosystem splits across skill folders, CLI installers, enterprise artifact repositories, curated catalogs, and metadata-only registries. Do not imply there is one mature, universal agentic artifact registry.

Avoid:
- `gh skill` is not a vetted marketplace; it discovers public GitHub `SKILL.md` files and supports install/manage/publish flows.
- The official MCP Registry is not a code/package host and does not scan server code.
- Red Hat OpenShift AI MCP Catalog and related gateway/operator capabilities are preview-stage where noted by Red Hat.
- JFrog trust claims depend on the configured Artifactory/AI Catalog/Xray/signing/policy setup.
- Skill registry security research and preprints are useful directional evidence, but do not turn sample-specific rates into universal ecosystem rates.

## Source Cards

### GitHub `gh skill`

Sources:
- GitHub Changelog, "Manage agent skills with GitHub CLI", April 16, 2026: https://github.blog/changelog/2026-04-16-manage-agent-skills-with-github-cli/
- GitHub CLI manual, `gh skill install`: https://cli.github.com/manual/gh_skill_install
- GitHub CLI manual, `gh skill publish`: https://cli.github.com/manual/gh_skill_publish
- GitHub Docs, About agent skills: https://docs.github.com/en/copilot/concepts/agents/about-agent-skills

Public facts:
- `gh skill` is preview and supports install, list, preview, publish, search, and update.
- Install supports GitHub repositories, local directories, multiple agent hosts, user/project scopes, and pinning by git tag or commit SHA.
- Installed skills can carry source-tracking metadata in frontmatter so update checks can compare against upstream.
- Publish validates against the Agent Skills spec and creates GitHub releases.

Safe interpretation:
GitHub validates the package-manager analogy for agent skills and makes GitHub repositories a distribution rail.

Claims to avoid:
Do not say GitHub verifies or certifies the safety of skills.

### JFrog Skills Repositories and Agent Skills Registry

Sources:
- JFrog Docs, Skills Repositories: https://docs.jfrog.com/artifactory/docs/skills-repositories
- JFrog Docs, JFrog CLI for Skills: https://docs.jfrog.com/artifactory/docs/jf-skills
- JFrog Agent Skills Registry product page: https://jfrog.com/ai-catalog/skills-registry/
- JFrog Docs, Scanning AI Agent Skills: https://docs.jfrog.com/security/docs/skill-scanning

Public facts:
- Artifactory supports local Skills repositories as an open beta package type.
- `jf agent skills` supports publish, install, update, delete, list, and search.
- Skills are detected by locating `SKILL.md`; metadata such as name, version, description, and fingerprint is applied as artifact properties.
- Product language describes versioning, malicious-intent scanning, cryptographic signing, and access control.

Safe interpretation:
JFrog validates the enterprise supply-chain and governance angle for skills as governed artifacts.

Claims to avoid:
Do not imply every JFrog-managed skill is automatically safe independent of product configuration, entitlement, or policy.

### Red Hat Agentic Skills

Sources:
- Red Hat Ecosystem Catalog, agentic skills: https://catalog.redhat.com/en/ai
- Red Hat agentic skills page: https://www.redhat.com/en/agentic-skills
- OpenShift agentic skills repository: https://github.com/openshift/agentic-skills

Public facts:
- Red Hat presents a curated library of skills, agents, and MCP servers backed by Red Hat subscription.
- Red Hat publishes OpenShift-oriented agentic skills maintained by OpenShift maintainers.
- Public material frames these as trusted building blocks for agentic automation.

Safe interpretation:
Red Hat validates the enterprise/operator angle and the packaging of operational knowledge for agents.

Claims to avoid:
Do not describe Red Hat agentic skills as a fully versioned universal package registry unless citing a specific registry/release mechanism.

### Red Hat OpenShift AI MCP Catalog

Sources:
- Red Hat Blog, "The MCP catalog is here: Discover, deploy, and connect on Red Hat OpenShift AI": https://www.redhat.com/en/blog/mcp-catalog-here-discover-deploy-and-connect-red-hat-openshift-ai

Public facts:
- OpenShift AI MCP Catalog provides curated discovery for Red Hat, partner, and community MCP servers.
- The blog describes deployment through an MCP lifecycle operator and runtime connectivity through an MCP gateway.
- Red Hat describes identity-aware routing and per-tool metrics, and explicitly notes preview status for relevant components.

Safe interpretation:
Red Hat extends MCP beyond discovery into OpenShift-native deployment and runtime connectivity, while still preview-stage.

Claims to avoid:
Do not call it a settled production-grade governed MCP supply chain without preview qualifiers.

### Official MCP Registry

Sources:
- Model Context Protocol, The MCP Registry: https://modelcontextprotocol.io/registry/about
- Model Context Protocol Blog, "Introducing the MCP Registry", September 8, 2025: https://blog.modelcontextprotocol.io/posts/2025-09-08-mcp-registry-preview/

Public facts:
- The MCP Registry is in preview.
- It is an official centralized metadata repository for publicly accessible MCP servers.
- It stores standardized `server.json` metadata and points to packages/remotes rather than hosting server code.
- It provides namespace authentication, a REST API, standardized installation/configuration information, and an OpenAPI spec for downstream/private registry compatibility.
- Security scanning is delegated to package registries and downstream aggregators.

Safe interpretation:
The official MCP Registry validates metadata, discovery, namespace, and federation semantics for MCP server artifacts.

Claims to avoid:
Do not say it hosts, certifies, or scans MCP server code.

### OSS, Academic, and Security Signals

Sources:
- Saha, Faghih, and Feizi, "Under the Hood of SKILL.md: Semantic Supply-chain Attacks on AI Agent Skill Registry", arXiv, May 2026: https://arxiv.org/abs/2605.11418
- Snyk Research, "ToxicSkills Study of Agent Skills Supply Chain Compromise": https://snyk.io/blog/toxicskills-malicious-ai-agent-skills-clawhub/
- Palo Alto Networks Unit 42, "OpenClaw's Skill Marketplace and the Emerging AI Supply Chain Threat": https://unit42.paloaltonetworks.com/openclaw-ai-supply-chain-risk/
- SkillsVote preprint: https://arxiv.org/abs/2605.18401

Public facts:
- The `SKILL.md` preprint studies semantic attacks across discovery, selection, and governance stages.
- Snyk and Unit 42 document active skill ecosystem security risks and malicious skills in public marketplaces.
- SkillsVote frames skill lifecycle governance around collection, recommendation, attribution, and evolution.

Safe interpretation:
Research and security work supports the thesis that skill metadata and skill packages are operational control surfaces with supply-chain risk.

Claims to avoid:
Do not generalize sample-specific attack rates to all skill ecosystems.

## Comparison Matrix

| Surface | Artifact scope | Versioning | Governance | Provenance | Deployment | Context handling | Outcome evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| GitHub `gh skill` | `SKILL.md` folders in GitHub repos/local dirs | Tags, default branch, pin by tag/SHA, update via tree SHA | CLI validation on publish, no curation claim | GitHub repo metadata in frontmatter | Installs into agent host dirs | Host loads selected skill instructions/resources | CLI behavior, not outcome proof |
| JFrog Skills | Skill packages in Artifactory | Package versions and latest resolution | Access control, signing, Xray/AI Catalog scan gates where configured | Fingerprints, signing, artifact metadata | Installs to supported harnesses/paths | Metadata parsed from `SKILL.md` | Scan/publish/install results |
| Red Hat skills | Curated skill packs/task skills | Public pages/source repos | Red Hat curation/subscription framing | Catalog/source URLs | Bootstrap/install instructions | Task-specific skill material | Catalog descriptions |
| OpenShift AI MCP Catalog | MCP servers as deployable cluster assets | Product/release lifecycle | Curated catalog, lifecycle operator, gateway, preview controls | UBI/scanned image claims, partner/community tiers | Deploys to OpenShift | MCP gateway aggregates tools | Per-tool metrics claimed, preview-stage |
| Official MCP Registry | Public MCP server metadata | Immutable server versions | Namespace auth, moderation, downstream curation | Reverse-DNS/GitHub/domain ownership | Metadata points to packages/remotes | Not a context loader itself | API metadata |
| Agent Skills spec/research | Open skill folder format | Host-defined | None by itself | Host-defined | Filesystem/host-specific discovery | Progressive disclosure pattern | Research identifies risks |
