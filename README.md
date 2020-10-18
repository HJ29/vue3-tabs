# vue3-tabs

A touch swipe tab for vue 3.

### Demo
[Demo](https://hj29.github.io/vue3-tabs/)

[Demo Code](https://github.com/HJ29/vue3-tabs/tree/master/example/src/)

### Install
```bash
yarn add vue3-tabs
npm i --save vue3-tabs
```

### Register Global Component
```js
import { createApp } from 'vue';
import App from './App.vue'
import Tabs from 'vue3-tabs';

const app = createApp(App);
app.use(Tabs);
app.mount('#app')
```

### Register Local Component
```js
import { Tabs, Tab, TabPanels, TabPanel } from 'vue3-tabs';

export default {
  components: {
    Tabs,
    Tab,
    TabPanels,
    TabPanel
  },
};
```

### Example
```vue
<template>
  <h3>Basic Example</h3>
  <tabs
    v-model="selectedTab"
  >
    <tab
      class="tab"
      v-for="(tab, i) in tabs"
      :key="`t${i}`"
      :val="tab"
      :label="tab"
      :indicator="true"
    />
  </tabs>
  <tab-panels
    v-model="selectedTab"
    :animate="true"
  >
    <tab-panel
      v-for="(tab, i) in tabs"
      :key="`tp${i}`"
      :val="tab"
    >
      {{ tab }}
    </tab-panel>
  </tab-panels>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

const tabs = ['A', 'B', 'C'];

export default defineComponent({
  name: 'Example',
  setup() {
    const state = reactive({
      selectedTab: tabs[1]
    });
    return {
      tabs,
      ...toRefs(state)
    };
  }
});
</script>

<style scoped>
.tab {
  padding: 10px 20px;
}
</style>
```

### Components
#### Tabs
##### Props
| Name                    | Type                     | Required | Default | Notes      |
| ----------------------- | ------------------------ | -------- | ------- | ---------- |
| :model-value \| v-model | string \| number \| null | yes      | null    | value emit |
##### Events
| Name               | Description                |
| ------------------ | -------------------------- |
| @update:modelValue | event emit when tab change |
##### Slots
| Name           | Tag      | Description          |
| -------------- | -------- | -------------------- |
| v-slot:default | \<tab /> | \<tab /> as children |

#### Tab
##### Props
| Name       | Type             | Required | Default | Notes                         |
| ---------- | ---------------- | -------- | ------- | ----------------------------- |
| :val       | string \| number | yes      | null    | value to indicate active      |
| :label     | string           | no       | null    | label                         |
| :indicator | boolean          | no       | false   | show default active indicator |

#### TabPanels
##### Props
| Name                    | Type                     | Required | Default | Notes                                                                   |
| ----------------------- | ------------------------ | -------- | ------- | ----------------------------------------------------------------------- |
| :model-value \| v-model | string \| number \| null | yes      | null    | value emit                                                              |
| :animate                | boolean                  | no       | false   | smooth change effect<br>not working with ios                            |
| :swipeable              | boolean                  | no       | false   | swipe to change tab                                                     |
| :threshold              | number                   | no       | 50      | minimum pixel to swipe to change tab<br>only work when swipeable = true |
##### Events
| Name               | Description                |
| ------------------ | -------------------------- |
| @update:modelValue | event emit when tab change |
##### Slots
| Name           | Tag            | Description                |
| -------------- | -------------- | -------------------------- |
| v-slot:default | \<tab-panel /> | \<tab-panel /> as children |

#### TabPanel
##### Props
| Name | Type             | Required | Default | Notes                    |
| ---- | ---------------- | -------- | ------- | ------------------------ |
| :val | string \| number | yes      | null    | value to indicate active |

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
