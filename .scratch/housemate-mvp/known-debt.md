# Known debt

Carried deliberately, not overlooked. Each entry says what it is, why it was accepted at the time,
and what it will cost if left. Tickets 01–03 are complete; these are the things those tickets chose
not to solve.

## 1. The test suite is serial and getting slow

`vitest.config.ts` sets `fileParallelism: false`. One Testcontainers Postgres is shared by the whole
suite, so parallel test files raced each other into foreign-key violations during user creation.
Running files one at a time fixed it.

The cost is already visible: **43 tests take about 130 seconds**, and every ticket adds more. Fourteen
tickets remain. This is also the reason running two implementer agents at once is less attractive than
it sounds — they would both be paying this tax, against the same design.

**The fix:** a database per test file rather than one per run. Create the container once, then create
a fresh database per worker and point `DATABASE_URL` at it, so files can run in parallel again without
sharing state. Roughly an afternoon, and it gets cheaper the earlier it is done.

## 2. Nothing tests the interface

All 43 tests drive the Hono app. Sign-in and the profile form have no automated coverage at all —
they were verified by driving a real browser by hand against real Postgres.

Two real bugs shipped past every gate and were caught only by looking at the rendered page:

- The housing status label read **"I has a place"**, because the stored third-person value was
  interpolated into a first-person sentence.
- The profile form was crushed to **400px**, because `form { max-width: 25rem }` written for the
  sign-in page applied to every form in the application.

Neither is the kind of thing a typecheck, a linter, or an API test can see. As the interface grows,
the proportion of the product that no gate protects grows with it.

**The fix:** jsdom plus a testing library, covering the states that carry rules rather than layout —
the refusal message, the sent state that must not echo an address, the visibility toggles, pause.

## 3. Parallel tickets will collide on migrations

Ticket 03 unblocks 04 (browse people) and 05 (create a Household) at the same time — the first point
where two tickets can genuinely be built at once, in separate worktrees.

They will collide. Both will run `drizzle-kit generate`, both will produce `0003_*.sql`, and both
will append an entry to `drizzle/meta/_journal.json`. That is a conflict by construction, not bad
luck, and merging two generated migrations by hand is exactly the kind of edit that silently diverges
from the snapshot.

**The approach:** let one branch own the migration and rebase the other onto it. Household is the
deeper module and the spine of the product, so 05 should own it and 04 should rebase.

## 4. Everything is public by default

`redactProfile` treats a null `publicFields` as "every profile field is visible". A Person who has
never opened the visibility section is fully exposed to any verified student.

This was accepted because browse cannot work otherwise: budget, areas and dates are the hard filters,
and hiding them by default would leave ticket 04 with nothing to filter on. The default is now a named
constant rather than an implicit fallback, so the choice is at least legible.

**Worth revisiting** when browse exists and it is possible to see what a stranger actually receives.
The free-text self-description is the field most worth questioning: it is the most personal thing on
the profile and the least necessary for filtering.

## 5. TypeScript is one major version behind

Pinned to `6.0.3` while `7.0.2` is current. `typescript-eslint@8.65.0` rejects TypeScript 7 at
runtime, so upgrading means dropping the lint gate — which currently enforces two of the three
non-optional architectural constraints. `tsc --noEmit` alone passes on 7.

**The fix:** upgrade when `typescript-eslint` ships TypeScript 7 support. Nothing to do until then.
