<template>
  <div ref="tmSplitPanel" id="split-panel-box" class="split-panel-box"
       :style="`--tm-split-direction: ${direction}; --tm-split-size:${size}; --tm-split-min-size: ${minSize}`">
    <div ref="firstPanel" :class="['split-panel-slot', 'first', direction === 'row' ? 'row' : 'col']">
      <slot name="first"></slot>
    </div>
    <div ref="splitBar" :class="['tm-split-bar', {'dragging': dragging}]"
         draggable="false" @dragstart.stop.prevent @mousedown.left.stop.prevent="onDragSplitBar"/>
    <div ref="secondPanel" :class="['split-panel-slot', 'second', direction === 'row' ? 'row' : 'col']">
      <slot name="second"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { onMouseDown } from "@/assets/ts/event/EventProcessor";
import { Point } from "@/assets/ts/interface/2d/Point";

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
const dragging = ref(false);

const tmSplitPanel = ref<HTMLElement>();
const firstPanel = ref<HTMLElement>();
const splitBar = ref<HTMLElement>();
const secondPanel = ref<HTMLElement>();

/**
 * 计算第二面板的实际大小
 *
 * @param sizeValue 当前大小
 * @param maxValue 整个split面板的大小
 * @return {number} 第二面板的实际大小
 */
const formatSize = (sizeValue: string, maxValue: number): number => {
  if (sizeValue.endsWith("px")) {
    return parseFloat(sizeValue.substring(0, sizeValue.length - 2));
  } else if (sizeValue.endsWith("%")) {
    return maxValue * parseFloat(sizeValue.substring(0, sizeValue.length - 1)) / 100;
  }
  const solution = parseFloat(sizeValue);
  return isNaN(solution) ? 0 : solution;
};

/**
 * 获取面板尺寸设置值的单位
 *
 * @param sizeValue 当前大小
 * @return {string} 单位
 */
const getUnit = (sizeValue: string): string => {
  return sizeValue.endsWith("px") ? "px" : (sizeValue.endsWith("%") ? "%" : "");
};

/**
 * 分离面板拖拽事件处理方法
 *
 * @param event 鼠标事件
 */
const onDragSplitBar = (event: MouseEvent): void => {
  const tmSplitPanelElement = tmSplitPanel.value;
  const firstPanelElement = firstPanel.value;
  const secondPanelElement = secondPanel.value;
  if (tmSplitPanelElement === undefined || firstPanelElement === undefined || secondPanelElement === undefined) {
    return;
  }
  const onDragFunc = (event: MouseEvent, startPoint: Point): void => {
    const unit = getUnit(size.value);
    if (direction.value === "row") {
      const minSizeNumber = formatSize(minSize.value, tmSplitPanelElement.offsetWidth);
      const maxSizeNumber = tmSplitPanelElement.offsetWidth - minSizeNumber;
      const currentSize = formatSize(size.value, tmSplitPanelElement.offsetWidth) - event.clientX + startPoint.x;
      let solutionSize = Math.max(Math.min(currentSize, maxSizeNumber), minSizeNumber);
      if (unit === "%") {
        solutionSize = solutionSize * 100 / tmSplitPanelElement.offsetWidth;
      }
      size.value = `${solutionSize}${unit}`;
      startPoint.x = event.clientX;
    } else {
      const minSizeNumber = formatSize(minSize.value, tmSplitPanelElement.offsetHeight);
      const maxSizeNumber = tmSplitPanelElement.offsetHeight - minSizeNumber;
      const currentSize = formatSize(size.value, tmSplitPanelElement.offsetHeight) - event.clientY + startPoint.y;
      let solutionSize = Math.max(Math.min(currentSize, maxSizeNumber), minSizeNumber);
      if (unit === "%") {
        solutionSize = solutionSize * 100 / tmSplitPanelElement.offsetHeight;
      }
      size.value = `${solutionSize}${unit}`;
      startPoint.y = event.clientY;
    }
  };
  onMouseDown(event, () => { dragging.value = true; }, onDragFunc, null, () => { dragging.value = false; });
};
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
      border-left: 1px solid var(--tm-primary-hover);

      &:hover, &.dragging {
        border-color: var(--devui-primary);
      }

      &:after {
        content: " ";
        display: block;
        position: absolute;
        z-index: 200;
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
