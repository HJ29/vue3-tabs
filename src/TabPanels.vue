<template>
  <div
    class="tab-panels hide-scrollbar"
    @mousedown="onMoveStart"
    @mouseup="onMoveEnd"
    @mouseleave="onMoveEnd"
    @touchstart="onMoveStart"
    @touchend="onMoveEnd"
    ref="tabPanelsRef"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, VNode, onMounted, onUpdated, watch, onUnmounted } from "vue";
import { Active } from '.';

function debounce(callback: any, ms = 50) {
  let timeout: any = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      callback();
    }, ms);
  };
}

export interface TabPanels {
  state: TabPanelsState;
  activateTab: (tab: Active) => void;
}

interface Position {
  x: number;
  y: number;
}

interface TabPanelOption {
  value: string | number | null;
  left: number;
}

interface TabPanelsState {
  startPosition: Position;
  start: boolean;
  tabPanelsRef: Element | null;
  tabPanelOptions: TabPanelOption[];
}

export default defineComponent({
  name: "TabPanels",
  props: {
    modelValue: {
      default: null,
      type: [String, Number]
    },
    animate: {
      default: false,
      type: Boolean
    },
    swipeable: {
      default: false,
      type: Boolean
    },
    threshold: {
      default: 50,
      type: Number
    },
    responsive: {
      default: true,
      type: Boolean
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const state: TabPanelsState = reactive({
      tabPanelsRef: null,
      start: false,
      startPosition: {
        x: 0,
        y: 0
      },
      tabPanelOptions: []
    });
    onMounted(() => {
      getTabPanelOptions();
      scrollToModelValue(props.modelValue);
      if(props.responsive) {
        window.addEventListener("resize", onWidthChange);
      }
    });
    onUnmounted(() => {
      if(props.responsive) {
        window.removeEventListener("resize", onWidthChange);
      }
    });
    onUpdated(() => {
      getTabPanelOptions();
      scrollToModelValue(props.modelValue);
    });
    watch(() => props.modelValue, (modelValue) => {
      scrollToModelValue(modelValue);
    }, { immediate: true });
    const onWidthChange = debounce(() => {
      getTabPanelOptions();
      scrollToModelValue(props.modelValue, false);
    }, 10);
    function scrollToModelValue(modelValue: string | number | null, animate = true) {
      const option = state.tabPanelOptions.find(option => option.value === modelValue);
      if(option && state.tabPanelsRef) {
        state.tabPanelsRef.scrollTo({ left: option.left, behavior: props.animate && animate ? 'smooth' : undefined });
      }
    }
    function getTabPanelOptions() {
      if(slots.default && state.tabPanelsRef) {
        let vnodes: VNode[] = [];
        const children = slots.default() || [];
        if((children[0]?.type as any)?.name === 'TabPanel') {
          vnodes = children;
        } else {
          vnodes = children[0].children as VNode[];
        }
        const size = state.tabPanelsRef?.getBoundingClientRect();
        const width = size?.width || 0;
        state.tabPanelOptions = vnodes.map((vnode, i) => {
          return {
            left: width * i,
            value: vnode.props != undefined ? vnode.props.val : undefined
          };
        });
      }
    }
    function activateTab(tab: Active) {
      emit('update:modelValue', tab);
    }
    function getPosition(event: MouseEvent | TouchEvent): Position | undefined {
      if(event.type.includes('touch')) {
        const touch = (event as TouchEvent).changedTouches[0];
        return touch ? {
          x: touch.clientX,
          y: touch.clientY
        } : undefined;
      } else if(event.type.includes('mouse')) {
        return {
          x: (event as MouseEvent).clientX,
          y: (event as MouseEvent).clientY,
        };
      } else {
        return undefined;
      }
    }
    function onMoveStart(event: MouseEvent | TouchEvent) {
      if(props.swipeable) {
        state.start = true;
        const position = getPosition(event);
        if(!position) return;
        state.startPosition.x = position.x;
        state.startPosition.y = position.y;
      }
    }
    function onMoveEnd(event: MouseEvent | TouchEvent) {
      if(state.start) {
        state.start = false;
        const position = getPosition(event);
        if(!position) return;
        const selectedIndex = state.tabPanelOptions.findIndex(option => option.value === props.modelValue);
        const dx = state.startPosition.x - position.x;
        if(dx < -props.threshold) {
          if(selectedIndex > 0) {
            const tabPanelOption = state.tabPanelOptions[selectedIndex - 1];
            activateTab(tabPanelOption.value);
          }
        } else if(dx > props.threshold) {
          if(selectedIndex < state.tabPanelOptions.length - 1 ) {
            const tabPanelOption = state.tabPanelOptions[selectedIndex + 1];
            activateTab(tabPanelOption.value);

          }
        }
      }
    }
    return {
      onMoveStart,
      onMoveEnd,
      ...toRefs(state)
    };
  }
});
</script>

<style scoped>
.tab-panels {
  white-space: nowrap;
  overflow: hidden;
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>