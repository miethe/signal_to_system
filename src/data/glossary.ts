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
};

export type GlossaryTermId = keyof typeof GLOSSARY;
