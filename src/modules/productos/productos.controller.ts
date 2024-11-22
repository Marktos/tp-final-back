import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { roles } from 'src/common/decorator/roles';
import { RoleGuard } from '../auth/guard/roles.guard';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('productos')
@UseGuards(AuthGuard, RoleGuard)
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}
  
  @Post()
  @roles('admin', 'superadmin')
  create(@Body() createProductoDto: CreateProductoDto) {
    return this.productosService.create(createProductoDto);
  }

  @Get()
  @roles('admin', 'superadmin', 'user')
  findAll() {
    return this.productosService.findAll();
  }

  @Get(':id')
  @roles('admin', 'superadmin', 'user')
  findOne(@Param('id') id: number) {
    return this.productosService.findOne(+id);
  }

  @Patch(':id')
  @roles('admin', 'superadmin', 'user')
  update(@Param('id') id: number, @Body() updateProductoDto: UpdateProductoDto) {
    return this.productosService.update(+id, updateProductoDto);
  }

  @Delete(':id')
  @roles('admin', 'superadmin', 'user')
  remove(@Param('id') id: number) {
    return this.productosService.remove(+id);
  }

  @Patch('restore/:id')
  @roles('admin', 'superadmin')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.productosService.restore(+id);
  }
}
