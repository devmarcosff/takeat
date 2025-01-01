import { IsArray, IsNotEmpty, IsNumber, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class ProductOrderDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  buyerPhone: string;

  @ValidateNested({ each: true })
  @Type(() => ProductOrderDto)
  @IsArray()
  products: ProductOrderDto[];

  @IsUUID()
  @IsNotEmpty()
  restaurantId: string;
}