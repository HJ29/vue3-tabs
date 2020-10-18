<template>
  <div
    :class="{'active': isActive && indicator}"
    @click="onClickTab"
  >
    <slot>
      <div class="tab">
        {{ label }}
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, reactive, computed, toRefs } from "vue";
import { Tabs } from './Tabs.vue';

export default defineComponent({
  name: "Tab",
  props: {
    val: {
      default: null,
      type: [String, Number]
    },
    label: {
      default: null,
      type: String
    },
    indicator: {
      default: false,
      type: Boolean
    }
  },
  setup(props) {
    const tabs = inject<Tabs>(
      'tabs',
      {
        state: reactive({
          active: null
        }),
        activateTab: () => {}
      }
    );
    const state = reactive({
      isActive: computed(() => tabs.state.active === props.val)
    });
    function onClickTab() {
      tabs.activateTab(props.val);
    }
    return {
      ...toRefs(state),
      tabs,
      onClickTab
    };
  }
});
</script>

<style scoped>
.tab {
  padding: 10px 20px;
}
.active {
  border-width: 0px;
  border-bottom-width: 2px;
  border-style: solid;
  border-color: black;
}
</style>