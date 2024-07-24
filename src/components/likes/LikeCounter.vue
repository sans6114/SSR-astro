<script lang="ts" setup>
import {
  ref,
  watch,
} from 'vue';

import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';

//defino mis props
interface Props {
    id: string
}
const props = defineProps<Props>()
console.log(props)


const id = props.id
const likeClicks = ref(0)
const likesCount = ref(0)
const isLoading = ref(true)


watch(likesCount, debounce(() => {
    // 
    
    fetch(`/api/posts/likes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({likes: likeClicks.value})
    })


    likeClicks.value = 0


}, 500))




const likePost = () => {
    
    likesCount.value++
    likeClicks.value++
    //console.log(likeClicks.value)
confetti({
    particleCount: 100,
    spread: 70,
    origin: {
        x: Math.random(),
        y: Math.random() - 0.2
    }
})


    //console.log(likesCount.value)
}


const getCurrentLikes = async() => {
    const res = await fetch(`/api/posts/likes/${id}`)
if(!res.ok) return

const data = await res.json()

likesCount.value = data.likes
isLoading.value = false
//console.log(data)
}

getCurrentLikes()
</script>



<template>

    <dir v-if="isLoading">
        <h3>
            Estoy cargando...
        </h3>
    </dir>
    
        <button v-else-if="likesCount === 0" @click="likePost">
            Like
        </button>
        <button v-else @click="likePost">
            likes
            <span>{{ likesCount }}</span>
        </button>

     
</template>


<style scoped>
button {
    background-color: #5e51bc;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all;
    font-weight: bold;
}

button:hover {
    background-color: #4a3f9a;
}
</style>