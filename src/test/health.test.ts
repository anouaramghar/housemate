import { describe, it, expect } from "vitest";
import { app } from "@/src/server/app";

describe("GET /api/health", () => {
  it("returns 200 with Postgres version and migration proof", async () => {
    const res = await app.request("/api/health");
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body).toHaveProperty("status", "ok");
    expect(body).toHaveProperty("postgresVersion");
    expect(typeof body.postgresVersion).toBe("string");
    expect(body.postgresVersion).toContain("PostgreSQL");
    expect(body).toHaveProperty("migrationVerified", true);
  });
});
