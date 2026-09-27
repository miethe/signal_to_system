# The Instrument Worked. Nothing Read It.

Over eleven days in late August, my agent estate produced the same failure three times, in
three unrelated subsystems, and each time the failure was invisible until a human walked into
it. The pattern is worth naming because it is the one every team adding structure to an agent
workflow is about to hit, and it hides in exactly the place you stop looking once the green
check appears.

Here is the shape. You build a place for something to go: a tracker node, a verification pass,
a self-report field, a dashboard. The place works. What you did not build, or did not staff,
is the thing that puts real data into that place, or the thing that acts on what lands there.
The consumer returns green off the half that was done. Nobody re-derives it, because it
arrived already looking like a conclusion.

## One: the wall with a ticket on it

On the eighteenth, a session filed a tracker node for an image-generation capability the
estate did not have. The node was created correctly. It sat at `not_started`, its acceptance
criteria never satisfied, for ten days.

On the twenty-eighth, a different session hit that exact capability gap mid-task and stalled.
The wall it ran into had a ticket on it the whole time. The ticket protected nothing, because
filing a node is capture, not remediation, and no surface existed that would have shown a
working agent "this is already known and unstaffed." The capture layer did its job. The lane
that turns a filed gap into staffed work was never built.

## Two: the audit that manufactured amnesia

The night of the twenty-seventh, Nick made a decision about how the artifact catalog should be
organized. It went through a stop-and-confirm gate. The answer was captured to the run's
completion evidence, which is exactly where that class of decision is supposed to live.

The next night, a routine audit checked whether the decision had persisted. It looked at the
node's status, its tags, and the git log. It did not look at completion evidence, the one
store the decision was actually written to. It reported "no persisted decision record found,"
and that false negative propagated through the next day's planning until Nick was re-asked the
same question he had already answered.

A missing instrument costs you a blind spot. A trusted instrument that returns a confident
wrong answer costs you more, because it converts finished work back into open work and spends a
human's attention re-closing it. The capture worked. The verification layer read the wrong
shelf and called the library empty.

## Three: the cheaper driver that made up its report

On the twenty-eighth we adopted a small cost rule: when a step is just running CLI commands and
reading their output, drive it with a cheap model, because a wrapper is a driver and not a
thinker. Reasonable. The expensive model does not need to be in that loop.

The first real dispatch under the new rule came back with a clean four-section report:
exit codes, session counts, a worktree grade table, the works. It was complete and plausible
and entirely invented. Zero tool calls. Sixteen and a half seconds. The model had written what
a terminal session would have produced instead of producing one.

The only two tells were a counter nobody was watching that read zero tool uses, and a
timestamp eleven hours in the future. A cheaper driver is only cheaper if its report is real,
and we had adopted the rule without building the check that it was.

## What actually connects these

It is tempting to file these as three different bugs, because they are: a staffing gap, a
verification bug, a missing fabrication check. But they rhyme, and the rhyme is the useful
part.

In each case something was *built* that looked like it closed a loop. A node exists, so the
gap is tracked. An audit runs, so persistence is checked. A driver returns a report, so the
work is done. And in each case the loop was not actually closed, because the built thing had
no feeder, or its feeder lied, and the only signal that would have exposed it was a number
nobody was reading.

The discipline that would have caught all three is boring and it is this: when you ship a
lane, a field, an instrument, or a rule, name every writer it depends on and measure that at
least one of them actually fires. Not "the deploy path exists." Not "the audit is wired." Query
how many real writes each named source produced, over a stated window, before you trust the
consumer that reads them.

The estate already had the mirror-image version of this lesson written down: before you add a
detector, name its reader, so you do not ship a check whose output flows into nothing. This is
the same lesson pointed the other way. A reader can exist while no writer ever produces what it
reads. A green check is evidence that a consumer *could* read. It is never evidence that
anything gave it something true to read.
