# 04 — Browse people, with hard constraints applied as filters

**What to build:** A student browses other students — people, not properties — and never sees anyone
they could not possibly live with. Budget, area and move-in date exclude absolutely. Every card shows
the verified-student badge, so nobody has to establish independently that a person is real.

This is the product's core surface and the first place the person-first premise becomes visible. No
ranking yet — that arrives in ticket 06. Ordering here can be arbitrary but must be stable.

**Blocked by:** 03 — Declare a housing status and a profile.

**Status:** ready-for-agent

- [ ] The candidate query excludes anyone whose budget range cannot overlap the viewer's
- [ ] It excludes anyone with no area in common, and anyone whose dates cannot overlap
- [ ] Exclusion is absolute — tested by name, since "hard filters exclude absolutely" is an invariant
- [ ] Paused profiles never appear
- [ ] Members of a `locked` Household never appear — they are off the market
- [ ] Every card carries the verified badge and shows no email address
- [ ] A viewer sees only what the browsed Person made public pre-match
- [ ] Editing a profile changes who appears on the next read, with nothing cached as truth
