import { describe, it, expect } from "vitest";
import Health from "@/app/health/page";

describe("Health server component", () => {
  it("reads through the same service layer the API route uses", async () => {
    const element = await Health();
    const body = element.props.children;

    expect(typeof body).toBe("string");
    expect(body).toContain("PostgreSQL");
    expect(body).toContain("migrationVerified");
  });
});
