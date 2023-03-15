<template>
  <div class="date-table-view-box">
    <div class="date-table-view-title-box">
      <div v-for="(item, index) in titleContent" class="title-box" :key="index">
        {{ $t(`common.day.${item}`) }}
      </div>
    </div>
    <transition-group ref="dateTableViewRef" :class="['date-table-view-main-box', { 'wheel-up': isWheelUp }]"
                      name="slide" tag="div" @wheel.prevent.stop="onWheel">
      <div v-for="itemRow in tableContent.dateContent" :key="`${itemRow.rowNumber}`" class="day-box-row">
        <div v-for="(itemCol, index) in itemRow.rowContent" :key="`${itemRow.rowNumber}-${index}`"
             :class="['day-box', { 'today': itemCol.isToday, 'active': itemCol.month === tableContent.activeMonth }]">
          <span>{{ `${itemCol.date}` }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { DateViewData } from "./type";
import {
  getActiveMonthDate,
  initTableContent,
  wheelDown,
  wheelUp
} from "@/components/ui/dateTableView/src/TableContentManager";

const props = defineProps({
  modelValue: {
    type: Date,
    default: new Date()
  }
});
const emit = defineEmits(["update:modelValue"]);

const titleContent = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const tableContent = ref<DateViewData>(initTableContent(new Date(), props.modelValue));
const isWheelUp = ref<boolean>(false);
let isWheeling: boolean = false;
let timeout: number = -1;

const onWheel = (event: WheelEvent): void => {
  isWheeling = true;
  const tableContentValue = tableContent.value;
  isWheelUp.value = event.deltaY > 0;
  const monthBefore = tableContentValue.activeMonth;
  isWheelUp.value ? wheelUp(tableContentValue) : wheelDown(tableContentValue);
  if (tableContentValue.activeMonth !== monthBefore) {
    emit("update:modelValue", getActiveMonthDate(tableContentValue));
  }
  if (timeout > 0) {
    window.clearTimeout(timeout);
  }
  timeout = window.setTimeout(() => { isWheeling = false; }, 500);
};

watch(() => props.modelValue, value => {
  if (!isWheeling) {
    tableContent.value = initTableContent(new Date(), value);
  }
}, { immediate: true, deep: true });
</script>

<style lang="scss" scoped>
$title-box-height: 30px;

.date-table-view-box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .date-table-view-title-box, .date-table-view-main-box {
    flex-shrink: 0;
    flex-grow: 0;
  }

  .date-table-view-title-box {
    height: $title-box-height;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: var(--tm-article-padding);

    .title-box {
      border-radius: calc(var(--tm-article-padding) / 2);
      background-color: var(--devui-global-bg);
      line-height: $title-box-height;
      text-align: center;
    }
  }

  .date-table-view-main-box {
    height: calc(100% - $title-box-height - var(--tm-article-padding));
    overflow: hidden;

    .day-box-row {
      width: 100%;
      height: calc((100% - var(--tm-article-padding) * 4) / 5);
      margin-bottom: var(--tm-article-padding);
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-gap: var(--tm-article-padding);

      &:last-child {
        margin-bottom: 0;
      }

      .day-box {
        padding: 5px;
        border-radius: calc(var(--tm-article-padding) / 2);
        cursor: pointer;
        transition: all .3s ease-in-out;

        color: var(--devui-disabled-text);

        &:hover {
          color: var(--devui-text);
          background-color: var(--devui-global-bg);
        }

        &.active {
          color: var(--devui-text);
          background-color: var(--devui-global-bg);

          &.today {
            border: 1px solid var(--devui-primary);
          }

          &:hover {
            background-color: var(--tm-primary-hover);
          }
        }
      }
    }
  }
}

.slide-enter-active {
  transition: all .3s ease-in-out;
}

.slide-enter-from {
  transform: translateY(6px);
}

.wheel-up {
  .slide-enter-from {
    transform: translateY(-6px);
  }
}
</style>
