# 08 — Browse Households and ask to join one

**What to build:** A student browses **Households** as well as individuals, so they can find a group
to join rather than assembling one themselves. Each Household shows how many open slots it has and
whether it already has a place or is still searching. The student asks to join; the group decides.

**Admission requires unanimity, not a majority** (decision ticket 07). The decision does not apply to
the group, it applies to each member individually — each will share a kitchen and a bathroom with the
joiner for a year, so a veto is legitimate. Majority also has a perverse effect: a member who knows
they can be outvoted stops answering honestly, and the product loses the signal it was collecting.

**Silence expires a request; it never approves one.** Each member has 5 days. Admitting someone into
a home by default because a member forgot to click is the worst outcome available — an expiry
frustrates, a silent approval betrays.

**A join request opens no conversation.** Chat unlocks only on acceptance, all at once. The group
decides from the requester's full profile and their compatibility with **every** member, not by
talking to them first. This is what stops the join path becoming a back door around double opt-in.

Join requests are **independent of matching** — no prior match is required, and matching a member
confers no right of entry. Requiring a match would make finding a group as slow as finding a person,
which defeats the point of the Household.

**Blocked by:** 05 — Create a Household, with or without a property; 04 — Browse people, with hard
constraints applied as filters.

**Status:** ready-for-agent

- [ ] Households are browsable, showing open slots and whether a property is attached
- [ ] A student asks to join without any prior match
- [ ] Members review the request against the requester's full profile
- [ ] Compatibility is shown against the **whole group**, not just one member
- [ ] Admission requires every current member to approve
- [ ] A single objection blocks admission; the outcome is shown but the objector is not named
- [ ] No response from all members within 5 days expires the request, and it is never auto-approved
- [ ] A declined or expired requester is told plainly so they can move on
- [ ] The requester can reach no member's chat before acceptance — asserted by name
- [ ] On acceptance, chat opens with the whole group at once
- [ ] Matching a member grants no entry — asserted by name
- [ ] The group can change its target while `forming`
