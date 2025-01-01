import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default, ForeignKey, BelongsTo, BelongsToMany } from "sequelize-typescript";
import { Order, OrderProduct } from "src/orders/entities/order.entity";
import { Restaurant } from "src/restaurants/entities/restaurant.entity";

@Table
export class Product extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Column(DataType.STRING)
    name: string;

    @Column(DataType.STRING)
    description: string;

    @Column(DataType.FLOAT)
    value: number;

    @Column({ type: DataType.DATE, defaultValue: null })
    canceledAt?: Date;

    @ForeignKey(() => Restaurant) // Define a chave estrangeira
    @Column(DataType.UUID)
    restaurant_id: string;

    @BelongsTo(() => Restaurant) // Relacionamento com restaurante
    restaurant: Restaurant;

    @BelongsToMany(() => Order, () => OrderProduct)
    orders: Order[]; // Relação com pedidos via tabela intermediária
}