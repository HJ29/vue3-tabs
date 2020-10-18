<template>
  <div class="tab-panel">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TabPanel",
});
</script>

<style scoped>
.tab-panel {
  width: 100%;
  display: inline-block;
  white-space: initial;
  vertical-align: top;
}
</style>