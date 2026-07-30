# How is the gender preference expressed?

Type: grilling
Status: open
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)

_Raised by [Legal basis for the gender preference filter](02-fair-housing-gender-filter.md). This
ticket partially reopens **constraint 3**._

> **Jurisdiction now fixed.** [Ticket 06](06-campus-and-partnership.md) locked the launch country to
> the **UK**. Answer the three questions below against **Equality Act Sch. 5 para. 3 alone** — not
> against the multi-jurisdiction matrix the question was originally written for. Three consequences:
> the sub-question in part 3 about a *"single global gender field"* is deferred, not live; the
> US §3604(c) advertising hazard and the EU mirror-image hazard both fall out of scope for launch;
> and the two regimes named in the spec are now **sheltered versus unsheltered under one statute**,
> which is a materially smaller design than two jurisdictions. The parts of this ticket that survive —
> hard filter versus soft signal, structured field versus free text, and what the field contains —
> are the parts that were never jurisdictional. They remain open.

> **Question 1 is now answered: hard filter *or* soft signal, selected by regime.**
>
> - **Sheltered** (a member already resides in the property) → **hard filter permitted**. Excluded
>   people disappear from the browse. This is the right the statute grants the person who resides.
> - **Unsheltered** (household formed from scratch, nobody residing) → **soft signal only**. People
>   rank lower but stay visible. No exemption shelters an exclusion here.
>
> Two consequences worth carrying into the remaining design work:
>
> - **The most differentiated half of the product has the weakest control.** The scratch-formed group
>   — the thing nobody else does — gets only ranking, while the spare room at someone's flat, which
>   exists on every competing site, gets the full filter.
> - **The sharpest objection comes from the users who care most.** A woman who will only live with
>   women finds a soft signal broken: she does not want a man ranked seventh, she wants him absent.
>   In the unsheltered regime the product cannot give her that. This is accepted, not overlooked, and
>   it is a plausible cause of early churn among exactly the users the product most needs.
>
> **Still open:** structured field versus free text (question 2), and what the field contains
> (question 3, minus its deferred multi-jurisdiction half). Note that question 2's original argument
> rested on **§230**, which does not exist in the UK — the general principle that platform-authored
> questions are platform speech still holds, but the specific legal mechanism does not transfer and
> needs the lawyer's opinion rather than inheritance from the US research.

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
