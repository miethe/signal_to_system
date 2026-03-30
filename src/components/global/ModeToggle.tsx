import { useStore } from '@nanostores/react';
import { Zap, ZapOff } from 'lucide-react';
import { $performanceMode, togglePerformanceMode } from '../../store/themeStore';

export default function ModeToggle() {
  const mode = useStore($performanceMode);
  const isRich = mode === 'rich';

  return (
    <button
      type="button"
      onClick={togglePerformanceMode}
      aria-label={isRich ? 'Switch to lite mode (reduced animations)' : 'Switch to rich mode'}
      title={isRich ? 'Lite mode: reduce animations & effects' : 'Rich mode: full experience'}
      className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
    >
      {isRich ? (
        <Zap className="h-4 w-4" aria-hidden="true" />
      ) : (
        <ZapOff className="h-4 w-4 text-[var(--text-disabled)]" aria-hidden="true" />
      )}
    </button>
  );
}
