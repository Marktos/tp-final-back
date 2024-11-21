import { Transform } from "class-transformer";
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsOptional()
    @IsString()
    @MinLength(6)
    name?: string

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    @Transform(({ value }) => value.trim())
    password: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsDate()
    @IsOptional()
    deletedAt?: Date;
}