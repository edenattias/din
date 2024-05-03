import { Injectable } from '@nestjs/common';
import { ProductsModel } from '../models/products.model';
import { CreateProductDto } from '../../utils/dto/create-product.dto';
import { UpdateProductDetailsProps } from '../../utils/dto/update-product.dto';

@Injectable()
export class ProductEntity {
  public async create(
    productDetails: CreateProductDto,
  ): Promise<ProductsModel> {
    return ProductsModel.create(productDetails);
  }

  public async update(
    id: string,
    productDetails: UpdateProductDetailsProps,
  ): Promise<ProductsModel> {
    const selectedProduct: ProductsModel = await ProductsModel.findOne({
      where: { id },
    });
    return selectedProduct.update(productDetails);
  }

  public getProductByNameAndBrand(
    name: string,
    brand: string,
  ): Promise<ProductsModel> {
    return ProductsModel.findOne({ where: { name, brand } });
  }

  public async delete(id: string): Promise<number> {
    return ProductsModel.destroy({ where: { id } });
  }

  public async findProductByID(id: string): Promise<ProductsModel> {
    return ProductsModel.findByPk(id);
  }
}
