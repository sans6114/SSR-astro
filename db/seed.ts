import {
  Clients,
  db,
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









	console.log('Seed excuted')
}
