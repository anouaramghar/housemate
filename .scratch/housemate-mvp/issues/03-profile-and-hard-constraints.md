# 03 — Declare a housing status and a profile

**What to build:** A verified student declares whether they `have a place` or `need a place`, states
the constraints that genuinely exclude — budget range, acceptable areas, move-in date, tenancy
length — and writes about themselves in their own words. They can edit any of it at any time, and
pause the whole profile without deleting the account.

Housing status is the product's single primitive. It is an attribute of a Person, never a separate
kind of account, and switching it must not destroy anything.

Keep the questionnaire finishable in one sitting. Onboarding abandoned halfway produces a profile
nobody can be matched against.

**Blocked by:** 02 — Verify with a campus email.

**Status:** ready-for-agent

- [ ] A Person sets housing status to `has a place` or `needs a place`, and can change it later
- [ ] Budget range, areas, move-in date and tenancy length are captured and validated with one shared
      Zod schema used by both the API and the form
- [ ] A free-text self-description is captured and stored verbatim
- [ ] Every field is editable at any time, and edits take effect immediately
- [ ] A paused profile is invisible to everyone else and reversible without data loss
- [ ] A Person controls which details are public before a match, and the API never returns more than
      the viewer is entitled to
- [ ] Nothing in this ticket exposes an email address
