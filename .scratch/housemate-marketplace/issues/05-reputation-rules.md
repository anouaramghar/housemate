# Reputation rules — who reviews whom, and when

Type: grilling
Status: open
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)

## Question

Reputation is the moat, and the off-season is when it gets built: people living together now review
each other (map, constraint 14).

Decide the rules:

- Who is **eligible** to review whom — only people who shared a *locked* household, or anyone who
  lived together?
- What **triggers** a review request, and how often? Mid-tenancy, end of tenancy, both?
- Are reviews **structured** across fixed dimensions (paid on time / kept shared space clean /
  respected guests / communicated well), **free text**, or both?
- Is reviewing **mandatory** to keep using the product, or optional? Mandatory gets coverage but
  yields lazy reviews.
- Can you review someone you never actually lived with, because the household broke before the
  lease? Related to the release mechanic in constraint 16.

And the bootstrap problem: what does a brand-new first-year student with zero history look like, and
how do they compete against someone carrying three good reviews? If new users are structurally
disadvantaged, the product has a cold-start problem every single September.

## Added after research

[Is group formation genuinely unserved?](03-competitive-reality-check.md) confirmed nobody has
housemate-to-housemate reputation — every existing trust mechanism is identity-facing or
property-facing. But it flagged the reason, and it is not that the idea is unexplored:

**Cadence.** One review per person per year is the thinnest signal of any consumer reputation
system. Uber accrues per ride, Airbnb per stay, eBay per transaction. Several "Yelp for roommates"
attempts exist and all are pre-launch or unverifiable — an absence that consistent looks more like a
graveyard than a garden.

This raises the stakes on the review-trigger question above. If reviews only happen at end of
tenancy, the system produces almost nothing. Constraint 14 — current housemates reviewing each other
during the off-season — is the only thing generating signal for most of the year, and should be
treated as load-bearing rather than a neat cold-start fix.

Resolve [Does year-one differentiation rest on reputation or group formation?](13-differentiator-recheck.md)
first if you can — if reputation is demoted from headline to year-three moat, this ticket shrinks
considerably.
