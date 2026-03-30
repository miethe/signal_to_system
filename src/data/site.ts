export const site = {
  title: "Signal to System",
  subtitle: "Architecture, Agents, and Execution for the Technical Executive",
  description:
    "A technical publication at the intersection of AI agents, agentic SDLC, architecture, platform engineering, and technical leadership.",
  siteUrl: "https://signaltosystem.com",

  author: {
    name: "Nick Miethe",
    bio: "Technical executive, architect, and builder. Writing about AI agents, agentic SDLC, and the systems that shape modern software delivery.",
    avatar: "/brand/avatar.jpg",
    social: {
      github: "https://github.com/miethe",
      linkedin: "https://linkedin.com/in/nickmiethe",
      twitter: "https://twitter.com/nickmiethe",
    },
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "Essays", href: "/essays" },
    { label: "Series", href: "/series" },
    { label: "Projects", href: "/projects" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Other Sites", href: "/sites" },
    { label: "About", href: "/about" },
  ],

  footer: {
    links: [
      { label: "Essays", href: "/essays" },
      { label: "Series", href: "/series" },
      { label: "Projects", href: "/projects" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "About", href: "/about" },
      { label: "RSS", href: "/rss.xml" },
    ],
    social: [
      { label: "GitHub", href: "https://github.com/miethe" },
      { label: "LinkedIn", href: "https://linkedin.com/in/nickmiethe" },
      { label: "Twitter / X", href: "https://twitter.com/nickmiethe" },
    ],
  },

  defaultOgImage: "/brand/og-default.png",

  defaultDisclaimer:
    "The views expressed here are my own and do not represent any employer, client, or affiliated organization. Content is for informational purposes and reflects my personal opinions and experiences.",
} as const;

export type SiteConfig = typeof site;
