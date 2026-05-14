import { Injectable, Logger } from '@nestjs/common';
import { NodemailerProvider } from '@/modules/email/providers/nodemailer.provider';

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor(
    private readonly mailProvider: NodemailerProvider,
  ) {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    try {
      await this.mailProvider.send(options);

      this.logger.log(`📧 Email enviado a: ${options.to}`);
      return true;

    } catch (error) {
      this.logger.error(
        `Error enviando email a ${options.to}`,
        error instanceof Error ? error.stack : String(error),
      );
      return false;
    }
  }
}