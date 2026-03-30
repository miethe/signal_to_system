export type ExternalSiteType = "blog" | "project" | "profile" | "publication" | "tool";

export interface ExternalSite {
  title: string;
  url: string;
  description: string;
  type: ExternalSiteType;
  featured: boolean;
}

export const externalSites: ExternalSite[] = [
  {
    title: "MeatyBytes (Legacy Blog)",
    url: "https://meatybytes.io",
    description:
      "My previous technical blog covering OpenShift, platform engineering, and cloud-native infrastructure. Now archived; the best content is being updated and migrated here.",
    type: "blog",
    featured: true,
  },
  {
    title: "GitHub",
    url: "https://github.com/miethe",
    description:
      "Source code, open-source experiments, and personal projects — including the code behind this site.",
    type: "profile",
    featured: true,
  },
  {
    title: "LinkedIn",
    url: "https://linkedin.com/in/nickmiethe",
    description:
      "Professional background, career history, and occasional long-form posts on technical leadership and strategy.",
    type: "profile",
    featured: false,
  },
];
