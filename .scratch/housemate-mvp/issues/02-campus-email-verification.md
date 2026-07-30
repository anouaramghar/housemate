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

**Status:** done — `78ae568`, `3147f44`

- [x] Requesting a link with an accepted campus domain sends one; the address is validated server-side
- [x] Requesting a link with any other domain is refused, with a message naming the campus requirement
- [x] Clicking a valid link creates a session and marks the Person verified
- [x] An expired or already-used link is refused and can be re-requested
- [x] An unverified or anonymous request to any non-public route is refused — tested by name, since
      "an unverified person sees nothing" is the module's owned rule
- [x] The email address is never returned by any API response or rendered on any surface
- [x] Verification persists across the season; returning does not re-verify
- [x] The accepted domain is configuration, changeable without touching application code
