import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Order } from "src/orders/entities/order.entity";

@Table
export class Buyer extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Column({ type: DataType.STRING, allowNull: true })
    name: string;

    @Column({ type: DataType.STRING, allowNull: false })
    phone: string;

    @HasMany(() => Order, { foreignKey: 'buyerId', as: 'orders' })
    orders: Order[];
}
