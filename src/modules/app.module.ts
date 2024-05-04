import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import dbConf from '../utils/configs/db.config';
import { DalModule } from './DB/db.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    DalModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env'] }),
    SequelizeModule.forRoot(dbConf),
    UserModule,
    ProductModule,
    AuthModule,
  ],
})
export class AppModule {}
