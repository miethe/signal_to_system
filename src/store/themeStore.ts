import { atom } from "nanostores";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Theme = "light" | "dark";
export type PerformanceMode = "rich" | "lite";

// ---------------------------------------------------------------------------
// Storage keys
// ---------------------------------------------------------------------------

const THEME_KEY = "s2s-theme";
const PERF_KEY = "s2s-performance-mode";

// ---------------------------------------------------------------------------
// Atoms
// ---------------------------------------------------------------------------

export const $theme = atom<Theme>("light");
export const $performanceMode = atom<PerformanceMode>("rich");

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------

/**
 * Read persisted preferences and system dark-mode preference, then set the
 * atoms accordingly. Call this once on the client side (e.g. in a layout
 * component's onMount or a <script> tag).
 */
export function initTheme(): void {
  if (typeof window === "undefined") return;

  // Theme: stored value → system preference → default 'light'
  const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null;
  if (storedTheme === "light" || storedTheme === "dark") {
    $theme.set(storedTheme);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    $theme.set(prefersDark ? "dark" : "light");
  }

  // Performance mode: stored value → network hint → default 'rich'
  const storedPerf = localStorage.getItem(PERF_KEY) as PerformanceMode | null;
  if (storedPerf === "rich" || storedPerf === "lite") {
    $performanceMode.set(storedPerf);
  } else {
    const conn = (navigator as any).connection;
    if (
      conn &&
      (conn.saveData ||
        conn.effectiveType === "slow-2g" ||
        conn.effectiveType === "2g")
    ) {
      $performanceMode.set("lite");
    }
  }

  // Apply classes immediately to avoid flash
  applyThemeClass($theme.get());
  applyPerfClass($performanceMode.get());
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

/** Toggle between light and dark themes and persist. */
export function toggleTheme(): void {
  const next: Theme = $theme.get() === "light" ? "dark" : "light";
  $theme.set(next);

  if (typeof window !== "undefined") {
    localStorage.setItem(THEME_KEY, next);
    applyThemeClass(next);
  }
}

/** Toggle between rich and lite performance modes and persist. */
export function togglePerformanceMode(): void {
  const next: PerformanceMode =
    $performanceMode.get() === "rich" ? "lite" : "rich";
  $performanceMode.set(next);

  if (typeof window !== "undefined") {
    localStorage.setItem(PERF_KEY, next);
    applyPerfClass(next);
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function applyThemeClass(theme: Theme): void {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

function applyPerfClass(mode: PerformanceMode): void {
  document.documentElement.classList.toggle("perf-lite", mode === "lite");
}
