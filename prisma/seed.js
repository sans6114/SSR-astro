import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  // Crear un nuevo cliente
  const newClient = await prisma.clients.create({
    data: {
      name: 'Santi',
      age: 30,
      isActive: true
    }
  });



  console.log('Nuevo cliente creado:', newClient);
  const clients = await prisma.clients.findMany()
  const posts = await prisma.posts.findMany()
  console.table(clients)
  console.table(newPosts)

postsMap()
  console.log(postsMap)
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

