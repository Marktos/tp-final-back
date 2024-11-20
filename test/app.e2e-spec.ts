import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Crear un nuevo usuario
  const newUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: 'password123',
    },
  });
  console.log('Usuario creado:', newUser);

  // Listar usuarios
  const users = await prisma.user.findMany();
  console.log('Usuarios en la base de datos:', users);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
