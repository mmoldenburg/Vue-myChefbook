<template>
    <div class="w-full mx-auto mt-8 bg-white shadow-xl lg:w-2/3 rounded-xl">
        
            <div class="py-8 ">
               <h1 class="text-2xl text-center lg:text-4xl text-vue-grey">Hol dir ein neues Rezept...</h1> 
            </div>
            
            <div class="flex justify-center py-6 space-x-2 lg:space-x-4 lg:py-12">
                <div class="pt-4 pb-12">
                    <a class="p-6 text-lg font-bold uppercase shadow-2xl lg:p-16 lg:text-xl bg-vue-grey text-vue-green rounded-2xl" href="https://www.chefkoch.de/" target="_blank">Chefkoch.de</a>
                </div>
                <div class="pt-4 pb-12 ">
                    <a class="p-6 text-lg font-bold uppercase shadow-2xl lg:p-16 lg:text-xl bg-vue-grey text-vue-green rounded-2xl" href="https://www.chefkoch.de/" target="_blank">However.de</a>
                </div>
            </div>
            <div class="pb-6 ">
                <h1 class="text-lg text-center lg:text-xl text-vue-grey">...und kopiere den Rezept-Link...</h1>
            </div>
            <div class="w-full px-4 pb-8 lg:px-24">
                <input class="w-full px-4 py-2 border-2 outline-none border-vue-green rounded-xl" type="text" v-model="url" placeholder="...hier hinein.">
            </div> 
            <div v-if="error" class="font-bold text-center text-red-600">{{ error }}</div>    
            <div v-if="!isPanding" class="flex justify-center py-12 ">
                <button class="px-12 py-6 text-xl font-bold transform border-2 border-green-600 shadow-xl lg:text-2xl bg-vue-green text-vue-grey rounded-xl hover:bg-green-500 hover:scale-105" @click="handleClick">Hinzufügen</button>
            </div>
            <div v-else class="flex justify-center py-12 ">
                <button disabled class="px-12 py-6 text-xl font-bold transform bg-gray-400 border-2 border-gray-600 shadow-xl lg:text-2xl text-vue-grey rounded-xl hover:bg-green-500 hover:scale-105" >Download...</button>
            </div>            
        </div>
</template>

<script>
import { ref } from 'vue'
import getUser from '../composables/getUser'
import { db, timestamp } from '../firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()
        const url = ref('')
        const error = ref(null)
        const isPanding = ref(false)
        
        const { user } = getUser()

        const handleClick = async () => {
            
            try {    
                isPanding.value = true
                error.value = null
                if(!url.value.includes('https://www.chefkoch.de/rezepte/')) {
                    throw new Error('keine gültige Rezept-Url')
                }else{
                    
                    const result = await fetch('http://localhost:5000/url', {
                        method: 'POST',
                        headers: { 'Content-Type':'application/json' },
                        body: JSON.stringify({ url: url.value })
                            }).then(data => data.json())
                             error.value = null
                        const res = await db.collection('recipes').add({...result, createdAt: timestamp(), userUid: user.value.uid})     
                        
               }          
            } catch (err) {
                error.value = err.message
            }
            isPanding.value = false
            router.push({ name: 'RecipeList' })
        }

        return { url, error, isPanding, handleClick }
    }
}
</script>

