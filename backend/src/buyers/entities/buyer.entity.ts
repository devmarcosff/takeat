import { Column, DataType, Default, Model, PrimaryKey, Table } from "sequelize-typescript";

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
}
