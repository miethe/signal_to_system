// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  "AI Agents",
  "Agentic SDLC",
  "Technical Leadership",
  "CTO",
  "Architecture",
  "Platform Engineering",
  "Projects",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ---------------------------------------------------------------------------
// Tag Registry
// ---------------------------------------------------------------------------

export interface TagDefinition {
  slug: string;
  label: string;
  description?: string;
}

export const TAG_REGISTRY: TagDefinition[] = [
  // Repo & code design
  {
    slug: "repo-design",
    label: "Repo Design",
    description: "Structuring repositories for clarity, navigability, and agent-readiness.",
  },
  {
    slug: "agent-ready-repos",
    label: "Agent-Ready Repos",
    description: "Designing codebases that AI agents can reliably read, navigate, and edit.",
  },
  {
    slug: "artifact-first",
    label: "Artifact-First",
    description: "Treating artifacts as first-class outputs of the development process.",
  },
  {
    slug: "literate-programming",
    label: "Literate Programming",
    description: "Code written alongside explanatory prose to serve both humans and machines.",
  },
  {
    slug: "abstraction",
    label: "Abstraction",
    description: "Managing complexity through layered, principled abstraction.",
  },

  // AI / Agent patterns
  {
    slug: "context-engineering",
    label: "Context Engineering",
    description: "Designing the information environment that AI agents operate within.",
  },
  {
    slug: "prompt-engineering",
    label: "Prompt Engineering",
    description: "Crafting instructions and inputs that reliably elicit useful model outputs.",
  },
  {
    slug: "evaluation",
    label: "Evaluation",
    description: "Measuring and improving the quality and reliability of AI systems.",
  },
  {
    slug: "human-ai-workflow",
    label: "Human-AI Workflow",
    description: "Designing collaborative loops between human judgment and AI execution.",
  },

  // SDLC & delivery
  {
    slug: "delivery-systems",
    label: "Delivery Systems",
    description: "The end-to-end pipelines and practices that take software from idea to production.",
  },
  {
    slug: "architecture-decision-records",
    label: "Architecture Decision Records",
    description: "Lightweight documentation that captures the reasoning behind architectural choices.",
  },
  {
    slug: "governance",
    label: "Governance",
    description: "Policies, controls, and accountability structures for software and AI systems.",
  },

  // Platform engineering
  {
    slug: "internal-developer-platform",
    label: "Internal Developer Platform",
    description: "Self-service infrastructure and tooling that empowers engineering teams.",
  },
  {
    slug: "platform-strategy",
    label: "Platform Strategy",
    description: "The long-arc decisions that shape a platform's scope, audience, and evolution.",
  },
  {
    slug: "operating-model",
    label: "Operating Model",
    description: "How teams are structured, funded, and held accountable to deliver value.",
  },
  {
    slug: "openshift",
    label: "OpenShift",
    description: "Red Hat OpenShift container platform patterns and operations.",
  },
  {
    slug: "kubernetes",
    label: "Kubernetes",
    description: "Container orchestration architecture, patterns, and operational practices.",
  },

  // Leadership & org
  {
    slug: "technical-leadership",
    label: "Technical Leadership",
    description: "Leading technical teams and organizations with clarity and intent.",
  },
  {
    slug: "organizational-design",
    label: "Organizational Design",
    description: "Structuring teams and reporting relationships to support technical strategy.",
  },
  {
    slug: "consulting",
    label: "Consulting",
    description: "Lessons from client-facing technical advisory and engagement work.",
  },
  {
    slug: "systems-thinking",
    label: "Systems Thinking",
    description: "Understanding behavior that emerges from the interactions of system components.",
  },
  {
    slug: "decision-making",
    label: "Decision-Making",
    description: "Frameworks and practices for making high-quality technical and strategic decisions.",
  },

  // Architecture
  {
    slug: "architecture-diagram",
    label: "Architecture Diagram",
    description: "Visual representations of system structure and component relationships.",
  },
  {
    slug: "prototype",
    label: "Prototype",
    description: "Early-stage artifacts built to validate ideas and explore design space.",
  },

  // Frontend / UI
  {
    slug: "react",
    label: "React",
    description: "Patterns and practices for building UIs with React.",
  },
  {
    slug: "astro",
    label: "Astro",
    description: "Building content-driven sites with the Astro framework.",
  },
  {
    slug: "mdx",
    label: "MDX",
    description: "Combining Markdown and JSX components for rich, interactive content.",
  },
  {
    slug: "component-library",
    label: "Component Library",
    description: "Shared UI component systems that enforce consistency across products.",
  },
  {
    slug: "design-system",
    label: "Design System",
    description: "Integrated language of visual and interaction patterns for a product or brand.",
  },
];

export const tagsBySlug = Object.fromEntries(TAG_REGISTRY.map((t) => [t.slug, t])) as Record<
  string,
  TagDefinition
>;

// ---------------------------------------------------------------------------
// Topic Hubs (mirror categories with descriptions)
// ---------------------------------------------------------------------------

export interface TopicHub {
  slug: string;
  label: Category;
  description: string;
}

export const TOPIC_HUBS: TopicHub[] = [
  {
    slug: "ai-agents",
    label: "AI Agents",
    description:
      "Designing, evaluating, and operating AI agents in real-world software systems — from architecture patterns to human-AI collaboration.",
  },
  {
    slug: "agentic-sdlc",
    label: "Agentic SDLC",
    description:
      "Rethinking the software development lifecycle for a world where agents participate in planning, implementation, review, and delivery.",
  },
  {
    slug: "technical-leadership",
    label: "Technical Leadership",
    description:
      "What it means to lead technical organizations with clarity of vision, decisive judgment, and systemic thinking.",
  },
  {
    slug: "cto",
    label: "CTO",
    description:
      "The strategic and operational responsibilities of the Chief Technology Officer role across different company stages.",
  },
  {
    slug: "architecture",
    label: "Architecture",
    description:
      "Durable principles and practical patterns for designing systems that are comprehensible, evolvable, and fit for purpose.",
  },
  {
    slug: "platform-engineering",
    label: "Platform Engineering",
    description:
      "Building and operating internal developer platforms that multiply engineering effectiveness across an organization.",
  },
  {
    slug: "projects",
    label: "Projects",
    description:
      "Hands-on builds, prototypes, and artifacts — including component libraries, frameworks, and reference implementations.",
  },
];

// ---------------------------------------------------------------------------
// Projects / Systems Registry
// ---------------------------------------------------------------------------
// The controlled vocabulary of projects and systems that a post or dev story
// can relate to (the `projects` frontmatter field on posts + stories). Facet
// pages live at /systems/[slug]. `aos: true` marks a system as part of the
// Agentic OS. Kept independent of the portfolio `projects` collection so that
// internal systems without a public artifact page can still be referenced.

export interface ProjectDefinition {
  slug: string;
  label: string;
  description?: string;
  /** Whether this project is part of the Agentic OS. */
  aos?: boolean;
}

export const PROJECTS_REGISTRY: ProjectDefinition[] = [
  {
    slug: "aos",
    label: "Agentic OS",
    description:
      "The personal Agentic Operating System: the umbrella of orchestration, memory, research, knowledge, and execution subsystems.",
    aos: true,
  },
  {
    slug: "agentic-operator",
    label: "Agentic Operator",
    description:
      "The single entry point that classifies an idea on route × tier and dispatches it to the right subsystem.",
    aos: true,
  },
  {
    slug: "skillmeat",
    label: "SkillMeat",
    description:
      "The agentic artifact registry and packaging platform for skills, agents, and context packs.",
    aos: true,
  },
  {
    slug: "research-foundry",
    label: "Research Foundry",
    description:
      "The gated research pipeline that turns questions into evidence-backed reports.",
    aos: true,
  },
  {
    slug: "meatywiki",
    label: "MeatyWiki",
    description: "The knowledge base and wiki subsystem for durable, queryable knowledge.",
    aos: true,
  },
  {
    slug: "intenttree",
    label: "IntentTree",
    description: "The task and intent graph that keeps work as durable, linkable state.",
    aos: true,
  },
  {
    slug: "agentic-node",
    label: "Agentic Node",
    description: "The persistent host running the Agentic OS subsystems as always-on services.",
    aos: true,
  },
  {
    slug: "boxbrain",
    label: "BoxBrain",
    description: "A product build used as a laboratory for agentic delivery patterns.",
  },
  {
    slug: "signal-to-system",
    label: "Signal to System",
    description: "This publication and portfolio surface.",
  },
];

export const projectsBySlug = Object.fromEntries(
  PROJECTS_REGISTRY.map((p) => [p.slug, p]),
) as Record<string, ProjectDefinition>;

// ---------------------------------------------------------------------------
// AOS Areas Registry
// ---------------------------------------------------------------------------
// Sub-areas of the Agentic OS, used to group `aos: true` content on /aos/ and
// to power the /aos/[area] facet pages via the `aosAreas` frontmatter field.

export interface AosAreaDefinition {
  slug: string;
  label: string;
  description?: string;
}

export const AOS_AREAS_REGISTRY: AosAreaDefinition[] = [
  {
    slug: "orchestration",
    label: "Orchestration & Routing",
    description: "How work is classified, routed, and driven across subsystems and models.",
  },
  {
    slug: "memory",
    label: "Memory & Persona",
    description: "Durable persona memory, recall, and the facts that persist across sessions.",
  },
  {
    slug: "research",
    label: "Research",
    description: "Evidence gathering, synthesis, and the research pipeline.",
  },
  {
    slug: "knowledge",
    label: "Knowledge",
    description: "The knowledge base and how findings become queryable, reusable knowledge.",
  },
  {
    slug: "artifacts",
    label: "Artifacts & Skills",
    description: "Skills, agents, context packs, and the artifact supply chain.",
  },
  {
    slug: "execution",
    label: "Execution & SDLC",
    description: "Planning, delegated execution, review gates, and the agentic SDLC.",
  },
  {
    slug: "intents",
    label: "Intents & Task Graph",
    description: "Intent capture and the task graph that keeps work as durable state.",
  },
  {
    slug: "infra",
    label: "Infrastructure",
    description: "The nodes, services, and deploy loops the Agentic OS runs on.",
  },
  {
    slug: "publishing",
    label: "Publishing",
    description: "The Signal→System pipeline that turns operational evidence into published stories.",
  },
];

export const aosAreasBySlug = Object.fromEntries(
  AOS_AREAS_REGISTRY.map((a) => [a.slug, a]),
) as Record<string, AosAreaDefinition>;
