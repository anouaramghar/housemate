# 14 — The shareable group profile

**What to build:** A locked Household generates a single link representing the whole group. A
landlord opens it, sees that every member is a verified student, and needs no account to do so. There
is no barrier between them and the information, because bootstrapping a third side is not a v1
problem.

The link is **capability-based**: possession of the URL grants read access. It is revocable and it
expires, so it does not circulate indefinitely.

Members control what the group profile exposes. Presenting to a landlord must not publish anyone's
private questionnaire answers.

Be honest about what this artefact is. The competitive research warns it may lose to guarantor
services, whose answer to a landlord's exposure is financial rather than social (decision ticket 12
is still open). Build it as a credibility artefact and do not over-invest.

**Blocked by:** 11 — Lock the Household.

**Status:** ready-for-agent

- [ ] Only a `locked` Household can generate a link
- [ ] The link opens with no account, no session and no sign-up prompt
- [ ] It shows that every member is a verified student
- [ ] It exposes only what members permitted — asserted by name against private profile fields
- [ ] Members choose what is included before sharing
- [ ] The link is revocable, and a revoked link returns a clear gone-state rather than an error page
- [ ] The link expires on its own, and the expiry is visible to members
- [ ] Guessing or enumerating links is not feasible
- [ ] No landlord account, dashboard or login exists anywhere in this ticket
