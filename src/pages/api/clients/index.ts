import type { APIRoute } from 'astro';
import {
  Clients,
  db,
} from 'astro:db';

export const prerender = false


export const GET: APIRoute = async ({ params, request }) => {

    const users = await db.select().from(Clients);
    console.log(users)


    return new Response(JSON.stringify({
        method: 'Get',
        users
    }), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export const POST: APIRoute = async ({ request }) => {
    try {
        const { id, ...body } = await request.json();


        const { lastInsertRowid } = await db.insert(Clients).values({
            ...body
        })
        console.log()

        return new Response(JSON.stringify({
            method: 'POST',
            id: +lastInsertRowid!.toString(),
            ...body
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error in POST:', error);
        return new Response(JSON.stringify({
            msg: 'Cliente no enviado',
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

