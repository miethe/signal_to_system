/**
 * Workflow Showcase — Nanostores state.
 *
 * Atoms:
 * - $activeStageId    — currently displayed stage id (from URL or selector)
 * - $activeStepIndex  — current step within the active stage (0-based)
 * - $expandedPanels   — Set of artifact types currently expanded
 *
 * Persistence: only `expandedPanels` persists to localStorage (user preference).
 * `activeStageId` and `activeStepIndex` are URL- and session-driven.
 *
 * See: docs/specs/workflow-showcase-spike.md (Appendix B — state sketch)
 *      docs/specs/workflow-showcase-implementation.md (WS-1.7)
 */

import { atom } from "nanostores";
import type { ArtifactType } from "../types/workflow";

// ---------------------------------------------------------------------------
// Storage keys
// ---------------------------------------------------------------------------

const PANELS_KEY = "s2s-ws-expanded-panels";

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

export const $activeStageId = atom<string>("");
export const $activeStepIndex = atom<number>(0);
export const $expandedPanels = atom<Set<ArtifactType>>(new Set(["prd"]));

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/** Set the active stage and reset step index to 0. */
export function setActiveStage(stageId: string): void {
  $activeStageId.set(stageId);
  $activeStepIndex.set(0);
}

/** Set the active step index (clamped 0..maxIndex). */
export function setActiveStep(index: number, maxIndex?: number): void {
  let next = Math.max(0, index);
  if (typeof maxIndex === "number") next = Math.min(next, maxIndex);
  $activeStepIndex.set(next);
}

/** Toggle an artifact panel open/closed and persist to localStorage. */
export function togglePanel(panel: ArtifactType): void {
  const current = $expandedPanels.get();
  const next = new Set(current);
  if (next.has(panel)) {
    next.delete(panel);
  } else {
    next.add(panel);
  }
  $expandedPanels.set(next);
  persistPanels(next);
}

/** Replace the expanded panel set explicitly (used by single-tab mobile mode). */
export function setExpandedPanels(panels: Set<ArtifactType>): void {
  $expandedPanels.set(panels);
  persistPanels(panels);
}

// ---------------------------------------------------------------------------
// Initialisation (client-only)
// ---------------------------------------------------------------------------

/**
 * Restore persisted expandedPanels from localStorage.
 * Idempotent. Safe to call multiple times (e.g. via React useEffect).
 */
export function initWorkflowStageState(): void {
  if (typeof window === "undefined") return;

  const stored = window.localStorage.getItem(PANELS_KEY);
  if (!stored) return;

  try {
    const parsed = JSON.parse(stored) as ArtifactType[];
    if (Array.isArray(parsed)) {
      $expandedPanels.set(new Set(parsed.filter(isArtifactType)));
    }
  } catch {
    // Ignore corrupt storage; fall back to default.
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function persistPanels(panels: Set<ArtifactType>): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PANELS_KEY, JSON.stringify([...panels]));
  } catch {
    // Storage quota or disabled; silently ignore.
  }
}

function isArtifactType(v: unknown): v is ArtifactType {
  return v === "prd" || v === "plan" || v === "progress" || v === "agents";
}

// ---------------------------------------------------------------------------
// Auto-init on client import (mirrors themeStore pattern)
// ---------------------------------------------------------------------------

if (typeof window !== "undefined") {
  initWorkflowStageState();
}
