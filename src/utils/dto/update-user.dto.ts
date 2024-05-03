import {
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { EPaymentMethod } from '../enums';

export class UpdateUserDetailsProps {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsEnum(EPaymentMethod)
  paymentMethod?: EPaymentMethod;
}

export class UpdateUserDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  userDetails: UpdateUserDetailsProps;
}
