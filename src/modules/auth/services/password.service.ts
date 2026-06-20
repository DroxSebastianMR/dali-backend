import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private static readonly SALT_ROUNDS = 10;

  public async hash(password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(
      password,
      PasswordService.SALT_ROUNDS,
    );

    return hashedPassword;
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isMatch: boolean = await bcrypt.compare(password, hashedPassword);

    return isMatch;
  }
}
