import type { APIRoute } from 'astro';
import { getEntry } from 'astro:content';

export const prerender = false

export const GET: APIRoute = async ({ params, request }) => {

    const { slug } = params

    const post = await getEntry('blog', slug as any)
    if (!post) return new Response(JSON.stringify({ msg: `Post con ${slug} no encontrado` }), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })




    return new Response(JSON.stringify(post), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export const POST: APIRoute = async ({ params, request }) => {

const body = await request.json()


    return new Response(JSON.stringify({
        method: 'POST',
        ...body
    }), {
        status: 200,
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export const PUT: APIRoute = async ({ params, request }) => {

    const body = await request.json()
    
    
        return new Response(JSON.stringify({
            method: 'PUT',
            ...body
        }), {
            status: 200,
            headers: {
                'Content-type': 'application/json'
            }
        })
    }