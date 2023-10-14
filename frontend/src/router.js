import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Objects from './pages/Objects.vue'
import Offers from './pages/Offers.vue'
import Deals from './pages/Deals.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/offers', component: Offers },
    { path: '/deals', component: Deals },
    { path: '/mobile', component: Home },
    { path: '/objects', component: Objects }, 
  ] 
})

export default router