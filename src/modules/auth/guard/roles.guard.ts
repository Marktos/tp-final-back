import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
constructor(private reflector: Reflector) {}

canActivate(context: ExecutionContext): boolean {
    // Obtener los roles requeridos desde la metadata
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true; // Si no se especificaron roles, permitir el acceso.

    // Obtener el usuario del request
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
        throw new UnauthorizedException('No autenticado');
    }

    // Verificar si el usuario tiene al menos uno de los roles requeridos
    const hasRole = requiredRoles.some((role) => user.role.includes(role));
    if (!hasRole) {
        throw new ForbiddenException('No tienes los permisos necesarios');
    }

    return true;
    }
}
