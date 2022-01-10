<template>
    <div>
        <h1 class="pt-12 text-4xl font-bold text-center text-vue-gray">Melde dich jetzt an...</h1>
        <div class="w-full max-w-xl mx-auto mt-12 ">
            <form class="px-8 pt-6 pb-8 mb-4 rounded shadow-xl bg-vue-grey">
                
                <div class="mb-12">
                    <label class="block mb-2 text-xl font-bold text-gray-200" for="username">
                        Email
                    </label>
                    <input required class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="email" type="email" v-model="email">
                </div>
                <div class="mb-12">
                    <label class="block mb-2 text-xl font-bold text-gray-200" for="password">
                        Passwort
                    </label>
                    <input required class="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="password" type="password" v-model="password">                   
                </div>
                <div class="text-xl font-semibold text-center text-red-700 ">{{ error }}</div>
                <div class="flex justify-center ">
                    <button @click="handleClick" class="px-12 py-4 font-bold text-center bg-gray-300 rounded hover:bg-gray-200 text-vue-grey focus:outline-none focus:shadow-outline" type="button">
                        Login
                    </button>
                   
                </div>
            </form>
        </div>  
    </div>

        
    
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'
import { useRouter } from 'vue-router'


export default {
    setup(props, context) {
        const email= ref('')
        const password = ref('')
        const router = useRouter()

        const { error, login } = useLogin()

        const handleClick = async () => {
            await login(email.value, password.value)
            if(!error.value) {
                router.push({ name: 'RecipeList'})
            }
        }

        return { email, password, error, handleClick }
    }
}
</script>

