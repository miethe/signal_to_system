/**
 * WorkflowArtifactPanel — tabbed (desktop) / accordion (mobile) artifact display.
 *
 * Renders the PRD / Plan / Progress / Agents content for the current step.
 * Mono font for code-shaped content (yaml, json, markdown); prose for text.
 * Copy-to-clipboard button per panel.
 *
 * On desktop: tabs along the top, one active panel body.
 * On mobile: still tabs (compact), but body is scrollable to constrained max-height.
 */

import { useEffect, useMemo, useState } from "react";
import type {
  Artifact,
  ArtifactType,
  StepPanels,
} from "../../types/workflow";

interface WorkflowArtifactPanelProps {
  panels: StepPanels | undefined;
  /** Currently expanded panel set from Nanostores (drives default tab). */
  expanded: Set<ArtifactType>;
  /** Toggle handler from Nanostores (persists to localStorage). */
  onTogglePanel: (panel: ArtifactType) => void;
}

const ALL_TYPES: ArtifactType[] = ["prd", "plan", "progress", "agents"];

const TYPE_LABELS: Record<ArtifactType, string> = {
  prd: "PRD",
  plan: "Plan",
  progress: "Progress",
  agents: "Agents",
};

export default function WorkflowArtifactPanel({
  panels,
  expanded,
  onTogglePanel,
}: WorkflowArtifactPanelProps) {
  const availableTypes = useMemo<ArtifactType[]>(
    () => ALL_TYPES.filter((t) => panels && panels[t]),
    [panels],
  );

  // Active tab: prefer first expanded panel that exists; else first available.
  const initialActive: ArtifactType | null = useMemo(() => {
    const expandedAvailable = availableTypes.find((t) => expanded.has(t));
    return expandedAvailable ?? availableTypes[0] ?? null;
  }, [availableTypes, expanded]);

  const [activeTab, setActiveTab] = useState<ArtifactType | null>(initialActive);

  // Re-sync if the step changes and current tab is no longer available
  useEffect(() => {
    if (activeTab && !availableTypes.includes(activeTab)) {
      setActiveTab(availableTypes[0] ?? null);
    } else if (!activeTab && availableTypes.length > 0) {
      setActiveTab(availableTypes[0]);
    }
  }, [availableTypes, activeTab]);

  if (availableTypes.length === 0) {
    return (
      <div className="ws-panel" aria-live="polite">
        <div className="ws-panel__body">
          <p className="ws-panel__empty">No artifacts at this step.</p>
        </div>
      </div>
    );
  }

  const handleTabClick = (t: ArtifactType) => {
    setActiveTab(t);
    if (!expanded.has(t)) onTogglePanel(t);
  };

  const activeArtifact: Artifact | undefined =
    activeTab && panels ? panels[activeTab] : undefined;

  return (
    <div className="ws-panel">
      <div className="ws-panel__tabs" role="tablist" aria-label="Artifact panels">
        {availableTypes.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={activeTab === t}
            className="ws-panel__tab"
            onClick={() => handleTabClick(t)}
          >
            {TYPE_LABELS[t]}
          </button>
        ))}
        {activeArtifact && (
          <CopyButton text={activeArtifact.content} label={`Copy ${TYPE_LABELS[activeTab!]}`} />
        )}
      </div>
      <div className="ws-panel__body" role="tabpanel" aria-live="polite">
        {activeArtifact ? (
          <ArtifactContent artifact={activeArtifact} />
        ) : (
          <p className="ws-panel__empty">Select a panel to view its content.</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ArtifactContent({ artifact }: { artifact: Artifact }) {
  const isCode =
    artifact.contentType === "yaml" ||
    artifact.contentType === "json" ||
    artifact.contentType === "markdown";

  const className =
    "ws-panel__content " +
    (isCode ? "ws-panel__content--code" : "ws-panel__content--text");

  if (isCode) {
    return (
      <pre className={className}>
        <code>{artifact.content}</code>
      </pre>
    );
  }
  return <p className={className}>{artifact.content}</p>;
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* permission denied; silently fail */
    }
  };

  return (
    <button
      type="button"
      className="ws-panel__copy"
      onClick={copy}
      aria-label={label}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
