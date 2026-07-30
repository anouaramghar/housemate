# 11 — Lock the Household

**What to build:** When a Household's slots are full, the group explicitly commits. Locking is a
decision they take, never something that happens to them. It closes the Household to join requests
and moves it into coordinating.

**Lock is about people, never buildings.** A group formed from scratch, with no property at all,
locks with exactly the same meaning as a group that already has a flat. For the scratch-formed group,
coordinating *is* the hunt — they approach landlords as one committed unit rather than as four
individuals. This is the thing nothing else in the market does, so it must not be weakened into a
property-dependent step.

Concretely, lock is a **social promise**. Nothing legal binds the members. What it changes is that
the Household closes, the group profile becomes available, and departures start being recorded. Its
real value is not constraint — it is that three people who were talking become one entity that can
present itself to a landlord.

**Lock has exactly two hard conditions, and nothing may be added:**

```
lock  ⟺  open slots == 0  AND  unanimous member consent
```

Convergence is explicitly **not** a condition.

**Blocked by:** 08 — Browse Households and ask to join one.

**Status:** ready-for-agent

- [ ] Lock is refused while `open slots > 0`
- [ ] Lock requires every member to consent; the transition fires only when the last one does
- [ ] Partial consent is visible to all members while it accumulates
- [ ] A member can withdraw consent before the transition fires
- [ ] Lock succeeds identically with and without a property attached — asserted by name
- [ ] Lock is never gated on convergence — asserted by name
- [ ] A `locked` Household refuses all join requests
- [ ] Members of a `locked` Household disappear from both browse surfaces
- [ ] Members are shown clearly that they are locked and what it means, before they can discover the
      consequences by trying to leave
- [ ] The transition is written to `household_events` in the same transaction
