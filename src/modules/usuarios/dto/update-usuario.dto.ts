import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @MinLength(8)
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    role?: string;

    @IsDate()
    @IsOptional()
    deletedAt?: Date;
}
