import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

interface MailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

@Injectable()
export class NodemailerProvider {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async send(payload: MailPayload) {
    return this.transporter.sendMail({
      from: `"SharkCorp" <${process.env.EMAIL_USER}>`,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });
  }
}