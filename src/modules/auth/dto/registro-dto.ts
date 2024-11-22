import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class Registro {

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6) 
    @IsNotEmpty()
    @Transform(({ value }) => value.trim())  
    password: string;
}
