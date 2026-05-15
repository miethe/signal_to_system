/**
 * WorkflowMetrics — small fixed overlay showing tokens / throughput / cost.
 *
 * Position: bottom-right desktop, top-right mobile (CSS-driven).
 * Dismissible via close button (component-local state).
 * Adaptive contrast via dark translucent background with blur.
 */

import { useState } from "react";
import type { Metrics } from "../../types/workflow";

interface WorkflowMetricsProps {
  metrics: Metrics;
}

export default function WorkflowMetrics({ metrics }: WorkflowMetricsProps) {
  const [dismissed, setDismissed] = useState(false);
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
        type="button"
        className="ws-metrics__dismiss"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss metrics overlay"
      >
        ×
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
