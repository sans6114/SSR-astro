import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({params, request}) => {
    
const person = {
    name: 'Santiago',
    edad: 18
}




    return new Response(JSON.stringify(person), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
}