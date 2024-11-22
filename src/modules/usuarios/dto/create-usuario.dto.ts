import {IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateUsuario {
    @IsOptional()
    id?: number

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Transform(({ value }) => value.trim())
    password: string

    @IsOptional()
    @IsString()
    role?: string

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
