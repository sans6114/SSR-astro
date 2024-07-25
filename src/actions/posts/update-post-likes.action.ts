import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';
import {
  db,
  eq,
  Posts,
} from 'astro:db';

export const updatePostLikes = defineAction({
    accept: "json",
    input: z.object({
        postId: z.string(),
        likes: z.number(),
    }),
    handler: async ({ postId, likes }) => {
        try {
            const posts = await db
                .select()
                .from(Posts)
                .where(eq(Posts.id, postId));


            if (posts.length === 0) {
                const newPost = {
                    id: postId,
                    title: 'Post not found',
                    likes: 0,
                }

                await db.insert(Posts).values(newPost)
                posts.push(newPost)
            }
            const post = posts.at(0)!
            post.likes = post.likes + likes

            await db.update(Posts).set(post).where(
                eq(Posts.id, postId)
            )


            return true;
        } catch (error) {
            console.error('Error al obtener los likes:', error);
            return { error: 'Ocurrió un error al obtener los likes' };
        }
    },
})