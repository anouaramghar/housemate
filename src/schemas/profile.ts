import { z } from "zod";

export const housingStatusValues = ["has a place", "needs a place"] as const;

export const PROFILE_FIELDS = [
  "housingStatus",
  "budgetMin",
  "budgetMax",
  "areas",
  "moveInDate",
  "tenancyLengthMonths",
  "selfDescription",
] as const;

export type ProfileField = (typeof PROFILE_FIELDS)[number];

const profileFields = {
  housingStatus: z.enum(housingStatusValues),
  budgetMin: z.number().int().min(0).max(9999),
  budgetMax: z.number().int().min(0).max(9999),
  areas: z.array(z.string().min(1).max(100)).min(1).max(20),
  moveInDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Must be a valid date (YYYY-MM-DD)"),
  tenancyLengthMonths: z.number().int().min(1).max(24),
  selfDescription: z.string().max(5000),
};

const baseObject = z.object(profileFields);

export const profileSchema = baseObject.refine(
  (data) => data.budgetMin <= data.budgetMax,
  {
    message: "Minimum budget must be less than or equal to maximum budget",
    path: ["budgetMax"],
  },
);

export type ProfileInput = z.infer<typeof profileSchema>;

export const profileUpdateSchema = baseObject.partial();

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;

const patchFields: Record<string, z.ZodTypeAny> = {};
for (const key of PROFILE_FIELDS) {
  patchFields[key] = profileFields[key as keyof typeof profileFields].optional().nullable();
}

export const profilePatchSchema = z.object(patchFields).strict();

export type ProfilePatchInput = z.infer<typeof profilePatchSchema>;

export const visibilitySchema = z.object({
  publicFields: z.array(z.string()).nullable(),
});

export type VisibilityInput = z.infer<typeof visibilitySchema>;
