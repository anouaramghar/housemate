import { getDb } from "@/src/db/client";
import { getTableName } from "drizzle-orm";
import { account, healthCheck, person, session, user, verification } from "@/src/db/schema";
import { type EmailSender } from "@/src/auth/email";

const tables = [account, session, person, verification, user, healthCheck] as const;

export async function truncateAll(): Promise<void> {
  const db = getDb();
  const tableNames = tables.map((t) => `"${getTableName(t)}"`).join(", ");
  await db.execute(`TRUNCATE TABLE ${tableNames} CASCADE`);
}

export class CapturingEmailSender implements EmailSender {
  public sentEmails: Array<{ email: string; url: string }> = [];

  async sendMagicLink(email: string, url: string): Promise<void> {
    this.sentEmails.push({ email, url });
  }

  get lastUrl(): string | undefined {
    return this.sentEmails.at(-1)?.url;
  }

  get lastEmail(): string | undefined {
    return this.sentEmails.at(-1)?.email;
  }

  clear(): void {
    this.sentEmails = [];
  }
}
