# Student Housemate Marketplace

Labels: `wayfinder:map`

## Destination

A **locked product decision** for a student housemate marketplace — who the users are, what the
matching actually is, and what makes it different — sharp enough that planning a build can begin.

Explicitly **not**: a data model, a tech stack, or user journeys.

## Notes

**Domain.** Students finding people to share housing with, on one university campus. Two situations,
one primitive: a person who *has a place* and needs housemates, and a person who *needs a place*.
You browse people, not properties.

**Vocabulary** — keep these words stable across sessions:

- **Person** — a verified student carrying a *housing status*: `has a place` or `needs a place`
- **Household** — the first-class group object. Has **slots**; people join it; moves through
  **forming → locked → coordinating**
- **Lock** — the explicit commit action taken when slots fill. Closes the household to joiners and
  triggers lease coordination
- **Release** — remaining members absolving a departing member, so breaking a lock costs them no
  reputation
- **Match** — mutual (double opt-in) interest. The only thing that unlocks chat
- **Reputation** — structured reviews from past and current housemates. Score and badges are public;
  written reviews unlock only after a match

**Skills every session should consult:** `/grilling` and `/domain-modeling` by default; `/research`
for research tickets; `/prototype` for prototype tickets.

**This map plans, it does not build.** The destination is a decision, not a deliverable.

### Concept locked during charting

Standing constraints for this effort. Reopen only deliberately.

1. **Person-first.** Browse people, not properties. One primitive: a person with a housing status.
2. **Users are students**, in a single university city.
3. **Matching** is hard filters → compatibility score → chat unlocks only on **double opt-in**.
4. **Households are first-class from day one**, not an afterthought bolted onto pairwise matching.
5. **Scope is introductions plus lease coordination.** No money moves through the platform.
6. **Landlords in v1 receive a shareable group profile and hold no account.** They become a full
   side later — deliberately.
7. **The differentiator is trust and verification.**
8. **Verification = student identity plus a housemate reputation layer** that compounds over time
   and cannot be copied from a standing start.
9. **Launch is one campus, one housing season.**
10. **Filterable preferences: lifestyle traits plus gender preference.** No other identity dimension.
11. **Free for students; landlords pay once they become a side.** Model still to be locked.
12. **A household locks explicitly** when its slots fill.
13. **Distribution runs through a university partnership** — student union or housing office.
14. **Matching is seasonal; the off-season is for reputation.** Current housemates review each other,
    which is also how the reputation layer bootstraps.
15. **Reputation visibility:** score and structured badges public while browsing; written reviews
    only after a match.
16. **Breaking a locked household is recorded on reputation**, unless the remaining members
    **release** you.

### Cautions carried from research

Learned after charting. Not constraints — hazards every session should hold in mind.

- **Don't rebuild Grouper.** Grouper (YC, dead 2016) required you to bring two friends before you
  could transact. The open-slot household lets **one person act alone**. The moment onboarding
  requires arriving with people, the product is dead. Protect this.
- **Release is core, not a fairness nicety.** Stranger-groups are uninvestable because one member's
  default contaminates everyone. Pacaso solves that with capital, which isn't available here.
  **Release** is the only non-capital answer to default contagion — treat it as load-bearing.
- **SpareRoom is the competitor that matters.** It holds the liquidity, and Buddy Up is a flag on an
  ad plus a search filter. It could ship a group object in a quarter. It has had a decade and
  answered with offline Speed Flatmating events instead — read that as either an opening or a
  warning, but don't ignore it.
- **The gap needs joint tenancies.** Where leases are by-the-bed and individual, there is no group to
  form and no problem to solve.
- **Free text beats a structured field.** Roommates.com lost §230 immunity because it *"created the
  questions and choice of answers"*; its free-text box kept immunity. Every dropdown this product
  offers on a sensitive dimension is the platform's own speech, not the user's. Applies well beyond
  the gender field.
- **The published listing is the exposed artefact in the US; the filter is the exposed artefact in
  the EU.** US federal law does not exempt §3604(c) advertising. EU law excludes advertising but
  bites on the choice itself. These are mirror images, so a single global design will be wrong
  somewhere.
- **Race is never exempted, anywhere.** Every jurisdiction surveyed carves out sex or similar to some
  degree; none carves out race. Constraint 10 already excludes it — this is why it must stay
  excluded.
- **Not legal advice.** The research surfaces what sources say. A lawyer reviews before launch.

## Decisions so far

<!-- one line per resolved ticket: gist + link. -->

- [Is group formation genuinely unserved?](issues/03-competitive-reality-check.md) — **Qualified yes.**
  Nobody bridges "strangers meet" and "existing group locks"; the `forming → locked → coordinating`
  lifecycle is that bridge. But the gap is **joint-tenancy-shaped** (UK yes, US purpose-built student
  housing actively destroys the group), constraint 5 is **vindicated** by five dead master-lease
  companies, the landlord packet has an incumbent in guarantor services, and the reputation moat is
  the weakest part of the concept on **cadence** — one review per person per year.
- [Legal basis for the gender preference filter](issues/02-fair-housing-gender-filter.md) —
  **Constraint 10 survives with a qualifier.** The roommate exemption is real but is four different
  mechanisms across jurisdictions, and the **platform** is more exposed than the individual. Two
  consequences: the preference likely belongs on the **soft-score** side rather than the hard-filter
  side, and every exemption surveyed is anchored to an **incumbent resident** — so the `needs a
  place` persona may fall outside all of them. Campus choice decides the regime.
- [Can a household exist with no property?](issues/01-household-without-property.md) — **Yes.** One
  `Household` object, property optional; a **slot** is capacity arithmetic (`open = target −
  members`), not an object; **lock** always means "this is my group" — people, never property, so
  release and constraint 16 mean one thing; a property **attaches, never converts**, and never
  rewrites the group's target. Plus, overruling the recommendation: **two legal regimes split by
  household shape**, sheltered iff a member **currently resides** in the property a joiner would
  enter — which leaves scratch-formed households unsheltered for their entire joinable life.

## Not yet specified

- **Onboarding depth vs. friction.** How much you ask a student before showing them anyone. Trades
  directly against density, and depends on which compatibility dimensions survive.
- **What a browse card shows.** The person-first surface — how much of profile, compatibility and
  reputation appears at a glance. Waits on
  [Compatibility dimensions](issues/04-compatibility-dimensions.md) and
  [Reputation rules](issues/05-reputation-rules.md).
- **Naming and positioning language.** How the product describes itself. Deliberately last; it
  should fall out of everything above.
- **Reputation weight of a broken scratch-formed lock.** Whether breaking a lock costs the same when
  there was never a lease. "Lock is about people" implies one uniform cost, but it was never put to
  the user. Belongs with
  [Household lifecycle and season boundaries](issues/08-household-lifecycle-seasons.md).

## Out of scope

- **Payments, escrow, deposits, rent splitting** — ruled out when scope was set to introductions +
  lease coordination. Moving money makes this a regulated business and a different company.
- **Landlords as a full third side** — deliberately deferred. Bootstrapping three sides at once is
  not a v1 problem.
- **A living-together layer** (chores, shared expenses, house admin) — materially a different
  product from matching, competing with tools people already use.
- **Mid-year subletting and room swaps** — real demand, but it widens the concept immediately after
  narrowing it.
- **Data model, tech stack, screens and user journeys** — excluded by the destination itself.
