import { Module } from '@nestjs/common';
import { EmailService } from '@/modules/email/services/email.service';
import { NodemailerProvider } from '@/modules/email/providers/nodemailer.provider';

@Module({
  providers: [
    EmailService,
    NodemailerProvider,
  ],
  exports: [
    EmailService,
  ],
})
export class EmailModule {}