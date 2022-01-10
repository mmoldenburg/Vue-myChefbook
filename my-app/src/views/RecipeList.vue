<template>
    <div >
        <div>
            <h1 class="my-6 text-4xl italic font-bold text-center text-vue-grey">Meine Rezepte</h1>
        </div>
        <!-- <div v-if="error">{{ error }}</div> -->
        <!-- <div >
            <h1 class="mt-20 text-3xl italic text-center text-vue-grey">Leider sind derzeit noch keine Rezepte in deinem <span class="text-3xl italic font-bold text-vue-grey ">my<strong class="text-4xl italic font-bold text-vue-green">Chefbook...</strong></span></h1>
        </div>         -->
        <div >
            <div v-for="doc in documents" :key="doc.id" >
                <div class="container p-4 mx-auto my-4 bg-white shadow-2xl lg:flex rounded-xl">
                <router-link :to="{ name: 'RecipeDetails', params: {id: doc.id}}">
                        <div>
                            <img :src="doc.imageUrl" alt="recipe picture" class="mx-auto duration-300 transform shadow-xl rounded-xl hover:scale-105">
                        </div>
                    </router-link>    
                    <div class="flex-1 mx-auto">
                        <div class="text-left ">
                            <h1 class="px-6 py-4 text-xl lg:py-10 lg:text-2xl text-vue-green">{{ doc.title }}</h1>
                            <div class=" flex">
                                <div class=" flex px-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p class=" pl-4">{{ doc.time }}</p>
                                </div >
                                
                                <div class=" flex px-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                    <p class=" pl-4">{{ doc.level }}</p>
                                </div>
                                
                            </div>
                            
                            <div class="flex items-center pb-2 pl-6 lg:py-6">
                            <p class="pt-1 mr-4">{{ doc.rating }} /5</p>
                                <svg v-for="i in 5" :key="i" :class="i <= Math.round(doc.rating) ? 'text-yellow-400' : 'text-gray-300'" class="w-6 h-6 my-4 fill-current" viewBox="0 0 24 24">
                                <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z" />
                            </svg>
                            </div>         
                        </div>  
                    </div> 
                    
                    <div class="flex ">
                        <svg @click="handleClick(doc)" xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mt-0 ml-auto mr-4 cursor-pointer fill-current lg:mt-12 lg:mx-8" fill="full" viewBox="0 0 24 24" :class="doc.isFav ? 'text-red-500' : 'text-gray-300'">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="0" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>                
                </div>         
            </div>
        </div>

    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import getUser from '../composables/getUser'
import { db } from '../firebase/config'
import getCollection from '../composables/getCollection'

export default {
    components: { Navbar },
    setup() {

        const { user } = getUser()

        const { documents, error } = getCollection(
            'recipes', 
           ['userUid', '==', user.value.uid]
        )
            
        const handleClick = (doc) => {
            db.collection('recipes').doc(doc.id).update({
                isFav: !doc.isFav
            })
        }

        return { documents, error, handleClick }
    }
}
</script>

