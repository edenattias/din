import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from '../../db/models/users.model';
import { UserEntity } from '../../db/entites/user.entity';
import { DAL } from '../../db/DAL';
import { ProductEntity } from '../../db/entites/product.entity';
import { ProductsModel } from '../../db/models/products.model';

const models = [UsersModel, ProductsModel];

@Global()
@Module({
  imports: [SequelizeModule.forFeature(models)],
  providers: [DAL, UserEntity, ProductEntity],
  exports: [DAL],
})
export class DalModule {}
