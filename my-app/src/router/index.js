import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RecipeList from '../views/RecipeList.vue'
import SignupForm from '../views/SignupForm.vue'
import LoginForm from '../views/LoginForm.vue'
import DownloadRecipe from '../views/DownloadRecipe.vue'
import RecipeDetails from '../views/RecipeDetails.vue'
// route guard
import { auth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if(!user) {
    next({ name: 'Home'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/recipes',
    name: 'RecipeList',
    component: RecipeList,
    beforeEnter: requireAuth
  },
  {
    path: '/signup',
    name: 'SignupForm',
    component: SignupForm
  },
  {
    path: '/login',
    name: 'LoginForm',
    component: LoginForm
  },
  {
    path: '/download',
    name: 'DownloadRecipe',
    component: DownloadRecipe,
    beforeEnter: requireAuth
  },
  {
    path: '/details/:id',
    name: 'RecipeDetails',
    component: RecipeDetails,
    props: true,
    beforeEnter: requireAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
