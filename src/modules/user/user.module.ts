import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DalModule } from '../DB/db.module';

@Module({
  imports: [DalModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
