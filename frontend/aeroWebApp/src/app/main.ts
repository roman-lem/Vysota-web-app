import { createApp } from 'vue'
import App from '@/app/App.vue'
import router from './router'
import { pinia } from './providers/pinia'

const app = createApp(App)
app.use(pinia)

app.use(router)
app.mount('#app')