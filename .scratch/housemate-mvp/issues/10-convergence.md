# 10 — Converge on budget, area and move-in date

**What to build:** A forming Household agrees its shared constraints through a structured group
decision instead of one exhausted person doing project management in a chat thread. That coordination
cost is plausibly the real reason strangers do not form groups, and nothing else in the market
touches it.

Each member states their preference **privately first**, then everything is revealed at once, so
nobody is anchored by whoever answered loudest. The result is recorded **on the Household** as a
shared artefact, not a chat message that scrolls away. Members see where the group agrees and where
it does not, so discussion starts at the actual disagreement.

**Convergence warns, it never blocks.** An unresolved disagreement is shown unmissably at the moment
of lock — "you do not yet agree on budget, lock anyway?" — but cannot prevent the transition. Same
philosophy as the capacity warning: the product informs, the group decides.

Structurally this module sits **beside** Household, never inside it. It produces constraints and
gates no transition, which keeps the system's deepest module independent of its least proven one.

The **shape** of the mechanism is still open (decision ticket 14, a prototype ticket). Build the
minimum that satisfies the criteria below and expect it to be replaced.

**Blocked by:** 05 — Create a Household, with or without a property.

**Status:** ready-for-agent

- [ ] Each member submits budget, area and move-in date preferences privately
- [ ] No member can see another's input before the reveal
- [ ] After reveal, agreement and disagreement are both shown explicitly per dimension
- [ ] The agreed constraints are recorded on the Household and readable by all members
- [ ] Incomplete convergence is visible to members at any time
- [ ] Attempting to lock with an unresolved disagreement shows an unmissable warning naming the
      dimension, and **proceeds if the group confirms**
- [ ] Convergence state is asserted to have no effect on whether lock succeeds
- [ ] The Household state machine has no dependency on this module
