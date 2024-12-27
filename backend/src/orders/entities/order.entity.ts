import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Buyer } from "src/buyers/entities/buyer.entity";
import { Product } from "src/products/entities/product.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

@Table
export class Order extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Column(DataType.STRING)
    amount: string;

    @Column(DataType.STRING)
    total_price: string

    @Column(DataType.STRING)
    total_service_price: string

    @Column({ type: DataType.DATE, defaultValue: null })
    canceled_at: Date;

    @ForeignKey(() => Product)
    @Column({ field: 'product_id', type: DataType.UUID })           @BelongsTo(() => Product, { foreignKey: 'productId', as: 'product' })
    productId: string;                                              product: Product;

    @ForeignKey(() => Restaurant)
    @Column({ field: 'restaurant_id', type: DataType.UUID })        @BelongsTo(() => Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' })
    restaurantId: string;                                           restaurant: Restaurant;

    @ForeignKey(() => Buyer)
    @Column({ field: 'buyer_id', type: DataType.UUID })             @BelongsTo(() => Buyer, { foreignKey: 'buyerId', as: 'buyer' })
    buyerId: string;                                                buyer: Buyer;
}