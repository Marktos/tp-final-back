import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProductosModule } from './modules/productos/productos.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from "@nestjs/config";

@Module({
    controllers: [],
    providers: [],
    imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, UsuariosModule, ProductosModule, AuthModule],
})

export class AppModule {}