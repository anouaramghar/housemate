import { PostgreSqlContainer } from "@testcontainers/postgresql";
import { execSync } from "node:child_process";

let container: Awaited<ReturnType<PostgreSqlContainer["start"]>>;

export async function setup(): Promise<void> {
  container = await new PostgreSqlContainer("postgres:16-alpine").start();
  const uri = container.getConnectionUri();
  process.env.DATABASE_URL = uri;
  process.env.BETTER_AUTH_SECRET = "test-secret-at-least-32-characters-long-for-hmac";
  process.env.BETTER_AUTH_URL = "http://localhost:3000";

  try {
    execSync("npx drizzle-kit migrate", {
      env: { ...process.env, DATABASE_URL: uri },
      cwd: process.cwd(),
      stdio: "pipe",
    });
  } catch (error) {
    const err = error as {
      message: string;
      stdout?: Buffer;
      stderr?: Buffer;
    };
    const details = [err.message, err.stdout?.toString(), err.stderr?.toString()]
      .filter(Boolean)
      .join("\n");
    throw new Error(`Migration failed:\n${details}`, { cause: error });
  }
}

export async function teardown(): Promise<void> {
  await container?.stop();
}
