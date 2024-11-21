import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { REQUEST } from '@nestjs/core';
import { hashPassword } from 'src/helper/auth.helper';

@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    @Inject(REQUEST) private readonly request: Request
  ) {}

  // Método para crear un superadmin si no existe
  async createSuperAdmin() {
    const superadmin = await this.prisma.user.findMany({
      where: { role: 'superadmin' }, 
      take: 1, // Limitar la búsqueda a un solo resultado
    });

    if (!superadmin) {
      // Si no hay superadmin, crea uno
      const superadminDto = {
        email: 'super@admin.com', 
        password: 'admin', 
        role: 'superadmin',
        name: 'Super Admin',
      };

      await this.create(superadminDto);
    }
  }

  async create(createUsuarioDto: CreateUsuarioDto): Promise<CreateUsuarioDto> {
    const { email } = createUsuarioDto;

    createUsuarioDto.password = await hashPassword(createUsuarioDto.password);

    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser && !existingUser.deletedAt) {
      throw new BadRequestException('User Already Exists');
    }

    if (existingUser && existingUser.deletedAt) {
      await this.prisma.user.delete({ where: { email: existingUser.email } });
    }

    const newUser = await this.prisma.user.create({
      data: { ...createUsuarioDto },
    });

    return newUser;
  }

  async findAll(): Promise<CreateUsuarioDto[]> {
    const users = await this.prisma.user.findMany({ where: { deletedAt: null } });

    // Verifico si hay usuarios
    if (users.length === 0) throw new NotFoundException('Could Not Find Users');

    return users;
  }

  async findOne(id: number, getDeletes?: boolean): Promise<CreateUsuarioDto> {
    const where = { id, deletedAt: null };
    if (getDeletes) delete where['deletedAt'];
    const user = await this.prisma.user.findFirst({ where });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async findOneByEmail(email: string, getDeletes?: boolean): Promise<CreateUsuarioDto> {
    const where = { email, deletedAt: null };
    if (getDeletes) delete where['deletedAt'];
    const user = await this.prisma.user.findFirst({ where });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }

  async update(
    id: number,
    updateUsuarioDto: Partial<UpdateUsuarioDto>,
    getDeletes?: boolean
  ) {
    const user = await this.findOne(id, getDeletes);

    // Validar si el email está en uso
    if (updateUsuarioDto.email) {
      const isEmailInUse = await this.prisma.user.findFirst({
        where: { email: updateUsuarioDto.email, id: { not: id } },
      });

      if (isEmailInUse) {
        throw new BadRequestException('Este email ya está en uso');
      }
    }

    return await this.prisma.user.update({
      where: { id },
      data: { ...updateUsuarioDto }, // Usamos el objeto recibido como parámetros
    });
  }

  async promoteToAdmin(id: number) {
    return this.update(id, { role: 'admin' });
  }

  async demoteToUser(id: number) {
    return this.update(id, { role: 'user' });
  }

  async toggleRole(id: number) {
    const user = await this.findOne(id);

    if (user.role === 'admin') {
      return this.update(id, { role: 'user' });
    } else if (user.role === 'user') {
      return this.update(id, { role: 'admin' });
    } else {
      throw new BadRequestException('El rol de Superadmin no se puede cambiar');
    }
  }

  async softDelete(id: number) {
    const user = await this.findOne(id);
    if (user.role === 'superadmin') {
      throw new BadRequestException('Superadmin no se puede borrar');
    }
    return await this.update(id, { deletedAt: new Date() });
  }

  async restoreUser(id: number) {
    return await this.update(id, { deletedAt: null });
  }
}
