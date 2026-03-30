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
