import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    // Every write goes through a Hono route. Server Actions are RPC and are not
    // reachable at the app.request() test seam, so allowing them deletes the testing plan.
    files: ["app/**/*.{ts,tsx}", "src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "ExpressionStatement > Literal[value='use server']",
          message:
            "No Server Actions for mutations — every write goes through a Hono route.",
        },
      ],
    },
  },
  {
    // Server Components and Hono routes both reach the database through the service
    // layer, so there is exactly one path to every read.
    files: ["app/**/*.{ts,tsx}", "src/server/**/*.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [
                "@/src/db",
                "@/src/db/*",
                "drizzle-orm",
                "drizzle-orm/*",
                "pg",
              ],
              message:
                "Read through the service layer (@/src/services/*), never the ORM directly.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: [
      ".next/",
      "drizzle/",
      "next-env.d.ts",
    ],
  },
);
