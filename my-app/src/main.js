import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "@/assets/styles/main.css";

// import './assets/tailwind.css'
import { auth } from './firebase/config'

import './assets/tailwind.css'

let app

auth.onAuthStateChanged(() => {
    if (!app) {
        app = createApp(App).use(router).mount('#app')
    }
    
})