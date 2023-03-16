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
             :class="['day-box', {
               'today': itemCol.isToday,
               'active': itemCol.month === tableContent.activeMonth,
               'current': itemCol.month === (new Date().getMonth() + 1)
             }]">
          <div class="day-row">{{ itemCol.date }}</div>
          <div class="day-row" v-if="locale === 'zh-cn'">{{ getLunarStr(itemCol.lunar) }}</div>
          <div class="todo-number">{{ `${$t("dateView.todo")}0` }}</div>
          <div v-if="itemCol.month === tableContent.activeMonth" class="day-row sign">
            <div v-if="[1, 2, 3, 4, 5].includes(itemCol.day)" class="working-day">{{ $t("dateView.sign.workingDay") }}</div>
            <div v-else-if="[0, 6].includes(itemCol.day)" class="holiday">{{ $t("dateView.sign.holiday") }}</div>
          </div>
          <div class="day-row holiday-name" v-if="locale === 'zh-cn'"></div>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { ipcRenderer, IpcRendererEvent } from "electron";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { IpcMainChannel } from "@/assets/ts/interface/ipc/IpcMainChannel";
import {
  getActiveMonthDate,
  initTableContent, refreshToday,
  wheelDown,
  wheelUp
} from "@/components/ui/dateTableView/src/TableContentManager";
import { DateViewData, Lunar } from "./type";

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

const { locale } = useI18n();
const getLunarStr = (lunar: Lunar): string => {
  if (locale.value !== "zh-cn") {
    return "";
  }
  if (lunar.solarTerm !== null) {
    return lunar.solarTerm;
  }
  const monthLength = lunar.isLeap ? 3 : 2;
  const str = lunar.lunarDate === 1 ? lunar.dateStr.substring(0, monthLength) : lunar.dateStr.substring(monthLength);
  return lunar.lunarDate >= 30 ? str.replace("廿", "卅") : str;
};

const dateConsumer = (event: IpcRendererEvent, timestamp: number): void => {
  refreshToday(tableContent.value, new Date(timestamp));
};

onMounted(() => {
  ipcRenderer.on(IpcMainChannel.TIMER_DAY, dateConsumer);
});

onUnmounted(() => {
  ipcRenderer.removeListener(IpcMainChannel.TIMER_DAY, dateConsumer);
});
</script>

<style lang="scss" scoped>
$title-box-height: 30px;
$date-item-padding: 5px;
$date-item-content-line-height: 20px;
$holiday-sign-size: 14px;

$table-row-number: 6;
$table-col-number: 7;

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
      height: calc((100% - var(--tm-article-padding) * calc($table-row-number - 1)) / $table-row-number);
      margin-bottom: var(--tm-article-padding);
      display: grid;
      grid-template-columns: repeat($table-col-number, 1fr);
      grid-gap: var(--tm-article-padding);

      &:last-child {
        margin-bottom: 0;
      }

      .day-box {
        padding: $date-item-padding;
        border-radius: $date-item-padding;
        position: relative;
        cursor: pointer;
        transition: all .3s ease-in-out;
        color: var(--devui-disabled-text);

        &:hover {
          color: var(--devui-text);
          background-color: var(--devui-global-bg);
        }

        .day-row {
          height: $date-item-content-line-height;
        }

        .todo-number {
          position: absolute;
          left: $date-item-padding;
          bottom: $date-item-padding;
          font-size: 12px;
        }

        .sign {
          position: absolute;
          right: $date-item-padding;
          top: $date-item-padding;
          font-size: 12px;
          width: $holiday-sign-size;

          .working-day, .holiday {
            position: absolute;
            right: 0;
            top: calc(($date-item-content-line-height - $holiday-sign-size) / 2);
            width: $holiday-sign-size;
            height: $holiday-sign-size;
            border-radius: $holiday-sign-size;
            line-height: $holiday-sign-size;
            text-align: center;
            color: var(--devui-icon-fill-active);
          }

          .working-day {
            background-color: var(--devui-danger);
          }

          .holiday {
            background-color: var(--devui-success);
          }
        }

        .holiday-name {
          position: absolute;
          top: calc($date-item-padding + $date-item-content-line-height);
          right: $date-item-padding;
        }

        &.active {
          color: var(--devui-text);
          background-color: var(--devui-global-bg);

          &.today {
            border: 1px solid var(--devui-primary);

            &.current {
              background-color: var(--devui-primary);
              color: var(--devui-icon-fill-active);
            }
          }

          &.solar:not(.current) {
            background-image: none;
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
