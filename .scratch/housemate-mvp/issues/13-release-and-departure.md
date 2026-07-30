# 13 — Release, and departure without it

**What to build:** A member of a locked Household who has to leave asks to be **released**. The
remaining members grant it, and the departure costs the leaver nothing. The Household returns to
`forming` with its target unchanged and its open slots recomputed, so the group can recover rather
than collapse.

**Release is load-bearing, not a fairness nicety.** Stranger-groups are uninvestable because one
member's default contaminates everyone. Capital solves that elsewhere; release is the only
non-capital answer available here. It must read as the **normal, expected path** — asking for it
should not feel like admitting failure.

**Do not implement this as a variant of "remove member".** Departure with release and departure
without release are two different acts with two different consequences, and they must not share a
code path. This is a standing instruction in the spec, not a stylistic preference.

**The consequence is visible inside the Household and nowhere else.** With reputation deferred to
year three, the household's own history shows "left — released by the group" or "left — without
release", readable by remaining members only. The trace follows the **Household**, never the Person,
and nothing appears on any public profile. The pressure that makes release meaningful comes from the
people you are leaving, not from a score. Accepted limit: someone who abandons three separate groups
is caught by nobody in year one.

There is no forced removal in the MVP. If it is ever needed it is a new act with its own consequence.

**Blocked by:** 11 — Lock the Household.

**Status:** ready-for-agent

- [ ] A member of a `locked` Household requests release
- [ ] Remaining members grant it, and the leaver departs at no recorded cost
- [ ] The Household returns to `forming`, target unchanged, open slots recomputed — asserted by name
- [ ] A member can depart without release, and it is recorded as a distinct event type
- [ ] Release and departure-without-release do not share a code path — verifiable by reading the code
- [ ] The Household's history shows who was released and who was not, to members only
- [ ] Nothing about either departure appears on any public profile or browse card
- [ ] No member can be removed by the others
- [ ] Both departure kinds write to `household_events` in the same transaction as the state change
- [ ] Release is presented in the interface as an ordinary, expected action
