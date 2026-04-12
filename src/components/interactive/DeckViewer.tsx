/**
 * DeckViewer — slide deck viewer component.
 *
 * Renders a series of slides with title and content, with prev/next navigation.
 *
 * Usage in Astro:
 *   <DeckViewer
 *     client:visible
 *     slides={[{ title: "Intro", content: "Hello world" }]}
 *   />
 */

import { useState } from "react";
import { useStore } from "@nanostores/react";
import { $performanceMode } from "../../store/performanceStore";

interface Slide {
  title: string;
  content: string;
  /** Optional speaker notes */
  notes?: string;
}

interface DeckViewerProps {
  slides: Slide[];
  title?: string;
  className?: string;
}

export default function DeckViewer({ slides, title, className = "" }: DeckViewerProps) {
  const mode = useStore($performanceMode);
  const [current, setCurrent] = useState(0);
  const [showNotes, setShowNotes] = useState(false);

  if (slides.length === 0) {
    return (
      <div className={`rounded-xl border border-dashed border-zinc-300 p-8 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 ${className}`}>
        No slides provided.
      </div>
    );
  }

  const slide = slides[current];
  const total = slides.length;
  const isFirst = current === 0;
  const isLast = current === total - 1;
  const progress = ((current + 1) / total) * 100;

  function prev() { if (!isFirst) setCurrent((c) => c - 1); }
  function next() { if (!isLast) setCurrent((c) => c + 1); }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next();
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") prev();
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900 ${className}`}
      aria-label={title ?? "Slide deck"}
      onKeyDown={handleKey}
      tabIndex={0}
    >
      {/* Progress bar */}
      <div className="h-1 bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        />
      </div>

      {/* Slide area */}
      <div className="flex min-h-72 flex-col items-center justify-center px-10 py-12 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          {current + 1} / {total}
          {title && <> &middot; {title}</>}
        </p>
        <h2 className="mb-5 text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50">
          {slide.title}
        </h2>
        <p className="max-w-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
          {slide.content}
        </p>
      </div>

      {/* Speaker notes (rich mode only) */}
      {mode === "rich" && slide.notes && (
        <div className="border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => setShowNotes((v) => !v)}
            aria-expanded={showNotes}
            aria-controls="speaker-notes"
            className="w-full px-4 py-2 text-left text-xs text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
          >
            {showNotes ? "Hide" : "Show"} speaker notes
          </button>
          {showNotes && (
            <div id="speaker-notes" className="border-t border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800/50">
              <p className="text-xs italic text-zinc-600 dark:text-zinc-400">{slide.notes}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 dark:border-zinc-800">
        <button
          onClick={prev}
          disabled={isFirst}
          aria-label="Previous slide"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Prev
        </button>

        {/* Dot indicators */}
        <div className="flex gap-1.5" aria-hidden="true">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={[
                "h-1.5 rounded-full transition-all",
                i === current
                  ? "w-4 bg-indigo-500"
                  : "w-1.5 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500",
              ].join(" ")}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={isLast}
          aria-label="Next slide"
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
