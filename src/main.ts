import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/main.css'
const app = createApp(App)

const pageWidth = ref(0)

const searchText = ref('')

const tableData = ref([])

const dark = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches)
        document.querySelector('html')?.classList.add('dark')
    else
        document.querySelector('html')?.classList.remove('dark')
}
dark()
const media = window.matchMedia('(prefers-color-scheme:dark)')
media.addEventListener('change', dark)

app.use(router)
app.use(ElementPlus)

app.provide('global', {
    pageWidth,
    searchText,
    tableData
})

app.mount('#app')
