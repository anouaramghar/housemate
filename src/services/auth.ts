import { getDb } from "@/src/db/client";
import { person } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { getAuth } from "@/src/auth";

export async function getPersonByUserId(userId: string) {
  const db = getDb();
  const [record] = await db
    .select()
    .from(person)
    .where(eq(person.userId, userId));
  return record ?? null;
}

/**
 * The Person behind a request, or null when the request carries no session or
 * the Person has not verified. Server Components use this so they reach the
 * database on the same path the API routes do.
 */
export async function getSessionPerson(requestHeaders: Headers) {
  const session = await getAuth().api.getSession({ headers: requestHeaders });
  if (!session || !session.user.emailVerified) {
    return null;
  }
  return getPersonByUserId(session.user.id);
}
