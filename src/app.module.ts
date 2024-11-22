import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProductosModule } from './modules/productos/productos.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from "@nestjs/config";
import { SuperAdminModule } from "./modules/super/superadmin.module";

@Module({
    controllers: [],
    providers: [],
    imports: [ConfigModule.forRoot({ isGlobal: true }), SuperAdminModule ,PrismaModule, UsuariosModule, ProductosModule, AuthModule],
})

export class AppModule {}