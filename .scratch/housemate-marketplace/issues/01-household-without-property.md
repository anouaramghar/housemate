# Can a household exist with no property?

Type: grilling
Status: resolved
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)

## Question

Person-first matching says a person who *has a place* and a person who *needs a place* are the same
primitive. Households-first-class says the group is the thing that forms. Those two answers collide
at one point: **can three people who all need a place form a household before any apartment exists?**

Resolve:

- Does a Household always have a property attached, or can it exist as a pure group of people
  searching together?
- If both are allowed, are they one object in two states, or two genuinely different things?
- What does a **slot** mean when there is no apartment — an abstraction of "one more person", or a
  specific room in a specific flat?
- When a property-less household finds a place, what happens — does it convert, or is the property
  simply attached?

This is the structural question the rest of the household model hangs on, which is why
[Household consent model](07-household-consent-model.md),
[Household lifecycle and season boundaries](08-household-lifecycle-seasons.md) and
[How does a forming household converge on shared constraints?](14-household-convergence.md) all wait
on it.

## Added after research

[Legal basis for the gender preference filter](02-fair-housing-gender-filter.md) found that this is
not only a modelling question — **it is a legal one**, and the answer may be forced.

Every roommate exemption surveyed is anchored to an **incumbent resident**:

- UK Equality Act Sch. 5 para. 3 requires a person who *"resides"* on the premises
- New York's exemption requires *"the occupant"*
- Germany's AGG §19(5) points to parties using space on the **same property**

The `has a place` persona satisfies all of these. **The `needs a place` persona may satisfy none of
them.** A household formed from scratch, by people who all currently live elsewhere, has no incumbent
resident — so the legal shelter that makes constraint 10 defensible may simply not extend to the
half of the product that is most differentiated.

That is uncomfortable, because property-less household formation is the gap the competitive research
confirmed is genuinely unserved
([Is group formation genuinely unserved?](03-competitive-reality-check.md)). The most novel part of
the product may be the least legally sheltered part.

Carry into this ticket: if property-less households are allowed, does the gender preference behave
differently inside them than in a household with a sitting tenant? A "yes" is awkward but may be the
honest answer. Interacts directly with
[How is the gender preference expressed?](15-gender-field-design.md).

## Answer

**Yes — a household can exist with no property.** Property is optional on a single `Household`
object. Six decisions, taken in order:

**1. Property is optional; one object, not two.** A group of `needs a place` people can form before
any apartment exists. Rejected: requiring a property (only `has a place` users could ever start a
household, demoting `needs a place` users to applicants — collapsing the person-first primitive and
ceding the differentiated half); and a separate weaker "search party" object (two objects plus a
conversion event, for no gain once the lifecycle is shared).

**2. A slot is capacity arithmetic, not an object.** `open = target − members`. No slot identity,
nothing to reserve or hold. Chosen because it is the only definition that behaves identically with
and without a property, so the object never changes shape when a place attaches — which is what
decision 1 was for. Room assignment is a **coordinating**-phase concern, not a forming-phase one.

**3. Lock always means "this is my group" — people, never property.** Identical in both shapes; for
a scratch-formed household, `coordinating` includes the hunt itself. Rejected: requiring a property
to lock (a scratch-formed group would then have no commitment step at all — precisely the gap
[Is group formation genuinely unserved?](03-competitive-reality-check.md) confirmed nobody fills);
and two distinct locks (two release rules and two reputation weights for one concept). This keeps
**release** and constraint 16 meaning exactly one thing.

**4. Attach, never convert — and the target is the group's, never the property's.** A property
attaches to the existing object and never rewrites `target`. A locked 4 that finds a 5-bed is a
group of 4 with a spare room; taking a fifth is an explicit act by the locked group, not an
automatic reopening. A 3-bed is not viable unless someone leaves via **release**. Mismatch surfaces
as a warning. Rationale: if a building could silently reopen a locked household, `lock` would stop
meaning what decision 3 says it means.

**5. Two legal regimes, split by household shape.** *This overrules the recommended uniform design.*
The `has a place` half gets the fuller expression its exemption permits; scratch-formed households
get the restricted one. Accepted cost: the product's most sensitive field behaves differently in two
places, on the surface whose whole claim is trust — and
[How is the gender preference expressed?](15-gender-field-design.md) now inherits **two** designs
rather than one.

**6. The regime test is live residency, in the statutes' own words.** Sheltered **iff an existing
member currently resides in the property a joiner would enter** — matching UK Sch. 5 para. 3
(*"resides"*), New York (*"the occupant"*) and AGG §19(5) (same property). A signed-but-not-occupied
lease creates **no** incumbent. Rejected: stamping the regime at creation (a proxy for the statute,
and a founder who moves out leaves a sheltered household with no incumbent), and flipping on any
property attachment (indefensible under all three statutes).

Note the practical consequence of 6: joining only happens while **forming**, and a scratch-formed
household has no resident during forming, so **it is unsheltered for its entire joinable life**. The
regime is therefore stable in practice even though the test is evaluated live — and the most novel
half of the product is confirmed to be the least sheltered half, as this ticket feared.

### Carried outward, deliberately not decided here

- **Two gender-field designs, not one** → [How is the gender preference expressed?](15-gender-field-design.md)
- **Can a locked household expand into a spare room, and who consents?** →
  [Household consent model](07-household-consent-model.md)
- **Does breaking a scratch-formed lock cost the same reputation as breaking a lease-bound one?**
  Decision 3 implies yes, uniformly, but it was not put to the user — logged as fog for
  [Household lifecycle and season boundaries](08-household-lifecycle-seasons.md).

Unblocks [07](07-household-consent-model.md), [08](08-household-lifecycle-seasons.md) and
[14](14-household-convergence.md).
