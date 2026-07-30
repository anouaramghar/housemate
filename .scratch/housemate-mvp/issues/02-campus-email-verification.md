# 02 — Verify with a campus email

**What to build:** A student arrives, enters their university email address, receives a magic link,
clicks it, and is signed in as a verified Person. Anyone who has not done this can reach nothing.

The launch country is the UK, so verification means an `.ac.uk` address at the launch institution.
The specific institution is still open (decision ticket 16) — treat the accepted domain as
configuration, not as a hard-coded constant.

Verification must work from abroad: an international student finding housemates before they arrive is
one of the sharpest personas in the problem statement. Nothing in this flow may require being in the
country.

**Blocked by:** 01 — Walking skeleton.

**Status:** ready-for-agent

- [ ] Requesting a link with an accepted campus domain sends one; the address is validated server-side
- [ ] Requesting a link with any other domain is refused, with a message naming the campus requirement
- [ ] Clicking a valid link creates a session and marks the Person verified
- [ ] An expired or already-used link is refused and can be re-requested
- [ ] An unverified or anonymous request to any non-public route is refused — tested by name, since
      "an unverified person sees nothing" is the module's owned rule
- [ ] The email address is never returned by any API response or rendered on any surface
- [ ] Verification persists across the season; returning does not re-verify
- [ ] The accepted domain is configuration, changeable without touching application code
