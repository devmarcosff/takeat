import { Table, Column, Model, PrimaryKey, DataType, Default, HasMany } from "sequelize-typescript";
import { Product } from "src/products/entities/product.entity";

@Table
export class Restaurant extends Model {
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.UUID)
    id: string;

    @Column({ type: DataType.STRING, allowNull: true })
    username: string;

    @Column({ type: DataType.STRING, })
    email?: string;

    @Column({ type: DataType.STRING, })
    password?: string;

    @Column({ type: DataType.STRING, unique: true })
    phone?: string;

    @Column({ type: DataType.STRING, })
    address?: string;

    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    has_service_tax?: boolean;

    @Column({ type: DataType.DATE, defaultValue: null })
    canceledAt?: Date;

    @HasMany(() => Product) // Relacionamento com produtos
    products: Product[];
}