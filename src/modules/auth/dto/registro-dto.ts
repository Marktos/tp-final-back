import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class Registro {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(8) 
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())
    password: string;
}
