import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsuariosService, PrismaService],
  imports: [JwtModule.register({
    secret: process.env.SECRET,
    global: true,
    signOptions: { expiresIn: "5d" } 
  })]
})
export class AuthModule {}
