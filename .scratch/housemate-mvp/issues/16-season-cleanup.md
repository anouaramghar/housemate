# 16 — Season lifecycle and clearing out ghosts

**What to build:** A student can see where they are in the housing season, so they understand the
urgency. Half-formed Households that went nowhere are cleared out, so browsing is not full of ghosts.
And no group is ever cleared without warning — inactivity must not silently destroy work the group
put in.

Launch is one campus and one housing season. Multiple seasons are out of scope, so the season can be
a configured window rather than a modelled recurrence.

The exact boundaries are still open (decision ticket 08). Keep the thresholds configuration rather
than constants, so they can be tuned without a deploy once real behaviour is visible.

**Blocked by:** 05 — Create a Household, with or without a property.

**Status:** ready-for-agent

- [ ] The current season and where the student sits within it are visible
- [ ] A `forming` Household inactive beyond a configured threshold is flagged for clearing
- [ ] Members are warned before clearing happens, with enough time to act
- [ ] Any member action cancels the pending clearance
- [ ] Clearing removes the Household from browse but preserves its event log
- [ ] `settled` Households are never cleared — asserted by name
- [ ] `locked` and `coordinating` Households are not cleared by inactivity alone
- [ ] Thresholds are configuration, changeable without touching application code
