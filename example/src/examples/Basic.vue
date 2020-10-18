<template>
  <h3>Basic Example</h3>
  <tabs
    v-model="selectedTab"
  >
    <tab
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
    :swipeable="true"
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
