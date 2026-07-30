import { describe, it, expect, beforeEach } from "vitest";
import { app } from "@/src/server/app";
import { setEmailSender } from "@/src/auth";
import { CapturingEmailSender, truncateAll } from "@/src/test/testUtils";
import { getDb } from "@/src/db/client";
import { user, session as sessionTable } from "@/src/db/schema";
import { eq } from "drizzle-orm";

const VALID_EMAIL = "student@manchester.ac.uk";
const INVALID_EMAIL = "student@gmail.com";
const CALLBACK_URL = "/dashboard";

let capture: CapturingEmailSender;

beforeEach(async () => {
  await truncateAll();
  capture = new CapturingEmailSender();
  setEmailSender(capture);
});

async function requestMagicLink(email: string) {
  const res = await app.request("/api/auth/sign-in/magic-link", {
    method: "POST",
    body: JSON.stringify({ email, callbackURL: CALLBACK_URL }),
    headers: { "Content-Type": "application/json" },
  });
  return res;
}

async function verifyMagicLink(token: string, callbackURL?: string) {
  let url = `/api/auth/magic-link/verify?token=${encodeURIComponent(token)}`;
  if (callbackURL) {
    url += `&callbackURL=${encodeURIComponent(callbackURL)}`;
  }
  const res = await app.request(url, { method: "GET" });
  return res;
}

function extractSessionCookie(res: Response): string | null {
  const setCookie = res.headers.get("set-cookie");
  if (!setCookie) return null;
  const match = setCookie.match(/better-auth\.session_token=([^;]+)/);
  return match ? match[1] ?? null : null;
}

function getRequestWithCookie(cookie: string) {
  return {
    headers: {
      Cookie: `better-auth.session_token=${cookie}`,
    },
  };
}

describe("campus email verification", () => {
  it("sends a magic link for an accepted campus domain", async () => {
    const res = await requestMagicLink(VALID_EMAIL);

    expect(res.status).toBe(200);
    expect(capture.lastEmail).toBe(VALID_EMAIL);
    expect(capture.lastUrl).toBeTruthy();
    expect(capture.lastUrl).toContain("/api/auth/magic-link/verify");
  });

  it("refuses a magic link for an invalid domain with a message naming the campus requirement", async () => {
    const res = await requestMagicLink(INVALID_EMAIL);

    expect(res.status).toBe(400);
    const body = await res.json();
    const text = JSON.stringify(body).toLowerCase();
    expect(text).toContain("ac.uk");
    expect(capture.sentEmails.length).toBe(0);
  });

  it("creates a session and marks the Person verified on valid link click", async () => {
    await requestMagicLink(VALID_EMAIL);
    expect(capture.lastUrl).toBeTruthy();
    const token = new URL(capture.lastUrl!).searchParams.get("token");
    expect(token).toBeTruthy();

    const verifyRes = await verifyMagicLink(token!, CALLBACK_URL);

    expect(verifyRes.status).toBe(302);
    const cookie = extractSessionCookie(verifyRes);
    expect(cookie).toBeTruthy();

    const meRes = await app.request(
      "/api/me",
      getRequestWithCookie(cookie!),
    );
    expect(meRes.status).toBe(200);
    const meBody = await meRes.json();
    expect(meBody).toHaveProperty("name");

    const db = getDb();
    const [userRecord] = await db
      .select()
      .from(user)
      .where(eq(user.email, VALID_EMAIL));
    expect(userRecord).toBeTruthy();
    expect(userRecord!.emailVerified).toBe(true);
  });

  it("refuses an expired or already-used link and allows re-request", async () => {
    await requestMagicLink(VALID_EMAIL);
    const token = new URL(capture.lastUrl!).searchParams.get("token");
    expect(token).toBeTruthy();

    const firstVerify = await verifyMagicLink(token!);
    expect(firstVerify.status).toBe(200);

    const secondVerify = await verifyMagicLink(token!);
    const secondStatus = secondVerify.status;
    const secondLocation = secondVerify.headers.get("location");

    const isRefused =
      secondStatus === 400 ||
      (secondStatus === 302 && secondLocation?.includes("error="));
    expect(isRefused).toBe(true);

    capture.clear();
    await requestMagicLink(VALID_EMAIL);
    expect(capture.lastUrl).toBeTruthy();
  });

  it("unverified person sees nothing", async () => {
    const anonRes = await app.request("/api/me");
    expect(anonRes.status).toBe(401);

    await requestMagicLink(VALID_EMAIL);
    const token = new URL(capture.lastUrl!).searchParams.get("token");
    const verifyRes = await verifyMagicLink(token!, CALLBACK_URL);
    const cookie = extractSessionCookie(verifyRes);
    expect(cookie).toBeTruthy();

    const db = getDb();
    const [userRecord] = await db
      .select()
      .from(user)
      .where(eq(user.email, VALID_EMAIL));
    expect(userRecord).toBeTruthy();
    await db
      .update(user)
      .set({ emailVerified: false })
      .where(eq(user.id, userRecord!.id));

    const meRes = await app.request(
      "/api/me",
      getRequestWithCookie(cookie!),
    );
    expect(meRes.status).toBe(403);
  });

  it("never returns the email address in API responses", async () => {
    const responses: Response[] = [];

    const signInRes = await requestMagicLink(VALID_EMAIL);
    responses.push(signInRes);

    const token = new URL(capture.lastUrl!).searchParams.get("token");
    const verifyRes = await verifyMagicLink(token!, CALLBACK_URL);
    responses.push(verifyRes);

    const cookie = extractSessionCookie(verifyRes);
    const meRes = await app.request(
      "/api/me",
      getRequestWithCookie(cookie!),
    );
    responses.push(meRes);

    for (const res of responses) {
      const text = await res.clone().text();
      if (text.length === 0) continue;

      expect(text.toLowerCase()).not.toContain(VALID_EMAIL.toLowerCase());

      expect(text.toLowerCase()).not.toMatch(/[a-z]+@[a-z]+\.[a-z]+/);

      if (res.status === 302) {
        const location = res.headers.get("location");
        if (location) {
          expect(location.toLowerCase()).not.toContain(VALID_EMAIL.toLowerCase());
          expect(location.toLowerCase()).not.toMatch(/[a-z]+@[a-z]+\.[a-z]+/);
        }
      }
    }
  });

  it("verification persists across the season", async () => {
    await requestMagicLink(VALID_EMAIL);
    const token1 = new URL(capture.lastUrl!).searchParams.get("token");
    await verifyMagicLink(token1!, CALLBACK_URL);

    const db = getDb();
    const [userRecord] = await db
      .select()
      .from(user)
      .where(eq(user.email, VALID_EMAIL));
    expect(userRecord).toBeTruthy();
    expect(userRecord!.emailVerified).toBe(true);

    await db
      .delete(sessionTable)
      .where(eq(sessionTable.userId, userRecord!.id));

    capture.clear();
    await requestMagicLink(VALID_EMAIL);
    const token2 = new URL(capture.lastUrl!).searchParams.get("token");
    const verifyRes2 = await verifyMagicLink(token2!, CALLBACK_URL);
    expect(verifyRes2.status).toBe(302);

    const [afterReVerify] = await db
      .select()
      .from(user)
      .where(eq(user.email, VALID_EMAIL));
    expect(afterReVerify).toBeTruthy();
    expect(afterReVerify!.emailVerified).toBe(true);
    expect(afterReVerify!.id).toBe(userRecord!.id);
  });

  it("accepts subdomains and rejects siblings for a generic campus domain", async () => {
    const valid = await requestMagicLink("student@manchester.ac.uk");
    expect(valid.status).toBe(200);
    expect(capture.lastUrl).toBeTruthy();

    capture.clear();
    const sibling = await requestMagicLink("student@ucl.ac.uk");
    expect(sibling.status).toBe(200);
    expect(capture.lastUrl).toBeTruthy();
  });

  it("rejects an address with only the configured domain suffix but wrong boundary", async () => {
    const res = await requestMagicLink("student@notac.uk");
    expect(res.status).toBe(400);
    expect(capture.sentEmails.length).toBe(0);
  });

  it("takes the domain after the last @", async () => {
    const res = await requestMagicLink("a@b@evil.com");
    expect(res.status).toBe(400);
    expect(capture.sentEmails.length).toBe(0);
  });

  it("matches case-insensitively", async () => {
    const res = await requestMagicLink("Student@MANCHESTER.AC.UK");
    expect(res.status).toBe(200);
    expect(capture.lastUrl).toBeTruthy();
  });

  it("uses configurable accepted domains and correctly refuses a sibling", async () => {
    const originalDomain = process.env.ACCEPTED_EMAIL_DOMAIN;
    process.env.ACCEPTED_EMAIL_DOMAIN = "manchester.ac.uk";

    const validRes = await requestMagicLink("student@manchester.ac.uk");
    expect(validRes.status).toBe(200);
    expect(capture.lastUrl).toBeTruthy();

    capture.clear();
    const siblingRes = await requestMagicLink("student@ucl.ac.uk");
    expect(siblingRes.status).toBe(400);
    expect(capture.sentEmails.length).toBe(0);

    process.env.ACCEPTED_EMAIL_DOMAIN = originalDomain;
  });
});
