import { describe, it, expect, beforeEach } from "vitest";
import { app } from "@/src/server/app";
import { setEmailSender } from "@/src/auth";
import { CapturingEmailSender, truncateAll } from "@/src/test/testUtils";
import { profileSchema, profileUpdateSchema, profilePatchSchema } from "@/src/schemas/profile";

const VALID_EMAIL = "ada@manchester.ac.uk";
const CALLBACK_URL = "/dashboard";

let capture: CapturingEmailSender;

beforeEach(async () => {
  await truncateAll();
  capture = new CapturingEmailSender();
  setEmailSender(capture);
});

async function signInAndGetCookie(): Promise<string> {
  const signInRes = await app.request("/api/auth/sign-in/magic-link", {
    method: "POST",
    body: JSON.stringify({ email: VALID_EMAIL, callbackURL: CALLBACK_URL }),
    headers: { "Content-Type": "application/json" },
  });
  expect(signInRes.status).toBe(200);

  const token = new URL(capture.lastUrl!).searchParams.get("token");
  expect(token).toBeTruthy();

  const verifyRes = await app.request(
    `/api/auth/magic-link/verify?token=${encodeURIComponent(token!)}&callbackURL=${encodeURIComponent(CALLBACK_URL)}`,
    { method: "GET" },
  );
  expect(verifyRes.status).toBe(302);

  const setCookie = verifyRes.headers.get("set-cookie");
  const match = setCookie?.match(/better-auth\.session_token=([^;]+)/);
  expect(match).toBeTruthy();
  return match![1]!;
}

async function createSecondUser(): Promise<string> {
  const email = "bob@manchester.ac.uk";
  const signInRes = await app.request("/api/auth/sign-in/magic-link", {
    method: "POST",
    body: JSON.stringify({ email, callbackURL: CALLBACK_URL }),
    headers: { "Content-Type": "application/json" },
  });
  expect(signInRes.status).toBe(200);

  const token = new URL(capture.lastUrl!).searchParams.get("token");
  const verifyRes = await app.request(
    `/api/auth/magic-link/verify?token=${encodeURIComponent(token!)}&callbackURL=${encodeURIComponent(CALLBACK_URL)}`,
    { method: "GET" },
  );
  expect(verifyRes.status).toBe(302);

  const setCookie = verifyRes.headers.get("set-cookie");
  const match = setCookie?.match(/better-auth\.session_token=([^;]+)/);
  return match![1]!;
}

function authHeader(cookie: string) {
  return {
    headers: {
      Cookie: `better-auth.session_token=${cookie}`,
    },
  };
}

const validProfile = {
  housingStatus: "has a place" as const,
  budgetMin: 400,
  budgetMax: 800,
  areas: ["Fallowfield", "Withington"],
  moveInDate: "2026-09-01",
  tenancyLengthMonths: 12,
  selfDescription: "Final-year CS student looking for flatmates near campus.",
};

describe("profile: housing status, hard constraints and visibility", () => {
  describe("criterion 1: housing status set and changed", () => {
    it("sets housing status to has a place and reads it back", async () => {
      const cookie = await signInAndGetCookie();

      const patchRes = await app.request(
        "/api/profile",
        {
          method: "PATCH",
          body: JSON.stringify(validProfile),
          ...authHeader(cookie),
          headers: {
            "Content-Type": "application/json",
            ...authHeader(cookie).headers,
          },
        },
      );
      expect(patchRes.status).toBe(200);
      const body = await patchRes.json();
      expect(body.housingStatus).toBe("has a place");

      const getRes = await app.request("/api/profile", {
        ...authHeader(cookie),
      });
      expect(getRes.status).toBe(200);
      const got = await getRes.json();
      expect(got.housingStatus).toBe("has a place");
    });

    it("changes housing status from has a place to needs a place", async () => {
      const cookie = await signInAndGetCookie();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });

      const changeRes = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...validProfile, housingStatus: "needs a place" }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(changeRes.status).toBe(200);
      const body = await changeRes.json();
      expect(body.housingStatus).toBe("needs a place");
    });
  });

  describe("criterion 2: shared Zod schema", () => {
    it("schema rejects negative budget", () => {
      const result = profileSchema.safeParse({
        ...validProfile,
        budgetMin: -100,
      });
      expect(result.success).toBe(false);
    });

    it("schema rejects budget min > max", () => {
      const result = profileSchema.safeParse({
        ...validProfile,
        budgetMin: 800,
        budgetMax: 400,
      });
      expect(result.success).toBe(false);
    });

    it("schema rejects empty areas", () => {
      const result = profileSchema.safeParse({
        ...validProfile,
        areas: [],
      });
      expect(result.success).toBe(false);
    });

    it("schema rejects invalid housing status", () => {
      const result = profileSchema.safeParse({
        ...validProfile,
        housingStatus: "invalid",
      });
      expect(result.success).toBe(false);
    });

    it("schema accepts a valid profile", () => {
      const result = profileSchema.safeParse(validProfile);
      expect(result.success).toBe(true);
    });

    it("schema refuses the API request when data is invalid", async () => {
      const cookie = await signInAndGetCookie();

      const res = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...validProfile, budgetMin: -100 }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(res.status).toBe(400);
    });

    it("profileUpdateSchema is a partial of profileSchema", () => {
      const result = profileUpdateSchema.safeParse({ housingStatus: "needs a place" });
      expect(result.success).toBe(true);
    });

    it("API validates with the same schema the form would use", () => {
      const apiResult = profileSchema.safeParse(validProfile);
      expect(apiResult.success).toBe(true);
      expect(apiResult.data).toMatchObject(validProfile);
    });

    it("profilePatchSchema rejects unknown keys", () => {
      const result = profilePatchSchema.safeParse({ ...validProfile, unknownKey: "foo" });
      expect(result.success).toBe(false);
    });

    it("profilePatchSchema accepts null for a clearable field", () => {
      const result = profilePatchSchema.safeParse({ ...validProfile, selfDescription: null });
      expect(result.success).toBe(true);
    });

    it("API rejects unknown keys with 400", async () => {
      const cookie = await signInAndGetCookie();
      const res = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...validProfile, unknownKey: "foo" }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(res.status).toBe(400);
    });
  });

  describe("criterion 3: self-description stored verbatim", () => {
    it("stores and returns self-description unchanged", async () => {
      const cookie = await signInAndGetCookie();
      const description =
        "I'm a third-year studying Physics. I keep odd hours but clean up after myself.";

      const patchRes = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...validProfile, selfDescription: description }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(patchRes.status).toBe(200);
      const body = await patchRes.json();
      expect(body.selfDescription).toBe(description);
    });

    it("stores multi-line text verbatim", async () => {
      const cookie = await signInAndGetCookie();
      const multiline = "Line one.\nLine two.\n\nLine four.";

      const patchRes = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ ...validProfile, selfDescription: multiline }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(patchRes.status).toBe(200);
      const body = await patchRes.json();
      expect(body.selfDescription).toBe(multiline);
    });
  });

  describe("criterion 4: every field editable at any time", () => {
    it("updates a single field without affecting others", async () => {
      const cookie = await signInAndGetCookie();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });

      const updateRes = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ budgetMax: 950 }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(updateRes.status).toBe(200);
      const body = await updateRes.json();
      expect(body.budgetMax).toBe(950);
      expect(body.housingStatus).toBe("has a place");
      expect(body.areas).toEqual(["Fallowfield", "Withington"]);
    });

    it("clears a field by setting it to null", async () => {
      const cookie = await signInAndGetCookie();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });

      const clearRes = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ selfDescription: null }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(clearRes.status).toBe(200);
      const body = await clearRes.json();
      expect(body.selfDescription).toBeNull();
    });

    it("rejects a partial update that inverts the stored budget range", async () => {
      const cookie = await signInAndGetCookie();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });

      const res = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({ budgetMin: 900 }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(res.status).toBe(400);
    });

    it("edits take effect immediately on read", async () => {
      const cookie = await signInAndGetCookie();

      const setRes = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(setRes.status).toBe(200);
      const setBody = await setRes.json();
      expect(setBody.budgetMin).toBe(400);
      expect(setBody.areas).toEqual(["Fallowfield", "Withington"]);

      const changeRes = await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify({
          budgetMin: 500,
          areas: ["Chorlton", "Didsbury"],
        }),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });
      expect(changeRes.status).toBe(200);
      const changeBody = await changeRes.json();
      expect(changeBody.budgetMin).toBe(500);
      expect(changeBody.areas).toEqual(["Chorlton", "Didsbury"]);
    });
  });

  describe("criterion 5: paused profile", () => {
    it("paused profile can be paused and unpaused without data loss", async () => {
      const cookie = await signInAndGetCookie();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });

      const pauseRes = await app.request("/api/profile/pause", {
        method: "POST",
        ...authHeader(cookie),
      });
      expect(pauseRes.status).toBe(200);
      const pausedBody = await pauseRes.json();
      expect(pausedBody.profilePaused).toBe(true);
      expect(pausedBody.selfDescription).toBe(validProfile.selfDescription);

      const unpauseRes = await app.request("/api/profile/unpause", {
        method: "POST",
        ...authHeader(cookie),
      });
      expect(unpauseRes.status).toBe(200);
      const unpausedBody = await unpauseRes.json();
      expect(unpausedBody.profilePaused).toBe(false);
      expect(unpausedBody.selfDescription).toBe(validProfile.selfDescription);
    });

    it("paused profile is invisible to other users via profile lookup", async () => {
      const cookieA = await signInAndGetCookie();
      const cookieB = await createSecondUser();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookieA).headers },
      });

      const getOwnRes = await app.request("/api/profile", authHeader(cookieA));
      expect(getOwnRes.status).toBe(200);
      const ownBody = await getOwnRes.json();
      const ownId: string = ownBody.id;

      const viewRes = await app.request(
        `/api/profile/${ownId}`,
        authHeader(cookieB),
      );
      expect(viewRes.status).toBe(200);
      const viewBody = await viewRes.json();
      expect(viewBody.housingStatus).toBe("has a place");

      await app.request("/api/profile/pause", {
        method: "POST",
        ...authHeader(cookieA),
      });

      const viewAfterPause = await app.request(
        `/api/profile/${ownId}`,
        authHeader(cookieB),
      );
      expect(viewAfterPause.status).toBe(404);
    });
  });

  describe("criterion 6: redaction — API never returns more than entitled", () => {
    it("self can see all fields including profilePaused", async () => {
      const cookie = await signInAndGetCookie();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });

      const res = await app.request("/api/profile", authHeader(cookie));
      expect(res.status).toBe(200);
      const body = await res.json();
      expect(body).toHaveProperty("id");
      expect(body).toHaveProperty("housingStatus");
      expect(body).toHaveProperty("budgetMin");
      expect(body).toHaveProperty("budgetMax");
      expect(body).toHaveProperty("areas");
      expect(body).toHaveProperty("moveInDate");
      expect(body).toHaveProperty("tenancyLengthMonths");
      expect(body).toHaveProperty("selfDescription");
      expect(body).toHaveProperty("profilePaused");
    });

    it("other viewer does not see profilePaused", async () => {
      const cookieA = await signInAndGetCookie();
      const cookieB = await createSecondUser();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookieA).headers },
      });

      const ownRes = await app.request("/api/profile", authHeader(cookieA));
      const ownBody = await ownRes.json();
      const ownId: string = ownBody.id;

      const otherRes = await app.request(
        `/api/profile/${ownId}`,
        authHeader(cookieB),
      );
      expect(otherRes.status).toBe(200);
      const otherBody = await otherRes.json();
      expect(otherBody).toHaveProperty("id");
      expect(otherBody).toHaveProperty("housingStatus");
      expect(otherBody).not.toHaveProperty("profilePaused");
    });

    it("respects public_fields: hidden field is omitted for other viewer", async () => {
      const cookieA = await signInAndGetCookie();
      const cookieB = await createSecondUser();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookieA).headers },
      });

      const ownRes = await app.request("/api/profile", authHeader(cookieA));
      const ownBody = await ownRes.json();
      const ownId: string = ownBody.id;

      const visRes = await app.request("/api/profile/visibility", {
        method: "PUT",
        body: JSON.stringify({ publicFields: ["housingStatus", "budgetMin", "budgetMax"] }),
        ...authHeader(cookieA),
        headers: {
          "Content-Type": "application/json",
          ...authHeader(cookieA).headers,
        },
      });
      expect(visRes.status).toBe(200);

      const otherRes = await app.request(
        `/api/profile/${ownId}`,
        authHeader(cookieB),
      );
      expect(otherRes.status).toBe(200);
      const otherBody = await otherRes.json();
      expect(otherBody).toHaveProperty("housingStatus");
      expect(otherBody).toHaveProperty("budgetMin");
      expect(otherBody).toHaveProperty("budgetMax");
      expect(otherBody).not.toHaveProperty("areas");
      expect(otherBody).not.toHaveProperty("moveInDate");
      expect(otherBody).not.toHaveProperty("tenancyLengthMonths");
      expect(otherBody).not.toHaveProperty("selfDescription");
    });

    it("visibility route accepts a valid subset of PROFILE_FIELDS", async () => {
      const cookie = await signInAndGetCookie();
      const res = await app.request("/api/profile/visibility", {
        method: "PUT",
        body: JSON.stringify({ publicFields: ["housingStatus"] }),
        ...authHeader(cookie),
        headers: {
          "Content-Type": "application/json",
          ...authHeader(cookie).headers,
        },
      });
      expect(res.status).toBe(200);
    });

    it("visibility route rejects an unknown field name", async () => {
      const cookie = await signInAndGetCookie();
      const res = await app.request("/api/profile/visibility", {
        method: "PUT",
        body: JSON.stringify({ publicFields: ["nonexistentField"] }),
        ...authHeader(cookie),
        headers: {
          "Content-Type": "application/json",
          ...authHeader(cookie).headers,
        },
      });
      expect(res.status).toBe(400);
    });

    it("visibility route accepts null to reset to default visibility", async () => {
      const cookie = await signInAndGetCookie();
      const res = await app.request("/api/profile/visibility", {
        method: "PUT",
        body: JSON.stringify({ publicFields: null }),
        ...authHeader(cookie),
        headers: {
          "Content-Type": "application/json",
          ...authHeader(cookie).headers,
        },
      });
      expect(res.status).toBe(200);
    });

    it("profile/:id returns 404 for non-existent person", async () => {
      const cookie = await signInAndGetCookie();
      const res = await app.request(
        "/api/profile/00000000-0000-0000-0000-000000000000",
        authHeader(cookie),
      );
      expect(res.status).toBe(404);
    });
  });

  describe("criterion 7: email never exposed", () => {
    it("never returns email in profile responses", async () => {
      const cookie = await signInAndGetCookie();

      await app.request("/api/profile", {
        method: "PATCH",
        body: JSON.stringify(validProfile),
        headers: { "Content-Type": "application/json", ...authHeader(cookie).headers },
      });

      const responses: Response[] = [];

      const ownRes = await app.request("/api/profile", authHeader(cookie));
      responses.push(ownRes);

      const ownBody = await ownRes.clone().json();
      const ownId: string = ownBody.id;

      const cookieB = await createSecondUser();
      const otherRes = await app.request(
        `/api/profile/${ownId}`,
        authHeader(cookieB),
      );
      responses.push(otherRes);

      for (const res of responses) {
        const text = await res.clone().text();
        if (text.length === 0) continue;
        expect(text.toLowerCase()).not.toContain(VALID_EMAIL.toLowerCase());
        expect(text.toLowerCase()).not.toMatch(/[a-z]+@[a-z]+\.[a-z]+/);
      }
    });
  });
});
