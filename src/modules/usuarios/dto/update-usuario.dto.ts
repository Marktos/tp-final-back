import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuario } from './create-usuario.dto';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUsuario extends PartialType(CreateUsuario) {

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    password?: string

    @IsOptional()
    @IsString()
    role?: string

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
