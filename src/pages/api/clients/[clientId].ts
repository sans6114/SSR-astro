import type { APIRoute } from 'astro';
import {
  Clients,
  db,
  eq,
} from 'astro:db';

export const prerender = false




export const GET: APIRoute = async ({ params, request }) => {
    const users = await db.select().from(Clients);
    const { clientId } = params

    const userFound = users.find((user) => user.id === Number(clientId))


    if (userFound) return new Response(JSON.stringify({ userFound },), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
    if (!userFound) return new Response(JSON.stringify({ userFound },), {
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
        const { id, ...body } = await request.json();


        const res = await db.update(Clients).set(body)
            .where(eq(Clients.id, +clientId))

        const updateClient = await db.select().from(Clients).where(eq(Clients.id, +clientId))

        return new Response(JSON.stringify(updateClient), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
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

const clientId = params.clientId  ?? ''

const {rowsAffected} = await db.delete(Clients).where(eq(Clients.id, +clientId))
if(rowsAffected > 0){

    return new Response(JSON.stringify({
        method: 'Delete',
        clientId
    }), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
}

return new Response(JSON.stringify({msg: `Client with id ${clientId} no se puedo eliminar`}), {
    status: 200,
    headers: {
        'Content-type': 'application/json'
    }
})

}