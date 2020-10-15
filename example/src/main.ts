import { createApp } from 'vue'
import App from './App.vue'
import CustomPlugin from '../../src/main'

const app = createApp(App);
app.use(CustomPlugin);
app.mount('#app')