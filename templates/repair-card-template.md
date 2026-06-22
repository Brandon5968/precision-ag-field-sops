<!--
REPAIR CARD TEMPLATE — copy ONE block below per fault into a repair chapter
(docs/equipment/NN-*.md). This file lives in templates/ and is NOT built into the site.

FROZEN CARD ORDER (do not reorder):
  Symptom  ->  fix-type badge  ->  Tools & parts  ->  SWMS  ->  Steps  ->  Escalation

FIX-TYPE BADGE — choose EXACTLY ONE of the three admonitions:
  !!! tip "FIELD FIX"      green  — safe to fix on site AND the part/tool is in the kit
  !!! warning "HOME FIX"   amber  — needs a part/tool not carried, or a workshop
  !!! danger "STOP & CALL" red    — safety risk (fuel/12V/spring/load) or must report first

RULES:
  - NEVER write a mechanical step as fact. Use [CONFIRM: ...] until the person who does
    the job has written/verified it.
  - Every card MUST carry a !!! danger "SWMS" block.
  - "If the part/tool isn't in the field kit (Chapter 01), it's a HOME FIX."
-->

### Symptom: WHAT THE TECH SEES OR HEARS

!!! warning "HOME FIX"
    [CONFIRM: pick FIELD FIX / HOME FIX / STOP & CALL and the one-line reason.]

**Tools & parts** (from your [field kit](01-field-kit.md)):

- [ ] [CONFIRM: tool/part 1]
- [ ] [CONFIRM: tool/part 2]

!!! danger "SWMS"
    [CONFIRM: attach the official SWMS for this task; complete the on-site SWMS before
    work begins. On-site SWMS form (MS Form) planned.]

**Steps**

1. [CONFIRM: verified procedure — written and approved by the person who does this job.]

**If this doesn't work**

[CONFIRM: who to call] — see [Support](07-support.md).
