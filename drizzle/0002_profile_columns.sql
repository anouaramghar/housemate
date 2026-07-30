ALTER TABLE "person" ADD COLUMN "housing_status" text;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "budget_min" integer;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "budget_max" integer;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "areas" text[];--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "move_in_date" text;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "tenancy_length_months" integer;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "self_description" text;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "profile_paused" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "person" ADD COLUMN "public_fields" text[];