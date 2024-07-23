import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
    // Crear un nuevo cliente
    const newClient = await prisma.clients.create({
      data: {
        id: 2,
        name: 'Santi',
        age: 30,
        isActive: true
      }
    });
  
    console.log('Nuevo cliente creado:', newClient);
    const clients = await prisma.clients.findMany()
    console.table(clients)
  }
  

  main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
