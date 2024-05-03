import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString, IsUUID
} from "class-validator";

export class UpdateProductDetailsProps {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  brand: string;

  @IsNumber()
  @IsOptional()
  price: number;
}

export class UpdateProductDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  productDetails: UpdateProductDetailsProps;
}
