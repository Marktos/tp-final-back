import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsNumber()
    price?: number

    @IsOptional()
    @IsString()
    description?: string

    @IsOptional()
    @IsNumber()
    quantity?: number

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
