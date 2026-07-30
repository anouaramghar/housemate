import { Hono } from "hono";
import { getHealth } from "@/src/services/health";

const app = new Hono().basePath("/api");

app.get("/health", async (c) => {
  const result = await getHealth();
  return c.json(result);
});

export { app };
