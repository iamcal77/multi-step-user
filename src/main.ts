import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Toast, { POSITION } from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import router from './router'



const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Toast,{ position: POSITION.TOP_CENTER,  // Center the toast horizontally at the top
    timeout: 3000,})
app.mount('#app')
