import { getCollection } from 'astro:content';

const posts = await getCollection('blog')
const postsMap = posts.map((p) => ({
    id: p.id,
    title: p.data.title,
    likes: Math.round( Math.random() * 100)
}))

export default postsMap