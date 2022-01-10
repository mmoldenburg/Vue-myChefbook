<template>
    <nav  class="container flex items-center justify-between mx-auto mt-2 shadow-xl rounded-xl bg-vue-grey " >
        <div class="block ">
            <div>
                <router-link :to="{ name: 'Home' }">
                    <h1 class="py-4 pl-4 text-lg italic font-bold text-gray-200 lg:pt-4 lg:py-4 lg:text-3xl">my<strong class="italic font-bold lg:text-4xl text-vue-green">Chefbook</strong></h1>
                </router-link>
                
            </div>
            <div v-if="user">
                <p class="pb-4 pl-4 text-xs text-gray-200 sm:text-sm">Hallo {{ user.displayName }}, schön dass du hier bist!</p>
            </div>           
        </div >
        <div class="hidden pr-4 lg:flex">
            <div v-if="user" class="space-x-4">              
                <router-link :to="{ name: 'RecipeList' }" class="text-xl text-gray-200 hover:text-gray-400">Rezeptbuch</router-link>
                <router-link :to="{ name: 'DownloadRecipe' }" class="text-xl text-gray-200 hover:text-gray-400">Download</router-link>
                <button class="h-8 px-4 transform bg-gray-200 rounded shadow-lg hover:scale-110 hover:bg-gray-300" @click="handleClick">Logout</button>
            </div>
            <div v-else class="space-x-4">
                <router-link :to="{ name: 'SignupForm'}" class="text-xl text-gray-200 hover:text-gray-400">Registrieren</router-link>
                <router-link :to="{ name: 'LoginForm'}" class="text-xl text-gray-200 hover:text-gray-400">Login</router-link>
            </div>           
        </div>
            
        <div class="pr-4 lg:hidden">
            <button class="inline-flex items-center justify-center w-10 h-10 border-2 border-gray-200 rounded-md" @click="navbarOpen = !navbarOpen">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
    </nav>
        <div v-if="navbarOpen">
           <div v-if="user" class="w-full mt-2 " >
            <ul class="flex flex-col shadow-xl bg-vue-grey rounded-xl" @click="navbarOpen = !navbarOpen">
                <li class="pl-4 my-2 border-b border:gray-200">
                    <router-link :to="{ name: 'RecipeList' }" class="text-gray-200 hover:text-gray-400">Rezeptbuch</router-link>  
                </li>
                <li class="pl-4 mb-2 border-b border:gray-200 ">
                    <router-link :to="{ name: 'DownloadRecipe' }" class="text-gray-200 hover:text-gray-400">Download</router-link> 
                </li>
                <li class="pl-4 mb-2 ">
                    <button class="text-gray-200 hover:text-gray-400" @click="handleClick">Logout</button> 
                </li>
                
            </ul>
        </div>
        <div v-else class="w-full mt-2 " >
            <ul class="flex flex-col shadow-xl bg-vue-grey rounded-xl" @click="navbarOpen = !navbarOpen">
                <li class="py-2 pl-4 border-b border:gray-200">
                    <router-link :to="{ name: 'SignupForm'}" class="text-gray-200 hover:text-gray-400">Registrieren</router-link>
                </li>
                <li class="py-2 pl-4 ">
                    <router-link :to="{ name: 'LoginForm'}" class="text-gray-200 hover:text-gray-400">Login</router-link>
                </li>
            </ul>
        </div> 
        </div>
         
     

</template>

<script>
import useLogout from '../composables/useLogout'
import getUser from '../composables/getUser'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
    setup() {
        const router = useRouter()
        const { error, logout } = useLogout()
        const { user } = getUser()
        const navbarOpen = ref(false)

        const handleClick = async () => {
            await logout()
            if(!error.value) {
                router.push({ name: 'Home' })
            }
        }
        console.log(navbarOpen)

        return { error, user, navbarOpen, handleClick }
    }
}
</script>

