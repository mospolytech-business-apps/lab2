import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia'
import router from './router'


const pinia = createPinia()


createApp(App).use(router).use(pinia).mount('#app')
