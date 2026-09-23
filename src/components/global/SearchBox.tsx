import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, FileText, ArrowRight, Compass, Tag } from 'lucide-react';

interface SearchResult {
  title: string;
  excerpt?: string;
  category?: string;
  url: string;
  tags?: string[];
  type?: 'post' | 'project' | 'story';
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

  // The newest published essay, drawn from the fetched index (already
  // sorted newest-first) — never invented. Skipped if the index is empty
  // or hasn't loaded yet.
  const newestEssay = index?.find((item) => item.type === 'post');

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
    // The v2 header's search field (mockup: 235x30 inset field with a lens
    // and placeholder). It is a trigger for the dialog, not a live input, so
    // it stays a button; below 1024px it collapses to the lens alone.
    return (
      <button
        type="button"
        onClick={open}
        aria-label="Search (Cmd+K)"
        title="Search (Cmd+K)"
        className="s2s-search s2s-focus"
      >
        <Search className="s2s-search__lens" aria-hidden="true" />
        <span className="s2s-search__placeholder">Search ideas, experiments, systems…</span>
      </button>
    );
  }

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[15vh]"
      style={{ background: 'var(--s2s-scrim)', backdropFilter: 'blur(4px)' }}
      role="presentation"
    >
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        className="w-full max-w-xl overflow-hidden rounded-[var(--s2s-radius-card)] border border-[var(--s2s-rule-strong)] bg-[var(--s2s-surface)] shadow-[var(--s2s-shadow-pop)]"
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
            <div className="px-4 py-10 text-center text-sm text-[var(--s2s-status-danger)]">{error}</div>
          )}

          {!loading && !error && query.trim() && results.length === 0 && (
            <div
              role="status"
              className="flex flex-col items-center gap-3 px-6 py-10 text-center"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--s2s-radius-control)] border border-[var(--s2s-rule-strong)] bg-[var(--s2s-inset)] text-[var(--s2s-ink-soft)]">
                <Search className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="text-sm font-medium text-[var(--s2s-ink)]">
                No matches for &ldquo;{query}&rdquo;
              </p>
              <p className="max-w-[32ch] text-sm text-[var(--s2s-ink-muted)]">
                Try a broader word, or browse by topic.
              </p>
              <a
                href="/tags/"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--s2s-accent)] hover:underline"
              >
                Browse by topic <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
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
            <div className="px-5 py-6">
              <p className="mb-4 text-center text-sm text-[var(--s2s-ink-muted)]">
                Search essays, build notes and topics
              </p>
              <ul className="flex flex-col gap-1">
                <li>
                  <a
                    href="/start-here/"
                    onClick={close}
                    className="flex items-center gap-3 rounded-[var(--s2s-radius-control)] px-3 py-2.5 text-sm text-[var(--s2s-ink-soft)] transition-colors hover:bg-[var(--s2s-inset)] hover:text-[var(--s2s-ink)]"
                  >
                    <Compass className="h-4 w-4 shrink-0 text-[var(--s2s-ink-subtle)]" aria-hidden="true" />
                    Start here
                  </a>
                </li>
                <li>
                  <a
                    href="/series/"
                    onClick={close}
                    className="flex items-center gap-3 rounded-[var(--s2s-radius-control)] px-3 py-2.5 text-sm text-[var(--s2s-ink-soft)] transition-colors hover:bg-[var(--s2s-inset)] hover:text-[var(--s2s-ink)]"
                  >
                    <Tag className="h-4 w-4 shrink-0 text-[var(--s2s-ink-subtle)]" aria-hidden="true" />
                    Series
                  </a>
                </li>
                {newestEssay && (
                  <li>
                    <a
                      href={newestEssay.url}
                      onClick={close}
                      className="flex items-center gap-3 rounded-[var(--s2s-radius-control)] px-3 py-2.5 text-sm text-[var(--s2s-ink-soft)] transition-colors hover:bg-[var(--s2s-inset)] hover:text-[var(--s2s-ink)]"
                    >
                      <FileText className="h-4 w-4 shrink-0 text-[var(--s2s-ink-subtle)]" aria-hidden="true" />
                      <span className="truncate">{newestEssay.title}</span>
                    </a>
                  </li>
                )}
              </ul>
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
