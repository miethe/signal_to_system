import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, FileText, ArrowRight } from 'lucide-react';

interface SearchResult {
  title: string;
  excerpt?: string;
  category?: string;
  url: string;
  tags?: string[];
}

interface SearchIndex {
  items: SearchResult[];
}

export default function SearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [index, setIndex] = useState<SearchResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Fetch the search index on first open
  const fetchIndex = useCallback(async () => {
    if (index !== null) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/search.json');
      if (!res.ok) throw new Error(`Failed to load search index (${res.status})`);
      const data: SearchIndex = await res.json();
      setIndex(data.items ?? []);
    } catch (err) {
      setError('Search unavailable. Please try again later.');
      setIndex([]);
    } finally {
      setLoading(false);
    }
  }, [index]);

  const open = useCallback(() => {
    setIsOpen(true);
    fetchIndex();
  }, [fetchIndex]);

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setActiveIndex(-1);
  }, []);

  // Global keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          close();
        } else {
          open();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        close();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, open, close]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the element is rendered
      const t = setTimeout(() => inputRef.current?.focus(), 30);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;
    function onPointerDown(e: PointerEvent) {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        close();
      }
    }
    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [isOpen, close]);

  // Filter results when query changes
  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([]);
      setActiveIndex(-1);
      return;
    }

    const terms = query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const filtered = index
      .filter((item) => {
        const haystack = [
          item.title,
          item.excerpt ?? '',
          item.category ?? '',
          ...(item.tags ?? []),
        ]
          .join(' ')
          .toLowerCase();
        return terms.every((term) => haystack.includes(term));
      })
      .slice(0, 8);

    setResults(filtered);
    setActiveIndex(-1);
  }, [query, index]);

  // Arrow key navigation
  function onKeyDownInDialog(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) {
      window.location.href = results[activeIndex].url;
      close();
    }
  }

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={open}
        aria-label="Search (Cmd+K)"
        title="Search (Cmd+K)"
        className="flex h-9 items-center gap-2 rounded-md px-2.5 text-[var(--text-tertiary)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)] sm:px-3"
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="hidden text-sm sm:block">Search</span>
        <kbd className="hidden rounded border border-[var(--border)] bg-[var(--bg-muted)] px-1.5 py-0.5 text-xs text-[var(--text-disabled)] sm:block">
          ⌘K
        </kbd>
      </button>
    );
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
      style={{ background: 'rgba(2, 6, 23, 0.75)', backdropFilter: 'blur(4px)' }}
      role="presentation"
    >
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-base)] shadow-2xl"
        onKeyDown={onKeyDownInDialog}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-[var(--text-disabled)]" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts, series, projects…"
            className="min-w-0 flex-1 bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-disabled)] focus:outline-none"
            aria-label="Search query"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
          />
          <div className="flex items-center gap-2">
            <kbd className="rounded border border-[var(--border)] bg-[var(--bg-muted)] px-1.5 py-0.5 text-xs text-[var(--text-disabled)]">
              Esc
            </kbd>
            <button
              type="button"
              onClick={close}
              aria-label="Close search"
              className="flex h-6 w-6 items-center justify-center rounded text-[var(--text-disabled)] transition-colors hover:bg-[var(--bg-muted)] hover:text-[var(--text-secondary)]"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Results area */}
        <div className="max-h-96 overflow-y-auto">
          {loading && (
            <div className="px-4 py-10 text-center text-sm text-[var(--text-tertiary)]">
              Loading search index…
            </div>
          )}

          {error && !loading && (
            <div className="px-4 py-10 text-center text-sm text-red-400">{error}</div>
          )}

          {!loading && !error && query.trim() && results.length === 0 && (
            <div className="px-4 py-10 text-center text-sm text-[var(--text-tertiary)]">
              No results for{' '}
              <span className="font-medium text-[var(--text-primary)]">"{query}"</span>
            </div>
          )}

          {!loading && !error && results.length > 0 && (
            <ul
              ref={listRef}
              id="search-results"
              role="listbox"
              aria-label="Search results"
              className="py-2"
            >
              {results.map((result, i) => (
                <li
                  key={result.url}
                  id={`search-result-${i}`}
                  role="option"
                  aria-selected={i === activeIndex}
                >
                  <a
                    href={result.url}
                    onClick={close}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                      i === activeIndex
                        ? 'bg-[var(--accent-subtle)] text-[var(--text-primary)]'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <FileText
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--text-disabled)]"
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{result.title}</span>
                        {result.category && (
                          <span className="shrink-0 rounded-full bg-[var(--bg-muted)] px-2 py-0.5 text-xs text-[var(--text-tertiary)]">
                            {result.category}
                          </span>
                        )}
                      </div>
                      {result.excerpt && (
                        <p className="mt-0.5 line-clamp-1 text-xs text-[var(--text-tertiary)]">
                          {result.excerpt}
                        </p>
                      )}
                    </div>
                    <ArrowRight
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--text-disabled)]"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}

          {!loading && !error && !query.trim() && (
            <div className="px-4 py-8 text-center text-sm text-[var(--text-disabled)]">
              Type to search across all content
            </div>
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 border-t border-[var(--border-subtle)] px-4 py-2.5 text-xs text-[var(--text-disabled)]">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-[var(--border)] bg-[var(--bg-muted)] px-1 py-0.5 text-[var(--text-tertiary)]">↑</kbd>
            <kbd className="rounded border border-[var(--border)] bg-[var(--bg-muted)] px-1 py-0.5 text-[var(--text-tertiary)]">↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-[var(--border)] bg-[var(--bg-muted)] px-1 py-0.5 text-[var(--text-tertiary)]">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-[var(--border)] bg-[var(--bg-muted)] px-1 py-0.5 text-[var(--text-tertiary)]">Esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>
  );
}
