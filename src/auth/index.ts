import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { magicLink } from "better-auth/plugins";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { getDb } from "@/src/db/client";
import { getAcceptedEmailDomain, getBetterAuthSecret, getBetterAuthUrl, getSessionLifetimeDays, isAcceptedDomain } from "@/src/auth/config";
import { type EmailSender, LoggingEmailSender } from "@/src/auth/email";
import { person } from "@/src/db/schema";

let emailSender: EmailSender = new LoggingEmailSender();

export function setEmailSender(sender: EmailSender): void {
  emailSender = sender;
}

function createAuth() {
  return betterAuth({
    appName: "HouseMate",
    database: drizzleAdapter(getDb(), {
      provider: "pg",
    }),
    secret: getBetterAuthSecret(),
    baseURL: getBetterAuthUrl(),
    session: {
      expiresIn: getSessionLifetimeDays() * 86400,
    },
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          if (!isAcceptedDomain(email)) {
            throw new APIError("BAD_REQUEST", {
              message: `Use your university email address — it has to end in ${getAcceptedEmailDomain()}.`,
            });
          }
          await emailSender.sendMagicLink(email, url);
        },
      }),
    ],
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            const db = getDb();
            await db.insert(person).values({
              userId: user.id,
            });
          },
        },
      },
    },
  });
}

let _auth: ReturnType<typeof createAuth>;

export function getAuth() {
  if (!_auth) {
    _auth = createAuth();
  }
  return _auth;
}
