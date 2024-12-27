import { IsString } from "class-validator";

export class CreateBuyerDto {
    @IsString()
    name?: string;

    @IsString()
    phone: string;
}
