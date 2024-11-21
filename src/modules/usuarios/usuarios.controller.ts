import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { roles } from 'src/common/decorator/roles';

@Controller('usuarios')
@UseGuards(AuthGuard)  
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @roles('superadmin') // Solo superadmin puede crear usuarios
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get()
  @roles('superadmin')  // Solo superadmin puede obtener todos los usuarios
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuariosService.findOne(+id);  
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(+id, updateUsuarioDto);  
  }

  @Delete(':id')
  @roles('superadmin')  // Solo superadmin puede eliminar usuarios
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.softDelete(+id);
  }

  @Patch('restore/:id')
  @roles('superadmin')  // Solo superadmin puede restaurar usuarios
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.restoreUser(+id);
  }
}
