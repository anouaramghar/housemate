# 05 — Create a Household, with or without a property

**What to build:** A student creates a Household, declares its **target** size, and sees
`open slots = target − members`. Critically, they can do this **alone**, and with **no property at
all** — a person with nowhere to live can start a group and go looking for people to search with,
rather than waiting to be picked.

This is the deepest module in the system and the structural spine of everything after it. It also
establishes the household event log, which the whole reputation deferral rests on.

One `Household` object serves both shapes; property is a nullable attribute, never a second object
and never a conversion. A slot is arithmetic, not an entity — no slot table, nothing reservable.

The state machine is a pure function over `(state, event)`, tested directly as a second, deliberate
seam below HTTP. This ticket establishes that function with `forming` only; later tickets extend it.
The shape, which encodes the invariants the spec requires:

```ts
type Household =
  | { state: 'forming';      target: number; members: Member[]; property: Property | null }
  | { state: 'locked';       target: number; members: Member[]; consents: MemberId[]; property: Property | null }
  | { state: 'coordinating'; target: number; members: Member[]; property: Property | null }
  | { state: 'settled';      target: number; members: Member[]; property: Property }

const openSlots = (h: Household) => h.target - h.members.length
```

**Guard against the failure that killed Grouper:** nothing in this flow may require arriving with
other people. If creating a Household alone ever becomes impossible, the product is dead.

**Blocked by:** 03 — Declare a housing status and a profile.

**Status:** ready-for-agent

- [ ] A Person creates a Household alone, with no property, and it is immediately valid
- [ ] A Person with a place creates a Household attached to their flat
- [ ] Target is declared at creation and is mutable while `forming`
- [ ] `open slots` is always computed as `target − members`, never stored
- [ ] Members can leave freely while `forming` — pre-commitment is genuinely non-binding
- [ ] Members see every other member's full profile
- [ ] Every state transition writes to an append-only `household_events` table **in the same
      transaction** as the state change; the log and the state can never disagree
- [ ] Events are never updated or deleted, and this is asserted by a test
- [ ] The state machine is exercised directly as a pure `(state, event)` function, separately from
      the HTTP tests
