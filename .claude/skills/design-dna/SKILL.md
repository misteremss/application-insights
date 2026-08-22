---
name: design-dna
description: Codify one beautiful design (a website, poster, deck, carousel, motion graphic, or any other output Claude built) into a permanent, reusable style skill. Use when the user picks a winner out of a design loop and wants "the same style" reproducible forever, when they say things like "turn this into a skill", "capture this look", "make more like this without drifting", or invoke /design-dna. Produces a new skill folder (dna.json record, a capped PROMPT.md payload, tests that can fail, and a reconstruction check) named after the captured style.
---

# Design DNA

Turns one design you love into a skill you keep. Not just "designs" in the
visual sense — any format Claude built (site, poster, deck, carousel, motion
graphic, one-pager) goes through the same process, the same file shapes, the
same tests. The format is an output of the skill, not its subject.

## When to use this

- The user ran a design loop (multiple options generated), picked a winner,
  and wants to be able to produce more of that look on demand.
- The user says "capture this style", "make this a skill", "same style but
  for X", or invokes `/design-dna`.
- Do **not** use this to critique or improve a design — only to codify one
  that has already been chosen as the winner.

## What carries a design's identity

Read this before analyzing anything. Getting it wrong is the standard
failure mode.

| Thing | What it means |
|---|---|
| Ratios, not numbers | "96px headline" is nearly useless. "8x body size, never under 6x" is the style. |
| Coverage, not just hue | The same 3 colors at 60/30/10 and at 90/8/2 are different designs. Record % of canvas per color. |
| The one weird move | Almost every good design breaks its own system exactly once (type crossing a photo, a rule overshooting the margin, a clipped numeral). It's the highest-signal element and the first thing a copy loses. |
| Refusals | Six colors listed = six colors permitted. If the real design used one accent on 3% of the page, the refusal *is* the content. |
| What's missing | No shadows, no icons, no curves, nothing centered — absence is a decision, record it. |
| Named layouts | Without named archetypes, slide 8 won't match slide 1 — same palette, wrong arrangement, reads as sloppy. |

## How to run it

1. Get the reference: the winning design, as an image (screenshot, export,
   frame grab). Keep the original file — it goes into `reference/` and stays
   there forever; never paste it away.
2. Load `PROMPT.md` from this skill directory and run it against the
   reference exactly as written — it walks Observe → Debate (maximalist vs.
   minimalist) → Codify → Test → Reconstruct-and-diff → Emit → Report step by
   step. Don't skip Step 5 (reconstruction) — a spec never used to rebuild
   its own source has never been tested.
3. The prompt emits a new folder named after the captured style's slug:

   ```
   <slug>/
     SKILL.md        how to use this style
     PROMPT.md        the <=2KB payload — the only file that goes in a model's context
     dna.json          the full record — never pasted into a prompt
     reference/        the original design, kept forever
     example/          one worked output, the canonical proof
     tools/check.py     the automatable tests, exits non-zero on failure
   ```

   Use `design-dna.schema.json` in this directory as the schema for
   `dna.json`, and `templates/SKILL.md.template` /
   `templates/check.py` as starting points for the generated skill's own
   `SKILL.md` and `tools/check.py`.
4. Register the new folder as its own skill (own `SKILL.md` with
   `name`/`description` frontmatter) so it can be invoked independently
   going forward, separate from `design-dna` itself.

## The two-file split — why it's not optional

| | `dna.json` | `PROMPT.md` |
|---|---|---|
| Read by | You, and build tools | The model |
| Size | As big as it needs to be | Hard cap: 2KB |
| Contents | Every measured value | Reference image, the weird move, 3-9 signature moves, the bans, one example |
| Rule | Never goes in a prompt | Never leaves out the image |

Instruction compliance falls as constraint count rises — a 200-rule spec is
not 200 rules obeyed, it's a lottery over which get dropped. Material in the
middle of a long document is recovered far worse than material at either
end, which is why the weird move gets its own slot near the top of
`PROMPT.md` and the self-check goes last. Style itself is largely
undescribable in words, which is why the reference image is mandatory and
non-negotiable — image conditioning runs on its own attention pathway and
doesn't compete with the text for budget.

## Bans over permissions

When output drifts back toward generic, the fix is a ban, not another
positive rule. "Use an asymmetric layout" is one weak vote against a
training-data landslide of centered layouts; "never center the hero" removes
the option outright. Bans should outnumber positive style rules in every
generated `PROMPT.md`.

## Tests that can fail

Every generated skill needs 8-12 binary, measurable tests (see `PROMPT.md`
Step 4 for the format). "Feels premium" is not a test — if two people could
disagree on the answer, it isn't one. A spec with no failing test is a mood
board with better formatting.

## Common failure modes

| Symptom | Cause | Fix |
|---|---|---|
| Matches every value, still looks generic | Too few or too many signature moves | Cut to 3-9, written as ratios |
| Drifts back to stock AI look | Not enough bans | Bans should outnumber positive rules |
| Output #1 and #8 don't match as a set | No named layouts | Add archetypes |
| Accent reads as a theme, not an accent | No coverage percentages | Add them |
| Works on one format, breaks on another | Pixel values in spacing | Convert to percentages |
| Obeys some rules, ignores others, inconsistently | Prompt over 2KB | Cut it down |
| Best rule keeps getting ignored | Buried in the middle of the doc | Move to the top or bottom |
| Fine but forgettable | No weird move | Find the one break in the system |
| Spec feels complete, output is wrong | Step 5 was skipped | Rebuild the reference from the spec alone, diff, repeat |

## Rules for the analyst

- Never invent a value that could instead be measured; mark inferred values
  as inferred (Step 7 of `PROMPT.md` asks for a confidence list explicitly).
- Never copy a real logo, wordmark, licensed photo, or proprietary
  typeface into the skill — list them in `meta.not_copied` and substitute.
  Reproduce the system, never the marks.
- Colour names are descriptive ("dusty plum"), never systematic
  ("accent-500") — token names don't travel to an image/video model.
- Every font family needs a real fallback stack.
- One skill per style. Never merge two identities into one spec — the
  average of two good designs is a bad design.
