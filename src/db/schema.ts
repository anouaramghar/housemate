import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const healthCheck = pgTable("health_check", {
  id: serial("id").primaryKey(),
  status: varchar("status", { length: 20 }).default("ok").notNull(),
});
