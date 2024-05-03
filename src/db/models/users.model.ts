import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  Unique,
  UpdatedAt,
  BelongsToMany,
} from 'sequelize-typescript';
import { EPaymentMethod } from '../../utils/enums';
import { IUserModel } from '../../utils/interfaces/user.interface';
import { ProductsModel } from './products.model';

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
  comment: 'Users table',
})
export class UsersModel
  extends Model<IUserModel, IUserModel>
  implements IUserModel
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Unique
  @Column({
    type: DataType.STRING(120),
    allowNull: false,
    validate: { isEmail: true },
  })
  email!: string;

  @Column({ type: DataType.STRING(120) })
  password!: string;

  @Column({ type: DataType.STRING(120) })
  firstName!: string;

  @Column({ type: DataType.STRING(120) })
  lastName!: string;

  @Column({ type: DataType.STRING(120) })
  country!: string;

  @Column({ type: DataType.STRING(120) })
  city!: string;

  @Column({ type: DataType.STRING(120) })
  street!: string;

  @Column({ type: DataType.ENUM(EPaymentMethod.CASH, EPaymentMethod.CREDIT) })
  paymentMethod!: EPaymentMethod;

  @CreatedAt
  @Column({ defaultValue: Sequelize.literal('now()'), allowNull: false })
  createdAt!: Date;

  @UpdatedAt
  @Column({ defaultValue: Sequelize.literal('now()'), allowNull: false })
  updatedAt!: Date;

  @BelongsToMany(() => ProductsModel, {
    through: 'user_related_products',
    as: 'products',
    foreignKey: 'userId',
    otherKey: 'productId',
    onDelete: 'CASCADE',
  })
  products?: ProductsModel[];
}
