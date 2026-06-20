import { Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class PushStrategy {
  private readonly logger = new Logger(PushStrategy.name);

  constructor() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    if (admin.apps.length === 0) {
      try {
        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;

        if (!projectId || !clientEmail || !privateKey) {
          this.logger.error(
            'Faltan credenciales de Firebase en el archivo .env',
          );
          return;
        }

        admin.initializeApp({
          credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, '\n'),
          }),
        });
        this.logger.log('Firebase Admin inicializado correctamente');
      } catch (error) {
        this.logger.error('Error al inicializar Firebase Admin:', error);
      }
    }
  }

  async send(token: string, title: string, body: string): Promise<void> {
    try {
      await admin.messaging().send({
        token,
        notification: { title, body },
        data: { click_action: 'FLUTTER_NOTIFICATION_CLICK' },
      });
    } catch (error) {
      this.logger.error(
        `Error al enviar Push a Firebase para token ${token}:`,
        error,
      );
      throw error;
    }
  }
}
