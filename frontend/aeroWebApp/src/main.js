import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import {createPinia} from 'pinia'
import { useUserStore } from './store/userState'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
const state =  useUserStore()
await state.initAuth()
app.use(router)

app.mount('#app')
