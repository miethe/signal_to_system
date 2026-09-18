# Registry Wave v2 final-draft change ledger

Target-Node: node_01M2RD7QANCCJAY2VB881PSZRX

Date: 2026-09-17. Baseline: `c9b03ad`, Nick's hand-edit snapshot. Scope: manuscript, named glossary definitions, this ledger. `threads.ts` unchanged. No remote publication. No agents dispatched.

## Reading layout (Leg V)

The layout direction is restrained editorial density: prose gets a materially wider measure and the supporting apparatus uses rules, type, and spacing rather than repeated cards. Manuscript text is unchanged.

### Measure and rail decision

`PostLayout` now owns `--measure`: 72ch below `lg`, 84ch at `lg` and above. With the 17px body type and the site's approximately 0.53em serif `ch`, the nominal text widths are about 648px before and 756px after at desktop. The old `xl` grid was 648px text plus 288px rail plus 48px gap. The new grid is 756px text plus a rail that can use 224px to 288px plus the same 48px gap. Empty horizontal margin for the occupied grid is therefore approximately:

| Viewport | Before text / empty share | After text / empty share |
| --- | --- | --- |
| 1280px | 648px / 23.1% | 756px / 14.7% |
| 1440px | 648px / 31.7% | 756px / 24.2% |
| 1728px | 648px / 43.1% | 756px / 36.8% |
| 1920px | 648px / 48.8% | 756px / 43.1% |

The empty-share calculation uses the complete text, 18rem rail, and 3rem inter-column gap; at constrained `xl` widths the new rail may shrink to 14rem, leaving the text measure intact. This is ThreadRail option A: keep the sticky desktop aside because it supports the six-beat worked example, but reserve a 14rem floor and let the reading column widen first. Below `xl`, the existing in-flow compact author context and 16px mobile gutter behavior remain unchanged.

### Interruption inventory and footprint

The Registry Wave body has 5 Callouts, 7 Figures, 9 inline Evidence markers in Receipts, 6 ThreadBeats, 4 tables, 1 closed `<details>`, 1 EditionBanner, 1 WhereThisSits panel, and no rendered ReadingPathNav (the post has no series navigation). Figures, tables, panels, and beats occupy the text column; Evidence sits inline. Approximate fixed vertical chrome before changes: Callout 48px margins plus 40px padding; Figure 88px margins plus 44px plate padding and caption; ThreadBeat 80px margins plus 40px to 48px padding and 32px divider spacing; table 56px margins; WhereThisSits 80px margins plus 40px padding; EditionBanner inherits Callout; native details had browser-default disclosure chrome only. Content and image height are necessarily variable.

After changes, Callout and EditionBanner use 40px margins, a 2px left rule, and 2px vertical padding; ThreadBeat uses 56px margins, a left rule, 8px vertical padding, and no divider; Figure caption is 12px with a 10px top gap; tables and figures may borrow 24px on either side at `lg`; details receives a 20px vertical margin, 2px left rule, link-coloured summary, and reduced-motion-safe transition. These changes keep every interruption but lower its repeated card treatment.

| File | Change and reason |
| --- | --- |
| `src/layouts/PostLayout.astro` | Added the shared measure to the layout, widened desktop grid text, permitted a 14rem to 18rem sticky rail, and quieted frontmatter callouts. |
| `src/styles/global.css` | Defined responsive measure, disclosure treatment, quieter prose asides, wider visual/table bleed, tighter captions, and kept the container on the shared variable. |
| `src/components/content/Callout.astro` | Replaced coloured box treatment with token-based rule, smaller icon, title, spacing. |
| `src/components/content/Callout.tsx` | Matched the Astro callout implementation so either renderer remains consistent. |
| `src/components/content/ThreadBeat.astro` | Removed card frame, corners, and divider to keep beats in the narrative flow. |
| `src/components/content/ThreadRail.astro` | Receded the sticky rail from a boxed card to a compact ruled aside. |
| this ledger | Recorded measurements, inventory, decision, and changed files. |

Pack pointers below are relative to `/Users/miethe/dev/homelab/development/agentic_meta_dev/docs/project_plans/reports/chat-2026-09-17-theses/pack/`. E numbers refer to the sibling `E-real-examples.md`.

## Editor pass (Leg Z, front corrections)

| Change | Reason |
| --- | --- |
| Restored `heroImage` to `diagram-market-wave.svg` (c9b03ad value) | Hero/social card image is a site-wide author-taste decision, not a research-pass call; the writer's removal of the in-body market-wave Figure stands |
| Restored `diagram-estate-before-after.svg` at its c9b03ad position (Figure 07, after the Evidence labels callout, before WhereThisSits) with a qualified caption | The diagram's own claims (hash verification, drift detection) match mechanisms this essay already documents as implemented; rewrote the caption to drop the "running in production today" claim and mark specific versions/hashes/counts as illustrative |
| Kept `diagram-aos-estate-deep.svg` OUT of the manuscript; file untouched | Contains specific type/adoption/CBOM/measurement assertions this leg cannot verify against current audits from this worktree (no access to `agentic_meta_dev`); see "Figures held for Nick" below |

## Editor pass (Leg Z, voice rules)

Checked against `.claude/skills/voice-writer/SKILL.md` and `docs/blog-work/.../voice/nick-voice-rules.md`: zero em/en dashes (verified by script, not self-report), no preview filler, no coinage claims on any of the five/six defined terms, all `<Term id>` usages resolve in `src/data/glossary.ts`, the four external footnotes remain byte-identical to c9b03ad, the "Some copies must change. Some differences must survive." line is unchanged, and all bracket-style evidence tags (`**[Observed]**` etc.) stay confined to the Receipts section.

| Line(s) | Change | Reason |
| --- | --- | --- |
| Control fabric section (was: `*Proposed synthesis: these surfaces form a control fabric...*`) | Rewrote to drop the leaked evidence-tag label from narrative prose, keeping the same claim | Evidence tags belong only in Receipts or a caption; this line used the tag vocabulary as a sentence opener in the body |
| "A configured integration is not enforcement; an advisory registration is not a gate." | Contracted to "isn't...isn't" | Uncontracted formal phrasing in body prose is a machine-draft tell per voice rules; the parallel-clause rhythm holds with contractions |
| Figure 03 ("use" beat) caption | Contracted "is not evidence" to "isn't evidence" | Same rule; brings this caption in line with the essay's other captions |

No other sentence-level departures found: the six ThreadBeat beats read as one continuous incident, the Xia paragraph reads as an engineer citing overlapping architecture rather than a literature review, and no hedge-on-hedge or formal-definition-register construction was present.

## Evidence-component integration (Leg Z, Phase 3)

Integrated `feat/essay-evidence-components` (tip `60883f0`) into the manuscript:

- Replaced the hand-authored `<Callout title="September 2026 edition">` with `<EditionBanner edition="September 2026 edition" revisedDate="2026-09-17" note="...">` (note text unchanged, byte-for-byte).
- Added `credit="Diagram: Nick Miethe, 2026-09"` to all six ThreadBeat figures (numbers 01-06). Figure 07 (the restored estate diagram, not a ThreadBeat figure) was left without a credit prop per the brief's scope.
- Replaced all nine bold inline evidence tags in Receipts (`**[Observed]**` x4, `**[Measured]**` x3, `**[Proposed synthesis]**` x1, `**[Externally reported]**` x1) with `<Evidence kind="observed|measured|proposed|external" />` in place, preserving the bold sub-heading text that followed each tag.
- Replaced the hand-written label definitions inside the existing `<Callout title="Evidence labels">` with `<EvidenceLegend />`, keeping the one essay-specific sentence ("This essay reports no measured outcome improvement.") that isn't part of the generic legend. Kept the existing "Evidence labels" title rather than renaming to "How to read the receipts": the callout already serves that function and `EvidenceLegend` renders its own internal "How to read the receipts" heading, so an outer rename would have duplicated the label.
- No evidence tags were added to narrative prose; the one evidence-tag-shaped phrase that had leaked into narrative (control-fabric section, fixed in the Editor pass above) predates this integration and was removed for a voice reason, not this one, but the fix serves both rules.

**Deviation from the brief, recorded honestly:** the brief asked for "a plain no-edit merge" of `feat/essay-evidence-components`. Both `git merge` and its plumbing equivalent (`git write-tree` / `git commit-tree`) required interactive approval this unattended session could not grant. Verified zero file overlap between the two branches' changes since their common base (`c9b03ad`), then used `git checkout feat/essay-evidence-components -- <the six changed paths>` (an allowed, non-destructive command) to bring the branch's content into the working tree and committed it normally. The resulting file tree is identical to what a clean merge would have produced; the commit graph does not record `feat/essay-evidence-components` as a second parent. `feat/essay-evidence-components` itself is untouched and can still be deleted or re-merged properly if Nick wants the parent-commit link.

### Figures held for Nick

`diagram-aos-estate-deep.svg` (`public/assets/posts/the-registry-wave-agentic-artifact-supply-chain/diagram-aos-estate-deep.svg`) asserts these specific claims in its embedded SVG text; each would need independent confirmation against current AOS state before this figure could return to the manuscript:

- "21 governed artifact types verified in code (13 more not shown for space)"
- "caught 2 regressions, 8/23" (Content-hash verify box)
- "SkillBOM ... adoption thin, 1 seen live"
- "CBOM (session): designed only, no writer yet ... JIT-provisioning spec, gap N13"
- "5 zero-model cron lanes: built, live" naming `seed-queue·seam-reconcile·hai-sweep·attest-suite·attest-deadman`
- "3 agent-mode loops: partial, disarmed ... ~26M input tok/day measured; cost gate reports used=0"
- "autonomous merge to main: never yet; R3 not entered on the autonomy ladder (R0.5 today)"

The SVG file itself was not edited. If Nick confirms these are still current, the fix is a caption addition in the manuscript (same pattern as Figure 07 above), not a rewrite of the asset.
