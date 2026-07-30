# Legal basis for the gender preference filter

Type: research
Status: resolved
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)
Findings: [02-fair-housing-findings.md](../research/02-fair-housing-findings.md)

## Question

The product lets users filter housemates by gender preference, and nothing else about identity. That
choice rests on the **roommate exemption** to housing discrimination law — the argument that choosing
who you share intimate living space with is not regulated the way renting to a tenant is.

Establish whether that exemption actually holds, and where. Ground to cover:

- *Fair Housing Council of San Fernando Valley v. Roommates.com* (9th Cir.) — what it actually held,
  and how broadly it has been applied since.
- Whether the exemption protects a **platform** that offers the filter, or only the individual doing
  the choosing. These are not the same risk.
- How the picture differs outside the US — particularly the UK and EU — since the target campus is
  not yet chosen ([Which campus](06-campus-and-partnership.md)).
- Whether **advertising** a gender preference is treated differently from **filtering** on it
  privately.
- Whether any jurisdiction treats student housing differently from general shared housing.

Output: a findings file citing primary sources, with an explicit separation of what is settled from
what is genuinely uncertain. If the exemption does not hold in a plausible target jurisdiction, say
so plainly — constraint 10 on the map would need reopening.

## Answer

**Constraint 10 survives, but with a qualifier.** The roommate exemption is real. It is not one
exemption, though — it's four different mechanisms across jurisdictions that don't protect the same
party, and **the platform's exposure is materially worse than the individual's**. Full findings, with
per-claim confidence and the sources that blocked access:
[02-fair-housing-findings.md](../research/02-fair-housing-findings.md).

**This is not legal advice.** It is what the sources say, so the product decision can be made with
open eyes. Before launch in any real jurisdiction, a lawyer looks at this.

**What is settled:**

1. **The two Roommates.com opinions answer different questions, and only one helps.** The 2008 en
   banc decision (521 F.3d 1157) is **CDA §230 only** — the court said in terms it was not reaching
   the FHA merits. Roommates.com lost immunity because it *"created the questions and choice of
   answers, and designed its website registration process around them."* The free-text comments box
   **kept** immunity. That holding was never overturned and is still binding. The 2012 decision (666
   F.3d 1216) is the one saying the FHA doesn't reach shared living units — and it binds the **Ninth
   Circuit only**. There is no circuit split because no other circuit has ruled.

2. **The advertising provision, §3604(c), is not exempted — and this is worse than the ticket
   assumed.** §3603(b) reads *"Nothing in section 3604 **(other than subsection (c))** shall apply
   to—"*. HUD's own regulation says the same (24 CFR §100.10(c)), and *US v. Hunter* (4th Cir. 1972)
   confirms it. Mrs. Murphy is no help regardless: it requires an **owner-occupier**, and students
   are tenants. And the widely-repeated "female roommate wanted is fine" rule traces to 24 CFR Part
   109 — **which HUD rescinded in 1996**. The live regulation (§100.75) contains no shared-living
   exception at all.

3. **The 9th Circuit did dispose of the advertising claim, but by a route that doesn't travel.**
   *"Roommate's prompting, sorting and publishing … is not forbidden"* — because there was no
   "dwelling" for §3604(c) to attach to, **not** because an exemption covered it. Outside the Ninth
   Circuit, a published listing is the most exposed artefact this product generates.

4. **The UK is the inverse of the common assumption, and the EU is the hardest jurisdiction.** UK
   Equality Act Sch. 5 para. 3: within the small-premises exception, the relevant sections *"apply
   only in so far as they relate to **race**."* Sex is fine there; **race is the one ground never
   exempted anywhere**. But EU Directive 2004/113/EC Art. 3(2) is a bespoke anti-carve-out aimed at
   exactly this product: the freedom to choose a contractual partner holds *"as long as an
   individual's choice of contractual partner is not based on that person's sex."* Art. 3(3) then
   excludes **advertising** while leaving the **filter** exposed — the mirror image of US law.

5. **Platform-as-co-author is a live, current risk, not a historical one.** *Vargas v. Facebook* (9th
   Cir. 2023) held §230 did not immunise Meta over its own ad-targeting tools, and DOJ v. Meta (2022)
   forced retirement of "Special Ad Audience" for housing.

**Genuinely uncertain — not to be blurred with the above:**

- Whether the 2012 holding travels outside the Ninth Circuit. This is the biggest unknown and it is
  **entirely determined by campus choice** ([Which campus](06-campus-and-partnership.md)).
- Whether an exemption protecting an *individual* protects a *business* that industrialises the
  exempt act. No clean authority either way.
- Trans and non-binary handling, which is moving in **opposite directions simultaneously** — HUD's
  April 2026 proposed rollback, *For Women Scotland*, and NYC's express gender-identity protection.
  A single global gender field cannot be correct in all three.
- Whether NYC's room-rental exemption carries a *"not publicly advertised"* condition. Sources
  conflict; NYC is the weakest US city for this product.

**Two consequences the map absorbs:**

- **The gender preference belongs on the compatibility-score side of the constraint 3 pipeline, not
  the hard-filter side.** Soft-rank is not hard-exclude, and the 2008 court's reasoning turned on a
  system that *"limit[ed] the listings available."* Raised as
  [How is the gender preference expressed?](15-gender-field-design.md).
- **A gap that hits a core primitive.** UK Sch. 5 para. 3 requires someone who *"resides"*; NY's
  exemption requires *"the occupant"*; Germany's AGG §19(5) points to parties using space on the same
  property. **The "needs a place" persona — students forming a household from scratch with no
  incumbent resident — may fall outside every one of these.** Ticket 01 is not only a modelling
  question; it is a legal one. Noted there.

The single highest-leverage design constraint in the findings file: **free text beats a structured
field**, straight from the holding that cost Roommates.com its immunity. Nine such constraints are
listed in the file.
