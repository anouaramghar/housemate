# 15 — Settle: the Household has signed

**What to build:** The group declares it has signed its lease. The Household goes read-only, the
landlord link is revoked automatically so it stops circulating, and the Household is exempt from
end-of-season cleanup — it is a success, not a ghost.

**This is the product's only success signal.** Without it, nothing distinguishes a group still
hunting from a group that has moved in, and the only measurable outcome is signups rather than people
housed. Treat the metric as part of the deliverable, not an afterthought.

**Taken on trust.** No lease is uploaded and no proof is requested. Verifying would mean touching the
legal document, and the product's scope stops before the document. If the group says it signed, it
signed.

Declaring is a **statement of fact, not an undertaking**, so unanimity is not required: any member
declares and the others confirm. It is reversible back to `coordinating` if the signing falls
through — a lease that collapses must not trap the group in a terminal state.

`settled` requires a property. "They signed a lease on nothing" is unrepresentable in the type, and
that is deliberate — see ticket 05.

**Blocked by:** 11 — Lock the Household; 09 — Attach a property to a Household; 14 — The shareable
group profile.

**Status:** ready-for-agent

- [ ] Any member declares settlement; the others confirm
- [ ] Settlement is refused if no property is attached
- [ ] A `settled` Household is read-only: no convergence, no target change, no membership change
- [ ] The group profile link is revoked automatically on settlement — asserted by name
- [ ] A `settled` Household is excluded from end-of-season cleanup
- [ ] Settlement is reversible back to `coordinating`, and reversal restores nothing that was revoked
- [ ] No lease document is uploaded, requested or stored
- [ ] The transition writes to `household_events` in the same transaction
- [ ] A count of settled Households is readable by an operator — this is the success metric
