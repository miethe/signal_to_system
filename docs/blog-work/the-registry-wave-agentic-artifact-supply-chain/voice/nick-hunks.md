# Nick's hand-edit hunks — raw evidence

Backing evidence for `nick-voice-rules.md`. Grouped by rule id from that file. "Registry Wave"
hunks are `06ddd302` (pre-Nick machine draft, byte-identical to all `docs/blog-work` draft/final
copies added in `90de9d4`) → `90de9d4` (Nick's hand-edited baseline, 12 `{}` notes). Other-essay
hunks are from a full commit scan (see §8) narrowed to 2 genuine hand-edit commits out of 30.

## §1 — Sentence-splitting for cadence

`bca1cd5f`, `src/content/posts/the-contract-is-the-work.mdx`:
- Before: "The accepted method becomes a versioned, discoverable artifact that another team can
  use with its provenance intact."
- After: "The point of this stage is not the artifact. It's whether the artifact still holds up
  once the person who accepted it is out of the loop."

- Before: "At this stage, the organization reuses governed capability, not just prompts or
  outputs."
- After: "At this stage, the organization is no longer reusing only prompts or outputs. It is
  reusing governed capability."

- Before: "A plausible answer is not yet a verified claim, and a verified claim is not yet an
  authorized decision."
- After: "A plausible answer is not yet a verified claim. Run the checkout-timeout example back
  through the six stages and the gap is concrete rather than abstract..."

## §2 — Colon-elaboration

`bca1cd5f`:
- Before: "These are integration questions, not generation questions."
- After: "These are integration questions, not generation questions: whether the planner that
  wrote a contract like fc-example-041 and the verifier that checks it three weeks later... are
  looking at the same acceptance criteria."

- Added (new paragraph opener): "Control planes manage agents. The artifact supply chain governs
  the intent-to-outcome work: the part that decides whether what got produced was ever the right
  thing to produce."

## §3 — Hedge-cutting

`9925c9a`, `the-registry-wave-agentic-artifact-supply-chain.mdx`:
- Before: "...the unified cross-tool control plane is still doctrine and design work, not
  something I can honestly claim is finished."
- After: "...the unified cross-tool control plane is still doctrine and design work, not a
  finished system."

## §4 — Connective habits ("Rather," "But," "Thus")

`90de9d4` (Registry Wave, Nick's baseline vs `06ddd302`):
- Before: "The important point is not that these efforts are the same as SkillMeat. They are not.
  The important point is that the industry is independently reaching the same conclusion..."
- After: "The important point is not that these efforts are the same as SkillMeat, because they
  aren't. Rather, it's that the industry is independently reaching the same conclusion..."

- Before: "At small scale, unmanaged agentic artifacts look like convenience. / At enterprise
  scale, they become risk."
- After: "When you're working as an individual, or perhaps a small team, unmanaged agentic
  artifacts look like inconvenience, or even potentially 'agile'... / But at enterprise scale,
  they become risk."

- Before: "The enterprise question is not 'do we have a place to store these things?' / It is 'can
  we govern the lifecycle of the things that shape agent behavior?'"
- After: "Thus the enterprise question isn't 'do we have a place to store these things?', as
  that's essentially a solved problem. / Rather, the question is 'can we govern the lifecycle of
  the things that shape agent behavior?'"

## §5 — Contractions added

`90de9d4` (sampled, not exhaustive): "aren't" (×1), "isn't" (×2), "didn't" (×1, "I didn't begin
this journey..."), "can't" (×1, "can't be overstated"), "it's" (×3), "doesn't stop there" variant
("doesn't end there; not even close" replacing "does not end there").

## §6 — Redundancy cut

`9925c9a`:
- Before: "The enterprise control plane I think enterprises will need has several layers."
- After: "The control plane I think enterprises will need has several layers."

## §7 — Formal-definition register → direct address

`9925c9a`:
- Before: "It is the artifact layer. In SkillMeat's terms, an **agentic artifact** is a reusable,
  versioned unit such as a skill, command, agent..."
- After: "It is the artifact layer. Give it a concrete shape for a second: a skill, a command, an
  agent definition..."

## §7b — Vocabulary swaps (Registry Wave, `90de9d4` vs `06ddd302`)

- "another chat interface" → "another chat surface"
- "I started building SkillMeat" → "I started building SkillMeat last year"
- "I was using AI coding agents heavily and kept seeing the same pattern" → "It was mid-late 2025,
  I was using AI coding agents heavily and the idea of codifying agentic behaviors into skills was
  quickly gaining traction."
- "That matters." → "That can't be overstated."
- "it is a capability bundle" → "we're talking about more than just a prompt; it is a capability
  bundle"
- "My starting point was not a category name. It was a practical annoyance." → "I didn't begin
  this journey by defining a new category. Like most good (engineering) stories, it started with
  an annoyance, and the desire to be lazy."
- "That distinction matters because..." → "That distinction is loadbearing (an inside joke for the
  Claude 5 model-family users) because..."
- "That is not a hypothetical edge case. It is the normal failure mode of unmanaged reuse." → same
  + added: "It's Shadow IT rearing its head in the agentic era. It's the same problem that has
  plagued software supply chains for decades, now amplified by the fact that agentic artifacts can
  execute, reason, and act on their own."

## §8 — Personal maxim as refrain/bookend

`bca1cd5f` (addition inside existing Callout, echoed at close):
- Added mid-essay: "I did not invent this convention for the essay. It is the same instruction I
  give every agent I run... do not make things up; if you don't see it, don't say it."
- Closing section, before: "That is how agentic work becomes durable: not when the agent appears
  autonomous..."
- After: "The instruction underneath all of it is the one I give every agent I run... do not make
  things up. If you don't see it, don't say it. ...That is how agentic work becomes durable..."

## §9 — First-person vulnerability paragraphs (whole-paragraph additions, `bca1cd5f`)

- "I get this exact objection on my own system at work, not as a hypothetical. The pushback on
  SkillMeat... is that it's too complex and monolithic..."
- "I don't actually know whether anyone outside my own household would pay for this. The receipts
  in this essay prove the mechanism holds at home scale; they don't prove a market..."

## §10 — Minor mechanical fixes (not voice patterns, noted for completeness)

`9925c9a`: "MeatyPromtps" → "MeatyPrompts" (typo); "rearing it's head" → "rearing its head"
(its/it's grammar).

## §11 — Nick's 12 `{}` structural notes (Registry Wave baseline, verbatim, paragraph context)

1. After "It is the artifact layer.": *"Should probably define artifact here using our native
   functionality."*
2. Before "Copy and paste is fine for discovery...": *"We could also mention ablation here for
   auditing, governance, etc."*
3. After "...generated outputs with provenance.": *"Perhaps also call-out the more unique
   artifacts which then were added, or generally unique ways using skillmeat for our AOS
   overall."*
4. After "A control plane tells you whether it should be used...": *"Let's just review this
   language to determine if we've changed our verbiage or such here any since was written."*
5. After the loadbearing/inside-joke sentence: *"Maybe change the above list into an interactive
   diagram or something to make it more visual."*
6. After the fragmentation/Shadow-AI paragraph: *"Great place to allude to future posts going
   deeper on mechanizing evidence, context fabrics, etc from AOS."*
7. Before "It needs a registry core...": *"Would make another good visual, interactive or
   otherwise. Also again should review the control plane phrase vs our latest verbiage."*
8. After "the artifacts that shape agent behavior need to become governed assets.": *"We've
   focused on skillmeat, but other projects of ours could be valid to be referenced here as
   allusions to future posts, ie MeatyWiki, ResearchFoundry, etc."*
9. After "The winning metric will be accepted outcomes with evidence.": *"Link/allude to other
   posts in the blog."*
10. After the outcomes-question paragraph: *"Determine if any edits here from most recent
    updates."*
11. After "That is the control-plane question.": *"Again, validate naming."*
12. Before "My bet is that the next several years will look like this:": *"Spend some good time
    sitting here, ensuring we tie everything together very clearly and succintly, and updated with
    the current status of our theses and the system."*

## §12 — Cross-essay scan method (for provenance)

Scanned `git log --author='Nick'` and `--author='miethe'` over `src/content/posts/*.mdx` +
`src/content/stories/*.mdx` — 30 commits, identical result under both author filters. 28 were
bot-drafted (explicit Claude/Opus/Fable trailer, or — in two cases — a clean git-author field with
no trailer but agent-produced body: `20d8442`'s "editorial pass" title actually adds a 60-line
citation bibliography per the essay's own "AI systems assisted with research... and drafting"
note; `f58bd6fa`'s frontmatter `draftNotes` states "Final Opus voice pass"). Only `bca1cd5f` and
`9925c9a` survived as genuine hand edits.
