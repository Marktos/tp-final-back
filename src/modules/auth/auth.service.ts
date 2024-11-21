import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Registro } from './dto/registro-dto';
import { Login } from './dto/login-dto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from 'src/helper/auth.helper';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuariosService, private jwtService: JwtService) {}

  // Registro de usuario
  async register({ name, password, email }: Registro) {
    try {
      await this.usuarioService.create({ name, email, password });
      return {
        message: "User created successfully",
      };
    } catch (error) {
      throw new UnauthorizedException('Error creating user');  // Excepción controlada en caso de error
    }
  }

  // Login de usuario
  async login({ email, password }: Login) {
    // Busca el usuario por correo
    const user = await this.usuarioService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");  // Error más general para no exponer detalles específicos
    }

    // Verifica la contraseña
    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid credentials");  // Error genérico para evitar ataques de enumeración
    }

    // Crea el payload para el JWT (lo mínimo necesario)
    const payload = { email: user.email, role: user.role };

    // Firma el token
    const token = await this.jwtService.signAsync(payload);

    return {
      token,  // Devuelve solo el token y los datos esenciales
      email: user.email,
    };
  }
}
