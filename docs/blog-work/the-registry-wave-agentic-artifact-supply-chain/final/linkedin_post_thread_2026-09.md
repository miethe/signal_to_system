---
edition: september-2026
created: 2026-09-15
post: the-registry-wave-agentic-artifact-supply-chain
---

# LinkedIn Thread: September 2026 Edition

## 7-Post Thread

### Post 1
A reviewer skill I deployed was fixed in the source repository. The registry showed the fixed version. Inside my projects, the old copy still ran unchanged for five days. Same skill name. Different bytes reaching the runtime.

Trusted artifact ≠ trusted use.

### Post 2
Here's why that matters:

Approval attaches to an artifact. Use happens in a context that approval never saw. Even after the fix reached the registry, I still needed to know who used the stale copy, with which context and tools, and whether the review did what was asked.

That is the supply-chain problem.

### Post 3
The registry wave is here. GitHub has gh skill. JFrog treats skills as governed enterprise artifacts. Red Hat is wiring skills and MCP servers into catalog deployments. The official MCP Registry formalizes public metadata.

That validates a real pattern: agentic capabilities are becoming reusable, versioned, distributable artifacts.

### Post 4
But discovery and installation are layer one. The enterprise questions are harder.

Who approved this artifact? What context does it require? What permissions? What policies govern it? Can it be revoked? Which outcomes did it help produce?

That is control-plane territory. Registries don't own it alone.

### Post 5
I built SkillMeat to solve this across the full lifecycle:

Authoring, registration, approval, recorded deployment, use with binding checks, drift detection, missing dependencies, replacement, and evidence linking back to accepted outcomes.

Four surfaces need to talk: supply chain, runtime control, orchestration, and evidence.

### Post 6
The winning metric is accepted outcomes with evidence.

Not tokens, sessions, or number of agents. A review that meets the request, executed with the approved guard, using authorized context and tools, with that acceptance decision on record.

What I call the agentic artifact supply chain exists to deliver that.

### Post 7
I use Agentic Systems Engineering, an emerging discipline others are naming too, as the umbrella. It's how I think enterprise agentic architecture is going: not one registry for everything, but a federated control fabric across skills, prompts, MCP servers, context, policies, evals, runtimes, and evidence.

The registry wave is here. The supply chain comes next.

---

## Single Post (Condensed)

The registry wave for agentic AI is here: GitHub has gh skill, JFrog treats skills as governed enterprise artifacts, Red Hat is wiring MCP catalogs, and the official MCP Registry formalizes public metadata. But registries solve discovery, not governance.

I deployed a reviewer skill with a missing mandatory guard. The registry showed the fixed version. My projects still ran the old copy for five days. Approval attached to an artifact; use happened in a context the approval never saw.

Trusted artifact ≠ trusted use.

The enterprise question is bigger: who approved this, what context does it require, what permissions and policies govern it, can it be revoked, and which outcomes did it help produce? That is control-plane territory.

I built SkillMeat to solve this across the full lifecycle. Four surfaces need to talk: supply chain (artifact identity, recorded deployment, drift detection), runtime control (caller identity, authorization, permissions), orchestration (routing and handoffs), and evidence (what ran, what was verified, who accepted it).

The winning metric is accepted outcomes with evidence: a review that meets the request, executed with the approved guard, using authorized context and tools, with that acceptance decision on record. I use Agentic Systems Engineering, an emerging discipline others are naming too, as the umbrella. That is where I think enterprise agentic architecture is headed: not one registry, but a federated control fabric across skills, prompts, MCP servers, context, policies, evals, runtimes, and evidence.

The registry wave is here. The supply chain comes next.
