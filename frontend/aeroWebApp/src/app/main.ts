import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from './router'
import {createPinia} from 'pinia'
import { initAuth } from '@/features/auth/api/auth.api'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
await initAuth()

app.use(router)

app.mount('#app')
