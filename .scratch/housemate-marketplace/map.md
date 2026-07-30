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
  **forming → locked → coordinating → settled**
- **Settled** — terminal state. The group declares it has signed; taken on trust, no lease is seen.
  The product's only success signal
- **Lock** — the explicit commit action taken when slots fill. Closes the household to joiners and
  triggers lease coordination
- **Release** — remaining members absolving a departing member, so breaking a lock costs them no
  reputation
- **Match** — mutual (double opt-in) interest. The only thing that unlocks chat
- **Reputation** — structured reviews from past and current housemates. Score and badges are public;
  written reviews unlock only after a match. **Year-three vocabulary** — deferred out of the MVP by
  [ticket 13](issues/13-differentiator-recheck.md). The word should not appear in MVP code or UI;
  what the MVP has is a **household event log**

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
7. ~~**The differentiator is trust and verification.**~~ **Amended by
   [ticket 13](issues/13-differentiator-recheck.md):** the year-one differentiator is **group
   formation**. Trust and verification are table stakes, delivered by student verification alone.
8. ~~**Verification = student identity plus a housemate reputation layer** that compounds over time
   and cannot be copied from a standing start.~~ **Deferred to year three by
   [ticket 13](issues/13-differentiator-recheck.md).** Student identity stays in the MVP; the
   reputation layer does not. Lifecycle events are recorded from day one so it stays reachable.
9. **Launch is one campus, one housing season** — **in the United Kingdom**, locked by
   [ticket 06](issues/06-campus-and-partnership.md). The campus itself is
   [still open](issues/16-campus-and-partnership.md).
10. **Filterable preferences: lifestyle traits plus gender preference.** No other identity dimension.
11. **Free for students; landlords pay once they become a side.** Model still to be locked.
12. **A household locks explicitly** when its slots fill.
13. ~~**Distribution runs through a university partnership** — student union or housing office.~~
    **Amended by [ticket 16](issues/16-campus-and-partnership.md):** no institutional route exists,
    so the partnership is **off the critical path**. Distribution runs through the **existing student
    housing groups** (Facebook, WhatsApp) that already hold the liquidity at every campus. A
    partnership is pursued in parallel as an upside, never as a precondition. Reason: a university
    takes a term or two to say yes while the housing season lasts weeks — that is one attempt per
    year, and missing the window costs twelve months.
14. ~~**Matching is seasonal; the off-season is for reputation.** Current housemates review each
    other, which is also how the reputation layer bootstraps.~~ **Deferred with constraint 8.**
    Matching remains seasonal; the off-season has no reviewing in it. Ticket 13 judged the
    review-people-you-still-live-with mechanic socially expensive and unproven.
15. ~~**Reputation visibility:** score and structured badges public while browsing; written reviews
    only after a match.~~ **Deferred with constraint 8.**
16. **Breaking a locked household is recorded**, unless the remaining members **release** you.
    Survives constraint 8's deferral, with changed character: in the MVP the record is an
    append-only event log, not a visible reputation consequence. Release's social function must
    therefore be carried by product language and design, since there is no score for it to protect
    yet.

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
  somewhere. **Dormant since [ticket 06](issues/06-campus-and-partnership.md)** locked launch to the
  UK — with one jurisdiction there is no "somewhere". Returns the day a second country does.
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
- [Does year-one differentiation rest on reputation, or on group formation?](issues/13-differentiator-recheck.md) —
  **Group formation.** Constraint 7 amended, constraint 8 deferred to year three, 14 and 15 deferred
  with it. Cadence is the reason: ~one review per person per year cannot compound inside one season,
  and the "Yelp for roommates" graveyard suggests that is structural rather than specific. The cost
  is stated plainly — **year one has no moat**, only per-campus liquidity. The hedge is an
  append-only household event log written from day one, which makes the year-three pull cheap.
- [Household consent model — who approves a joiner](issues/07-household-consent-model.md) —
  **Unanimity throughout.** Admitting a joiner needs every member's approval, not a majority: the
  decision applies to each member individually, since each shares a kitchen for a year. Majority also
  suppresses honest answers, since a member who can be outvoted stops voting. Silence **expires** a
  request after 5 days rather than approving it — an expiry frustrates, a silent approval betrays.
- **Two gaps closed by grilling the spec.** (1) The lifecycle had **no terminal state** — added
  `settled`, without which the only measurable outcome is signups rather than people housed.
  (2) Deferring reputation left **release with no teeth**, so a departure is now visible in the
  household's own history — "released" or "not released", to remaining members only, never on a
  public profile. The pressure comes from the people you are leaving, not from a score.
- [Which country, and which campus?](issues/06-campus-and-partnership.md) — **The United Kingdom**,
  by splitting the ticket: country is an evidence question, campus is a whose-phone-number question,
  and bundling them let the second block the first. UK on three grounds — joint-tenancy market shape,
  Equality Act Sch. 5 para. 3 turning on *"resides"* exactly as ticket 01 independently chose, and
  named defects in every alternative. Fixes the legal regime, unblocks
  [ticket 15](issues/15-gender-field-design.md), and makes both regimes *UK* regimes rather than two
  jurisdictions. Campus and partnership move to [ticket 16](issues/16-campus-and-partnership.md),
  still open.

## Not yet specified

- **Onboarding depth vs. friction.** How much you ask a student before showing them anyone. Trades
  directly against density, and depends on which compatibility dimensions survive.
- **What a browse card shows.** The person-first surface — how much of profile and compatibility
  appears at a glance. Now waits on [Compatibility dimensions](issues/04-compatibility-dimensions.md)
  alone; the reputation half of this question went with constraint 8.
- **Naming and positioning language.** How the product describes itself. Deliberately last; it
  should fall out of everything above.
- **Reputation weight of a broken scratch-formed lock.** Whether breaking a lock costs the same when
  there was never a lease. "Lock is about people" implies one uniform cost, but it was never put to
  the user. Belongs with
  [Household lifecycle and season boundaries](issues/08-household-lifecycle-seasons.md).
  **Deferred with constraint 8** — with no reputation there is no weight to calibrate. The MVP
  records both cases identically in the event log, which keeps the question answerable later.

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
