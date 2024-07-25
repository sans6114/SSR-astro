import { z } from 'astro/zod';
import { defineAction } from 'astro:actions';
import {
  db,
  eq,
  Posts,
} from 'astro:db';

export const getPostLikes = defineAction({
    accept: "json",
    input: z.string(),
    handler: async (postId) => {
      try {
        const post = await db
        .select()
        .from(Posts)
        .where(eq(Posts.id, postId))
        
        //si el post no existe
        if (post.length === 0) {
          const newPost = {
              id: postId,
              title: 'Post not found',
              likes: 0,
          }
  
          await db.insert(Posts).values(newPost)
          post.push(newPost)
      }

        return { likes: post.at(0)?.likes };
      } catch (error) {
        console.error('Error al obtener los likes:', error);
        return { error: 'Ocurrió un error al obtener los likes' };
      }
    },
})