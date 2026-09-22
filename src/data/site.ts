export const site = {
  title: "Signal to System",
  subtitle: "Architecture, Agents, and Execution for the Technical Executive",
  description:
    "A technical publication at the intersection of AI agents, agentic SDLC, architecture, platform engineering, and technical leadership.",
  siteUrl: "https://nickmiethe.com",

  author: {
    name: "Nick Miethe",
    role: "Technical executive · Architect · Builder",
    bioShort: "Technical executive, architect, and builder writing about AI agents, governed delivery, and the systems that shape modern software development.",
    bioLong: "Technical executive and architect with deep experience across AI systems, platform engineering, and enterprise software delivery. Former Red Hat solutions architect. Writing at the intersection of agentic AI, system design, and the organizational challenges of building great software.",
    avatar: {
      src: "/assets/nick-miethe-portrait.webp",
      width: 240,
      height: 263,
    },
    profileLinks: [
      { label: "About Nick", href: "/about/" },
      { label: "Portfolio", href: "/portfolio/" },
    ],
    social: {
      github: "https://github.com/miethe",
      linkedin: "https://linkedin.com/in/nickmiethe",
      twitter: "https://twitter.com/nickmiethe",
    },
  },

  /**
   * Primary navigation (S2S v2 shell; every mockup header shows exactly these
   * five). Sections that do not exist yet point at the nearest existing route
   * so the nav never 404s; `match` lists the path prefixes that light the
   * item up. Swap `href` when the real section ships:
   *   Writing   -> /writing/   (M2)   interim /essays/
   *   Labs      -> /labs/      (M3b)  interim /aos/ (the AOS research program)
   *   Notebooks -> /notebooks/ (M3b)  interim /dev-stories/ (build notes)
   *   Studio    -> /studio/    (M1b+) interim /portfolio/ui/ (component library)
   */
  nav: [
    { label: "Writing", href: "/essays/", match: ["/essays", "/series", "/tags", "/topics", "/start-here", "/glossary"] },
    { label: "Labs", href: "/aos/", match: ["/aos", "/systems", "/evidence", "/workflow-showcase"] },
    { label: "Projects", href: "/projects/", match: ["/projects", "/portfolio/"], exclude: ["/portfolio/ui"] },
    { label: "Notebooks", href: "/dev-stories/", match: ["/dev-stories"] },
    { label: "Studio", href: "/portfolio/ui/", match: ["/portfolio/ui", "/studio"] },
  ],

  /** Utility link right of search in the header (mockup: "About"). */
  navUtility: { label: "About", href: "/about/" },

  /** Secondary destinations, listed in the mobile menu only. */
  navMore: [
    { label: "Start here", href: "/start-here/" },
    { label: "Series", href: "/series/" },
    { label: "Portfolio", href: "/portfolio/" },
    { label: "Other sites", href: "/other-sites/" },
  ],

  footer: {
    /** Mockup footer copy (center tagline, right-edge two-line motto). */
    tagline: "Research deeper. Build what matters.",
    motto: ["A brighter tomorrow", "through better questions."],
    /** Mockup footer utility row. */
    bar: [
      { label: "About", href: "/about/" },
      { label: "RSS", href: "/rss.xml" },
      { label: "GitHub", href: "https://github.com/miethe", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/nickmiethe", external: true },
    ],
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
