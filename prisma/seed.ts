import { PrismaClient } from '@prisma/client/extension';

const prisma = new PrismaClient()

async function main() {
    // Crear un nuevo cliente
    const newClient = await prisma.clients.create({
      data: {
        name: 'John Doe',
        age: 30,
        isActive: true
      }
    });
  
    console.log('Nuevo cliente creado:', newClient);
    const clients = await prisma.Clients.findmany()
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
