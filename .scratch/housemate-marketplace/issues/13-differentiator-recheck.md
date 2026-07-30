# Does year-one differentiation rest on reputation, or on group formation?

Type: grilling
Status: resolved
Blocked by: —
Parent: [Student Housemate Marketplace](../map.md)

_Raised by [Is group formation genuinely unserved?](03-competitive-reality-check.md). This ticket
deliberately reopens **constraint 7**._

## Question

Charting locked **trust and verification** as the differentiator (constraint 7), and made the moat a
housemate reputation layer (constraint 8). The competitive research says that is the weakest part of
the concept, for a reason charting did not see:

**Cadence.** A person generates roughly **one review per year**. That is the thinnest of any consumer
reputation system — Uber accrues signal per ride, Airbnb per stay, eBay per transaction. A moat that
compounds once a year does not compound in year one. Meanwhile the research found the group-formation
gap is genuinely unserved and structurally defensible, and that no one has tried and failed at it.

So decide:

- **Is the year-one story group formation, with reputation as the year-three moat?** That keeps both
  but reorders them, and changes what the product says about itself on day one.
- **Or does trust stay the headline**, accepting that it is a promise before it is a proof?
- If reputation is demoted, does anything about the product actually change — or only the
  positioning? (Be precise here. Reordering the pitch is cheap; reordering the roadmap is not.)
- Constraint 14 — off-season reviewing by current housemates — was treated as a neat solution to the
  cold start. The research says it is **load-bearing**, the only thing generating signal for most of
  the year. Does it survive contact with reality? Would students actually come back to review people
  they still live with?

The research also notes several "Yelp for roommates" attempts, all pre-launch or unverifiable. An
absence this consistent is more likely a graveyard than a garden. Worth asking why.

Feeds [Reputation rules](05-reputation-rules.md) and
[Reputation abuse](10-reputation-abuse.md) — if reputation is demoted, both shrink.

## Resolution

**Group formation is the year-one story. Reputation is demoted to a year-three moat and is out of the
MVP.** Constraint 7 is amended; constraint 8 is deferred rather than deleted.

### Answering the ticket's own hardest question first

*"Does anything about the product actually change — or only the positioning?"*

**The roadmap changes, not just the pitch.** Reputation in the MVP means review capture, score
computation, badge display on the browse card, the after-match reveal rule (constraint 15), dispute
handling, and the entire retaliatory-review abuse surface ([ticket 10](10-reputation-abuse.md)). It
grows three modules and adds one. Reputation out means: record lifecycle events to an append-only
table, and ship nothing user-facing. The delta is most of a subsystem, so this was worth deciding
before building rather than after.

### Why demote

1. **Cadence kills it as a year-one moat, and this is arithmetic rather than judgement.** One review
   per person per year cannot compound inside a single season. A moat that needs three years to
   become a moat is not a differentiator on launch day — it is a bet, and bets should be labelled.
2. **The graveyard is evidence.** Several "Yelp for roommates" attempts, all pre-launch or
   unverifiable. The ticket asked why an absence this consistent exists. The most likely answer: the
   cadence problem is not specific to this product, it is structural to housemate reputation, and
   everyone who has tried has hit it. Nothing here solves it — the same arithmetic applies.
3. **Constraint 14 is load-bearing and unproven, which is the worst combination.** Off-season reviews
   from *current* housemates were the answer to the cold start, and the research says they are the
   only signal generator for most of the year. But reviewing someone you still live with and will
   keep living with is socially expensive. The predictable outcomes are silence or blandness, and
   bland reviews are worse than none — they manufacture confidence without carrying information. An
   entire moat resting on people doing a socially costly thing voluntarily, with no evidence they
   will, is not a foundation.
4. **The alternative is genuinely strong.** The research found group formation unserved, structurally
   defensible, and — unusually — with no graveyard behind it. Nobody has tried and failed. That is a
   better place to stand for a year than a moat that has not started accruing.

### The cost, stated plainly

**Year one has no moat.** This is the honest consequence and it should not be softened. Constraint 8
called the reputation layer something that "cannot be copied from a standing start" — that was the
answer to *why doesn't SpareRoom just do this*, and demoting it removes the answer. The map already
notes SpareRoom could ship a group object in a quarter. Nothing in this resolution changes that.

What remains in year one is weaker but real: **liquidity at one campus**, which is per-campus and
does not transfer, and an **event log quietly accruing** from day one. That is the honest position.
Claiming reputation as a year-one moat would not have made it one; it would only have made the MVP
larger while the moat still failed to compound.

### The hedge that makes this cheap

Every household state transition — lock, release, departure, reopening — is recorded as an event
from day one, in the same transaction as the state change. That is one append-only table and no
user-facing surface. It means year three's reputation layer launches with two seasons of accrued
history rather than from zero.

**This is the whole reason demotion is low-risk.** The expensive, irreversible thing about deferring
reputation would be arriving in year three with no data. That is avoided for the price of a table.
Discarding those events, or letting the log and the state disagree, forecloses this and must not
happen — it is recorded as a non-optional constraint in the spec.

### Consequences

- **Constraint 7 is amended:** the year-one differentiator is **group formation**; trust and
  verification are table stakes delivered by student verification alone.
- **Constraint 8 is deferred to year three**, not deleted. Verification stays in the MVP; the
  reputation layer does not.
- **Constraints 14 and 15 are deferred with it.** Off-season reviewing and the review-visibility
  rules only exist once reputation does.
- **Constraint 16 survives intact and changes character.** Breaking a locked household is still
  recorded, and **release** still absolves. In the MVP the record is an event log rather than a
  visible reputation consequence — which means release's *social* function must be carried by the
  product's language and design, since there is no score for it to protect yet.
- **[Reputation rules](05-reputation-rules.md) and [Reputation abuse](10-reputation-abuse.md) are
  deferred.** Both are year-three tickets now. Neither is answered.
- **The MVP spec needs no rewriting.** It already assumed this resolution (assumption 1) and already
  specifies the event log. Confirming it converts an assumption into a decision at zero cost.

### What would reopen this

If year-one usage shows students repeatedly asking *"but who are these people, really?"* at the point
of lock — that is the reputation demand arriving early, and it would justify pulling constraint 8
forward. The event log is what makes that pull cheap. Watch for it; do not build for it.
