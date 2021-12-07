import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Score from '../views/Score.vue';
import Jouer from '@/views/jouer.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/score',
    name: 'Score',
    component: Score
  }
  ,
  {
    path: '/jouer',
    name: 'Jouer',
    component: Jouer
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
