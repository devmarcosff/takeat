import { IsBoolean, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  email?: string;

  @IsString()
  phone?: string;

  @IsString()
  inicio?: string;

  @IsString()
  fim?: string;

  @IsString()
  address?: string;

  @IsBoolean()
  has_service_tax?: boolean; // (true ou false)
}
