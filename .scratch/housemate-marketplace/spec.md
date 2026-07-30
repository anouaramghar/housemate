# Spec: Student Housemate Marketplace — MVP

Status: `ready-for-agent`
Parent map: [Student Housemate Marketplace](map.md)

> **Triage note.** This spec was first drafted as `needs-info` with three blocking unknowns. All
> three are now closed: the [tech stack](#tech-stack) is chosen, both
> [test seams](#testing-decisions) are confirmed, and tickets 13 and 06 are resolved — reputation is
> out of the MVP and the launch country is the UK.
>
> Nine of the map's sixteen decision tickets remain open, and none of them block the build. Each is
> covered by a labelled assumption in [Assumptions](#assumptions-standing-in-for-open-tickets) that
> names what breaks if the ticket resolves differently. Two of those tickets — 04 and 14 — are
> prototype tickets that should be run *alongside* the build rather than before it; both are isolated
> modules and neither touches the household spine.
>
> Treat the assumptions section as the live part of this document.

---

## Problem Statement

A student who needs somewhere to live next year has to solve two problems, and the market only helps
with one.

The first is **finding a place**. This is well served — SpareRoom, university portals, letting
agents, purpose-built student accommodation all compete for it.

The second is **finding people to live with**, and it is where the real anxiety sits. A student
arriving without a friendship group already formed — an international student, a first-year, a
transfer, someone whose friends have paired off — faces a market that assumes the group already
exists. Every joint tenancy on offer is priced and let to a group of four or five. If you are one
person, you cannot take it.

So the student is pushed into one of three bad outcomes:

- **Manufacture a group under time pressure** in a Facebook group or a course WhatsApp, agreeing to
  live with near-strangers because the deadline is closer than the certainty.
- **Take a room in someone else's established household**, arriving as the outsider into a group who
  already know each other.
- **Take purpose-built accommodation** — expensive, and it dissolves the group problem by dissolving
  the group.

The students who *do* form a group hit a second wall: **converging**. Four people who each want a
different budget, a different area and a different move-in date have exactly one tool for agreeing —
one exhausted person doing project management in a group chat. That coordination cost is plausibly
the real reason strangers do not form groups, and nothing in the market touches it.

And underneath all of it sits **trust**. You are agreeing to be jointly and severally liable for a
year's rent with people you have met twice. There is no signal available about whether any of them
is someone you want to live with, or someone who pays on time.

## Solution

A person-first marketplace for one university campus, where **you browse people, not properties**,
and where a group of strangers can become a real, committed household *before* anyone has a place.

The product is built on a single primitive — a **Person** carrying a **housing status** of
`has a place` or `needs a place` — and a single first-class object, the **Household**.

The core insight, and the thing nothing else in the market does: **a Household does not need a
property.** Three people who all need a place can form one, commit to each other, and go hunting as
a unit. The commitment step — **lock** — is about people, not buildings.

A student's path through the product:

1. **Verify** as a student at the launch campus.
2. **Declare** a housing status and answer a short compatibility questionnaire.
3. **Browse people** — filtered on the hard constraints that genuinely exclude (budget, area,
   move-in date), ranked by a compatibility score on the soft ones.
4. **Match** — mutual, double opt-in. Nothing unlocks chat but a match. This makes unsolicited
   contact structurally impossible rather than merely against the rules.
5. **Form a household** — either start one (with a place or without) or ask to join one. A household
   declares a **target** size; `open slots = target − members`.
6. **Converge** — the forming household agrees its budget, area and move-in date through structured
   group decisions, not a chat thread.
7. **Lock** — when the target is met, the group explicitly commits. The household closes to joiners
   and enters coordinating.
8. **Coordinate** — for a household that already had a place, this is signing. For a scratch-formed
   household, this is the hunt itself, done as a committed unit.
9. **Present to a landlord** — a locked household generates a shareable, read-only group profile. The
   landlord holds no account and needs none.
10. **Settle** — the group declares it has signed. The household goes read-only, the landlord link is
    revoked, and the product's job is done. This is the only point at which the product knows it
    worked.

**Release** is the escape valve, and it is load-bearing rather than a fairness nicety. Breaking a
locked household is recorded against you — unless the remaining members **release** you, absolving
you at no reputational cost. Without release, one member's default contaminates everyone, which is
what makes stranger-groups uninvestable. Capital solves this elsewhere; release is the only
non-capital answer available here.

No money moves through the platform. The product's scope is **introductions plus lease
coordination** — nothing else.

## User Stories

### Verification and identity

1. As a student at the launch campus, I want to verify with my university email address, so that I
   know everyone I browse is genuinely a student here and not an outsider.
2. As a student, I want to see a verified badge on every profile, so that I do not have to
   independently establish that a person is real.
3. As a student who has verified, I want my verification to persist across the season, so that I am
   not re-verifying every time I return.
4. As a student, I want my email address hidden from other users, so that verification does not cost
   me my privacy.
5. As an international student, I want verification to work before I arrive in the country, so that I
   can find housemates from abroad during the season that actually matters.
6. As a student, I want to control which of my details are public before I match, so that browsing
   strangers does not expose me.

### Profile and compatibility

7. As a student who already rents a flat, I want to set my housing status to `has a place`, so that
   people looking for a room can find me.
8. As a student with nowhere to live, I want to set my housing status to `needs a place`, so that I
   appear to both households with rooms and other searchers.
9. As a student, I want to answer a short lifestyle questionnaire, so that the people I am shown are
   plausible to live with.
10. As a student, I want the questionnaire to be short enough to finish in one sitting, so that I do
    not abandon onboarding halfway.
11. As a student, I want to state my budget range, so that I am not shown people whose rent
    expectations are impossible for me.
12. As a student, I want to state which areas I would live in, so that I am not matched to people
    committed to the other side of the city.
13. As a student, I want to state my move-in date and tenancy length, so that I am not matched to
    someone whose timeline cannot overlap mine.
14. As a student, I want to write about myself in my own words, so that I am more than a set of
    dropdowns.
15. As a student, I want to edit my profile and preferences at any time during the season, so that my
    matches track what I actually want now.
16. As a student, I want to pause my profile, so that I can step out of the market without deleting
    my account.

### Browsing and matching

17. As a student, I want to browse other people rather than listings, so that I am choosing
    housemates rather than rooms.
18. As a student, I want a compatibility indication on each person I browse, so that I can prioritise
    who to approach.
19. As a student, I want hard constraints applied as filters, so that I never waste attention on
    someone I could not possibly live with.
20. As a student, I want soft mismatches to lower someone's ranking rather than hide them, so that I
    am not over-filtered into an empty pool.
21. As a student, I want to express interest in someone, so that a conversation can begin if it is
    mutual.
22. As a student, I want chat to unlock only when interest is mutual, so that I cannot be messaged by
    someone I have not chosen.
23. As a student, I want to see that I have a new match, so that I act on it while the other person
    is still looking.
24. As a student, I want to pass on someone without them being told, so that rejection is not a
    social event.
25. As a student, I want to withdraw interest before it is reciprocated, so that a change of mind
    costs nothing.
26. As a student, I want to browse **households** as well as individuals, so that I can find a group
    to join rather than assembling one myself.
27. As a student, I want to see how many open slots a household has, so that I know whether there is
    room for me.
28. As a student, I want to see whether a household already has a place or is still searching, so
    that I know what I would be joining.

### Forming a household

29. As a student with a spare room, I want to create a household attached to my flat, so that I can
    find people to fill it.
30. As a student with nowhere to live, I want to create a household with **no property at all**, so
    that I can find people to search with rather than waiting to be picked.
31. As the person creating a household, I want to declare a target size, so that everyone can see how
    many more people are needed.
32. As a student, I want to create a household **alone**, so that I do not have to arrive with
    friends before the product is useful to me.
33. As a household member, I want to see open slots calculated as `target − members`, so that the
    number is unambiguous whether or not we have a place.
34. As a student, I want to ask to join a household, so that I can be considered by an existing
    group.
35. As a household member, I want to review join requests, so that we choose who we live with.
36. As a household member, I want a joiner's compatibility with the **whole group** shown, not just
    with whoever they matched first, so that we do not admit someone who works for one of us and not
    the rest.
37. As a student whose join request was declined, I want to be told plainly, so that I can move on
    rather than wait.
38. As a household member, I want to leave a forming household freely, so that pre-commitment is
    genuinely non-binding.
39. As a household, I want to change our target size while forming, so that we can adapt to what the
    market actually offers.
40. As a household member, I want to see every other member's profile in full, so that I am not
    committing to someone I have not read.

### Converging

41. As a forming household, I want to agree our budget range as a group, so that we do not discover
    the disagreement at viewing stage.
42. As a forming household, I want to agree our target areas as a group, so that our search is one
    search and not four.
43. As a forming household, I want to agree our move-in date as a group, so that our timelines are
    reconciled before we commit.
44. As a household member, I want to state my preferences on each of these privately first, so that I
    am not anchored by whoever answered loudest.
45. As a household member, I want to see where the group agrees and where it does not, so that the
    discussion starts at the actual disagreement.
46. As a household member, I want the group's agreed constraints recorded on the household, so that
    they are a shared artefact rather than a chat message that scrolls away.
47. As a household member, I want to see that convergence is incomplete, so that we do not lock while
    still disagreeing about the budget.

### Locking

48. As a household whose slots are full, I want to explicitly lock, so that commitment is a decision
    we take rather than something that happens to us.
49. As a household member, I want locking to require every member's agreement, so that nobody is
    committed by someone else.
50. As a household member, I want locking to mean "this is my group" regardless of whether we have a
    place, so that a group formed from scratch has a real commitment step.
51. As a locked household, I want to be closed to new join requests, so that our commitment actually
    means something.
52. As a locked household with no place, I want to keep hunting as a committed unit, so that we
    approach landlords as a group rather than as four individuals.
53. As a household member, I want to see clearly that we are locked and what that means, so that I do
    not discover the consequences only when I try to leave.

### Property attachment

54. As a household, I want to attach a property we have found, so that our place is recorded against
    the group.
55. As a household, I want attaching a property to leave our group unchanged, so that finding a
    building never silently alters who we are.
56. As a locked household of four that finds a five-bed, I want the spare room surfaced as a warning
    rather than an automatic reopening, so that our commitment to each other is not overridden by a
    floor plan.
57. As a locked household, I want taking an extra person into a spare room to be an explicit group
    decision, so that a stranger is never admitted automatically.
58. As a household of four looking at a three-bed, I want to be told it does not fit our target, so
    that we resolve the shortfall deliberately.

### Release and leaving

59. As a member of a locked household who has to leave, I want to request release, so that I am not
    permanently marked for a change of circumstances.
60. As the remaining members of a locked household, I want to grant release, so that a departure we
    accept costs the leaver nothing.
61. As a member of a locked household, I want a departure without release recorded, so that
    commitment carries real weight.
62. As the remaining members after a departure, I want our household reopened to the right number of
    slots, so that we can recover rather than collapse.
63. As a household member, I want to see who has been released and who has not, so that our record
    is honest.
64. As a student, I want release to be the normal, expected path rather than an exception, so that
    asking for it does not feel like an admission of failure.

### Presenting to a landlord

65. As a locked household, I want a single shareable link representing the whole group, so that we
    approach a landlord as one entity.
66. As a locked household, I want the link to show that every member is a verified student, so that
    the landlord's first question is already answered.
67. As a landlord, I want to open the group profile without creating an account, so that there is no
    barrier between me and the information.
68. As a household member, I want to control what the group profile exposes, so that presenting to a
    landlord does not publish my private answers.
69. As a household, I want to revoke or expire the link, so that it does not circulate indefinitely.

### The gender preference

70. As a student, I want to express a gender preference for who I live with, so that I can be
    comfortable in my own home.
71. As a student in a household where someone already lives, I want the fuller expression the
    roommate exemption permits, so that the choice I am legally entitled to make is available to me.
72. As a student in a household formed from scratch, I want a restricted expression, so that the
    product is not making a choice on my behalf that no exemption shelters.
73. As a student, I want to understand why the option differs between the two, so that the difference
    reads as care rather than inconsistency.
74. As a student, I want no other identity dimension offered as a preference, so that the product is
    not a discrimination engine.

### Safety

75. As a student, I want to block someone, so that they cannot reach me again.
76. As a student, I want to report someone, so that behaviour has consequences beyond my own block.
77. As a student, I want reporting to be reachable from every surface where I encounter a person, so
    that I never have to hunt for it in a moment that matters.
78. As a student, I want to know what happens after I report, so that reporting does not feel like
    shouting into a void.

### Season and lifecycle

79. As a student, I want to know where I am in the housing season, so that I understand the urgency.
80. As a student, I want half-formed households that went nowhere cleared out, so that browsing is
    not full of ghosts.
81. As a household member, I want to be told when our household is about to be cleared, so that
    inactivity does not silently destroy our work.

## Implementation Decisions

### Tech stack

A TypeScript monolith. Chosen for two properties this spec specifically needs: a type system strong
enough to encode the household invariants, and the highest available reliability when an AFK agent
writes the code.

| Layer | Choice | Reason |
| --- | --- | --- |
| Application | **Next.js**, App Router, single deployable | Web only, no native. Server Components carry the browse and household read views cheaply. |
| HTTP API | **Hono**, mounted at `app/api/[[...route]]/route.ts` | This is the primary test seam. `app.request()` drives real requests in-process with no server boot. |
| Database | **Postgres** | Real SQL for candidate filtering, and an append-only event table for the lifecycle record. |
| Data access | **Drizzle** | SQL-shaped. Candidate queries and the event log both want SQL rather than an object graph. |
| Validation | **Zod** | One schema per boundary, shared by the API and the forms. |
| Identity | **better-auth**, email magic link, domain-restricted | Campus-email verification is an allowlist check on the magic-link address. Most of the Identity module is configuration. |
| Tests | **Vitest** with a real Postgres (Testcontainers) | Matches the seam decisions below — real requests, real database, no internal mocks. |
| Chat transport | Postgres table, client polling | One campus, hundreds of people. Polling is correct until it measurably is not; SSE is the escape hatch. |

Pin every version to latest stable at scaffold time rather than to whatever was current when this was
written.

**Why TypeScript rather than Rails or Phoenix.** Rails reaches a first screen faster and offers
nothing at compile time for a domain whose entire value is its invariants. Phoenix and LiveView are
the better fit for convergence-reveal and chat, and are still declined: the ecosystem cost is not
repaid at one campus, and agent-written Elixir is materially less reliable than agent-written
TypeScript. Both are defensible. Neither is chosen.

**What the type system is being bought for.** The household states are a discriminated union, so the
lifecycle diagram above is checked rather than merely documented:

```ts
type Household =
  | { state: 'forming';      target: number; members: Member[]; property: Property | null }
  | { state: 'locked';       target: number; members: Member[]; consents: MemberId[]; property: Property | null }
  | { state: 'coordinating'; target: number; members: Member[]; property: Property | null }
  | { state: 'settled';      target: number; members: Member[]; property: Property }

// derived on read, never stored
const openSlots = (h: Household) => h.target - h.members.length
```

`locked` cannot be constructed without its consent record. `settled` cannot be constructed without a
property, so "they signed a lease on nothing" is unrepresentable. `release` and
`removeWithoutRelease` are separate members of the event union, which turns "must not share a code
path" from a review comment into a compile error.

**Three constraints the stack imposes, and none of them are optional:**

- **No Server Actions for mutations.** Every write goes through a Hono route. Server Actions are RPC
  and are not reachable at the stated test seam; reaching for them silently deletes the testing plan.
- **Server Components read through the service layer**, never the ORM directly. The same functions
  serve the API routes, so there is exactly one path to every read.
- **`household_events` is append-only and written in the same transaction as the state change it
  records.** Ticket 05 is unreachable if the log and the state can disagree.

### Domain vocabulary

The map's glossary is the ubiquitous language and is used verbatim throughout: **Person**, **housing
status** (`has a place` / `needs a place`), **Household**, **target**, **open slots**, **lock**,
**release**, **match**, **reputation**. Code, API and UI copy use these words and no synonyms. In
particular: never "listing", never "group" where **Household** is meant, never "seat" or "space"
where **slot** is meant.

### The Household object — settled by ticket 01

These four decisions are locked and are the structural spine of the build. Full reasoning in
[Can a household exist with no property?](issues/01-household-without-property.md).

- **One `Household` object; property is optional.** There is no second object for property-less
  groups and no conversion event. A household with a property and one without differ only by a
  nullable attribute.
- **A slot is capacity arithmetic, not an entity.** `open slots = target − members`. No slot table,
  no slot identity, nothing reservable or holdable. This is what allows one object to serve both
  shapes without changing form. Room assignment is deferred to `coordinating` and is not modelled as
  slots.
- **Lock is about people.** `forming → locked → coordinating` carries identical meaning in both
  shapes. `locked` closes the household to join requests. For a household with no property,
  `coordinating` encompasses the search itself.
- **Property attaches; it never converts and never rewrites `target`.** Capacity mismatch between a
  property and the household's target produces a surfaced warning, never an automatic change to
  membership or target. Only the group may change its own target.

The lifecycle as a state machine, in the vocabulary above:

```
forming      members join/leave freely; target mutable; convergence runs
             open slots = target − members
             join requests require UNANIMOUS member approval; silence expires them
   │
   │ lock  — requires open slots == 0 AND unanimous member consent
   │         these are the ONLY two hard conditions; convergence is not one
   ▼
locked       closed to join requests; membership change only via release
   │
   │ (property already attached, or attached during coordinating)
   ▼
coordinating no property → search as a committed unit, then sign
             property    → sign
   │
   │ settle — any member declares, the others confirm; taken on trust
   ▼
settled      terminal. read-only; group profile auto-revoked;
             exempt from end-of-season cleanup
             reversible → coordinating if the signing falls through

release      from `locked`: departing member absolved by remaining members
             → household returns to `forming` with target unchanged,
               open slots recomputed
departure without release → recorded in the household's event log
```

### Jurisdiction — settled by ticket 06

**The launch country is the United Kingdom.** Locked on three grounds: UK student lets are whole
properties on joint tenancies with joint and several liability, which is the market shape the product
requires and the pain **release** answers; Equality Act Sch. 5 para. 3 turns on whether someone
*"resides"*, which is the shelter test ticket 01 had already chosen independently; and every
alternative has a named defect — non-Ninth-Circuit US leaves §3604(c) advertising unexempted, and the
EU's Directive 2004/113/EC Art. 3(2) exposes the filter itself.

Two things follow for the build:

- **Verification is an `.ac.uk` address at the launch institution.** The specific campus is
  [still open](issues/16-campus-and-partnership.md) and does not block anything — it is now purely a
  go-to-market decision, so the domain allowlist is configuration, not architecture.
- **Nothing else may hard-code UK assumptions.** The regime test and the verification rule are the
  only two jurisdiction-aware points in the system, and both sit behind module interfaces. Household
  lifecycle, matching, convergence, group profile and safety are all jurisdiction-neutral and must
  stay that way.

### The two legal regimes — settled by ticket 01, decision 5/6

A household is **sheltered** if and only if an existing member **currently resides** in the property
a joiner would enter. This is evaluated live, and it is deliberately the statute's own test —
UK Equality Act Sch. 5 para. 3 (*"resides"*). A signed but unoccupied lease creates no incumbent and
confers no shelter.

Note this is now **two regimes under one statute**, not two jurisdictions — a materially smaller
design than the spec originally anticipated, and a direct saving from ticket 06.

Consequences the build must honour:

- The gender preference has **two designs**, selected by regime. This is a real cost accepted
  deliberately, over the recommended uniform design.
- A scratch-formed household is **unsheltered for its entire joinable life** — joining only happens
  while `forming`, and it has no resident then. The regime is therefore stable in practice even
  though the test is live.
- The most differentiated half of the product is the least legally sheltered half. This is known and
  accepted, not an oversight.

Two hazards carried from the legal research bind the implementation:

- **Free text beats a structured field.** Roommates.com lost §230 immunity precisely because it
  *"created the questions and choice of answers"*; its free-text box retained immunity. Every
  dropdown on a sensitive dimension is the platform's own speech. Prefer free text wherever a
  sensitive dimension is involved.
- **The exposed artefact differs by jurisdiction** — the published listing in the US, the filter
  itself in the EU. A single global design is wrong somewhere. **Dormant for the MVP:** ticket 06
  fixed launch to one jurisdiction, so there is no "somewhere" yet. It returns the day a second
  country does, which is why the gender field should stay isolated behind its module.

### Modules

Built as distinct modules with narrow interfaces. Each is a directory under the service layer, and
the Hono routes are a thin translation of HTTP into module calls:

- **Identity & verification** — campus email verification, session, the verified-student badge.
  Owns the rule that an unverified person sees nothing.
- **Profile** — housing status, hard constraints (budget, area, dates), soft traits, free-text
  self-description, visibility rules.
- **Matching** — hard filters then compatibility score then double opt-in. Exposes a candidate query
  and an interest/match transition. The score is a pure function of two profiles; keep it pure and
  swappable, because its contents are still open (ticket 04).
- **Household** — the state machine above, membership, target, join requests, consent, lock,
  release. This module owns every invariant in the lifecycle diagram and is the deepest module in
  the system.
- **Convergence** — structured group decisions over budget, area and move-in date, producing agreed
  constraints recorded on the household. Private input first, then reveal. **Warns, never blocks:**
  an unresolved disagreement is shown unmissably at the moment of lock ("you do not yet agree on
  budget — lock anyway?") but cannot prevent the transition, exactly as a capacity mismatch on a
  property warns without acting. Structurally this module sits *beside* Household, never inside it:
  it produces constraints and gates nothing, which keeps the system's deepest module independent of
  its least proven one.
- **Chat** — unlocked only by a match or shared household membership. Holds no authorisation logic
  of its own; it asks Matching and Household.
- **Group profile** — the read-only, revocable, accountless landlord-facing view of a locked
  household.
- **Safety** — block, report, and the queue reports land in.

### Interaction and contract decisions

- **Chat authorisation is derived, never stored as a flag.** A conversation exists iff a match exists
  or both people are members of the same household. A stored "can chat" boolean would drift out of
  sync with release and removal.
- **The compatibility score is never persisted as truth.** It is computed on read from current
  profiles, so that editing a profile immediately changes rankings.
- **Lock requires unanimity, and exactly two hard conditions.** `open slots == 0` and unanimous
  member consent. Nothing else may be added as a precondition — in particular **convergence is not a
  lock condition**. Partial consent is visible to members.
- **Admitting a member also requires unanimity.** A join request is approved only when every current
  member approves. Majority is wrong here: the decision does not apply to the group, it applies to
  each member individually, since each will share a kitchen and a bathroom with the joiner for a
  year. Majority also has a perverse effect — a member who knows they can be outvoted stops answering
  honestly, and the product loses the signal it was collecting.
- **Silence expires a join request; it never approves one.** Each member has 5 days. Past that, the
  request expires and the requester is told plainly. Admitting someone into a home by default,
  because a member forgot to click, is the worst available outcome: an expiry frustrates, a
  silent approval betrays. A group that cannot answer in 5 days is a dead group, and the requester
  needs to know.
- **Match and join request are independent paths.** Matching a member confers no right of entry, and
  a join request does not require a prior match. Requiring one would make finding a group as slow as
  finding a person, which is the whole point of the Household. The double opt-in still exists, carried
  by the group: the requester asks, the group consents.
- **A join request opens no conversation.** Chat with the group unlocks only on acceptance, all at
  once. The group decides from the requester's full profile and their compatibility with **every**
  member — not by talking to them first. This is what stops the join path becoming a back door around
  the no-unsolicited-contact rule.
- **A Person appears in both browse surfaces, and the two are linked.** Someone who `has a place` is
  legitimately both a Person and a Household member; the two surfaces answer different questions
  ("would I live with this person?" versus "would I join this group?"). A Person's card always shows
  their Household and links to it, so a member is never encountered without their group being
  visible. Members of a `locked` household disappear from both surfaces.
- **Release is a group act on a named member**, not a generic "remove". Removal-without-release is a
  different act with a different consequence and must not share a code path.
- **A departure is visible inside the household and nowhere else.** The household's history shows
  "left — released by the group" or "left — without release", readable by remaining members only. The
  trace follows the **Household**, never the Person, and nothing surfaces on any public profile.
  With reputation deferred, this is what keeps release meaningful — the pressure comes from the
  people you are leaving, not from a score. Accepted limit: someone who abandons three separate
  groups is caught by nobody in year one.
- **`settled` is a claim, not a verification.** Any member declares it and the others confirm;
  unanimity is not required because it records a fact rather than an undertaking. No lease is
  uploaded and no proof is asked — verifying would mean touching the legal document, which is out of
  scope. It is reversible back to `coordinating` if the signing falls through.
- **`settled` is the product's only success signal.** Without it nothing distinguishes a group still
  hunting from a group that has moved in, and the only measurable outcome is signups rather than
  people housed. It also auto-revokes the group profile link and exempts the household from
  end-of-season cleanup.
- **The group profile link is capability-based** — possession of the URL grants read access, and it
  is revocable and expiring. No landlord account exists in the MVP.
- **Every household state transition is recorded as an event.** Lock, release, departure and
  reopening are the raw material of reputation later; discarding them now forecloses ticket 05.

## Testing Decisions

**What makes a good test here.** Tests exercise externally observable behaviour — what a student can
do and what they are shown — never internal structure. A test that breaks when a module is renamed
or a function is extracted is a bad test. The household lifecycle is defined by its invariants, and
those invariants are what the tests assert.

**Seams — settled.** The repository is empty, so there was no existing seam to prefer and no prior art
to imitate. Two are adopted:

1. **The HTTP API — primary, and the highest seam available.** The overwhelming majority of tests
   drive real requests against a real database, asserting responses. Every user story above is
   expressible here. No mocking of internal modules. Concretely: `app.request()` against the Hono
   app, with Postgres from Testcontainers — in-process, no server boot, so this seam is fast enough
   to be the default rather than a ceremony.
2. **The Household state machine — one deliberate lower seam.** The lock/release/target/regime rules
   are the invariant-dense part of the system and their combinatorics are expensive to reach through
   HTTP. Tested directly as a pure function over `(state, event)`.

The ideal is one seam, and seam 2 is a considered violation of that. It is accepted rather than
dropped because the chosen stack already forces the state machine to be a pure function over a
discriminated union — the seam exists whether or not it is tested, so testing it costs only the test
file. Had the transition logic been entangled with persistence, the decision would have gone the
other way.

**What gets tested most heavily**, in order:

- **Household invariants** — lock only at zero open slots and unanimous consent, and *never* gated on
  convergence; admission requires unanimous approval; a join request expires on silence and never
  auto-approves; a locked household refuses joiners; property attachment never mutates target or
  membership; release returns the household to `forming` with target unchanged; departure without
  release is recorded; `settled` is terminal, read-only, revokes the group profile, and is reversible
  to `coordinating`; open slots is always `target − members`.
- **Matching authorisation** — chat is unreachable without a mutual match; withdrawn interest
  revokes it; hard filters exclude absolutely; soft mismatches only reorder. **A join request grants
  no chat before acceptance, and a match grants no entry to a household** — these two are the back
  doors around double opt-in and are tested as such by name.
- **The regime test** — a household with a residing member is sheltered; a scratch-formed household
  is not; a signed-but-unoccupied lease does not confer shelter. This is a legal invariant, so it is
  tested explicitly and by name rather than left implicit in UI tests.
- **Verification** — an unverified person can reach nothing; verification is scoped to the launch
  campus.
- **Group profile** — accessible without an account, revocable, expiring, and exposing only what
  members permitted.

**No prior art exists.** The first tests written establish the conventions for everything after, so
they should be written with that in mind rather than as throwaways.

## Assumptions standing in for open tickets

Each of these is a placeholder for an unresolved map ticket. They are stated so they can be
challenged, and each names what breaks if the ticket resolves differently.

1. ~~**Group formation is the year-one story; reputation is deferred.**~~ **No longer an assumption —
   [ticket 13](issues/13-differentiator-recheck.md) resolved this way.** The MVP ships
   verified-student identity and records lifecycle events, but no review capture, no score, no
   badges. Map constraint 7 is amended and constraint 8 deferred to year three. The cost is recorded
   in the ticket and is worth repeating here: **year one has no moat**, only per-campus liquidity and
   an accruing event log. The one non-optional consequence for the build is that
   `household_events` must be append-only and transactionally consistent with the state it records —
   that log is the entire hedge, and losing it forecloses year three.
2. **Compatibility traits.** Budget, area and move-in date are hard filters; lifestyle traits
   (sleep schedule, cleanliness, guests, noise, smoking) are soft signals; the score is shown as a
   band rather than a number. Placeholder for
   [Compatibility dimensions](issues/04-compatibility-dimensions.md), which is a prototype ticket and
   should be built before this is trusted.
3. ~~**A joint-tenancy market.**~~ **No longer an assumption — [ticket 06](issues/06-campus-and-partnership.md)
   locked the launch country to the UK**, where whole properties let to groups on joint and several
   liability is the norm nationally. The gap is joint-tenancy-shaped and the market now matches by
   construction. See [Jurisdiction](#jurisdiction--settled-by-ticket-06). The *campus* remains open
   as [ticket 16](issues/16-campus-and-partnership.md) and blocks launch, not the build.
4. ~~**Consent thresholds.**~~ **No longer an assumption — [ticket 07](issues/07-household-consent-model.md)
   is resolved.** Unanimity throughout: to admit a joiner, to lock, and to expand a locked household
   into a spare room. Join requests expire on silence after 5 days rather than auto-approving. The
   majority threshold this spec originally assumed was rejected — see
   [Interaction and contract decisions](#interaction-and-contract-decisions).
5. **Convergence is in the MVP, minimally.** Private preference capture then reveal, over budget,
   area and move-in date only. **Settled since first draft:** convergence warns and never blocks, and
   sits outside the household state machine. What remains open in
   [ticket 14](issues/14-household-convergence.md) is the *shape* of the mechanism — how preferences
   are captured, how disagreement is displayed, whether reveal is manual or automatic. Prototype it
   alongside the build; the household spine does not wait on it.
6. **The landlord packet is a credibility artefact only.** The competitive research warns this may
   lose to guarantor services, whose exposure answer is financial rather than social. Placeholder for
   [What is the landlord packet actually for?](issues/12-landlord-packet-purpose.md).
7. **Reports queue for a human.** No moderation team exists, so reports are recorded and queued
   rather than actioned automatically. Placeholder for
   [Safety when a match goes wrong](issues/09-safety-bad-match.md).
8. **The gender field's concrete expression** is unresolved — this spec fixes only that there are two
   regime-selected designs and that free text is preferred on sensitive dimensions. Placeholder for
   [How is the gender preference expressed?](issues/15-gender-field-design.md), which shrank when
   ticket 06 fixed the jurisdiction: the multi-jurisdiction half of that question is now dormant, and
   what remains is hard-filter-versus-soft-signal, structured-versus-free-text, and what the field
   contains. Build this module last and keep it isolated — it is the one place a jurisdiction change
   would land.

## Blocking unknowns

**None.** All three are closed:

- ~~**The tech stack.**~~ Settled — see [Tech stack](#tech-stack). TypeScript monolith:
  Next.js + Hono + Postgres + Drizzle.
- ~~**Seam confirmation.**~~ Settled — both seams adopted, see
  [Testing Decisions](#testing-decisions). The stack choice made seam 2 nearly free.
- ~~**Ticket 13.**~~ Settled — reputation is out of the MVP, group formation is the year-one story.
  See assumption 1. The MVP is the size described in this document.

**What is still open, and why none of it blocks.** Nine tickets remain. They fall into three kinds:

- **Deferred to year three** — 05 and 10, both reputation. Nothing to build.
- **Covered by a placeholder assumption** — 07 (consent thresholds), 08 (season boundaries),
  09 (safety), 11 (monetisation), 12 (landlord packet), 15 (gender field), 16 (campus). Each is one
  flag, one late surface, or one configuration value. The assumptions section names what breaks for
  each.
- **Prototype alongside the build** — 04 (compatibility dimensions) and 14 (convergence). Both are
  isolated modules behind narrow interfaces; the compatibility score is explicitly a pure, swappable
  function. Building the household spine does not wait on either, and neither should wait on the
  spine.

**Ticket 16 blocks launch, not the build.** A campus is needed before real students can use this. It
is not needed to write any of it.

## Out of Scope

Inherited from the map and unchanged:

- **Payments, escrow, deposits, rent splitting.** Moving money makes this a regulated business and a
  different company. Scope is introductions plus lease coordination.
- **Landlords as a full third side.** No landlord accounts, no landlord dashboard, no listings from
  landlords. They receive a link and nothing else. Bootstrapping three sides at once is not a v1
  problem.
- **A living-together layer** — chores, shared expenses, house admin. Materially a different product,
  competing with tools people already use.
- **Mid-year subletting and room swaps.** Real demand, but widens the concept immediately after
  narrowing it.
- **Monetisation.** Free for students; the landlord product does not exist yet
  ([Monetisation](issues/11-monetisation-model.md) is open and not needed for the MVP).

Additionally out of scope for the **MVP specifically**:

- **Reputation scores, badges and written reviews** — deferred to year three by ticket 13, not
  pending it. Also deferred with them: off-season reviewing (constraint 14) and review-visibility
  rules (constraint 15). Lifecycle events are still recorded so this stays reachable. The word
  "reputation" should not appear in MVP code or UI; the MVP has a **household event log**.
- **A property/listings database.** A property is an attribute of a household, entered by the
  household. The product does not index the rental market.
- **More than one campus**, and more than one housing season.
- **Native mobile applications.**
- **Any identity dimension beyond gender preference** as a filterable field. Race is never exempted
  in any jurisdiction surveyed; this exclusion is permanent and not a v1 simplification.

## Further Notes

**Protect the ability to act alone.** Grouper (YC, dead 2016) required you to bring two friends
before you could transact. The open-slot household exists so that **one person can start something
alone**. Any change that makes onboarding require arriving with people kills the product. This is
worth restating in review of every flow that touches household creation.

**Release is load-bearing.** It reads like a fairness feature and is actually the only non-capital
answer to default contagion in a stranger-group. Do not let it be implemented as a variant of
"remove member".

**SpareRoom is the competitor that matters.** It holds the liquidity, and its Buddy Up is a flag on
an ad plus a search filter. It could ship a group object in a quarter. It has had a decade and
answered with offline Speed Flatmating events instead — read that as an opening or as a warning, but
do not ignore it.

**None of the legal material is legal advice.** The research reports what sources say. A lawyer
reviews before launch, and the two-regime design in particular is exactly the kind of thing that
needs a real opinion.

**Release has lost its enforcement mechanism, and this needs design attention.** Ticket 13 deferred
reputation, so in the MVP a departure without release is recorded to an event log nobody can see.
Release still matters — it is the answer to default contagion — but nothing *makes* it matter to a
user yet. Whatever carries that weight in year one is product language and interface design, not a
score. Do not let this quietly become a no-op.

**This spec was produced past the map's stated destination.** The map's destination is a locked
product decision, explicitly *not* a spec, data model or user journeys. It is a synthesis of what is
decided plus labelled assumptions. Nine of sixteen decision tickets remain open — none blocking, all
covered by an assumption that names what breaks. Treat the assumptions section as the live part of
the document.
