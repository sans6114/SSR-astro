import type { APIRoute } from 'astro';
import {
  db,
  Posts,
} from 'astro:db';

export const prerender = false


export const GET: APIRoute = async ({ params, request }) => {
// Select * from clients
const posts = await db.select().from(Posts);

return new Response(JSON.stringify(posts), {
  status: 200,
  headers: {
    'Content-Type': 'application/json',
  },
});
}