// ---------------------------------------------------------------------------
// Running Thread Registry
// ---------------------------------------------------------------------------
//
// Declarative beat lists for essays that carry a single worked example from
// beginning to outcome. `ThreadStoryboard` is now the only place a beat's
// recap and figure render; `ThreadBeat`'s marker variant and `ThreadRail`
// read this same registry to stay in sync with it (see COMPONENT-API.md in
// docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/v2-research-integrated/
// for the frozen contract this file implements).

export interface ThreadBeatImage {
  src: string; // "/assets/posts/<slug>/<file>.png"
  alt: string;
  caption?: string;
}

export interface ThreadBeat {
  id: string; // anchor id is `thread-${id}`
  n: number;
  label: string;
  recap: string; // 1-2 sentences; ThreadStoryboard is the ONLY place this renders
  image: ThreadBeatImage;
  secondaryImage?: ThreadBeatImage; // Detection only: the five-day elapsed frame
}

export interface Thread {
  slug: string;
  title: string;
  subject: string;
  beats: ThreadBeat[];
}

export const threads: Record<string, Thread> = {
  "the-registry-wave-agentic-artifact-supply-chain": {
    slug: "the-registry-wave-agentic-artifact-supply-chain",
    title: "The stale reviewer",
    subject: "task-completion-validator",
    beats: [
      {
        id: "incident",
        n: 1,
        label: "Incident",
        recap:
          "A reviewer skill's mandatory guard is fixed at the source. The registry reflects the fix; every project outside the source repository keeps loading the pre-fix copy.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-incident-resolution-flow.png",
          alt: "Flow diagram of the incident: a reviewer skill's guard is fixed at the source and reflected in the registry while every other project still loads the pre-fix deployed copy.",
          caption: "The fix lands at the source and reaches the registry immediately; the deployed copies haven't caught up yet.",
        },
      },
      {
        id: "divergence",
        n: 2,
        label: "Divergence",
        recap:
          "Same skill name, different instructions reaching the runtime: the registered version and the deployed bytes have quietly split, and nothing is comparing them.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-from-source-to-outcome.png",
          alt: "Diagram tracing one artifact from its source repository through the registry, deployment, and use, showing where intended and deployed state can separate.",
          caption: "The anchor view of how one artifact's state can fork on the way to a running session.",
        },
      },
      {
        id: "detection",
        n: 3,
        label: "Detection",
        recap:
          "A byte-comparison drift check on Aug 6 surfaces the gap. For five days the registry was right and the deployment was wrong, at the same time.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-detecting-silent-drift.png",
          alt: "Diagram of a byte-comparison drift check catching a deployed copy that no longer matches its registered source.",
          caption: "A byte comparison is what finally noticed the gap no one else was checking.",
        },
        secondaryImage: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-drift-across-five-days.png",
          alt: "Timeline showing five elapsed days during which the registry stayed correct and the deployed copies stayed stale, simultaneously.",
          caption: "Five days elapsed with the registry right and the deployment wrong at the same time.",
        },
      },
      {
        id: "reconcile",
        n: 4,
        label: "Reconcile",
        recap:
          "Not every difference is drift. One project is behind and needs the fix, another carries a deliberate local patch worth preserving, a third has a pin that's still policy-compliant.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/not-every-difference-is-drift.png",
          alt: "Three-project comparison showing one copy behind the source, one carrying a deliberate local change, and one intentionally pinned to an older revision.",
          caption: "Three projects, three different repairs: behind, local-ahead, and deliberately pinned aren't the same problem.",
        },
      },
      {
        id: "use",
        n: 5,
        label: "Use",
        recap:
          "By now the corrected copy is deployed everywhere it should be. The question isn't whether the guard is present anymore, it's whether it was actually followed this run.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-presence-vs-behavior.png",
          alt: "Diagram contrasting a guard's presence in a deployed file with whether that guard was actually followed during a run.",
          caption: "By now the guard is deployed everywhere it should be. The question isn't presence anymore, it's whether it was followed this run.",
        },
      },
      {
        id: "outcome",
        n: 6,
        label: "Outcome",
        recap:
          "What was missing wasn't the fix, it was a run record naming which reviewer version an agent session actually loaded.",
        image: {
          src: "/assets/posts/the-registry-wave-agentic-artifact-supply-chain/registry-wave-run-level-provenance-infographic.png",
          alt: "Infographic of a proposed run record connecting the loaded artifact version to review findings, verification evidence, and an acceptance decision.",
          caption: "Proposed run-evidence model: record the loaded reviewer version, and keep earlier unknown versions unknown.",
        },
      },
    ],
  },
};
