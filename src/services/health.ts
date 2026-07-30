import { getDb } from "@/src/db/client";
import { sql } from "drizzle-orm";
import { healthCheck } from "@/src/db/schema";

export interface HealthResult {
  status: string;
  postgresVersion: string;
  migrationVerified: boolean;
}

export async function getHealth(): Promise<HealthResult> {
  const db = getDb();

  const [versionResult, healthCheckRows] = await Promise.all([
    db.execute(sql`SELECT version() AS version`),
    db.select().from(healthCheck),
  ]);

  const version = (versionResult.rows?.[0] as { version: string } | undefined)
    ?.version;

  return {
    status: "ok",
    postgresVersion: version ?? "unknown",
    migrationVerified: Array.isArray(healthCheckRows),
  };
}
