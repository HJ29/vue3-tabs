<template>
  <div class="tabs">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, computed, reactive } from "vue";
import { Active } from './index';

export interface Tabs {
  state: TabsState;
  activateTab: (tab: Active) => void;
}

interface TabsState {
  active: string | number | null;
}

export default defineComponent({
  name: "Tabs",
  props: {
    modelValue: {
      default: null,
      type: [String, Number]
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const state: TabsState = reactive({
      active: computed(() => props.modelValue)
    });
    provide<Tabs>('tabs', {
      state,
      activateTab,
    });
    function activateTab(tab: Active) {
      emit('update:modelValue', tab);
    }
  }
});
</script>

<style scoped>
.tabs {
  display: flex;
  flex-wrap: wrap;
}
</style>