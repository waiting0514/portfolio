import './assets/main.css'

import { createApp } from 'vue'
import { createWebHistory } from 'vue-router'
import App from './App.vue'
import { createAppRouter } from './router'

const app = createApp(App)
const router = createAppRouter(createWebHistory(import.meta.env.BASE_URL))

app.use(router)

// Mount after the initial navigation so the first render is already the requested page.
router.isReady().then(() => app.mount('#app'))
