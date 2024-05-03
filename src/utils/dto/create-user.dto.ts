import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { EPaymentMethod } from '../enums';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  street: string;

  @IsNotEmpty()
  @IsEnum(EPaymentMethod)
  paymentMethod: EPaymentMethod;
}
