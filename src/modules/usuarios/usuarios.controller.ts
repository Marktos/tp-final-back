import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuario } from './dto/create-usuario.dto';
import { UpdateUsuario } from './dto/update-usuario.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { RoleGuard } from '../auth/guard/roles.guard';
import { roles } from '../../common/decorator/roles';

@Controller('usuarios')
@UseGuards(AuthGuard, RoleGuard)
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  @roles('superadmin')
  create(@Body() createUsuario: CreateUsuario) {
    return this.usuariosService.create(createUsuario);
  }

  @Get()
  @roles('superadmin')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  @roles('superadmin')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.findOne(+id);
  }

  @Patch(':id')
  @roles('superadmin')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: UpdateUsuario,
  ) {
    return this.usuariosService.update(+id, updateUsuario);
  }

  @Patch('admin/:id')
  @roles('superadmin')
  changeToAdmin(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: UpdateUsuario,
  ) {
    return this.usuariosService.changeToAdmin(+id);
  }

  @Patch('usuarios/:id')
  @roles('superadmin')
  changeToUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: UpdateUsuario,
  ) {
    return this.usuariosService.changeToUser(+id);
  }

  @Patch('role/:id')
  @roles('superadmin')
  changeRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuario: UpdateUsuario,
  ) {
    return this.usuariosService.changeRole(+id);
  }

  @Delete(':id')
  @roles('superadmin')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.remove(+id);
  }

  @Patch('restore/:id')
  @roles('superadmin')
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.usuariosService.restore(+id);
  }
}
