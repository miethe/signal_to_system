# Arc delta record: theses arc re-label (2026-09-17)

Records what changed in the five-essay arc's posture after the 2026-09-17 research-integration
pass, against the prior thesis-arc master. Dates from git only (`git log`); no em dashes.

## 1. The five essays, side by side

`src/data/reading-paths.json` (`agentic-systems-engineering-core`) versus the revised arc
master's own table (`_handoff/01_revised_arc_master.md`):

| # | Slug (reading path) | Title | State (reading path) | Question (revised arc master) |
|---|---|---|---|---|
| E1 | `governed-agentic-sdlc-01-productivity-paradox` | The AI Productivity Paradox | published | Why can task speed fail to improve delivery? |
| E2 | `agentic-operations-flow` | The Work Is a Graph | published | What must survive a session? |
| E3 | `the-registry-wave-agentic-artifact-supply-chain` | The Registry Wave Is Here | published | How can capability evolve without losing its lineage or local value? |
| E4 | `the-contract-is-the-work` | The Contract Is the Work | published | What defines and authorizes completion? |
| E5 | (null; slug not yet assigned) | The Deterministic Envelope | next | Which decisions need a model, and how can evidence change that boundary? |

Same five essays, same order, same umbrella (Agentic Systems Engineering) in both places. The
reading path is the shipped, reader-facing encoding of the same arc the research pass revised.

## 2. Decision: re-label, not renumber

The arc is re-labelled, not renumbered. `01_revised_arc_master.md` states its own framing
directly: "a guided reading path, not a new numbering scheme." The reading path already carries
these five essays in this order under this umbrella; nothing about essay count, order, or
umbrella term changes. What changes is posture: attribution language on borrowed/collided terms,
the Envelope's core research question, and provenance-classed dates. Re-numbering would imply a
new structure; re-labelling states that the existing structure's language needed hedging it did
not have.

## 3. Per-essay posture change

- **E1 (Productivity Paradox).** Dates/receipt gap: `updatedDate` had not been bumped through five
  later PRs touching the file; set to `2026-08-26` (`4ccc541`, the last commit changing the post's
  prose (an em-dash editorial cleanup), not `2026-09-15` (`836687a`, which only added an import and
  a `<WhereThisSits>` component call, no prose change). The `.claude/` "1,703 markdown files" receipt
  and the CCDash forward-pointer remain as inventoried, unchanged by this pass.
- **E2 (The Work Is a Graph).** Date wording: state "published 2026-06-19" (frontmatter `date`,
  matches reader-facing intent). Do not print "June 18" anywhere; no commit in this repo's full
  history touches this file or its interactive component/CSS sibling on 06-18 or 06-19; the only
  attested date is the frontmatter declaration itself and the 06-20 first-publish commit
  (`13b12e1`), one day apart, ordinary same-day-authoring drift.
- **E3 (Registry Wave).** This pass: glossary module-comment and page rewords ("coined" to
  "defined"/"used"; "introduced" to "first defined"), and two publicizing-kit lines reworded to
  attribute "Agentic Systems Engineering" and "the agentic artifact supply chain" as usage rather
  than ownership claims (§6 below).
- **E4 (The Contract Is the Work).** Needs its own prior-art pass before any originality claim is
  published; out of scope for this leg. Landed `9741e5d` (#123, 2026-08-25); five further PRs have
  touched it since (#124, #126, #127, #129, #133).
- **E5 (The Deterministic Envelope).** Core question reframed in `post-spec.md`: not "can we make
  the model deterministic," but under what conditions judgment gets promoted to a deterministic
  rule, and under what conditions a rule gets demoted back to judgment. Alternate display title
  "What Should Stop Requiring a Model?" recorded as PROPOSED, not a rename. Related-work
  acknowledgment list added (RAILS, Parallax, TraceCompiler, SkillDroid, Trace2Policy, Ripple Down
  Rules) as a citation punch list, not yet source-verified. Sustained-example choice (enterprise
  data-contract frame vs. lab leg-dispatch receipts vs. both) left OPEN for Nick. Status remains
  `next`/pre-draft; slug not yet assigned.

## 4. Term-attribution table (condensed from `_handoff/03_prior_art_and_attribution.md`)

| Term | Collision class | Required framing |
|---|---|---|
| agentic artifact supply chain | Strong conceptual overlap with existing agent-supply-chain and agent-primitive-lifecycle work; exact-string negative inconclusive beyond the search. | Organizing label, not owned terminology or a new supply-chain idea. |
| SkillBOM | Direct/near-exact lexical and semantic collision (Skill-BOM, SBOM-derived usage). | Define this implementation's fields/semantics; no name or base-concept novelty claim. |
| control fabric | Longstanding lexical collision plus close architectural collision (federated agent-control framing). | Define the specific interfaces and cross-handoff invariants, not a newly invented federation concept. |
| deterministic envelope | Direct words and close architecture; exact earliest agent use unresolved. | Use descriptively; cite related work; specify implementation/evidence boundaries. |
| Agentic Systems Engineering | Direct discipline-name and enterprise-meaning collision. | Locate this program within the discipline; show its particular architecture, implementation, and experiments. |

## 5. PROPOSED dates are proposed

Any date attached to an unpublished or partially-drafted essay, alternate title, or glossary entry
in this record or its source handoff files is PROPOSED, not a publication commitment. The
Deterministic Envelope's publication window (2026-09-22 / 2026-09-29, per `post-spec.md`) is not
pre-filled and is Nick's call.
