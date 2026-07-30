import { describe, it, expect } from "vitest";
import Home from "@/app/page";

describe("Home server component", () => {
  it("reads through the same service layer the API route uses", async () => {
    const element = await Home();
    const body = element.props.children;

    expect(typeof body).toBe("string");
    expect(body).toContain("PostgreSQL");
    expect(body).toContain("migrationVerified");
  });
});
