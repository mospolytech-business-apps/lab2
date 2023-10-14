import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createPinia } from 'pinia'

const pinia = createPinia()


createApp(App).use(pinia).mount('#app')
