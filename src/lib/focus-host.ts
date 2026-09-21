/**
 * FocusHost controller — reading-experience-v2 P0-C
 * (docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/reading-experience-v2/ARCHITECTURE.md §3).
 *
 * Owns one native <dialog> (mounted by `FocusHost.astro`) that every
 * "Explore thread" / evidence / figure trigger on an essay page can open
 * in place, by cloning the matching `<template data-focus-view="kind:id">`
 * fragment `FocusTemplates.astro` already rendered on the page — never a
 * client fetch, never a second hand-written explanation of a beat/record.
 *
 * Every trigger is first and always a real `<a href>` to the standalone
 * route P0-B built (`/essays/<slug>/thread/<beat>/`, `/essays/<slug>/evidence/`,
 * `/evidence/<record>/`, `/essays/<slug>/figure/<id>/`). This module only
 * decides, on an unmodified primary click, whether to intercept that link
 * and render the matching template in the dialog instead of navigating —
 * derived from the clicked link's own `href` (a static route shape), never
 * from author-added `data-kind`/`data-key` markup. That keeps every
 * existing "Explore thread" / rail / prev-next / figure link correct by
 * construction: the standalone route and the overlay agree because they
 * are reading the same URL.
 *
 * History is owned directly (`pushState`/`replaceState`/one `popstate`
 * listener) rather than integrated with Astro ClientRouter, because
 * ClientRouter is not wired anywhere in this codebase today — see
 * ARCHITECTURE.md §1's correction to its own brief before changing this.
 */

type FocusKind = 'thread' | 'evidence' | 'figure';
type EntryKind = FocusKind | 'root';

interface FocusEntry {
  kind: EntryKind;
  id: string;
  parentKey: string | null;
  scrollTop: number;
  focusTargetId: string | null;
}

interface RootSnapshot {
  x: number;
  y: number;
  trigger: HTMLElement | null;
  /** A stable fallback focus target near `trigger`, in case it's gone by the time we restore. */
  headingId: string | null;
  anchorId: string | null;
  offsetWithinAnchor: number;
  viewportWidth: number;
  viewportHeight: number;
}

type FocusAction =
  | { type: 'open'; kind: FocusKind; id: string }
  | { type: 'back' }
  | { type: 'jump'; anchorId: string };

const THREAD_RE = /^\/essays\/([^/]+)\/thread\/([^/]+)\/?$/;
const EVIDENCE_INDEX_RE = /^\/essays\/([^/]+)\/evidence\/?$/;
const EVIDENCE_RECORD_RE = /^\/evidence\/([^/]+)\/?$/;
const FIGURE_RE = /^\/essays\/([^/]+)\/figure\/([^/]+)\/?$/;
const ESSAY_ROOT_RE = /^\/essays\/([^/]+)\/?$/;

/**
 * Reads the clicked link's own URL and returns what it means to FocusHost,
 * or `null` if it's none of its concern (an ordinary in-page anchor, an
 * external link, a route it doesn't own). Distinguishes "Back to essay"
 * from "Read this scene in the essay" purely by hash: the former is the
 * bare essay URL, the latter carries `#thread-<beatId>` — matching the two
 * links' actual, distinct hrefs (`ThreadFocus.astro`/`EvidenceFocus.astro`
 * write them differently on purpose).
 */
function parseFocusAction(pathname: string, hash: string): FocusAction | null {
  let match = THREAD_RE.exec(pathname);
  if (match) return { type: 'open', kind: 'thread', id: match[2] };

  match = FIGURE_RE.exec(pathname);
  if (match) return { type: 'open', kind: 'figure', id: match[2] };

  match = EVIDENCE_INDEX_RE.exec(pathname);
  if (match) return { type: 'open', kind: 'evidence', id: 'all' };

  match = EVIDENCE_RECORD_RE.exec(pathname);
  if (match) return { type: 'open', kind: 'evidence', id: match[1] };

  match = ESSAY_ROOT_RE.exec(pathname);
  if (match) {
    const anchorId = hash.replace(/^#/, '');
    if (anchorId.startsWith('thread-')) return { type: 'jump', anchorId };
    if (!hash) return { type: 'back' };
  }

  return null;
}

function reduceMotion(): boolean {
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.classList.contains('perf-lite')
  );
}

export function initFocusHost(): void {
  const dialogEl = document.querySelector<HTMLDialogElement>('[data-focus-dialog]');
  if (!dialogEl || typeof dialogEl.showModal !== 'function') return;
  if (dialogEl.dataset.focusHostReady === 'true') return;
  dialogEl.dataset.focusHostReady = 'true';

  const essaySlug = dialogEl.dataset.essaySlug ?? '';
  const docToken = Math.random().toString(36).slice(2);
  // Browser history otherwise restores the root entry's old scroll position
  // after our popstate handler, overwriting the explicit return snapshot.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

  const entries = new Map<string, FocusEntry>();
  let seq = 0;
  let rootKey: string | null = null;
  let currentKey: string | null = null;
  let origin: RootSnapshot | null = null;
  let historyCapable = true;
  let pendingAfterRestore: (() => void) | null = null;
  let previousBodyStyle: string | null = null;

  const generateKey = (): string => {
    seq += 1;
    return `focus-${seq}`;
  };

  const stateFor = (key: string): Record<string, unknown> => ({
    ...((history.state as Record<string, unknown> | null) ?? {}),
    rwFocus: { doc: docToken, key },
  });

  const writeHistory = (method: 'pushState' | 'replaceState', state: unknown, url: string): boolean => {
    try {
      history[method](state, '', url);
      return true;
    } catch {
      historyCapable = false;
      return false;
    }
  };

  const isOwnHistoryState = (key: string | null): boolean => {
    const state = history.state as { rwFocus?: { doc: string; key: string } } | null;
    return Boolean(key) && state?.rwFocus?.doc === docToken && state?.rwFocus?.key === key;
  };

  const localHref = (kind: FocusKind, id: string): string => {
    switch (kind) {
      case 'thread':
        return `/essays/${essaySlug}/thread/${id}/`;
      case 'figure':
        return `/essays/${essaySlug}/figure/${id}/`;
      case 'evidence':
        return id === 'all' ? `/essays/${essaySlug}/evidence/` : `/evidence/${id}/`;
    }
  };

  const templateFor = (kind: EntryKind, id: string): HTMLTemplateElement | null => {
    if (kind === 'root') return null;
    const safeId = id.replace(/"/g, '\\"');
    return document.querySelector<HTMLTemplateElement>(
      `[data-focus-templates] template[data-focus-view="${kind}:${safeId}"]`,
    );
  };

  const closePrivateFigureLightboxes = () => {
    // Hard invariant (ARCHITECTURE.md §3 risk 3): Figure.astro's own private
    // lightbox and this shared dialog must never both be open at once.
    document.querySelectorAll<HTMLDialogElement>('[data-figure-dialog][open]').forEach((lightbox) => {
      lightbox.close();
    });
  };

  const lockScroll = () => {
    const y = window.scrollY;
    previousBodyStyle = document.body.getAttribute('style');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  };

  const unlockScroll = () => {
    if (previousBodyStyle === null) {
      document.body.removeAttribute('style');
    } else {
      document.body.setAttribute('style', previousBodyStyle);
    }
    previousBodyStyle = null;
  };

  const captureOrigin = (trigger: HTMLElement | null): RootSnapshot => {
    const anchors = Array.from(document.querySelectorAll<HTMLElement>('.section-marker > h2, .thread-scene'));
    // A scene trigger has a stable, explicit scene anchor. Prefer it over a
    // preceding section heading so a viewport reflow restores the selected
    // scene's relative position rather than a stale section offset.
    const scene = trigger?.closest<HTMLElement>('.thread-scene') ?? null;
    const anchor = scene ?? anchors.filter((candidate) => candidate.getBoundingClientRect().top <= 96).at(-1) ?? anchors[0] ?? null;
    return { x: window.scrollX, y: window.scrollY, trigger, headingId: trigger?.closest('section')?.querySelector('h2, h3')?.id ?? null, anchorId: anchor?.id ?? null, offsetWithinAnchor: anchor ? window.scrollY - (anchor.getBoundingClientRect().top + window.scrollY) : 0, viewportWidth: window.innerWidth, viewportHeight: window.innerHeight };
  };

  const saveCurrentEntryState = () => {
    if (!currentKey) return;
    const entry = entries.get(currentKey);
    if (!entry) return;
    entry.scrollTop = dialogEl.scrollTop;
    const active = document.activeElement;
    if (active instanceof HTMLElement && dialogEl.contains(active)) {
      const token = active.dataset.focusToken ?? `ft-${++seq}`;
      active.dataset.focusToken = token;
      entry.focusTargetId = token;
    } else {
      entry.focusTargetId = null;
    }
  };

  const focusEntryTitle = (entry: FocusEntry, isRestore: boolean) => {
    requestAnimationFrame(() => {
      // The dialog's accessible name always comes from the view's own
      // title, regardless of what was focused when the entry was saved.
      const title = dialogEl.querySelector<HTMLElement>('h2, h3');
      if (title) {
        if (!title.id) title.id = `focus-host-title-${++seq}`;
        dialogEl.setAttribute('aria-labelledby', title.id);
      } else {
        dialogEl.removeAttribute('aria-labelledby');
      }

      // Initial focus target: the element that had focus when this entry
      // was last left (restore), else the title itself (fresh open) — never
      // a giant aria-describedby wrapper.
      let target: HTMLElement | null = null;
      if (isRestore && entry.focusTargetId) {
        target = dialogEl.querySelector<HTMLElement>(`[data-focus-token="${entry.focusTargetId}"]`);
      }
      if (!target) target = title;
      if (target) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    });
  };

  const renderEntry = (entry: FocusEntry, isRestore: boolean) => {
    const template = templateFor(entry.kind, entry.id);
    if (!template) return;
    dialogEl.replaceChildren(template.content.cloneNode(true));
    if (!dialogEl.open) dialogEl.showModal();
    dialogEl.scrollTop = isRestore ? entry.scrollTop : 0;
    focusEntryTitle(entry, isRestore);
  };

  const restoreFocusToOrigin = (snapshot: RootSnapshot | null) => {
    if (snapshot?.trigger?.isConnected) {
      snapshot.trigger.focus({ preventScroll: true });
      return;
    }
    const fallback =
      (snapshot?.headingId ? document.getElementById(snapshot.headingId) : null) ??
      document.querySelector<HTMLElement>('article h1') ??
      document.querySelector<HTMLElement>('h1');
    if (fallback) {
      if (!fallback.hasAttribute('tabindex')) fallback.setAttribute('tabindex', '-1');
      fallback.focus({ preventScroll: true });
    }
  };

  const scrollImmediately = (x: number, y: number) => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ left: x, top: y, behavior: 'auto' });
    document.documentElement.style.scrollBehavior = previous;
  };

  const restoreRoot = (afterRestore?: () => void) => {
    if (dialogEl.open) dialogEl.close();
    unlockScroll();
    const snapshot = origin;
    entries.clear();
    currentKey = null;
    rootKey = null;
    requestAnimationFrame(() => {
      // `close()` and undoing the fixed-body lock do not make the essay's
      // height available in the same frame. Restoring and clamping there
      // turns any deep position into zero because scrollHeight is viewport
      // height while the modal/lock transition is still being committed.
      requestAnimationFrame(() => {
        if (snapshot) {
          const anchor = snapshot.anchorId ? document.getElementById(snapshot.anchorId) : null;
          const viewportChanged = snapshot.viewportWidth !== window.innerWidth || snapshot.viewportHeight !== window.innerHeight;
          const y = anchor
            ? anchor.getBoundingClientRect().top + window.scrollY + (viewportChanged ? 0 : snapshot.offsetWithinAnchor)
            : snapshot.y;
          const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
          scrollImmediately(snapshot.x, Math.max(0, Math.min(y, maxY)));
        }
        if (afterRestore) afterRestore();
        else restoreFocusToOrigin(snapshot);
      });
    });
  };

  const jump = (anchorId: string) => {
    const target = document.getElementById(anchorId);
    if (!target) return;
    writeHistory('replaceState', history.state, `#${anchorId}`);
    const scrollMargin = Number.parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
    const y = target.getBoundingClientRect().top + window.scrollY - scrollMargin;
    scrollImmediately(window.scrollX, y);
    const heading = target.querySelector<HTMLElement>('h2, h3') ?? target;
    requestAnimationFrame(() => {
      if (!heading.hasAttribute('tabindex')) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    });
  };

  const closeOne = () => {
    if (!dialogEl.open) return;
    saveCurrentEntryState();
    if (historyCapable && isOwnHistoryState(currentKey)) {
      history.back();
      return;
    }
    const current = currentKey ? entries.get(currentKey) : null;
    const parentKey = current?.parentKey ?? null;
    if (parentKey && parentKey !== rootKey && entries.has(parentKey)) {
      currentKey = parentKey;
      renderEntry(entries.get(parentKey) as FocusEntry, true);
    } else {
      restoreRoot();
    }
  };

  const closeAll = (afterRestore?: () => void) => {
    if (!dialogEl.open) {
      afterRestore?.();
      return;
    }
    saveCurrentEntryState();
    let depth = 0;
    let key = currentKey;
    while (key && key !== rootKey) {
      depth += 1;
      key = entries.get(key)?.parentKey ?? null;
    }
    if (historyCapable && depth > 0 && key === rootKey && isOwnHistoryState(currentKey)) {
      pendingAfterRestore = afterRestore ?? null;
      history.go(-depth);
      return;
    }
    restoreRoot(afterRestore);
  };

  const open = (kind: FocusKind, id: string, trigger: HTMLElement | null): boolean => {
    const template = templateFor(kind, id);
    if (!template) return false;

    closePrivateFigureLightboxes();

    const wasOpen = dialogEl.open;

    if (!wasOpen) {
      const candidateRootKey = generateKey();
      if (!writeHistory('replaceState', stateFor(candidateRootKey), window.location.href)) return false;
      origin = captureOrigin(trigger);
      rootKey = candidateRootKey;
      entries.clear();
      entries.set(rootKey, { kind: 'root', id: '', parentKey: null, scrollTop: 0, focusTargetId: null });
      currentKey = rootKey;
    } else {
      saveCurrentEntryState();
    }

    const current = currentKey ? entries.get(currentKey) ?? null : null;

    // Clicking a link back to this entry's own parent (e.g. FigureViewer's
    // "Back to thread focus" reached via Thread → Figure) is a pop, not a
    // fresh push — the destination already exists one level up.
    if (current?.parentKey) {
      const parent = entries.get(current.parentKey);
      if (parent && parent.kind === kind && parent.id === id) {
        closeOne();
        return true;
      }
    }

    const currentKind: EntryKind | undefined = current?.kind;
    const isSwap = currentKind !== undefined && currentKind !== 'root' && currentKind === kind;

    if (isSwap && current && currentKey) {
      if (!writeHistory('replaceState', stateFor(currentKey), localHref(kind, id))) {
        if (!wasOpen) restoreRoot();
        return false;
      }
      current.kind = kind;
      current.id = id;
      current.scrollTop = 0;
      current.focusTargetId = null;
      if (!wasOpen) lockScroll();
      renderEntry(current, false);
      return true;
    }

    const key = generateKey();
    const parentKey = currentKey;
    if (!writeHistory('pushState', stateFor(key), localHref(kind, id))) {
      if (!wasOpen) restoreRoot();
      return false;
    }
    const entry: FocusEntry = { kind, id, parentKey, scrollTop: 0, focusTargetId: null };
    entries.set(key, entry);
    currentKey = key;
    if (!wasOpen) lockScroll();
    renderEntry(entry, false);
    return true;
  };

  window.addEventListener('popstate', (event) => {
    const state = (event.state as { rwFocus?: { doc: string; key: string } } | null)?.rwFocus;

    if (!state || state.doc !== docToken) {
      if (dialogEl.open) restoreRoot();
      return;
    }

    if (state.key === rootKey || !entries.has(state.key)) {
      const cb = pendingAfterRestore;
      pendingAfterRestore = null;
      restoreRoot(cb ?? undefined);
      return;
    }

    currentKey = state.key;
    const entry = entries.get(state.key) as FocusEntry;
    if (!dialogEl.open) {
      if (!origin) return; // Nothing sane to reopen into without a captured origin.
      lockScroll();
    }
    renderEntry(entry, true);
  });

  dialogEl.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeOne();
  });

  dialogEl.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = Array.from(
      dialogEl.querySelectorAll<HTMLElement>(
        'a[href], area[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hidden && element.getClientRects().length > 0);
    if (focusable.length === 0) {
      event.preventDefault();
      dialogEl.focus({ preventScroll: true });
      return;
    }
    const first = focusable[0];
    const last = focusable.at(-1) as HTMLElement;
    const active = document.activeElement as HTMLElement | null;
    if (event.shiftKey ? active === first || !dialogEl.contains(active) : active === last || !dialogEl.contains(active)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus({ preventScroll: true });
    }
  });

  document.addEventListener('click', (event) => {
    const targetEl = event.target as Element | null;
    if (!targetEl) return;

    const closeButton = targetEl.closest<HTMLButtonElement>('[data-focus-close]');
    if (closeButton) {
      event.preventDefault();
      closeOne();
      return;
    }

    const anchor = targetEl.closest<HTMLAnchorElement>('a[href]');
    if (!anchor) return;
    if (anchor.hasAttribute('data-focus-copy-link')) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (event.defaultPrevented) return;
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;

    let url: URL;
    try {
      url = new URL(anchor.href, window.location.href);
    } catch {
      return;
    }
    if (url.origin !== window.location.origin) return;

    const action = parseFocusAction(url.pathname, url.hash);
    if (!action) return;

    if (action.type === 'back') {
      if (!dialogEl.open) return;
      event.preventDefault();
      closeAll();
      return;
    }

    if (action.type === 'jump') {
      if (!dialogEl.open) return;
      event.preventDefault();
      closeAll(() => jump(action.anchorId));
      return;
    }

    const opened = open(action.kind, action.id, anchor);
    if (opened) event.preventDefault();
  });
}
