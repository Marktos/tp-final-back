import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductoDto {

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    price: number

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    quantity: number

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
