import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DAL } from '../../db/DAL';
import { CreateProductDto } from '../../utils/dto/create-product.dto';
import { ProductsModel } from '../../db/models/products.model';
import { UpdateProductDto } from '../../utils/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly DAL: DAL) {}

  public async create(
    productDetails: CreateProductDto,
  ): Promise<ProductsModel> {
    const isDuplicated: ProductsModel =
      await this.DAL.Product.getProductByNameAndBrand(
        productDetails.name,
        productDetails.brand,
      );

    if (isDuplicated) throw new Error('Product already exists');

    return this.DAL.Product.create(productDetails);
  }

  public async update(
    currentProductDetails: UpdateProductDto,
  ): Promise<ProductsModel> {
    const { id, productDetails } = currentProductDetails;

    const selectedProduct: ProductsModel =
      await this.DAL.Product.findProductByID(id);
    const newProductDetails = { ...selectedProduct, ...productDetails };

    const isDuplicated: ProductsModel =
      await this.DAL.Product.getProductByNameAndBrand(
        newProductDetails.name,
        newProductDetails.brand,
      );

    if (isDuplicated) throw new Error('Product already exists');

    return this.DAL.Product.update(id, productDetails);
  }

  public async delete(productId: string): Promise<number> {
    return this.DAL.Product.delete(productId);
  }
}
