# 09 — Attach a property to a Household

**What to build:** A Household records the place it has found. Attaching it changes **nothing else** —
not the target, not the membership. Finding a building must never silently alter who the group is.

Where the property's capacity and the group's target disagree, the product **warns and stops there**.
A locked household of four that finds a five-bed sees the spare room surfaced as a warning, never as
an automatic reopening: the group's commitment to each other is not overridden by a floor plan.
Taking an extra person into that spare room is a separate, explicit, unanimous decision.

A household of four looking at a three-bed is told it does not fit, and resolves the shortfall
deliberately.

There is no property database and no listings index. A property is an attribute of a Household,
entered by the Household. The product does not index the rental market.

**Blocked by:** 05 — Create a Household, with or without a property.

**Status:** ready-for-agent

- [ ] A Household attaches a property at any point before `settled`
- [ ] Attaching never mutates target and never mutates membership — asserted by name
- [ ] Capacity greater than target surfaces a warning and takes no action
- [ ] Capacity less than target surfaces a warning and takes no action
- [ ] A `locked` Household is never reopened to joiners automatically by an attachment
- [ ] Expanding a `locked` Household into a spare room requires unanimous member consent
- [ ] Detaching or replacing a property is possible and equally inert with respect to the group
- [ ] Only the group can change its own target
