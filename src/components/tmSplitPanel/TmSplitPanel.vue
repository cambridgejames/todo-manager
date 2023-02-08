<template>
  <div ref="tmSplitPanel" id="split-panel-box" class="split-panel-box"
       :style="`--tm-split-direction: ${direction}; --tm-split-size:${size}; --tm-split-min-size: ${minSize}`">
    <div ref="firstPanel" :class="['split-panel-slot', 'first', direction === 'row' ? 'row' : 'col']">
      <slot name="first"></slot>
    </div>
    <div ref="splitBar" class="tm-split-bar" draggable="false" @dragstart.stop @mousedown.left.stop="onDragSplitBar"/>
    <div ref="secondPanel" :class="['split-panel-slot', 'second', direction === 'row' ? 'row' : 'col']">
      <slot name="second"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  size: {
    type: String,
    require: false,
    default: "50%"
  },
  minSize: {
    type: String,
    require: false,
    default: "100px"
  },
  direction: {
    type: String,
    require: false,
    default: "row"
  }
});

const size = ref(props.size);
const minSize = ref(props.minSize);
const direction = ref(props.direction === "row" ? "row" : "column");
</script>

<style lang="scss" scoped>
$tm-split-size-var: var(--tm-split-size, 50%);
$tm-split-min-size-var: var(--tm-split-min-size, 100px);
$tm-split-direction-var: var(--tm-split-direction, row);

.split-panel-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: $tm-split-direction-var;

  .split-panel-slot {
    &.first + .tm-split-bar {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-grow: 0;
      flex-shrink: 0;
      border: 1px solid var(--devui-global-bg);

      &:hover {
        border-color: var(--devui-primary);
      }

      &:after {
        content: " ";
        display: block;
        position: absolute;
      }
    }

    &.second {
      flex-grow: 0;
      flex-shrink: 0;
    }

    &.row {
      &.first {
        width: calc(100% - #{$tm-split-size-var});
        height: 100%;
        min-width: $tm-split-min-size-var;

        & + .tm-split-bar {
          width: 0;
          height: 100%;

          &:after {
            width: var(--tm-article-padding);
            height: 100%;
            cursor: ew-resize;
          }
        }
      }

      &.second {
        width: $tm-split-size-var;
        height: 100%;
        min-width: $tm-split-min-size-var;
      }
    }

    &.col {
      &.first {
        width: 100%;
        height: 100%;
        min-height: $tm-split-min-size-var;

        & + .tm-split-bar {
          width: 100%;
          height: 0;

          &:after {
            width: 100%;
            height: var(--tm-article-padding);
            cursor: ns-resize;
          }
        }
      }

      &.second {
        width: 100%;
        height: $tm-split-size-var;
        min-height: $tm-split-min-size-var;
      }
    }
  }
}
</style>
