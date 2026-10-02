---
title: "S2S essay standard (v1)"
status: active
version: 1
updated: 2026-10-02
exemplar: src/content/posts/the-registry-wave-agentic-artifact-supply-chain.mdx (as published on main, PR #145 + M2 reader #155)
gate: scripts/check-essay.mjs (npm run check:essay)
skill: .claude/skills/s2s-essay/SKILL.md
voice: docs/editorial/essay-voice-profile.md (exemplar-derived) + docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md (hand-edit-derived)
itt: node_01M3YVPJGXRM50C2F8K27GC5TG (A1) under work package node_01M3YVN500E2YZXWVNTDC82Y4F
---

# S2S essay standard (v1)

The shape every Signal to System **essay** (`contentType: essay`) should have, derived from the
published Registry Wave. It covers structure, components, voice pointers, and a machine checklist.
It does not cover imagery (hero art, figure rendering, running-thread images): that belongs to the
separate imagery effort and its standards (`docs/` imagery storyboards, #158/#161). Where this
standard names an image slot, it names the hook, never the picture.

The reader shell (`src/layouts/ReaderShell.astro`) already renders the Registry Wave composition
for every essay: frontispiece, rail with author + ExecutiveSignal + ReadingCompanion, section
markers, mobile Contents, series wayfinding, related content. **No layout work is needed to meet
this standard.** Meeting it is a content job: frontmatter, body components, data records, prose.

Precedence when sources disagree: Nick's hand edits (voice rules) > this standard > the exemplar's
incidental choices > older skills (`blog-drafter` references, `voice-writer` summary).

---

## 1. Anatomy (top to bottom)

| # | Movement | What it does in the exemplar | Required |
|---|---|---|---|
| 0 | **Frontmatter** | Full metadata set (section 2). `whyItMatters` + `leaderTakeaway` feed the shell's rail. | yes |
| 1 | **RevisionNote** (only when revised) | One sentence on what changed in this edition and why. Dated. Never a changelog. | if revised after publish |
| 2 | **ExecutiveSignal** | Restates `whyItMatters` / `takeaway` in flow so mobile readers get it. Same strings as frontmatter. | yes |
| 3 | **Cold open H2** | The H2 is a claim, not a topic ("The fix existed. The projects were still wrong."). Opens on a concrete, first-person incident in 1-2 short sentences, before any definition. | yes |
| 4 | **Thesis marker** | One `PullQuote variant="thesis-marker"` early (first ~15% of body) that names the thesis in under ~10 words. Then one plain question that the essay answers. | yes |
| 5 | **The harder problem** | Second H2 complicates the obvious fix ("not every difference should disappear"). This is where the essay earns its length. | yes |
| 6 | **Origin beat** | Dated, first-person "how I got here" paragraph, owning the build ("It was mid-late 2025 when I started building..."). Own systems introduced with a `<Term>` and a one-clause human intro. | yes |
| 7 | **What the field already solved** | Fair account of external/market work before claiming a gap. External claims are footnoted and scoped. `RelatedWork` component for adjacent research. | yes |
| 8 | **Mechanism movements** | 2-4 H2s that walk the running example through the lifecycle/argument. Each H2 is a declarative sentence ending in a period. H3s are allowed for sub-turns. | yes |
| 9 | **Running thread** | One worked example carried from beginning to outcome. In the exemplar: six beats (`ThreadScene` + `src/data/threads.ts`). Prose must carry the thread even where no ThreadScene is wired. | prose: yes; ThreadScene: imagery-gated (section 3.3) |
| 10 | **Boundaries** | Explicit "what this does not establish" (`BoundaryGrid`, or a plain paragraph). Assurances kept separate. | yes |
| 11 | **Where the system lied to us** | Candid failure section: where my own tooling reported one thing and I read it as another. Receipts inline (`ReceiptDisclosure`). | strongly recommended |
| 12 | **Implementation status** | `ImplementationStatus` rows: IMPLEMENTED / PARTIAL / PROPOSED / TO TEST. No row claims more than its receipt. | yes when the essay describes own systems |
| 13 | **What I can prove today** | Receipts rail: `ClaimBadge kind=observed|measured|proposed|external` paragraphs, each a dated method summary; optional link to the Evidence Focus route; one explicit sentence on what is *not* measured. | yes |
| 14 | **Inside my lab** (optional) | `<details>` with deeper technical view. | optional |
| 15 | **WhereThisSits** | Arc/series placement block (`<WhereThisSits slug=...>`), rendered from `src/data/reading-paths.json`. | yes for arc essays |
| 16 | **Close** | Short. Returns to the opening example in one paragraph and states what it needed, then hands the open question to the next essay. Nick spends the most editorial effort here. | yes |
| 17 | **Sources** | `## Sources` with one scoping sentence, then footnotes. External sources state preview/GA/tier scope; lab receipts say "Lab implementation receipt, <date>:" and describe method, not ids. | yes |

Rhythm targets observed in the exemplar (guidance, not gate): 6-8 H2s; 2-4 PullQuotes total
(one thesis-marker); a PullQuote or component every ~600-900 words; paragraphs mostly 2-5
sentences with a one-line paragraph used as a beat roughly once per H2.

## 2. Frontmatter

Required for every essay (gate: error):

`title`, `excerpt`, `date`, `readTime`, `contentType: essay`, `format: essay`, `category`, `tags`,
`status`, `whyItMatters`, `leaderTakeaway`, `relatedSlugs` (other arc essays, existing slugs),
`seoTitle`, `seoDescription`.

Required when applicable (gate: error when the condition holds):
- `updatedDate` when the body changed after `date` (silent republish convention: bump
  `updatedDate`, no visible version callout unless the revision changes an argument; then add a
  `RevisionNote`).
- `series` + `seriesOrder` when the essay belongs to a series collection entry.

Recommended (gate: warning): `heroImage` + `heroAlt` + `heroPlacement: frontispiece` (imagery
effort owns the image; the polish pass only keeps the fields consistent), `draftNotes` provenance.

Rules: `excerpt` is one or two sentences of argument, not a teaser; `whyItMatters` speaks to an
enterprise leader; `leaderTakeaway` is an instruction ("Govern X... Do not equate Y with Z").

## 3. Component catalog (what to use, and when)

All under `src/components/content/`. Import only what the body uses.

| Component | Use | Rule |
|---|---|---|
| `RevisionNote` | Edition note under the title | Only for argument-level revisions; prose-only polish is a silent republish |
| `ExecutiveSignal` | In-flow exec signal | Strings match frontmatter |
| `PullQuote` | Thesis marker + 1-3 load-bearing lines | Must be a sentence that also appears as the argument, not decoration |
| `Term` | Glossary-backed term, first use only | `id` must exist in `src/data/glossary.ts`; add an entry rather than inline a definition |
| `Figure` | Technical figure | Keep existing `src`/numbering; imagery effort owns new art |
| `ThreadScene` | Running-thread beat | Requires a `threads.ts` record with an image (section 3.3) |
| `ReceiptDisclosure` | Redacted excerpt of a real receipt | Real content only; never invent logs, hashes, or ids |
| `RelatedWork` | Adjacent external research | Citations with links; framed as related, not proof |
| `BoundaryGrid` | Pairs of things that are not the same assurance | Left = what you have, right = what it does not imply |
| `ImplementationStatus` | Status of own systems | Allowed statuses: IMPLEMENTED, PARTIAL, PROPOSED, TO TEST |
| `ClaimBadge` | Receipts rail | `kind` in observed / measured / proposed / external |
| `WhereThisSits` | Arc placement | slug = the essay's own slug |
| `Callout` | Legacy; still allowed | Prefer the purpose-specific components above |

### 3.1 Evidence records
Receipts cited in the rail may also get records in `src/data/evidence.ts` (drives the Evidence
Focus route `/essays/<slug>/evidence/`). Records summarize what the essay already cites; fields
that the manuscript does not state stay `null`. Never fabricate a source URL or date.

### 3.2 Glossary
Own systems and borrowed terms get glossary entries with attribution-safe wording ("used here as",
"established terminology", never "coined"), per the September attribution sweep.

### 3.3 Running thread and imagery hook
A `ThreadScene` needs a `src/data/threads.ts` record whose beats each carry an `image`. Images
are the imagery effort's deliverable. The polish pass therefore (a) makes the prose carry one
running example with named beats, and (b) writes a beat manifest (beat id, label, recap,
establishes, doesNotEstablish) under `docs/blog-work/<slug>/thread-beats.md` for the imagery
effort to wire. It does not add `ThreadScene` tags without images.

## 4. Voice (pointers; detail lives elsewhere)

- Exemplar-derived profile with quoted evidence: `docs/editorial/essay-voice-profile.md`.
- Hand-edit-derived rules (higher authority): `docs/blog-work/the-registry-wave-agentic-artifact-supply-chain/voice/nick-voice-rules.md` and `nick-hunks.md`.
- Hard constraints: zero em-dashes in posts/series (`npm run check:prose`); contractions in body
  prose; first person singular for own work; parentheticals, colons, semicolons are his
  punctuation; corrective connectives ("Rather," "But,"); hedge once, never twice.
- Audience contract: technical but exec-accessible, story-first. No raw tracker ids, PR numbers,
  commit SHAs, or schema field names in body prose; subsystem names get a one-clause human intro
  on first use. Code formatting is allowed for a real file/skill name that the story is about.
- Voice fixes come from the exemplar and corpus-sourced idiosyncrasy, never from an automated
  "humanize" or rephrase pass.

## 5. Arc obligations (Theses arc: Agentic Systems Engineering core path)

Arc membership is the reading path `agentic-systems-engineering-core` in
`src/data/reading-paths.json`: E1 `governed-agentic-sdlc-01-productivity-paradox`, E2
`agentic-operations-flow`, E3 `the-registry-wave-agentic-artifact-supply-chain`, E4
`the-contract-is-the-work`, E5 The Deterministic Envelope (next). Each arc essay:
- states its prior question, its thesis, and its next question (the exemplar does this in prose
  and via `WhereThisSits`);
- seeds one forward link to the next essay's question, never resolving it;
- uses the shared umbrella term (Agentic Systems Engineering) with attribution-safe wording.

## 6. Machine checklist (`scripts/check-essay.mjs`)

Run: `npm run check:essay` (all `contentType: essay` posts) or
`node scripts/check-essay.mjs <file.mdx> ...`. Errors fail; warnings advise.

| ID | Check | Severity |
|---|---|---|
| F1 | Required frontmatter keys present (section 2) | error |
| F2 | `relatedSlugs` resolve to existing posts | error |
| F3 | `series` given implies `seriesOrder` | error |
| F4 | Recommended frontmatter present | warn |
| S1 | Has an `ExecutiveSignal` | error |
| S2 | Has exactly one `PullQuote variant="thesis-marker"` | error |
| S3 | Has `WhereThisSits` with the essay's own slug (arc essays) | error |
| S4 | Has a `## Sources` section when any footnote exists | error |
| S5 | Has at least one `ClaimBadge` receipts paragraph | warn |
| S6 | H2 count between 5 and 9 | warn |
| C1 | Every imported component is used and every used component is imported | error |
| C2 | Every `<Term id>` exists in `src/data/glossary.ts` | error |
| C3 | Every `ThreadScene slug/beatId` resolves in `src/data/threads.ts` | error |
| C4 | `ClaimBadge kind` and `ImplementationStatus status` values are allowed | error |
| N1 | Every footnote reference has a definition and vice versa | error |
| V1 | Zero em-dashes (delegates to `check-prose.mjs` semantics) | error |
| V2 | No identifier leakage in body prose: `node_`, `req_`, `tree_`, `evid_`, `ws_` ids, `PR #`, `#123`-style PR refs, 7-40 char hex SHAs in prose | error |
| V3 | Advisory phrase tells (e.g. "delve", "in today's", "it's worth noting", "not only... but also") | warn |

Gate boundary: the checklist proves structure and hygiene. It does not prove voice, accuracy, or
argument quality; those are the editorial and cross-family review passes.

## 7. Polish procedure (per essay)

1. **Migrate** (mechanical, Codex): frontmatter, components, imports, glossary/evidence records,
   checklist green. No prose rewriting beyond what a component move requires.
2. **Editorial re-pass** (taste, ICA Opus): voice against the exemplar and voice rules; preserve
   meaning, claims, numbers, and receipts; flag stale claims in a sidecar
   (`docs/blog-work/<slug>/polish/stale-claims.md`) instead of rewriting them.
3. **Cross-family review** (Codex Sol): checklist + voice profile + arc obligations; findings file;
   the lead applies or rejects each finding.
4. Lead verifies: `npm run check:essay`, `npm run check:prose`, `npm run verify` under Node 22,
   then a PR to `development` labelled `wip` until verified.
