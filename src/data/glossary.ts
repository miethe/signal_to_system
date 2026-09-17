// ---------------------------------------------------------------------------
// Glossary Registry
// ---------------------------------------------------------------------------
//
// Coined terms used across Signal to System essays, with inline definitions
// sourced from the post that first defines them. Rendered via the <Term />
// component (src/components/content/Term.astro) as a hover/focus tooltip
// rather than a navigating link.
//
// NOTE: this module is intended to be regenerated later from an AOS-canonical
// source and vendored into the repo. Keep it plain declarative data — no
// imports, no computed values, no logic.

export interface GlossaryEntry {
  term: string;
  definition: string;
  definedIn?: string;
}

export const GLOSSARY: Record<string, GlossaryEntry> = {
  "contract-as-spec": {
    term: "contract-as-spec",
    definition:
      "A method for preserving continuity across agentic execution: it makes a durable, binding document (not a prompt, ticket, plan, or final summary) the object of record for the work.",
    definedIn: "the-contract-is-the-work",
  },
  "feature-contract": {
    term: "Feature Contract",
    definition:
      "The binding document for a piece of agentic work. It states the intended outcome, defines what completion means, names the evidence required to support it, and records who may accept the result.",
    definedIn: "the-contract-is-the-work",
  },
  "evidence-obligations": {
    term: "Evidence obligations",
    definition:
      "The part of a Feature Contract specifying what must be inspected, tested, reproduced, or independently verified before the work can be accepted.",
    definedIn: "the-contract-is-the-work",
  },
  "decision-authority": {
    term: "Decision authority",
    definition:
      "The part of a Feature Contract naming who or what may accept the evidence and close the work.",
    definedIn: "the-contract-is-the-work",
  },
  "cognitive-debt": {
    term: "Cognitive Debt",
    definition:
      "The maintenance burden and loss of system comprehension that builds up when AI output outruns human understanding: code accumulating faster than anyone can internalize it.",
    definedIn: "governed-agentic-sdlc-01-productivity-paradox",
  },
  "adlc": {
    term: "Agent Development Lifecycle (ADLC)",
    definition:
      "An emerging model, named by IBM and Arthur AI, premised on the idea that developing with agents requires different processes than developing for AI features.",
    definedIn: "governed-agentic-sdlc-01-productivity-paradox",
  },
  "vibe-coding": {
    term: "Vibe Coding",
    definition:
      "Non-engineers prompting LLMs without regard for what the code actually does or how it holds up in production.",
    definedIn: "governed-agentic-sdlc-01-productivity-paradox",
  },
  "agentic-engineering": {
    term: "Agentic Engineering",
    definition:
      "Professional engineers operating AI agents within a deliberate, governed framework, accountable for software that runs in production.",
    definedIn: "governed-agentic-sdlc-01-productivity-paradox",
  },
  "agent-amnesia": {
    term: "Agent Amnesia",
    definition:
      "The problem where knowledge an AI agent works out mid-session (a legacy business rule, an edge case, a data model constraint) dies the moment the session closes, forcing the next developer to start from zero.",
    definedIn: "governed-agentic-sdlc-01-productivity-paradox",
  },
  "executiongraph": {
    term: "ExecutionGraph",
    definition:
      "The structure used to run Tier 2/3 work: sequential waves by dependency, containing potentially parallel phases, containing batches grouped by file ownership, containing tasks assigned to agents with model/provider hints.",
    definedIn: "agentic-operations-flow",
  },
  "harness-engineering-control-plane": {
    term: "Harness Engineering Control Plane",
    definition:
      "A control-plane layer for agentic development, analogous to Kubernetes for distributed workloads, that manages cognitive workloads: what context agents receive, what constraints they operate under, how outputs are verified, and how knowledge persists across sessions.",
    definedIn: "governed-agentic-sdlc-01-productivity-paradox",
  },
  "artifact-graph": {
    term: "artifact graph",
    definition:
      "A typed set of durable objects (exploration charters, feasibility briefs, feature contracts, PRDs, implementation plans, decision blocks, progress files, validation records, run evidence, knowledge handoffs) that a workflow can resume from and reviewers can validate against.",
    definedIn: "agentic-operations-flow",
  },
  "agentic-artifact": {
    term: "agentic artifact",
    definition:
      "A reusable, versionable unit that shapes how an agent reasons, acts, accesses tools, applies context, follows policy, or produces work: a skill, command, agent definition, memory item, or context pack.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "control-fabric": {
    term: "control fabric",
    definition:
      "The shared identity, evidence, and explicit handoffs connecting the systems responsible for an agentic artifact's supply chain, runtime control, orchestration, and evidence.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "skillmeat": {
    term: "SkillMeat",
    definition:
      "Nick Miethe's registry and deployment tool for reusable agent capabilities: skills, commands, agent definitions, and context packs. It separates a registered artifact's version from the deployed copy a project actually loads, which is the distinction this essay's incident turns on.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "aos": {
    term: "Agentic OS (AOS)",
    definition:
      "Nick Miethe's personal lab system for agentic work: the registry, runtime control, orchestration, and evidence surfaces named across the control-fabric map. It's a personal system, not a product any enterprise is expected to adopt.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "task-completion-validator": {
    term: "task-completion-validator",
    definition:
      "A reviewer that checks a claimed completion against what actually shipped, rather than trusting the report: it verifies the work is functional and meets its stated requirements before accepting it as done.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "operator": {
    term: "The Operator",
    definition:
      "The work-routing surface that sits over the AOS subsystems: it takes an incoming idea or request, classifies it, and dispatches it to the right subsystem at the right effort level.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "meatywiki": {
    term: "MeatyWiki",
    definition:
      "A durable knowledge store built on a file-first markdown vault: it compiles ingested material into structured, queryable knowledge that survives past any single session.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "research-foundry": {
    term: "Research Foundry",
    definition:
      "An evidence-oriented research system: it runs research passes, extracts and verifies claims against sources, and produces evidence a reviewer can check instead of trusting recall.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "meatyprompts": {
    term: "MeatyPrompts",
    definition:
      "An earlier prompt-management experiment that preceded SkillMeat: a first attempt at giving reusable prompts a durable home instead of leaving them in one-off chat transcripts.",
    definedIn: "the-registry-wave-agentic-artifact-supply-chain",
  },
  "intenttree": {
    term: "IntentTree",
    definition:
      "The task-graph system used across the Agentic OS: a tree of nodes representing intents and work items, connected by typed edges for dependencies, claims, evidence, and completion state.",
  },
  "aosbench": {
    term: "AOSBench",
    definition:
      "The ablation and measurement instrument used to evaluate changes to the Agentic OS's own agents: a system-under-test harness for measuring the effect of an identity, prompt, or capability change rather than assuming it.",
  },
};

export type GlossaryTermId = keyof typeof GLOSSARY;
