import { getCollection } from 'astro:content';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

async function main() {
  // Crear un nuevo cliente
  const newClient = await prisma.clients.create({
    data: {
      id: 10,
      name: 'Santi',
      age: 30,
      isActive: true
    }
  });

  const existPosts = await getCollection('blog');
  const newPosts = existPosts.map(async (p) => {
    return prisma.posts.create({
      data: {
        id: p.id,
        title: p.data.title,
        likes: Math.round(Math.random() * 100)
      }
    });
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

