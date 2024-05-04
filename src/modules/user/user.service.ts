import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DAL } from '../../db/DAL';
import { UsersModel } from '../../db/models/users.model';
import { UpdateUserDto } from '../../utils/dto';
import { ProductsModel } from '../../db/models/products.model';

@Injectable()
export class UserService {
  constructor(private readonly DAL: DAL) {}

  public async update(currentUserDetails: UpdateUserDto): Promise<UsersModel> {
    const { userId, userDetails } = currentUserDetails;
    return this.DAL.User.update(userId, userDetails);
  }

  public async addProduct(body: {
    userId: string;
    productId: string;
  }): Promise<unknown> {
    const { userId, productId } = body;
    const userProductIds: string[] = await this.getUserProductIds(userId);

    if (userProductIds.includes(productId)) {
      throw new Error('Product already exists');
    }

    return this.DAL.User.addProduct(userId, productId);
  }

  public async getUserProducts(userId: string): Promise<ProductsModel[]> {
    return this.DAL.User.gerUserProducts(userId);
  }

  private async getUserProductIds(userId: string): Promise<string[]> {
    const userProducts: ProductsModel[] =
      await this.DAL.User.gerUserProducts(userId);
    return userProducts?.map((product) => product.id) || [];
  }

  public async removeProduct(body: {
    userId: string;
    productId: string;
  }): Promise<void> {
    const { userId, productId } = body;
    const userProductIds: string[] = await this.getUserProductIds(userId);

    if (!userProductIds.includes(productId)) {
      throw new Error('Product does not exist');
    }

    await this.DAL.User.removeProduct(userId, productId);
  }
}
