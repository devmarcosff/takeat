import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default, ForeignKey, BelongsTo } from "sequelize-typescript";
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
    
    // @Column({ type: DataType.STRING, defaultValue: null })
    // restaurant_id: string;

    @ForeignKey(() => Restaurant) // Define a chave estrangeira
    @Column(DataType.UUID)
    restaurant_id: string;

    @BelongsTo(() => Restaurant) // Relacionamento com restaurante
    restaurant: Restaurant;
}