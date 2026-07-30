# 06 — Rank browsed people by compatibility

**What to build:** Each person a student browses carries a compatibility indication, so they know who
to approach first. Soft mismatches push someone **down the ranking**; they never remove anyone from
the pool. Over-filtering into an empty pool is the failure to avoid.

The soft traits — sleep schedule, cleanliness, guests, noise, smoking — are a **placeholder**.
Decision ticket 04 is an unresolved prototype ticket and should be run before these are trusted. That
is exactly why the score must be a pure, swappable function: when the real dimensions land, only that
function changes.

Show the result as a **band**, not a number. A number invites false precision the underlying data
cannot support.

**Blocked by:** 04 — Browse people, with hard constraints applied as filters.

**Status:** ready-for-agent

- [ ] A short lifestyle questionnaire is captured, finishable in one sitting, and editable later
- [ ] The score is a pure function of two profiles, with no I/O and no dependency on request context
- [ ] It is **computed on read** and never persisted as truth — editing a profile immediately changes
      rankings, asserted by a test
- [ ] Soft mismatches only reorder; nobody is ever hidden by a soft signal
- [ ] The indication renders as a band, and the raw number is not exposed by the API
- [ ] Swapping the scoring function changes rankings without touching any other module
