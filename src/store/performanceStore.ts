/**
 * Re-export performanceMode atoms from the consolidated themeStore.
 * This file is kept for backwards compatibility in case other modules
 * import from here directly.
 */
export {
  $performanceMode,
  togglePerformanceMode,
  type PerformanceMode,
} from './themeStore';
