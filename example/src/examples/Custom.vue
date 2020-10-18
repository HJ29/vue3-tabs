<template>
  <h3>Custom Example</h3>
  <tabs
    v-model="selectedTab"
  >
    <tab
      v-for="(tab, i) in tabs"
      :key="`t${i}`"
      :val="tab.value"
    >
      <div
        :style="{'border-color': getActive(tab.value) ? tab.color : '', color: getActive(tab.value) ? tab.color : ''}"
        :class="{'active-tab': getActive(tab.value)}"
        class="tab"
      >
        {{ tab.label }}
      </div>
    </tab>
  </tabs>
  <tab-panels
    v-model="selectedTab"
    :animate="true"
    :swipeable="true"
    class="tab-panels"
  >
    <tab-panel
      v-for="(tab, i) in tabs"
      :key="`tp${i}`"
      :val="tab.value"
      class="tab-panel"
      :style="`background: ${tab.color}; color: white;`"
    >
      <div>
        {{ tab.description }}
      </div>
    </tab-panel>
  </tab-panels>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';

const tabs = [{
  label: 'Tab 1',
  value: 1,
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book`,
  color: 'blue'
}, {
  label: 'Tab 2',
  value: 2,
  description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy`,
  color: 'red'
}, {
  label: 'Tab 3',
  value: 3,
  description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old',
  color: 'grey'
}];

export default defineComponent({
  name: 'Example',
  setup() {
    const state = reactive({
      selectedTab: tabs[0].value
    });
    function getActive(tab: string | number) {
      return state.selectedTab === tab;
    }
    return {
      tabs,
      getActive,
      ...toRefs(state)
    };
  }
});
</script>

<style scoped>
.tab {
  padding: 10px 0px;
  margin: 10px 20px;
}
.active-tab {
  border-width: 0px;
  border-top-width: 2px;
  border-style: solid;
}
/* disable select highlight */
.tab-panels {
  -webkit-user-select: none;
  -moz-user-select: none;
}
.tab-panel {
  padding: 20px;
  box-sizing: border-box;
}
</style>
