// ---------------------------------------------------------------------------
// Running Thread Registry
// ---------------------------------------------------------------------------
//
// Declarative beat lists for essays that carry a single worked example from
// beginning to outcome. Components use this registry to keep inline beats and
// the desktop progress rail in sync.

export interface ThreadBeat {
  id: string;
  n: number;
  label: string;
  recap: string;
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
        label: "The incident",
        recap: "A reviewer skill's mandatory guard is fixed at source. The registry shows the fix.",
      },
      {
        id: "deployment",
        n: 2,
        label: "Deployment",
        recap: "Every other project keeps loading an old deployed copy: same name, different instructions.",
      },
      {
        id: "use",
        n: 3,
        label: "Use",
        recap: "The guard's presence in a file is not evidence the guard was followed.",
      },
      {
        id: "drift",
        n: 4,
        label: "Drift",
        recap: "Five days pass. The registry is right and the machine is wrong at the same time.",
      },
      {
        id: "detection",
        n: 5,
        label: "Detection",
        recap: "A byte-comparison drift check on Aug 6 surfaces the gap.",
      },
      {
        id: "outcome",
        n: 6,
        label: "Outcome",
        recap: "What was missing was a run record naming which reviewer version actually loaded.",
      },
    ],
  },
};
