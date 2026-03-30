export type PortfolioStatus = "active" | "planned" | "archived";

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
}

export const portfolioItems: PortfolioItem[] = [
  {
    title: "@miethe/ui Component Library",
    description:
      "A personal React component library built with TypeScript, Tailwind CSS, and Storybook. Provides the shared UI primitives used across Signal to System and other personal projects. Designed with an artifact-first philosophy — every component ships with usage docs, visual tests, and accessibility notes.",
    status: "active",
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
];
