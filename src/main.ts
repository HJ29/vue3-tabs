import { App, Plugin } from 'vue';
import CustomPlugin from './Plugin.vue'

const install = (app: App) => {
  app.component('plugin', Plugin)
}

CustomPlugin.install = install;

export default CustomPlugin as unknown as Plugin;