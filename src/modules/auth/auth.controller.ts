import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Registro } from './dto/registro-dto';
import { Login } from './dto/login-dto';
import { AuthGuard } from './guard/auth.guard';
import { roles } from 'src/common/decorator/roles';
import { RoleGuard } from './guard/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // El registro debe estar restringido a superadmin
  @UseGuards(AuthGuard, RoleGuard)
  @roles('superadmin')
  @Post('register')
  register(@Body() registro: Registro) {
    return this.authService.register(registro);
  }

  // El login debe ser accesible a todos los usuarios
  @Post('login')
  login(@Body() login: Login) {
    return this.authService.login(login);
  }
}
