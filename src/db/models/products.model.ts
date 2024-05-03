import {
  Column,
  CreatedAt,
  DataType,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { IProductModel } from '../../utils/interfaces/product.interface';

@Table({
  tableName: 'products',
  timestamps: true,
  underscored: true,
  comment: 'Products table',
})
export class ProductsModel
  extends Model<IProductModel, IProductModel>
  implements IProductModel
{
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id!: string;

  @Column({ type: DataType.STRING(120) })
  brand!: string;

  @Column({ type: DataType.STRING(120) })
  name!: string;

  @Column({ type: DataType.INTEGER })
  price!: number;

  @CreatedAt
  @Column({ defaultValue: Sequelize.literal('now()'), allowNull: false })
  createdAt!: Date;

  @UpdatedAt
  @Column({ defaultValue: Sequelize.literal('now()'), allowNull: false })
  updatedAt!: Date;
}
