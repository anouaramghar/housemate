export interface EmailSender {
  sendMagicLink(email: string, url: string): Promise<void>;
}

export class LoggingEmailSender implements EmailSender {
  async sendMagicLink(email: string, url: string): Promise<void> {
    console.log(`[EMAIL] Magic link for ${email}: ${url}`);
  }
}
