export function getAcceptedEmailDomain(): string {
  return process.env.ACCEPTED_EMAIL_DOMAIN ?? "ac.uk";
}

export function getSessionLifetimeDays(): number {
  return Number(process.env.SESSION_LIFETIME_DAYS ?? "365");
}

export function getBetterAuthUrl(): string {
  return process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
}

export function getBetterAuthSecret(): string {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret) {
    throw new Error(
      "BETTER_AUTH_SECRET environment variable is required. Generate one with: openssl rand -base64 32",
    );
  }
  return secret;
}

export function isAcceptedDomain(email: string): boolean {
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) return false;
  const domain = email.slice(atIndex + 1).toLowerCase();
  if (!domain) return false;
  const acceptedDomain = getAcceptedEmailDomain().toLowerCase();
  return domain === acceptedDomain || domain.endsWith("." + acceptedDomain);
}
