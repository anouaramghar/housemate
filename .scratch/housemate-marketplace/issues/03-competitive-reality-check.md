# Is group formation genuinely unserved?

Type: research
Status: resolved
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)
Findings: [03-competitive-findings.md](../research/03-competitive-findings.md)

## Question

The bet underneath this whole concept is that **group formation is unserved**: everyone else matches
you to a room or to one other person, and nobody helps a group of strangers become a household that
signs a lease together.

Verify or kill that bet. Cover at minimum SpareRoom, Roomies, Badi, university housing portals, and
purpose-built student accommodation operators — plus whatever dominates student housing in non-US
markets. For each, answer:

- Do they model a **group** at all, or only individuals and rooms?
- Is there any **commitment step** — a point where a group closes and becomes real?
- Is there **reputation between housemates**, as opposed to reviews of a property or a landlord?
- Is there anything **landlord-facing** that represents a group as a single credible tenant?

Also worth knowing: has anyone tried group formation and failed? If so, what killed it — liquidity,
coordination cost, or something structural?

Output: a findings file with an explicit verdict on whether the gap is real, and where the nearest
competitor actually sits.

## Answer

**Qualified yes — the gap is real, but narrower and more conditional than charting assumed.**
Full findings, 25 products surveyed, with sources and verification gaps:
[03-competitive-findings.md](../research/03-competitive-findings.md).

**The bet holds.** No product takes N strangers and outputs one bounded, committed household able to
sign a joint tenancy. Everything sits on one side of a line: products that help strangers *meet*
(SpareRoom Buddy Up, Flatmates Team-ups, Diggz) have no group object at all; products with a real
group object and a lock (StarRez, Unite Group Booking) require the group to already exist. Nothing
bridges the two. The `forming → locked → coordinating` lifecycle is exactly that bridge.

**Four things that change the map:**

1. **The gap is UK-shaped, not universal.** It exists only where the lease is a joint tenancy over a
   whole property. US purpose-built student housing deliberately destroys the group — American
   Campus Communities sells by-the-bed individual leases whose *selling point* is that you are not
   liable for your roommates. Germany and the Netherlands run on an existing household picking a new
   member (*hospiteren*), not formation. Survivable under one-campus launch, but it constrains which
   campus, and caps the ceiling.

2. **Constraint 5 (no money moves) is strongly vindicated.** Every company that solved group
   formation by *becoming the landlord* is dead: HomeShare (2019), HubHaus (2020), Quarters (Ch. 7
   2021), Common (Ch. 7 2024), The Collective. HubHaus is the sharpest datapoint — its founder named
   this exact problem, "individuals who cannot coordinate a large group on their own." The matching
   worked. The master lease killed it. No evidence anyone has built the bridge product and failed.

3. **The landlord packet has an incumbent charting missed.** A landlord's risk under
   joint-and-several liability is financial, not social, and the market already productised the
   answer: professional guarantor services (Housing Hand signs the guarantor deed directly, ~98%
   acceptance, existing university partnerships). A packet carrying no money loses to one that does.
   Graduated to [What is the landlord packet actually for?](12-landlord-packet-purpose.md).

4. **The reputation moat is the weakest part of the concept.** Confirmed that nobody has
   housemate-to-housemate reputation — but the absence reads as a graveyard, not a garden. The
   structural killer is **cadence**: one review per person per year is the thinnest of any consumer
   reputation system. Constraint 14 is doing far more work than it appears. Recommendation from the
   research: do not let year-one differentiation rest on reputation. This challenges constraint 7 →
   [Does year-one differentiation rest on reputation or group formation?](13-differentiator-recheck.md).

**Nearest competitors.** StarRez is closest on group object and lock — but its join password *is*
the proof of pre-existing trust, and it only covers university inventory. **SpareRoom is the
competitor that matters**: it holds the liquidity, and Buddy Up is a flag on an individual ad plus a
search filter, nothing more. It could ship a group object in a quarter. It has had a decade and
answered instead with offline Speed Flatmating events — which is either an opening or a warning.

**Mechanisms worth stealing.** Troupe (JetBlue) converges a group on dates/budget/area by
ranked-choice poll, then locks before booking — a concrete answer to how `forming → locked` happens
without a human project-managing it. Graduated to
[How does a forming household converge on shared constraints?](14-household-convergence.md).
CoBuy suggests the lock should emit a co-created agreement artifact.

**Two cautions to carry.** Pacaso names why stranger-groups are uninvestable — one member's default
contaminates everyone — and solves it with capital, which you don't have. That makes **Release** the
only non-capital answer to default contagion: it is core, not a fairness nicety. And Grouper (YC,
dead 2016) died requiring you to bring two friends before you could transact; the open-slot household
lets one person act alone, and that must be protected.

**Unverified** (flagged in the findings file): Greystar/Chapter matching, HousingAnywhere and
Uniplaces group booking, StuRents structure (HTTP 410), Ideal Flatmate's current status, any
WG-Gesucht formation feature, and a secondary-source claim about Appartager group chat that the
company's own page does not support.
