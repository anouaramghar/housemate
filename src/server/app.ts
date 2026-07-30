import { Hono, type Context, type Next } from "hono";
import { getAuth } from "@/src/auth";
import { getHealth } from "@/src/services/health";
import { getPersonByUserId } from "@/src/services/auth";

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

export { app, requireVerifiedPerson };
