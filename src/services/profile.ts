import { getDb } from "@/src/db/client";
import { person } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import type { PersonRecord } from "@/src/services/redactProfile";

export async function getPersonById(
  personId: string,
): Promise<PersonRecord | null> {
  const db = getDb();
  const [record] = await db
    .select()
    .from(person)
    .where(eq(person.id, personId));
  return record ?? null;
}

export async function getPersonByUserId(
  userId: string,
): Promise<PersonRecord | null> {
  const db = getDb();
  const [record] = await db
    .select()
    .from(person)
    .where(eq(person.userId, userId));
  return record ?? null;
}

export async function updateProfile(
  userId: string,
  data: Partial<{
    housingStatus: string | null;
    budgetMin: number | null;
    budgetMax: number | null;
    areas: string[] | null;
    moveInDate: string | null;
    tenancyLengthMonths: number | null;
    selfDescription: string | null;
    profilePaused: boolean;
    publicFields: string[] | null;
  }>,
): Promise<PersonRecord> {
  const db = getDb();
  const now = new Date();
  const [record] = await db
    .update(person)
    .set({ ...data, updatedAt: now })
    .where(eq(person.userId, userId))
    .returning();
  if (!record) {
    throw new Error("Person record not found");
  }
  return record;
}

export async function setProfilePaused(
  userId: string,
  paused: boolean,
): Promise<PersonRecord> {
  return updateProfile(userId, { profilePaused: paused });
}
