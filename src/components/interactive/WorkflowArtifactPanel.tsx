/**
 * WorkflowArtifactPanel — tabbed (desktop) / accordion (mobile) artifact display.
 *
 * Renders the PRD / Plan / Progress / Agents content for the current step.
 * Mono font for code-shaped content (yaml, json, markdown); prose for text.
 * Copy-to-clipboard button per panel.
 *
 * On desktop (>= 640px): tab row along the top, one active panel body.
 *   - Tab buttons: role="tab", aria-selected, aria-controls pointing at the panel.
 *   - Container: role="tablist".
 *   - Panel: role="tabpanel", aria-labelledby pointing at the active tab.
 *
 * On mobile (< 640px): vertical accordion.
 *   - Each header button: aria-expanded, aria-controls pointing at its content.
 *   - Content region: id matching aria-controls, hidden via height-0 when collapsed.
 *   - Touch targets >= 44px.
 *
 * Respects prefers-reduced-motion: no CSS transitions when reduced motion set.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  Artifact,
  ArtifactType,
  StepPanels,
} from "../../types/workflow";
import { trackPanelToggle } from "../../lib/showcase-analytics";

interface WorkflowArtifactPanelProps {
  panels: StepPanels | undefined;
  /** Currently expanded panel set from Nanostores (drives default tab). */
  expanded: Set<ArtifactType>;
  /** Toggle handler from Nanostores (persists to localStorage). */
  onTogglePanel: (panel: ArtifactType) => void;
  /** Stage id forwarded for analytics. */
  stageId?: string;
}

const ALL_TYPES: ArtifactType[] = ["prd", "plan", "progress", "agents"];

const TYPE_LABELS: Record<ArtifactType, string> = {
  prd: "PRD",
  plan: "Plan",
  progress: "Progress",
  agents: "Agents",
};

// Detect mobile via matchMedia (640px = Tailwind sm breakpoint).
function useIsMobile(): boolean {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

export default function WorkflowArtifactPanel({
  panels,
  expanded,
  onTogglePanel,
  stageId = "",
}: WorkflowArtifactPanelProps) {
  const isMobile = useIsMobile();

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

  // Re-sync if the step changes and current tab is no longer available.
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

  const handleTabClick = useCallback(
    (t: ArtifactType) => {
      const wasExpanded = activeTab === t;
      setActiveTab(t);
      if (!expanded.has(t)) onTogglePanel(t);
      trackPanelToggle(stageId, t, !wasExpanded);
    },
    [activeTab, expanded, onTogglePanel, stageId],
  );

  const activeArtifact: Artifact | undefined =
    activeTab && panels ? panels[activeTab] : undefined;

  // Stable IDs for ARIA relationships.
  const tabId = (t: ArtifactType) => `ws-tab-${t}`;
  const panelId = (t: ArtifactType) => `ws-panel-${t}`;

  if (isMobile) {
    // Mobile accordion: each type is an independent expand/collapse section.
    return (
      <div className="ws-panel ws-panel--accordion">
        {availableTypes.map((t) => {
          const isOpen = activeTab === t;
          const artifact = panels?.[t];
          return (
            <div key={t} className="ws-panel__accordion-item">
              <button
                type="button"
                id={tabId(t)}
                className="ws-panel__accordion-trigger"
                aria-expanded={isOpen}
                aria-controls={panelId(t)}
                onClick={() => handleTabClick(t)}
              >
                <span>{TYPE_LABELS[t]}</span>
                <span className="ws-panel__accordion-chevron" aria-hidden="true">
                  {isOpen ? "▲" : "▼"}
                </span>
              </button>
              <div
                id={panelId(t)}
                role="region"
                aria-labelledby={tabId(t)}
                className={`ws-panel__accordion-body${isOpen ? " ws-panel__accordion-body--open" : ""}`}
                hidden={!isOpen}
              >
                {artifact && isOpen && (
                  <>
                    <div className="ws-panel__accordion-copy">
                      <CopyButton
                        text={artifact.content}
                        label={`Copy ${TYPE_LABELS[t]}`}
                      />
                    </div>
                    <ArtifactContent artifact={artifact} />
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Desktop tab layout.
  return (
    <div className="ws-panel">
      <div
        className="ws-panel__tabs"
        role="tablist"
        aria-label="Artifact panels"
      >
        {availableTypes.map((t) => (
          <button
            key={t}
            id={tabId(t)}
            type="button"
            role="tab"
            aria-selected={activeTab === t}
            aria-controls={panelId(t)}
            className="ws-panel__tab"
            tabIndex={activeTab === t ? 0 : -1}
            onClick={() => handleTabClick(t)}
          >
            {TYPE_LABELS[t]}
          </button>
        ))}
        {activeArtifact && (
          <CopyButton
            text={activeArtifact.content}
            label={`Copy ${TYPE_LABELS[activeTab!]}`}
          />
        )}
      </div>
      {activeTab && (
        <div
          id={panelId(activeTab)}
          role="tabpanel"
          aria-labelledby={tabId(activeTab)}
          className="ws-panel__body"
          tabIndex={0}
        >
          {activeArtifact ? (
            <ArtifactContent artifact={activeArtifact} />
          ) : (
            <p className="ws-panel__empty">Select a panel to view its content.</p>
          )}
        </div>
      )}
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
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopied(false), 1500);
    } catch {
      /* permission denied; silently fail */
    }
  };

  // Clean up the timeout on unmount.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <button
      type="button"
      className="ws-panel__copy"
      onClick={copy}
      aria-label={copied ? `${label} — copied` : label}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
