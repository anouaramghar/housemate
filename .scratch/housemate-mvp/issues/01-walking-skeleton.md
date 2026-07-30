# 01 — Walking skeleton

**What to build:** A running application with one trivial authenticated-shaped endpoint, exercised by
a test that drives a real HTTP request against a real database. Nothing user-facing yet — this ticket
exists to fix the conventions every later ticket copies.

The spec states that the repository has no prior art, and that the first tests written establish the
conventions for everything after. This is that ticket. Treat the test file it produces as the
template, not as a throwaway.

The stack is settled in the spec: Next.js (App Router, single deployable), Hono mounted as the API
under a catch-all route handler, Postgres, Drizzle, Zod, Vitest with Testcontainers. Pin every
version to latest stable at scaffold time.

**Blocked by:** None — can start immediately.

**Status:** done — `5e916bd`

- [x] `GET /api/health` returns 200 with a body proving it reached Postgres
- [x] A Vitest test drives that route via the Hono app in-process — no server boot, no HTTP port
- [x] Postgres comes from Testcontainers; the suite creates and tears down its own database
- [x] Migrations run from a single command and are applied automatically before the suite
- [x] A service layer exists between routes and Drizzle, and the route calls it rather than the ORM
- [x] A Server Component reads through that same service layer, proving both entry points share it
- [x] The suite runs green from a clean checkout with one documented command
- [x] `README` records the three non-optional constraints: no Server Actions for mutations, Server
      Components read through the service layer, `household_events` append-only and transactional
