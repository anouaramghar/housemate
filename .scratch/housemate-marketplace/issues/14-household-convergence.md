# How does a forming household converge on shared constraints?

Type: prototype
Status: open
Blocked by: 01

> **Two things are already settled and are not up for prototyping.**
>
> 1. **Convergence warns, it never blocks.** An unresolved disagreement is shown unmissably at the
>    moment of lock — "you do not yet agree on budget, lock anyway?" — but cannot prevent the
>    transition. Same philosophy as the capacity-mismatch warning: the product informs, the group
>    decides. Three reasons: consistency with that existing warning, the fact that convergence is
>    itself unproven and should not hard-gate anything, and that apparent disagreement is often not
>    one (budgets of 400/420/450/600 are not a conflict — the last person simply has more room).
> 2. **Lock has exactly two hard conditions** — `open slots == 0` and unanimous consent. Convergence
>    is not among them and nothing may be added.
>
> Structurally this means convergence lives **beside** the Household module, never inside it: it
> produces recorded constraints and gates no transition. That keeps the deepest module in the system
> independent of the least proven one — which is also what makes it safe to prototype this
> *alongside* the build rather than before it.
>
> What remains open is the **shape** of the mechanism: how preferences are captured, how disagreement
> is displayed, and whether the reveal is manual or automatic.
Parent: [Student Housemate Marketplace](../map.md)

_Raised by [Is group formation genuinely unserved?](03-competitive-reality-check.md)._

## Question

Charting defined the household lifecycle as `forming → locked → coordinating`, but never asked how a
group actually gets **to** the lock. Four people who each individually want different budgets, areas
and move-in dates have to agree — and today the only mechanism for that is one person in a group chat
doing exhausting project management. That coordination cost is arguably the real reason strangers
don't form groups.

Troupe (JetBlue) solves the same shape for group travel: **ranked-choice polls** converge a group on
dates, budget and destination, then the group locks in before booking. Worth stealing, worth testing.

Prototype something cheap and react to it, then decide:

- What must a household **agree on** before it can lock — budget range, area, move-in date, house
  size, anything else?
- Is convergence a **poll**, a **negotiation**, or simply intersecting the members' existing filters
  automatically? The last is cheapest, but silent — nobody feels they agreed to anything.
- What happens when the group **cannot** converge? Does the household split, shrink, or dissolve?
- Does convergence happen **before** or **after** people join? A household with a stated budget is
  browsable and self-selecting; one that agrees afterwards is more flexible but risks forming groups
  that immediately fail.
- Who **arbitrates** when one member is the outlier — related to
  [Household consent model](07-household-consent-model.md).

Waits on [Can a household exist with no property?](01-household-without-property.md) — a household
with a property inherits its budget and area, so convergence only matters in the property-less case.
That dependency is exactly why ticket 01 comes first.
