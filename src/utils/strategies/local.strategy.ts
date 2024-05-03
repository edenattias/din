import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  private async validate(
    username: string,
    password: string,
  ): Promise<{ id: string } | null> {
    const userId = await this.authService.validateUser({
      username,
      password,
    });
    if (!userId) throw new UnauthorizedException();

    return userId;
  }
}
