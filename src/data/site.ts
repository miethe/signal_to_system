export const site = {
  title: "Signal to System",
  subtitle: "Architecture, Agents, and Execution for the Technical Executive",
  description:
    "A technical publication at the intersection of AI agents, agentic SDLC, architecture, platform engineering, and technical leadership.",
  siteUrl: "https://nickmiethe.com",

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
    { label: "Dev Stories", href: "/dev-stories" },
    { label: "Series", href: "/series" },
    { label: "Projects", href: "/projects" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Other Sites", href: "/other-sites" },
    { label: "About", href: "/about" },
  ],

  footer: {
    links: [
      { label: "Essays", href: "/essays" },
      { label: "Dev Stories", href: "/dev-stories" },
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

  // Shown on the Dev Stories index and atop each automated story.
  devStories: {
    tagline: "Field notes from the agentic build loop.",
    disclaimer:
      "Dev Stories are drawn from the after-action records of my agentic execution workflow. They are assembled and edited with the help of AI agents, then reviewed before publishing. Expect real build detail, honest wins and losses, and the occasional rough edge that a hand-written essay would sand away.",
    disclaimerShort:
      "This is an automated artifact of the agentic execution workflow, edited for readability. The raw detail is preserved.",
  },
} as const;

export type SiteConfig = typeof site;
