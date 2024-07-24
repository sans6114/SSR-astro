import { getCollection } from 'astro:content';
import {
  Clients,
  db,
  Posts,
} from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(Clients).values([
		{ id: 1, name: "Kasim", age: 18, isActive: false },
		{ id: 2, name: "Santi", age: 15, isActive: true },
		{ id: 3, name: "Juanma", age: 65, isActive: false },
		{ id: 4, name: "Natalia", age: 22, isActive: true },
		{ id: 5, name: "Juan Pablo", age: 23, isActive: true },
		{ id: 6, name: "Alejandro", age: 50, isActive: true },
	  ]);

const posts =  await getCollection('blog')

await db.insert(Posts).values(
	posts.map(p => ({
		id: p.id,
		title: p.data.title,
        likes: Math.round(Math.random() * 100)
	}))
)







	console.log('Seed excuted')
}
