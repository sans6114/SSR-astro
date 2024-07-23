import type { APIRoute } from 'astro';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export const prerender = false




export const GET: APIRoute = async ({ params, request }) => {
    const clientId = Number(params.clientId ?? '')
    const userFound = await prisma.clients.findUnique({
        where: {
            id: clientId,
        },
    })


    if (userFound) return new Response(JSON.stringify({ userFound },), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
    if (!userFound) return new Response(JSON.stringify({ msg: 'usuario con id inexistente' },), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })

    if (!clientId) return new Response(JSON.stringify({ msg: `cliente con ${clientId} no encontrado` }), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })



    return new Response(JSON.stringify(clientId), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
}


export const PATCH: APIRoute = async ({ params, request }) => {

    const clientId = params.clientId ?? ''

    try {
        const body = await request.json();

        const updatedClient = await prisma.clients.update({
            where: { id: Number(clientId) },
            data: body,
        });

        return new Response(JSON.stringify(updatedClient), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.log('Error in POST:', error);
        return new Response(JSON.stringify({
            msg: 'Cliente no enviado',
        }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}


export const DELETE: APIRoute = async ({ params, request }) => {
    const clientId = params.clientId ?? '';

    try {
        await prisma.clients.delete({
            where: { id: Number(clientId) },
        });

        return new Response(JSON.stringify({ method: 'DELETE', clientId }), {
            status: 200,
            headers: { 'Content-type': 'application/json' }
        });

    } catch (error) {
        console.error('Error in DELETE:', error);
        return new Response(JSON.stringify({ msg: `Client with id ${clientId} could not be deleted` }), {
            status: 400,
            headers: { 'Content-type': 'application/json' }
        });
    }
};