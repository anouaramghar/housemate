import { getDb } from "@/src/db/client";
import { person } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function getPersonByUserId(userId: string) {
  const db = getDb();
  const [record] = await db
    .select()
    .from(person)
    .where(eq(person.userId, userId));
  return record ?? null;
}
