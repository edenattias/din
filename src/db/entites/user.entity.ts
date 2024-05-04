import { Injectable } from '@nestjs/common';
import { UsersModel } from '../models/users.model';
import { CreateAccountDto, UpdateUserDetailsProps } from '../../utils/dto';
import { ProductsModel } from '../models/products.model';

@Injectable()
export class UserEntity {
  public async create(userDetails: CreateAccountDto): Promise<UsersModel> {
    return UsersModel.create(userDetails);
  }

  public async update(
    userId: string,
    userDetails: UpdateUserDetailsProps,
  ): Promise<UsersModel> {
    const selectedUser = await UsersModel.findByPk(userId);
    return selectedUser.update(userDetails);
  }

  public async addProduct(userId: string, productId: string): Promise<unknown> {
    const [selectedUser, selectedProduct] = await Promise.all([
      UsersModel.findByPk(userId),
      ProductsModel.findByPk(productId),
    ]);

    return selectedUser.$add('products', [selectedProduct]);
  }

  public async removeProduct(userId: string, productId: string): Promise<void> {
    const [selectedUser, selectedProduct] = await Promise.all([
      UsersModel.findByPk(userId),
      ProductsModel.findByPk(productId),
    ]);
    await selectedUser.$remove('products', selectedProduct);;
  }

  public async findUserByEmail(email: string): Promise<UsersModel> {
    return UsersModel.findOne({ where: { email } });
  }

  public async findUserByID(userId: string): Promise<UsersModel> {
    return UsersModel.findByPk(userId);
  }

  public async gerUserProducts(userId: string): Promise<ProductsModel[]> {
    const selectedUser = await UsersModel.findByPk(userId);
    return selectedUser.$get('products');
  }
}
