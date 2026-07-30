# Household consent model — who approves a joiner

Type: grilling
Status: resolved
Blocked by: 01
Parent: [Student Housemate Marketplace](../map.md)

## Question

Households are first-class and members approve joiners. Double opt-in was chosen because it makes
harassment structurally impossible — but that logic was designed for **two** people, and a group
breaks it.

Decide:

- When someone asks to join a household, **who consents** — every member, a majority, or whoever
  holds the lease?
- Does a **single objection block** the joiner? Is that visible to anyone?
- Can a member be **removed** by the others, and at what threshold?
- Is there a **founder or admin** role, or are all members equal once inside?
- Does the person who *has the place* hold more power than people who joined — and should they?

Watch the failure mode carefully: an anonymous veto invites quiet discrimination that nobody can
see or challenge, while a public veto invites conflict inside a household that has to live together.
There may be no clean answer, only a chosen tradeoff.

Waits on [Can a household exist with no property?](01-household-without-property.md) — a
property-less household has no lease-holder, so that answer changes the options here.

## Resolution

**Unanimity throughout, and no roles.** The spec's original placeholder — majority approval while
forming — is rejected.

### Who consents: every member

Majority is the right rule when a decision applies to the group. This one does not. It applies to
**each member individually**, because each of them will share a kitchen and a bathroom with the
joiner for a year. A veto is therefore legitimate, and its cost is low: groups are three to five
people and there are other candidates, whereas living with someone you refused is expensive and
lasts a year.

There is a second, harder argument. **Majority quietly suppresses the signal.** A member who knows
they can be outvoted stops answering honestly — they read the room instead of stating a preference.
The product then collects agreement rather than opinion, which is worse than collecting nothing,
because it looks like consensus.

Unanimity is also the consistent choice: locking already requires it. If everyone must consent to
commit, everyone must consent to choose who they commit with.

### Silence expires the request; it never approves it

The known cost of unanimity is that one unresponsive member blocks everyone. The answer is a
deadline, not a default:

- Each member has **5 days** to respond.
- Silence triggers a reminder.
- The deadline passing without a complete set of responses **expires** the request, and the requester
  is told plainly.

**Expiry rather than auto-approval, deliberately.** Admitting someone into a home by default, because
a member forgot to click, is the worst outcome available here — an expiry frustrates, a silent
approval betrays. The expiry also carries information worth having: a group that cannot answer within
five days is a dead group, and the requester needs to know that so they can look elsewhere.

### No removal, no founder, no lease-holder privilege

The remaining sub-questions collapse once unanimity is in place:

- **Can members remove someone?** No. While `forming`, members leave freely and nobody needs removing.
  While `locked`, membership changes only through **release**, which is a departure the leaver
  initiates and the group absolves — not an ejection. Forced removal is not in the MVP. If it turns
  out to be needed, it is a new act with its own consequence, and it must not be built as a variant
  of release.
- **Is there a founder or admin?** No. All members are equal once inside. Any asymmetry would work
  against the map's standing caution about protecting a single person's ability to act alone — a
  founder role makes the first member structurally more important than the people who join them, and
  the whole point of the open-slot household is that one person starting alone is not a lesser case.
- **Does the person with the place hold more power?** No, and the question dissolves rather than
  being answered. Under unanimity plus no-removal, someone who owns the lease cannot be voted out of
  their own flat, so the protection they need already exists without a special rule. Ticket 01
  anticipated this: property is a nullable attribute, not a source of authority.

### The veto-visibility tradeoff — recommendation, not yet confirmed

The ticket flags this as possibly having no clean answer, and it was **not** covered in the grilling
session that settled the rest. Recording the recommendation so it is not lost:

**Show the outcome, never the objector.** Members see that a request was approved, declined or
expired. Nobody sees who objected.

Reasoning: under unanimity a single objection decides, so naming the objector points the whole group
at one person — inside a household whose entire purpose is to live together afterwards. The ticket's
counter-concern is real, that an anonymous veto shelters quiet discrimination. Two things limit it
rather than solve it: the decision is recorded as an event even though it is not attributed, and
the gender preference is the only identity dimension the product exposes at all, so there is little
structured material for a hidden veto to act on.

This is a chosen tradeoff, as the ticket predicted. **Confirm before building the join-request
surface.**

### What this changes in the spec

Assumption 4 is retired. The lifecycle diagram, the interaction decisions and the household
invariant tests all now carry unanimity-to-admit and expiry-on-silence.
