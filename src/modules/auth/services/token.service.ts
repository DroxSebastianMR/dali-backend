import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { StringValue} from 'ms';

@Injectable()
export class TokenService {
    constructor(private readonly jwt: JwtService) {}

    signAccessToken(payload: any) {
        return this.jwt.sign(payload, {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.JWT_ACCESS_EXPIRES as StringValue,
        });
    }

    signRefreshToken(payload: any) {
        return this.jwt.sign(payload, {
            secret: process.env.JWT_REFRESH_SECRET,
            expiresIn: process.env.JWT_REFRESH_EXPIRES as StringValue,
        });
    }
}