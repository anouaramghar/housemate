# Which country, and which campus?

Type: grilling
Status: resolved
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)

_Resolved by splitting. The country is decided here; the campus and the partnership moved to
[Which campus, and is a partnership reachable?](16-campus-and-partnership.md)._

## Question

Launch is one campus, one season (constraint 9), distributed through a university partnership
(constraint 13). Both are abstract right now.

Decide:

- **Which university?** A named one, not a profile.
- What makes a campus a good first target — housing scarcity, student numbers, an active existing
  housing group to displace, international-student share, a housing office that would plausibly
  engage?
- **Is the partnership actually reachable?** Do you have a real route into an institution — a
  contact, a student union, a society, a course — or is it aspirational?

The last point is load-bearing. If no partnership is reachable, constraint 13 has to be revisited
and this ticket should say so rather than papering over it — the fallback options from charting were
leading with the scam problem, coexisting inside the existing groups, or entering late at the
coordination step.

The answer also fixes the jurisdiction for
[Legal basis for the gender preference filter](02-fair-housing-gender-filter.md), and unblocks
[Monetisation](11-monetisation-model.md).

## Added after research

[Is group formation genuinely unserved?](03-competitive-reality-check.md) found a hard structural
filter that outranks every criterion above:

**The campus must sit in a joint-tenancy market.** The gap only exists where a group signs one lease
over a whole property. Where student housing is sold **by the bed on individual leases** — the
dominant US purpose-built model, whose explicit selling point is that you are *not* liable for your
roommates — there is no group to form and no problem to solve. Germany and the Netherlands are
different again: an existing household picks a new member (*hospiteren*), which is joining, not
forming.

So the question becomes: which campuses have students renting **whole properties on joint tenancies
from private landlords**, rather than beds from an operator? That is a checkable fact about a city's
housing stock, and it should be checked before anything else on this ticket.

Second-order: the research found guarantor services (Housing Hand and similar) already hold
university partnerships in exactly these markets. They are a competitor to the landlord packet, but
possibly a **channel** into the institution — see
[What is the landlord packet actually for?](12-landlord-packet-purpose.md).

[Legal basis for the gender preference filter](02-fair-housing-gender-filter.md) then raised the
stakes on this ticket considerably. **Campus choice decides the legal regime**, and the regimes are
not close to equivalent:

- **Ninth Circuit US** (California, Washington, Oregon, Arizona, Nevada) — the only place the
  shared-living holding actually binds. Materially the safest US ground.
- **Rest of the US** — the 2012 holding does not bind. No circuit split exists because no other
  circuit has ruled, so it is open, not settled-against. **NYC is the weakest US city** — sources
  conflict on whether its room-rental exemption carries a "not publicly advertised" condition.
- **UK** — sex is exempted under Sch. 5 para. 3, and joint tenancies are the norm, which is also what
  the competitive research says the product needs. On these two axes it is the strongest fit found.
- **EU** — Directive 2004/113/EC Art. 3(2) is a bespoke anti-carve-out written at exactly this
  behaviour. The hardest jurisdiction surveyed.

Two axes now converge on the same answer: the market must have **joint tenancies**, and the
jurisdiction must have a **workable exemption**. Those point at the UK more strongly than anywhere
else, but that is an inference from two research tickets, not a decision — and the deciding factor
remains whether you have a real route into an institution.

Whichever campus is chosen, note that
[How is the gender preference expressed?](15-gender-field-design.md) has to be answered against
**that** jurisdiction, and that the trans and non-binary question resolves differently in each.

## Resolution

**The ticket was two questions wearing one hat, and they have different natures.** Which *country*
is a question about evidence, and the evidence was already gathered. Which *campus* is a question
about whose phone number you have. Bundling them made the second hold the first hostage — and the
first is the one that blocks writing code.

So it is split. This ticket answers the country. The campus and the partnership move, unchanged, to
[ticket 16](16-campus-and-partnership.md).

### Decision: launch in the United Kingdom

Locked. Three reasons, all of them already in the research above rather than new:

1. **The market is the right shape.** UK student lets are whole properties on joint tenancies from
   private landlords, with joint and several liability as the norm. That liability *is* the pain
   **release** exists to answer. The US purpose-built model sells the opposite — by-the-bed leases
   whose explicit pitch is that you are not liable for your roommates — which dissolves the group and
   with it the entire problem this product solves.
2. **The exemption is workable and matches the design already chosen.** Equality Act Sch. 5 para. 3
   turns on whether someone *"resides"* in the property. Ticket 01 independently adopted residence as
   the shelter test. The statute and the data model already agree, which is not true anywhere else
   surveyed.
3. **The alternatives are worse in specific, named ways.** Non-Ninth-Circuit US is unsettled rather
   than settled-against, and §3604(c) does not exempt advertising federally — making the *published
   listing* the exposed artefact, which is bad for a product whose output is profiles. The EU's
   Directive 2004/113/EC Art. 3(2) is a bespoke anti-carve-out aimed at exactly this behaviour, and
   there the *filter itself* is exposed — worse still for a product whose core is filtering. The
   Ninth Circuit is the only genuinely safe US ground, but it buys safety in a by-the-bed market,
   which is the wrong trade.

### What this unblocks immediately

- **The legal regime is fixed.** Both regimes in the spec are now *UK* regimes — sheltered versus
  unsheltered under one statute, not two jurisdictions. This is a real simplification over what the
  spec anticipated.
- **[Ticket 15](15-gender-field-design.md) is unblocked**, and is now answered against Sch. 5 para. 3
  alone rather than against a matrix.
- **Verification** has a concrete rule: an `.ac.uk` address at the launch institution.
- **The exposed-artefact hazard resolves one way.** The map warned a single global design would be
  wrong somewhere. Launching in one jurisdiction means there is no "somewhere" yet. It returns the
  day a second country does.

### What this does not settle, and is not pretending to

- **Which campus.** Moved to [ticket 16](16-campus-and-partnership.md). Still open, and still the
  deciding factor for launch timing.
- **Whether a partnership is reachable at all.** Also ticket 16. Constraint 13 remains untested, and
  the fallback options from charting remain live.
- **Anything about a second country.** This is a launch decision, not an architecture decision.
  Nothing in the build should hard-code UK assumptions beyond the verification domain rule and the
  regime test — both of which are already isolated behind module interfaces.

### The cost of being wrong

Low, and worth stating plainly. If the UK turns out wrong, what breaks is the email-domain rule, the
gender field's concrete expression, and go-to-market. The household lifecycle, matching, convergence,
group profile and safety modules are all jurisdiction-neutral. This is a cheap decision to reverse,
which is part of why it was worth making now rather than waiting on ticket 16.
