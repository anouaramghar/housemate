CREATE TABLE "health_check" (
	"id" serial PRIMARY KEY NOT NULL,
	"status" varchar(20) DEFAULT 'ok' NOT NULL
);
