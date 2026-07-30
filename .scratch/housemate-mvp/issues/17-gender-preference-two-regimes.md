# 17 — The gender preference, in two regimes

**What to build:** A student expresses a preference about the gender of the people they live with, so
they can be comfortable in their own home. **How** that preference behaves depends on the legal
regime the Household sits in, and the two are genuinely different designs.

**The regime test, evaluated live:** a Household is **sheltered** if and only if an existing member
**currently resides** in the property a joiner would enter. This is deliberately the statute's own
test — UK Equality Act Sch. 5 para. 3, which says *"resides"*. A signed but unoccupied lease creates
no incumbent and confers no shelter.

| Regime | Behaviour |
| --- | --- |
| **Sheltered** — someone already lives there | **Hard filter.** Excluded people disappear from the browse. This is the right the statute grants the person who resides. |
| **Unsheltered** — formed from scratch, nobody residing | **Soft signal only.** People rank lower but stay visible. No exemption shelters an exclusion here. |

A scratch-formed Household is unsheltered for its **entire joinable life** — joining only happens
while `forming`, and it has no resident then. The regime is therefore stable in practice even though
the test is live.

**Two things this ticket must not hide.** The most differentiated half of the product is the least
legally sheltered half — the scratch-formed group gets only ranking, while the spare room that exists
on every competing site gets the full filter. And the sharpest objection comes from the users who
care most: a woman who will only live with women finds a soft signal broken, because she does not
want a man ranked seventh, she wants him absent. In the unsheltered regime the product cannot give
her that. Explain the difference in the interface so it reads as care rather than inconsistency.

**Still unresolved, and why this ticket is last:** decision ticket 15 has not settled whether the
field is structured or free text, nor what it contains. The original argument for free text rested on
US **§230**, which does not exist in the UK — the principle that platform-authored questions are
platform speech still holds, but the legal mechanism does not transfer and needs the lawyer's
opinion. Build the field behind a narrow interface so replacing it touches nothing else. This is the
only place in the system where a jurisdiction change would land.

**No other identity dimension is offered as a preference, ever.** Race is not exempted in any
jurisdiction surveyed; the exclusion is permanent, not a v1 simplification.

**Blocked by:** 06 — Rank browsed people by compatibility; 09 — Attach a property to a Household.

**Status:** ready-for-agent

- [ ] A Person expresses a gender preference
- [ ] The regime is computed live from whether a member currently resides in the property
- [ ] A signed-but-unoccupied lease confers no shelter — asserted by name, as a legal invariant
- [ ] A Household with a residing member is sheltered — asserted by name
- [ ] A scratch-formed Household is unsheltered — asserted by name
- [ ] In the sheltered regime the preference excludes from the browse
- [ ] In the unsheltered regime the preference only reorders and never hides
- [ ] The interface explains why the two differ
- [ ] No identity dimension other than gender is filterable or scorable anywhere in the system
- [ ] The field sits behind an interface narrow enough to replace without touching Matching
