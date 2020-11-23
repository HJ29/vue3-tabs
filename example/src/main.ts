import { createApp } from 'vue';
import App from './App.vue';
import Tabs from '../../src/main';

const app = createApp(App);
app.use(Tabs);
app.mount('#app');