import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './pages/Home.vue'
import Objects from './pages/Objects.vue'
import Offers from './pages/Offers.vue'
import Deals from './pages/Deals.vue'
import Mobile from './pages/Mobile.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/offers', component: Offers },
    { path: '/deals', component: Deals },
    { path: '/mobile', component: Mobile },
    { path: '/objects', component: Objects }, 
  ] 
})

export default router