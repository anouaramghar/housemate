# 07 — Express interest, match, and unlock chat

**What to build:** A student expresses interest in someone. If it is reciprocated, they match and a
conversation opens. If it is not, nothing happens and the other person is never told. Passing on
someone is silent — rejection must not be a social event. Interest can be withdrawn before it is
reciprocated, so changing your mind costs nothing.

Chat unlocks **only** on a mutual match. This makes unsolicited contact structurally impossible
rather than merely against the rules, and it is the single most important authorisation boundary in
the product.

**Authorisation is derived, never stored.** A conversation exists if and only if a match exists, or
both people are members of the same Household. A stored "can chat" boolean would drift out of sync
with release and removal, so there must not be one.

**Blocked by:** 04 — Browse people, with hard constraints applied as filters.

**Status:** ready-for-agent

- [ ] Expressing interest is one-sided and invisible to the recipient until reciprocated
- [ ] Reciprocated interest creates a match and both people are notified
- [ ] Passing on someone is silent and never surfaced to them
- [ ] Interest can be withdrawn before reciprocation, leaving no trace for the other person
- [ ] Chat is unreachable without a mutual match — asserted directly against the API, not via UI
- [ ] Withdrawing interest after a match revokes chat access on the next request
- [ ] No "can chat" flag exists anywhere in the schema; authorisation is computed
- [ ] Chat holds no authorisation logic of its own — it asks Matching and Household
- [ ] A new match is visible to the student promptly, so they can act while the other is still looking
