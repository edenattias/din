import { Injectable } from '@nestjs/common';
import { UserEntity } from './entites/user.entity';
import { ProductEntity } from './entites/product.entity';

@Injectable()
export class DAL {
  constructor(
    public readonly User: UserEntity,
    public readonly Product: ProductEntity,
  ) {}
}
