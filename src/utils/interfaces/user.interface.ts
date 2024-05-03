import { EPaymentMethod } from '../enums';

export interface IUserModel {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  street: string;
  paymentMethod: EPaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}
