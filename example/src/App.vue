<template>
  <basic />
  <div class="separator" />
  <custom />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Basic from './examples/Basic.vue';
import Custom from './examples/Custom.vue';

export default defineComponent({
  name: 'App',
  components: {
    Basic,
    Custom,
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.separator {
  border-width: 1px;
  border-style: solid;
  border-color: lightgray;
  margin: 10px 0px;
}
</style>
