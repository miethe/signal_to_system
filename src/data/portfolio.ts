export type PortfolioStatus = "active" | "in-progress" | "planned" | "archived";

export interface PortfolioLink {
  label: string;
  href: string;
}

export interface PortfolioItem {
  title: string;
  description: string;
  status: PortfolioStatus;
  links: PortfolioLink[];
  category: string;
  featured: boolean;
  private?: boolean;
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: "@miethe/ui Component Library",
    description:
      "A personal React component library built with TypeScript, Tailwind CSS, and Storybook. Provides the shared UI primitives used across Signal to System and other personal projects. Designed with an artifact-first philosophy — every component ships with usage docs, visual tests, and accessibility notes.",
    status: "in-progress",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/ui" },
      { label: "Storybook", href: "https://ui.miethe.dev" },
    ],
    category: "Projects",
    featured: true,
  },
  {
    title: "Signal to System Blog",
    description:
      "This site — an Astro-powered technical publication built with MDX, nanostores, and a custom content architecture designed for agent-readability and long-form publishing. Includes a taxonomy system, reading-path engine, and structured content schema.",
    status: "active",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/signal-to-system" },
      { label: "Live Site", href: "https://nickmiethe.com" },
    ],
    category: "Projects",
    featured: true,
  },
  {
    title: "CCDash",
    description:
      "A dashboard for monitoring and orchestrating Claude Code agents — surfaces session state, task progress, and multi-agent coordination in a single pane of glass.",
    status: "in-progress",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/CCDash" },
    ],
    category: "AI Agents",
    featured: false,
  },
  {
    title: "BoxBrain",
    description:
      "A knowledge and research workspace that pairs a FastAPI backend with a React frontend to capture, organize, and reason over personal knowledge. Part of the broader agentic knowledge ecosystem.",
    status: "in-progress",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/boxbrain" },
    ],
    category: "AI Agents",
    featured: false,
  },
  {
    title: "MeatyMusic",
    description:
      "Agentic Music Creation System (AMCS). A deterministic, constraint-driven composition engine that turns a structured Song Design Spec into validated musical artifacts through a PLAN → STYLE → LYRICS → PRODUCER → COMPOSE → VALIDATE → RENDER pipeline. Every decision carries provenance, hashes, and scores; render backends (Suno, etc.) are pluggable.",
    status: "in-progress",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/MeatyMusic" },
    ],
    category: "AI Agents",
    featured: false,
  },
  {
    title: "Agentic SDLC Framework",
    description:
      "A reference framework for integrating AI agents into the software development lifecycle — covering repo design, context engineering, evaluation, and human-AI handoff patterns. Includes opinionated directory structures, schema conventions, and workflow templates.",
    status: "planned",
    links: [
      { label: "GitHub (coming soon)", href: "https://github.com/miethe/agentic-sdlc" },
    ],
    category: "AI Agents",
    featured: true,
  },
  {
    title: "MeatyCapture",
    description:
      "A lightweight CLI for logging enhancements, bugs, and ideas to structured markdown with project-aware defaults and tag aggregation. Built for teams that track work in Git repos, want searchable local markdown, or need headless batch capture in CI/CD. Distributed via npm.",
    status: "active",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/meatycapture" },
      { label: "npm", href: "https://www.npmjs.com/package/@meatymedia/meatycapture" },
    ],
    category: "Developer Tools",
    featured: true,
  },
  {
    title: "codebase-map",
    description:
      "Tooling to map and visualize codebase structure — built to give agents and humans a fast, navigable view of a repository's shape. Fits naturally into agentic code-understanding workflows.",
    status: "in-progress",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/codebase-map" },
    ],
    category: "Developer Tools",
    featured: false,
  },
  {
    title: "Diagram Viewer",
    description:
      "A monorepo for visualizing current vs. target architectures as interactive, drill-down diagrams. A shared TypeScript schema, a Node ingestor that scans a repo and emits a baseline diagram, and a Next.js + React Flow viewer for pan/zoom exploration across levels of detail.",
    status: "in-progress",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/diagram-viewer" },
    ],
    category: "Developer Tools",
    featured: false,
  },
  {
    title: "Deal Brain",
    description:
      "A full-stack price-to-performance intelligence system for Small Form Factor PCs. Ingests listings from Excel or marketplace URLs, enriches with PassMark benchmarks, and applies configurable valuation rules and weighted scoring profiles to surface the best deals with explainable, rule-level breakdowns.",
    status: "active",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/deal-brain" },
    ],
    category: "Apps",
    featured: true,
  },
  {
    title: "MagnaMath",
    description:
      "An interactive educational web app for exploring 3D polyhedra and generating 2D flat patterns (nets) for magnetic building tiles like Magna-Tiles. Supports tessellation, spherization, symmetry, and inventory constraints; built with React, Three.js, and React Three Fiber.",
    status: "active",
    links: [
      { label: "GitHub", href: "https://github.com/miethe/MagnaMath" },
    ],
    category: "Apps",
    featured: false,
  },
  {
    title: "SkillMeat",
    description:
      "Flagship artifact, context, and skill management platform — the backbone of the agentic SDLC and artifact-governance vision. Private repository.",
    status: "in-progress",
    links: [],
    category: "AI Agents",
    featured: true,
    private: true,
  },
  {
    title: "MeatyPrompts",
    description:
      "Prompt system for reusable prompt artifacts, personas, and model-aware prompt engineering. Private repository.",
    status: "in-progress",
    links: [],
    category: "AI Agents",
    featured: false,
    private: true,
  },
  {
    title: "MeatyWiki",
    description:
      "Wiki and documentation layer for agentic and knowledge workflows across the Meaty ecosystem. Private repository.",
    status: "in-progress",
    links: [],
    category: "AI Agents",
    featured: false,
    private: true,
  },
  {
    title: "MeatyBrain",
    description:
      "AI knowledge and 'second brain' concept repo — internal architecture and exploratory work for agentic knowledge capture. Private repository.",
    status: "in-progress",
    links: [],
    category: "AI Agents",
    featured: false,
    private: true,
  },
  {
    title: "Daily Joe",
    description:
      "AI journaling and reflection app concept — a personal prototype for structured daily capture and review. Private repository.",
    status: "in-progress",
    links: [],
    category: "Apps",
    featured: false,
    private: true,
  },
];
