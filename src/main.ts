import { createApp,ref } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

const pageWidth = ref(0)

app.use(router)

app.provide('global', {
    pageWidth
})

app.mount('#app')
