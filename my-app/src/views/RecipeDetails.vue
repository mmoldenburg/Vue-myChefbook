<template>
    <div>
        <div>
            <h1 class="my-6 text-xl font-semibold text-center lg:text-4xl text-vue-green">{{ document.title }}</h1>            
        </div>
        <div class="relative w-full bg-white shadow-2xl lg:flex lg:mx-auto lg:w-1/2 rounded-xl">
            <div class="flex justify-center w-full px-2 py-2 lg:pl-2 lg:py-4 ">                                          
                <img :src="document.imageUrl" alt="recipe picture" class="rounded shadow-xl ">
            </div>
           
            <div @click="handleClick" class="cursor-pointer  lg:absolute lg:top-8 lg:right-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mx-auto lg:w-12 lg:h-12 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <p class="pb-2 text-xs text-center">Löschen</p>
            </div>
        </div> 
        <div>
            <h1 class="pt-6 text-xl text-center lg:text-2xl text-vue-grey">
                 Rezept für <span class="font-bold text-vue-green">{{ document.value }}</span> Personen
            </h1>
           
        </div> 
        <div class="flex w-full mx-auto mt-4 mb-4 shadow-2xl auto-rows-min lg:w-1/2 bg-vue-green rounded-xl">
            <div class="w-1/3 ">
                <div v-for="doc in document.quantity" :key="doc.id">
                    <p class="py-2 text-sm text-right text-gray-200 lg:text-xl">{{ doc }}</p>
                </div>    
            </div>
             <div class="w-2/3 pl-6">
                <div v-for="doc in document.ingridients" :key="doc.id">
                    <p class="py-2 text-sm text-gray-200 lg:text-xl">{{ doc }}</p>
                </div>    
            </div>
        </div>
        <div class="relative w-full mx-auto mb-4 bg-white shadow-2xl lg:w-1/2 rounded-xl">
            <p class="p-4 leading-8 text-md lg:text-xl">{{ document.prepaire }}</p>
        </div>
        <div class="mb-6 ">
            <h1 class="text-center text-md lg:text-lg text-vue-grey">Author: {{ document.author }}</h1>    
        </div>    
    </div>
        

   
</template>

<script>
import getDetails from '../composables/getDetails'
import { db } from '../firebase/config'
import { useRouter } from 'vue-router'

export default {
    props: [ 'id' ],
    setup(props) {
        const router = useRouter()
        const { document,error, load } = getDetails(props.id)
        load()

        const handleClick = async () => {
            await db.collection('recipes').doc(props.id).delete()
            router.push({ name: 'RecipeList'})
        }

        return { document, error, handleClick }
    }
}
</script>

