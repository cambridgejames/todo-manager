<template>
  <div class="date-table-view-box">
    <div class="date-table-view-title-box">
      <div v-for="(item, index) in titleContent" class="title-box" :key="index">
        {{ $t(`common.day.${item}`) }}
      </div>
    </div>
    <transition-group ref="dateTableViewRef" :class="['date-table-view-main-box', { 'wheel-up': isWheelUp }]"
                      name="slide" tag="div" @wheel.prevent.stop="onWheel">
      <div v-for="itemRow in tableContent.dateContent" class="day-box-row" :key="`${itemRow.rowNumber}`">
        <div v-for="itemCol in itemRow.rowContent" class="day-box" :key="`${itemRow.rowNumber}-${itemCol.colNumber}`">
          {{ itemCol.date.date }}
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { DateViewData } from "./type";
import { initTableContent, wheelDown, wheelUp } from "@/components/ui/dateTableView/src/TableContentManager";

const titleContent = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const tableContent = ref<DateViewData>(initTableContent());
const isWheelUp = ref<boolean>(false);

const onWheel = (event: WheelEvent): void => {
  const tableContentValue = tableContent.value;
  isWheelUp.value = event.deltaY > 0;
  event.deltaY > 0 ? wheelUp(tableContentValue) : wheelDown(tableContentValue);
};
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
        background-color: var(--devui-global-bg);
        text-align: right;
        cursor: pointer;
        transition: background-color .2s ease-in-out;

        &:hover {
          background-color: var(--tm-primary-hover);
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
