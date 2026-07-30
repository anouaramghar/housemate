import { PROFILE_FIELDS } from "@/src/schemas/profile";
import type { ProfileField } from "@/src/schemas/profile";

export const DEFAULT_VISIBLE_FIELDS: readonly ProfileField[] = [...PROFILE_FIELDS];

export type ViewerRelationship = "self" | "other";

export type PersonRecord = {
  id: string;
  userId: string;
  housingStatus: string | null;
  budgetMin: number | null;
  budgetMax: number | null;
  areas: string[] | null;
  moveInDate: string | null;
  tenancyLengthMonths: number | null;
  selfDescription: string | null;
  profilePaused: boolean;
  publicFields: string[] | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RedactedProfile = {
  id: string;
  housingStatus?: string | null;
  budgetMin?: number | null;
  budgetMax?: number | null;
  areas?: string[] | null;
  moveInDate?: string | null;
  tenancyLengthMonths?: number | null;
  selfDescription?: string | null;
  profilePaused?: boolean;
};

export function redactProfile(
  person: PersonRecord,
  relationship: ViewerRelationship,
): RedactedProfile {
  if (relationship === "self") {
    return {
      id: person.id,
      housingStatus: person.housingStatus,
      budgetMin: person.budgetMin,
      budgetMax: person.budgetMax,
      areas: person.areas,
      moveInDate: person.moveInDate,
      tenancyLengthMonths: person.tenancyLengthMonths,
      selfDescription: person.selfDescription,
      profilePaused: person.profilePaused,
    };
  }

  const permitted: Set<string> = new Set(
    person.publicFields ?? DEFAULT_VISIBLE_FIELDS,
  );

  const result: RedactedProfile = { id: person.id };

  if (permitted.has("housingStatus")) {
    result.housingStatus = person.housingStatus;
  }
  if (permitted.has("budgetMin")) {
    result.budgetMin = person.budgetMin;
  }
  if (permitted.has("budgetMax")) {
    result.budgetMax = person.budgetMax;
  }
  if (permitted.has("areas")) {
    result.areas = person.areas;
  }
  if (permitted.has("moveInDate")) {
    result.moveInDate = person.moveInDate;
  }
  if (permitted.has("tenancyLengthMonths")) {
    result.tenancyLengthMonths = person.tenancyLengthMonths;
  }
  if (permitted.has("selfDescription")) {
    result.selfDescription = person.selfDescription;
  }

  return result;
}
