import type { LucideIcon } from "lucide-react";
import {
  Archive,
  ClipboardCheck,
  Database,
  FileCode2,
  FileSearch,
  FileText,
  GitBranch,
  Gauge,
  Layers3,
  Network,
  Route,
  ShieldAlert,
  ShieldCheck,
  Workflow,
} from "lucide-react";

export type OperationTabKey =
  | "loop"
  | "triage"
  | "artifacts"
  | "autonomy"
  | "execution"
  | "gates"
  | "evidence";

export interface OperationTab {
  key: OperationTabKey;
  label: string;
  title: string;
  summary: string;
  icon: LucideIcon;
}

export interface LoopNode {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  input: string;
  output: string;
  failureMode: string;
  artifact: string;
  icon: LucideIcon;
}

export interface TriagePath {
  id: string;
  label: string;
  scenario: string;
  route: string;
  firstArtifact: string;
  why: string;
  steps: string[];
}

export interface ArtifactItem {
  id: string;
  label: string;
  purpose: string;
  appearsWhen: string;
  mustContain: string[];
  prevents: string;
}

export interface AutonomyFactor {
  id: "scope" | "unknowns" | "risk";
  label: string;
  options: {
    label: string;
    value: number;
    description: string;
  }[];
}

export interface AutonomyTier {
  tier: number;
  label: string;
  path: string;
  artifacts: string;
  gate: string;
  summary: string;
}

export interface ExecutionStep {
  id: string;
  label: string;
  title: string;
  description: string;
  owner: string;
  output: string;
  parallelism: string;
}

export interface GateScenario {
  id: string;
  label: string;
  risk: string;
  route: string;
  reviewer: string;
  posture: string;
  outcome: string;
}

export interface EvidenceLayer {
  id: string;
  label: string;
  description: string;
  captures: string;
  reusedBy: string;
  icon: LucideIcon;
}

export const operationTabs: OperationTab[] = [
  {
    key: "loop",
    label: "Loop",
    title: "The operating loop",
    summary:
      "A request becomes a sequence of durable state changes: intent, route, artifact, execution, review, evidence, and reuse.",
    icon: Workflow,
  },
  {
    key: "triage",
    label: "Triage",
    title: "Route uncertainty before commitment",
    summary:
      "The first decision is the kind of uncertainty in front of the work, not the model or tool to open first.",
    icon: Route,
  },
  {
    key: "artifacts",
    label: "Artifacts",
    title: "Artifacts are operating state",
    summary:
      "The point of the documents is not ceremony. It is resumability, reviewability, and a stable target for agents.",
    icon: Layers3,
  },
  {
    key: "autonomy",
    label: "Autonomy",
    title: "Autonomy scales with risk",
    summary:
      "Small, clear work should move quickly. Risky or ambiguous work earns heavier artifacts and gates.",
    icon: Gauge,
  },
  {
    key: "execution",
    label: "Execution",
    title: "Execution is a graph",
    summary:
      "Tier 2 and Tier 3 work runs through waves, phases, file-ownership batches, tasks, and reviewer gates.",
    icon: GitBranch,
  },
  {
    key: "gates",
    label: "Gates",
    title: "Gates are typed",
    summary:
      "Review intensity is a routing field. Normal validation, milestone review, and hard stops are different moves.",
    icon: ShieldCheck,
  },
  {
    key: "evidence",
    label: "Evidence",
    title: "Evidence becomes the product",
    summary:
      "The run is not complete until the system can explain what happened, why, what passed, and what can be reused.",
    icon: Archive,
  },
];

export const loopNodes: LoopNode[] = [
  {
    id: "intent",
    label: "Capture intent",
    shortLabel: "Intent",
    description:
      "The human request is captured before it gets expanded by a model. This is where audience, sensitivity, and desired outcome belong.",
    input: "Raw ask, context, constraints",
    output: "Intake note or work request",
    failureMode: "Starting from a vague prompt and treating the generated answer as the plan.",
    artifact: "Human brief",
    icon: FileText,
  },
  {
    id: "triage",
    label: "Triage uncertainty",
    shortLabel: "Triage",
    description:
      "The workflow decides whether it is facing ambiguity, feasibility risk, a known feature, or an already-planned phase.",
    input: "Intent plus known unknowns",
    output: "Explore, SPIKE, plan, or execute route",
    failureMode: "Editing files before deciding what kind of uncertainty is actually present.",
    artifact: "Routing decision",
    icon: Route,
  },
  {
    id: "explore",
    label: "Explore or SPIKE",
    shortLabel: "Explore",
    description:
      "Ambiguous or risky work gets a bounded read-only pass before implementation commitment.",
    input: "Question, risk, source anchors",
    output: "Exploration charter or feasibility brief",
    failureMode: "Letting research and implementation blur into one irreversible session.",
    artifact: "Exploration Charter",
    icon: FileSearch,
  },
  {
    id: "plan",
    label: "Plan by tier",
    shortLabel: "Plan",
    description:
      "The system chooses the smallest artifact that can safely carry the work into execution.",
    input: "Verdict, scope, risk, constraints",
    output: "Contract, PRD, implementation plan, or phase progress",
    failureMode: "Using the same amount of process for a typo fix and a high-risk refactor.",
    artifact: "Feature Contract or PRD",
    icon: ClipboardCheck,
  },
  {
    id: "execute",
    label: "Execute through agents",
    shortLabel: "Execute",
    description:
      "Implementation is delegated through the graph: waves, phases, batches, tasks, and file ownership.",
    input: "Plan graph and task assignments",
    output: "Scoped edits, notes, validation output",
    failureMode: "Parallelizing blindly and creating conflicts the orchestrator has to unwind.",
    artifact: "ExecutionGraph",
    icon: Network,
  },
  {
    id: "review",
    label: "Review through gates",
    shortLabel: "Review",
    description:
      "Review intensity follows risk. Standard checks, Tier 3 validation, and council review are separate lanes.",
    input: "Diffs, acceptance criteria, evidence pack",
    output: "Approval, bounded fix loop, or stop state",
    failureMode: "Asking for a vibe check instead of routing to the right review posture.",
    artifact: "Review record",
    icon: ShieldCheck,
  },
  {
    id: "persist",
    label: "Persist evidence",
    shortLabel: "Evidence",
    description:
      "The final state is not just merged code. The system keeps progress, validation evidence, deferred items, and reusable context.",
    input: "Run output and validation evidence",
    output: "Progress YAML, reports, capsules, knowledge entries",
    failureMode: "Letting the next session rediscover what the previous one already learned.",
    artifact: "Progress and evidence bundle",
    icon: Database,
  },
];

export const triagePaths: TriagePath[] = [
  {
    id: "ambiguous",
    label: "Ambiguous idea",
    scenario: "The request is promising, but scope and success criteria are not stable yet.",
    route: "/plan:explore",
    firstArtifact: "Exploration Charter",
    why: "It reduces uncertainty before the system writes a contract or implementation plan.",
    steps: ["Charter the question", "Fan out read-only legs", "Verify findings", "Return a verdict"],
  },
  {
    id: "feasibility",
    label: "Feasibility question",
    scenario: "The main risk is whether an API, migration, integration, or performance path will work.",
    route: "/plan:spike",
    firstArtifact: "FeasibilityBrief",
    why: "It captures assumptions, confidence, and a go, conditional-go, or no-go recommendation.",
    steps: ["Define the risk", "Test the unknown", "Write confidence notes", "Choose the next artifact"],
  },
  {
    id: "known-feature",
    label: "Known feature",
    scenario: "The target behavior is clear enough to plan without another research pass.",
    route: "/plan:plan-feature",
    firstArtifact: "Feature Contract or PRD",
    why: "The work can be classified by tier and turned into an execution path.",
    steps: ["Classify tier", "Write the handoff", "Assign execution shape", "Attach review intensity"],
  },
  {
    id: "planned-phase",
    label: "Planned phase",
    scenario: "The work already has a plan and a progress file. The question is execution control.",
    route: "/dev:execute-phase",
    firstArtifact: "Progress file",
    why: "The orchestrator can execute from existing task state instead of re-planning the feature.",
    steps: ["Read progress YAML", "Run dependency-safe batch", "Validate", "Update evidence"],
  },
];

export const artifactItems: ArtifactItem[] = [
  {
    id: "charter",
    label: "Exploration Charter",
    purpose: "Frames uncertainty before the team commits to implementation.",
    appearsWhen: "The request is ambiguous, risky, or missing a source anchor.",
    mustContain: ["Question", "investigation legs", "evidence needs", "go/no-go criteria"],
    prevents: "Committing to a polished plan built on a guessed premise.",
  },
  {
    id: "feasibility",
    label: "FeasibilityBrief",
    purpose: "Turns research into a decision packet.",
    appearsWhen: "The key risk is API behavior, migration risk, integration reality, or performance.",
    mustContain: ["Finding", "confidence", "assumptions", "recommended path"],
    prevents: "Treating exploratory success as production readiness.",
  },
  {
    id: "contract",
    label: "Feature Contract",
    purpose: "Creates a compact Tier 1 handoff for autonomous sprint execution.",
    appearsWhen: "Scope is bounded and the expected behavior is clear.",
    mustContain: ["Delta", "acceptance criteria", "constraints", "review requirement"],
    prevents: "Over-planning small work or under-specifying autonomous edits.",
  },
  {
    id: "prd",
    label: "PRD",
    purpose: "Captures product and behavioral intent for Tier 2 and Tier 3 work.",
    appearsWhen: "The work spans meaningful behavior, coordination, or user-visible outcomes.",
    mustContain: ["Problem", "desired behavior", "non-goals", "acceptance criteria"],
    prevents: "Agents optimizing for local implementation details while missing the actual outcome.",
  },
  {
    id: "plan",
    label: "Implementation Plan",
    purpose: "Turns the PRD into phases, dependencies, ownership, and validation.",
    appearsWhen: "Execution needs sequencing, parallelism, or cross-file coordination.",
    mustContain: ["Waves", "phases", "tasks", "dependencies", "quality gates"],
    prevents: "Parallel work colliding because ownership and dependencies were implicit.",
  },
  {
    id: "progress",
    label: "Progress File",
    purpose: "Stores current execution state, batch status, validation, and evidence.",
    appearsWhen: "A planned phase is being executed or resumed.",
    mustContain: ["Task state", "batch status", "blockers", "validation evidence"],
    prevents: "Relying on a chat transcript to remember what already happened.",
  },
];

export const autonomyFactors: AutonomyFactor[] = [
  {
    id: "scope",
    label: "Scope",
    options: [
      { label: "Small", value: 0, description: "One focused change, low blast radius." },
      { label: "Feature", value: 1, description: "Several files or a new behavior path." },
      { label: "System", value: 2, description: "Architecture, migration, or cross-module coordination." },
    ],
  },
  {
    id: "unknowns",
    label: "Unknowns",
    options: [
      { label: "Clear", value: 0, description: "The behavior and constraints are known." },
      { label: "Some", value: 1, description: "Several assumptions need verification." },
      { label: "High", value: 2, description: "The first task is reducing uncertainty." },
    ],
  },
  {
    id: "risk",
    label: "Risk",
    options: [
      { label: "Low", value: 0, description: "No sensitive data or core paths." },
      { label: "Medium", value: 1, description: "Shared behavior or visible workflow impact." },
      { label: "High", value: 2, description: "Auth, payments, deletion, migrations, secrets, or core paths." },
    ],
  },
];

export const autonomyTiers: AutonomyTier[] = [
  {
    tier: 0,
    label: "Tier 0",
    path: "/dev:quick-feature",
    artifacts: "Inline plan or small progress note",
    gate: "Optional reviewer",
    summary: "Fast path for small safe changes where context is obvious and the blast radius is low.",
  },
  {
    tier: 1,
    label: "Tier 1",
    path: "execute-contract",
    artifacts: "Feature Contract",
    gate: "Mandatory task-completion-validator",
    summary: "Bounded autonomous sprint with a compact handoff and a review loop.",
  },
  {
    tier: 2,
    label: "Tier 2",
    path: "execute-plan",
    artifacts: "PRD, Implementation Plan, phase progress",
    gate: "Per-phase validator with escalation as needed",
    summary: "Planned wave execution for work that needs sequencing and coordination.",
  },
  {
    tier: 3,
    label: "Tier 3",
    path: "execute-plan with higher review intensity",
    artifacts: "SPIKE, PRD, Implementation Plan, milestone gates",
    gate: "Tier 3 reviewer or review council",
    summary: "High-risk path where the workflow should slow down before edits become expensive.",
  },
];

export const executionSteps: ExecutionStep[] = [
  {
    id: "wave",
    label: "Wave",
    title: "Sequential dependency boundary",
    description: "Waves keep upstream decisions from being bypassed by downstream work.",
    owner: "Orchestrator",
    output: "Unlocked phases",
    parallelism: "Sequential",
  },
  {
    id: "phase",
    label: "Phase",
    title: "Parallelizable work unit",
    description: "Independent phases can run at the same time when their dependencies and files do not collide.",
    owner: "Phase agents",
    output: "Phase diff and notes",
    parallelism: "Parallel when safe",
  },
  {
    id: "batch",
    label: "Batch",
    title: "File-ownership safety rail",
    description: "Batches serialize work that would otherwise edit the same files or cross the same boundary.",
    owner: "Executor agents",
    output: "Conflict-safe edits",
    parallelism: "Grouped by ownership",
  },
  {
    id: "task",
    label: "Task",
    title: "Concrete delegated edit",
    description: "Each task has a narrow scope, a success condition, and a reviewer expectation.",
    owner: "Specialized worker",
    output: "Implementation and local evidence",
    parallelism: "Scoped execution",
  },
  {
    id: "reviewer",
    label: "Gate",
    title: "Validation and fix loop",
    description: "Reviewers validate against the original artifact, not just whether the code looks plausible.",
    owner: "Reviewer agent",
    output: "Approve, fix, or stop",
    parallelism: "Bounded loop",
  },
];

export const gateScenarios: GateScenario[] = [
  {
    id: "standard",
    label: "Normal feature",
    risk: "Clear behavior, bounded files, no sensitive path.",
    route: "standard",
    reviewer: "task-completion-validator",
    posture: "Validate acceptance criteria, build output, and obvious regressions.",
    outcome: "Approve or return a bounded fix list.",
  },
  {
    id: "tier3",
    label: "Large or risky phase",
    risk: "Cross-module behavior, major refactor, or milestone-level dependency.",
    route: "tier3",
    reviewer: "higher-risk validator",
    posture: "Adversarial review against plan, source truth, and evidence.",
    outcome: "Approve, require fixes, or return to orchestration.",
  },
  {
    id: "council",
    label: "Critical path",
    risk: "Auth, permissions, payments, deletion, API contracts, migrations, secrets, or production infrastructure.",
    route: "council / Mode D",
    reviewer: "review council or human signoff",
    posture: "Stop before edits unless the decision and rollback path are explicit.",
    outcome: "Proceed only after signoff, otherwise keep the workflow parked.",
  },
];

export const evidenceLayers: EvidenceLayer[] = [
  {
    id: "progress",
    label: "Progress state",
    description: "The compact source of truth for what is done, blocked, running, or deferred.",
    captures: "Task status, dependency state, current phase, blockers",
    reusedBy: "Next execution session",
    icon: FileCode2,
  },
  {
    id: "validation",
    label: "Validation record",
    description: "The proof that the output was checked against the artifact that authorized it.",
    captures: "Builds, checks, review notes, acceptance criteria",
    reusedBy: "Reviewer gates and release notes",
    icon: ClipboardCheck,
  },
  {
    id: "telemetry",
    label: "Run intelligence",
    description: "The operational view of what happened across sessions, agents, and tasks.",
    captures: "Session traces, failures, ownership, time, evidence links",
    reusedBy: "CCDash-style analysis",
    icon: Gauge,
  },
  {
    id: "capsule",
    label: "Human capsule",
    description: "A readable bundle that explains the plan, decisions, run state, and proof.",
    captures: "Summary, artifacts, screenshots, reports, writeback notes",
    reusedBy: "Stakeholders and future operators",
    icon: FileText,
  },
  {
    id: "knowledge",
    label: "Knowledge surface",
    description: "Reusable rationale and artifact lineage that should survive the current run.",
    captures: "Decisions, reusable patterns, deferred items, source links",
    reusedBy: "MeatyWiki, IntentTree, SkillMeat-style registries",
    icon: Database,
  },
];

export const referenceFigures = [
  {
    src: "/assets/posts/agentic-operations-flow/deck/slide-04-work-is-a-graph.jpg",
    alt: "Deck slide showing agentic work as a graph instead of a transcript.",
    number: "01",
    caption: "The original deck frame for the core thesis: durable state belongs in artifacts, not in a transcript.",
  },
  {
    src: "/assets/posts/agentic-operations-flow/deck/slide-05-operating-loop.jpg",
    alt: "Deck slide showing the full end-to-end agentic operating loop.",
    number: "02",
    caption: "The operating loop from the source deck. The interactive below redraws this as a web-native system map.",
  },
  {
    src: "/assets/posts/agentic-operations-flow/deck/slide-45-final-system-map.jpg",
    alt: "Deck slide showing the final system map for agentic operations.",
    number: "03",
    caption: "The broader system map is useful as a closing reference, but Post 1 only needs the operating loop.",
  },
];

export const evidenceFigure = {
  src: "/assets/posts/agentic-operations-flow/evidence-stack.jpg",
  alt: "Generated illustration of layered evidence artifacts flowing into a reusable knowledge graph.",
  number: "04",
  caption:
    "Evidence is part of the deliverable: progress state, validation, telemetry, capsules, and knowledge handoff.",
};

export const hardStopIcon = ShieldAlert;
