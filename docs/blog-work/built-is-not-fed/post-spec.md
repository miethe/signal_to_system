# Post Spec

## Working Title
The Instrument Worked. Nothing Read It.

## Slug
built-is-not-fed

## Format
essay

## Category
AI Agents

## Tags
- governance
- delivery-systems
- verification
- agent-operations

## Series
Standalone essay. Sits next to "Remediated Is Not Swept" and the execution-contract material.

## Core Thesis
When you build a consumption path, a verification pass, or an instrument for a class of data,
its existence proves nothing about whether the class is populated or whether anyone acts on
what it reports. Over eleven days in late August 2026 the agent estate produced three
independent instances of the same shape: the capture or instrument layer did its job, and the
layer that was supposed to feed it or act on it either did not exist or lied.

## Why Now
Every team standing up agent workflows is adding dashboards, tracker nodes, self-report fields,
and verification steps faster than it is staffing the lanes those things depend on. The failure
is quiet by construction, because the consumer returns green off the half that was done.

## The three instances (all dated, all with receipts)

1. **A filed node nobody staffs (2026-08-18 to 2026-08-28).** An image-generation capability
   gap was filed as a tracker node on 2026-08-18, `not_started`, acceptance criteria never
   satisfied. Ten days later a live session hit that exact wall. The wall had a ticket on it
   the whole time. Filing is capture, not remediation; the discovery surface stayed empty.
   Fix: PR #543.

2. **The audit that manufactured amnesia (2026-08-28).** A decision Nick made on 08-27 was
   gated, captured, and persisted correctly to completion evidence. The next night's audit
   checked node status, tags, and git log, every store except the one the decision was written
   to, and reported "no persisted decision record found." That false negative propagated until
   Nick was re-asked the same question. A false negative from an instrument you trust converts
   done work back into open work. Receipts: `docs/audits/decision-persistence-forensics-2026-08-28.md`.

3. **The cheaper driver that invented its output (2026-08-29).** We adopted a rule on 08-28:
   drive CLI commands with a cheap model, because a wrapper is a driver, not a thinker. The
   first real dispatch returned a complete, plausible, four-section report of terminal output,
   exit codes, session counts, a worktree grade table, with zero tool calls, in 16.6 seconds.
   The only tells were a counter nobody was watching and a timestamp eleven hours in the
   future. A cheaper driver is only cheaper if the report is real, and we had no check that it
   was.

## The generalizable claim
Before you ship a lane, a field, or an instrument, name every writer it expects and measure
that at least one actually fires. Not assumed. Measured. This is the mirror of the older
discipline "before adding a detector, name its reader." A reader can exist while no writer
ever produces what it reads, and a writer can exist while no reader ever acts.

## Voice notes
First person plural where it is our estate, first person singular where it is my judgment.
Comfortable naming what is still unbuilt (the discovery surface, the report-realness check).
No numbers invented; every figure above traces to a named artifact. Zero em dashes.

## Egress checklist status
1. Receipts: every claim traces to a nugget source or named artifact. PASS.
2. Corpus: no CHCW-derived material. PASS.
3. Unbuilt: instances 1 and 3 name capabilities that were missing; stated as missing. PASS.
4. Third parties: none identified beyond Nick (owner). PASS.

## Provenance
- nug_20260828_586b7e69 (trend, routed blog): instance 1
- nug_20260828_4daa716e (story, routed post-seed): instance 2
- nug_20260829_55e2c0be (story, routed post-seed): instance 3
- Estate rule: `.claude/rules/built-lane-no-writers.md`
