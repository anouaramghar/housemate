# How is the gender preference expressed?

Type: grilling
Status: open
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)

_Raised by [Legal basis for the gender preference filter](02-fair-housing-gender-filter.md). This
ticket partially reopens **constraint 3**._

## Question

Charting decided *that* users can express a gender preference (constraint 10) and put it on the
**hard filter** side of the matching pipeline (constraint 3). The legal research says the second half
of that is the risky half — and that three separate design choices, each of which looked cosmetic
during charting, carry most of the legal exposure.

Decide all three together, because they interact:

**1. Hard filter, or soft signal?** A hard filter *excludes* people from the pool. The 2008
Roommates.com reasoning turned specifically on a system that *"limit[ed] the listings available."*
Soft-ranking within the compatibility score achieves most of what users want without removing anyone
from anyone's pool. What does the product lose if the preference only ranks, rather than excludes?
Would users accept it, or does it feel broken to the people — mostly women — who care most?

**2. Structured field, or free text?** This is the highest-leverage finding in the research.
Roommates.com lost §230 immunity because it *"created the questions and choice of answers, and
designed its website registration process around them"* — while its free-text comments box **kept**
immunity. A dropdown you designed is your speech; a sentence a user typed is theirs. But free text
can't be matched on reliably, and can't be moderated easily. Where does this land?

**3. What are the options in the field at all?** Trans and non-binary handling is moving in opposite
directions across jurisdictions simultaneously — HUD's April 2026 proposed rollback, *For Women
Scotland*, NYC's express gender-identity protection. **A single global gender field cannot be correct
in all three.** Decide what this product's field actually contains, and whether that is a product
value you hold everywhere or a per-jurisdiction configuration. This is an ethical decision as much as
a legal one, and it should be made deliberately rather than inherited from a dropdown someone copied.

Also settle: is the preference **visible on a published listing**, or held privately and applied only
to what each user sees? The advertising provision §3604(c) is **not** covered by the roommate
exemption in US federal law — a published preference is the most exposed artefact this product
generates. Note the EU is the mirror image: advertising is excluded there, and the *filter* is what's
exposed.

Feeds [Compatibility dimensions](04-compatibility-dimensions.md) — if gender moves to the soft side,
it becomes a scoring weight and needs to be designed as one.
