import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DAL } from '../../db/DAL';
import { AUTH_HEADER } from '../const/jwt.const';
import { UsersModel } from '../../db/models/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly DAL: DAL,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWTFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  private static extractJWTFromCookie(req: Request): string {
    return (req?.headers?.[AUTH_HEADER] ||
      req?.headers?.[AUTH_HEADER.toLowerCase()]) as string;
  }

  public async validate(payload: {
    userId: string;
  }): Promise<Partial<UsersModel>> {
    const isAuthorized = await this.DAL.User.findUserByID(payload.userId);
    if (!isAuthorized) {
      Logger.error(`Unauthorized`, payload.userId);
      throw new UnauthorizedException();
    }
    const { firstName, lastName, email, id, paymentMethod } = isAuthorized;
    return { firstName, lastName, paymentMethod, email, id };
  }
}
