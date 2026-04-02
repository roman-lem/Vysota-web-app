import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from './router'
import { pinia } from './providers/pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)
app.use(pinia)
app.use(VueQueryPlugin)
app.use(router)
app.mount('#app')