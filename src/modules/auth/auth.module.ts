import { Module } from '@nestjs/common';
import { DalModule } from '../DB/db.module';
import { JwtModule } from '@nestjs/jwt';
import jwtFactory from '../../utils/configs/jwt.config';
import { AuthService } from './auth.service';
import { JwtStrategy } from '../../utils/strategies/jwt.strategy';
import { LocalStrategy } from '../../utils/strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [JwtModule.registerAsync(jwtFactory), DalModule],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
