import type { APIRoute } from 'astro';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const prerender = false


export const GET: APIRoute = async ({ params, request }) => {

    const clients = await prisma.clients.findMany()
    console.log(clients)


    return new Response(JSON.stringify({
        method: 'Get',
        clients
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


        const newClient = await prisma.clients.create({
            data: {
              ...body
            },
          })
console.log(newClient)
        return new Response(JSON.stringify({
            method: 'POST',
            newClient,
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

