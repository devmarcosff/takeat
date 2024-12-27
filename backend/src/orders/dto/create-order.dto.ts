import { IsNotEmpty, IsNumber, IsNumberString, IsString, IsUUID } from "class-validator";

export class CreateOrderDto {
    @IsNumberString()
    @IsNotEmpty()
    buyerPhone: string;

    @IsUUID()
    @IsNotEmpty()
    product_id: string;

    @IsNumber()
    amount: number;
}
