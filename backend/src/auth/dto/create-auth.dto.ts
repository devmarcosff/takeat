import { IsEmail, IsString, MinLength } from "class-validator";

export class CreateAuthDto {
    @IsString({ message: 'O e-mail informado não é válido.' })
    identifier: string;

    @IsString()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    password: string;
}
