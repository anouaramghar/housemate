import { Hono, type Context, type Next } from "hono";
import { getAuth } from "@/src/auth";
import { getHealth } from "@/src/services/health";
import {
  getPersonById,
  getPersonByUserId,
  updateProfile,
  setProfilePaused,
} from "@/src/services/profile";
import { redactProfile } from "@/src/services/redactProfile";
import { profilePatchSchema, visibilitySchema, PROFILE_FIELDS } from "@/src/schemas/profile";

type Variables = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
  } | null;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  } | null;
};

const app = new Hono<{ Variables: Variables }>().basePath("/api");

app.use("*", async (c, next) => {
  const auth = getAuth();
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (session) {
    c.set("user", session.user);
    c.set("session", session.session);
  } else {
    c.set("user", null);
    c.set("session", null);
  }
  await next();
});

app.on(["POST", "GET"], "/auth/*", (c) => {
  const auth = getAuth();
  return auth.handler(c.req.raw);
});

app.get("/health", async (c) => {
  const result = await getHealth();
  return c.json(result);
});

async function requireVerifiedPerson(c: Context<{ Variables: Variables }>, next: Next) {
  const session = c.get("session");
  const user = c.get("user");
  if (!user || !session) {
    return c.json({ error: "Unauthenticated" }, 401);
  }
  if (!user.emailVerified) {
    return c.json({ error: "Email not verified" }, 403);
  }
  await next();
}

app.get("/me", requireVerifiedPerson, async (c) => {
  const user = c.get("user")!;
  const personRecord = await getPersonByUserId(user.id);
  if (!personRecord) {
    return c.json({ error: "Person record not found" }, 500);
  }
  return c.json({
    id: personRecord.id,
    name: user.name,
  });
});

app.get("/profile", requireVerifiedPerson, async (c) => {
  const user = c.get("user")!;
  const personRecord = await getPersonByUserId(user.id);
  if (!personRecord) {
    return c.json({ error: "Person record not found" }, 500);
  }
  return c.json(redactProfile(personRecord, "self"));
});

app.get("/profile/:id", requireVerifiedPerson, async (c) => {
  const id = c.req.param("id");
  if (!id) {
    return c.json({ error: "Profile ID is required" }, 400);
  }
  const personRecord = await getPersonById(id);
  if (!personRecord) {
    return c.json({ error: "Profile not found" }, 404);
  }
  if (personRecord.profilePaused) {
    return c.json({ error: "Profile not found" }, 404);
  }
  return c.json(redactProfile(personRecord, "other"));
});

app.patch("/profile", requireVerifiedPerson, async (c) => {
  const user = c.get("user")!;
  const body = await c.req.json();

  const parsed = profilePatchSchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues }, 400);
  }

  const personRecord = await getPersonByUserId(user.id);
  if (!personRecord) {
    return c.json({ error: "Person record not found" }, 500);
  }

  const mergedMin = parsed.data.budgetMin ?? personRecord.budgetMin;
  const mergedMax = parsed.data.budgetMax ?? personRecord.budgetMax;
  if (mergedMin !== null && mergedMax !== null && mergedMin > mergedMax) {
    return c.json({
      error: "Minimum budget must be less than or equal to maximum budget",
    }, 400);
  }

  const updateData: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(parsed.data)) {
    if (value !== undefined) {
      updateData[key] = value;
    }
  }

  const updated = await updateProfile(user.id, updateData);
  return c.json(redactProfile(updated, "self"));
});

app.put("/profile/visibility", requireVerifiedPerson, async (c) => {
  const user = c.get("user")!;
  const body = await c.req.json();

  const parsed = visibilitySchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.issues }, 400);
  }

  const { publicFields } = parsed.data;
  if (publicFields !== null) {
    const profileFieldSet = new Set<string>(PROFILE_FIELDS);
    const invalid = publicFields.filter((f) => !profileFieldSet.has(f));
    if (invalid.length > 0) {
      return c.json({
        error: `Unknown field(s): ${invalid.join(", ")}`,
      }, 400);
    }
  }

  const updated = await updateProfile(user.id, { publicFields });
  return c.json(redactProfile(updated, "self"));
});

app.post("/profile/pause", requireVerifiedPerson, async (c) => {
  const user = c.get("user")!;
  const personRecord = await getPersonByUserId(user.id);
  if (!personRecord) {
    return c.json({ error: "Person record not found" }, 500);
  }
  const updated = await setProfilePaused(user.id, true);
  return c.json(redactProfile(updated, "self"));
});

app.post("/profile/unpause", requireVerifiedPerson, async (c) => {
  const user = c.get("user")!;
  const personRecord = await getPersonByUserId(user.id);
  if (!personRecord) {
    return c.json({ error: "Person record not found" }, 500);
  }
  const updated = await setProfilePaused(user.id, false);
  return c.json(redactProfile(updated, "self"));
});

export { app, requireVerifiedPerson };
