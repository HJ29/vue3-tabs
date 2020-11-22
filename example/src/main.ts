import { createApp } from 'vue';
import App from './App.vue';
import Tabs from '../../dist/vue3-tabs.common';

const app = createApp(App);
app.use(Tabs);
app.mount('#app');