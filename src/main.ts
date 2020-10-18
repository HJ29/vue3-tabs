import { App, Plugin } from 'vue';
import Tabs from './Tabs.vue';
import Tab from './Tab.vue';
import TabPanel from './TabPanel.vue';
import TabPanels from './TabPanels.vue';

const install = (app: App) => {
  app.component('Tabs', Tabs);
  app.component('Tab', Tab);
  app.component('TabPanels', TabPanels);
  app.component('TabPanel', TabPanel);
};

Tabs.install = install;

export { Tabs, Tab, TabPanels, TabPanel };

export default Tabs as unknown as Plugin;