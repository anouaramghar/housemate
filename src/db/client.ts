import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

function createPool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  return new Pool({ connectionString: url });
}

let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = createPool();
  }
  return pool;
}

export function getDb() {
  return drizzle(getPool(), { schema });
}
