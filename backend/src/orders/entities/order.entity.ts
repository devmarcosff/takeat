import { BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Buyer } from "src/buyers/entities/buyer.entity";
import { Product } from "src/products/entities/product.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

@Table
export class OrderProduct extends Model {
  @ForeignKey(() => Order)
  @Column({ type: DataType.UUID })
  orderId: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.UUID })
  productId: string;

  @Column(DataType.INTEGER)
  amount: number;
}

@Table
export class Order extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.INTEGER)
  amount: number;

  @Column(DataType.FLOAT)
  total_price: number;

  @Column(DataType.FLOAT)
  total_service_price: number;

  @Column({ type: DataType.DATE, defaultValue: null })
  canceled_at: Date;

  @ForeignKey(() => Restaurant)
  @Column(DataType.UUID)
  restaurantId: string;

  @BelongsTo(() => Restaurant)
  restaurant: Restaurant;

  @ForeignKey(() => Buyer)
  @Column(DataType.UUID)
  buyerId: string;

  @BelongsTo(() => Buyer)
  buyer: Buyer;

  @BelongsToMany(() => Product, () => OrderProduct)
  products: Product[]; // Relação com produtos via tabela intermediária
}