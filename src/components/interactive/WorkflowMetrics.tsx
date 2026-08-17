/**
 * WorkflowMetrics — small fixed overlay showing tokens / throughput / cost.
 *
 * Position: bottom-right on desktop, top-right on mobile (< 640px), governed
 * by CSS in workflow-showcase.css. Repositions via media query so it does not
 * obscure the scrubber or CTA card on narrow viewports.
 *
 * Dismissible via close button. Focus is NOT trapped; the button is simply
 * focusable and triggers a state change that removes the element.
 *
 * Accessibility:
 * - role="status" on the aside (live region, polite by default).
 * - Close button has aria-label="Dismiss metrics overlay".
 * - After dismiss, focus returns to the document body (no focus trap).
 */

import { useRef, useState } from "react";
import type { Metrics } from "../../types/workflow";

interface WorkflowMetricsProps {
  metrics: Metrics;
}

export default function WorkflowMetrics({ metrics }: WorkflowMetricsProps) {
  const [dismissed, setDismissed] = useState(false);
  const dismissRef = useRef<HTMLButtonElement>(null);

  const handleDismiss = () => {
    setDismissed(true);
    // Return focus to body so no focus is stranded after the element unmounts.
    if (typeof document !== "undefined") {
      (document.activeElement as HTMLElement | null)?.blur();
    }
  };

  if (dismissed) return null;

  return (
    <aside
      className="ws-metrics"
      role="status"
      aria-label="Workflow metrics overlay"
    >
      <div className="ws-metrics__group">
        <span className="ws-metrics__label">Tokens</span>
        <span className="ws-metrics__value">{formatTokens(metrics.tokensUsed)}</span>
      </div>
      <div className="ws-metrics__group">
        <span className="ws-metrics__label">Throughput</span>
        <span className="ws-metrics__value">{formatThroughput(metrics.throughput)}</span>
      </div>
      <div className="ws-metrics__group">
        <span className="ws-metrics__label">Cost</span>
        <span className="ws-metrics__value">${metrics.cost.toFixed(2)}</span>
      </div>
      <button
        ref={dismissRef}
        type="button"
        className="ws-metrics__dismiss"
        onClick={handleDismiss}
        aria-label="Dismiss metrics overlay"
        title="Dismiss metrics overlay"
      >
        <span aria-hidden="true">&#x2715;</span>
      </button>
    </aside>
  );
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

function formatThroughput(n: number): string {
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K/s`;
  return `${n}/s`;
}
