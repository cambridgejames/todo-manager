<template>
  <div id="date-box" class="date-box">
    <div class="date-function-container">
      <div class="date-function-title">
        <span class="date-gregorian-calendar">{{ currentTime }}</span>
        <span class="date-lunar-calendar">{{ currentDate }}</span>
      </div>
      <d-date-picker-pro class="date-function-selector" v-model="selectedMonth" type="month" />
    </div>
    <div class="date-table-view-container">
      <DateTableView/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, onUnmounted, ref } from "vue";
import DateTableView from "@/components/ui/dateTableView";
import { ipcRenderer, IpcRendererEvent } from "electron";
import { IpcMainChannel } from "@/assets/ts/interface/ipc/IpcMainChannel";
import { formatTime } from "@/assets/ts/utils/TimeFormatUtil";
import { getLunar } from "chinese-lunar-calendar";
import { number } from "@intlify/core-base";

const vueApp = getCurrentInstance()?.appContext.config.globalProperties;

const currentTime = ref<string>("");
const currentDate = ref<string>("");
const selectedMonth = ref<string>("");

const titleContent = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const refreshTime = (date: Date): void => { currentTime.value = formatTime("HH:mm:ss", date); };
const refreshDate = (date: Date): void => {
  const lunar = getLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
  currentDate.value = String(vueApp?.$t("dateView.dateTemplate", {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: vueApp?.$t(`common.day.${titleContent[date.getDay() === 7 ? 0 : date.getDay()]}`),
    lunar: `${lunar.lunarYear}${lunar.dateStr}`
  }));
};

const timerConsumer = (event: IpcRendererEvent, timestamp: number): void => {
  const date: Date = new Date(timestamp);
  refreshTime(date);
};

const dateConsumer = (event: IpcRendererEvent, timestamp: number): void => {
  const date: Date = new Date(timestamp);
  refreshDate(date);
};

onMounted(() => {
  const date: Date = new Date();
  refreshTime(date);
  refreshDate(date);
  ipcRenderer.on(IpcMainChannel.TIMER_SECOND, timerConsumer);
  ipcRenderer.on(IpcMainChannel.TIMER_DAY, dateConsumer);
});

onUnmounted(() => {
  ipcRenderer.removeListener(IpcMainChannel.TIMER_SECOND, timerConsumer);
  ipcRenderer.removeListener(IpcMainChannel.TIMER_DAY, dateConsumer);
});
</script>

<style lang="scss" scoped>
$function-container-height: 32px;
$function-container-width: 300px;

.date-box {
  width: 100%;
  height: 100%;
  display: flex;
  padding: var(--tm-article-padding);
  flex-direction: column;
  justify-content: space-between;
  user-select: none;

  .date-function-container, .date-table-view-container {
    flex-shrink: 0;
    flex-grow: 0;
  }

  .date-function-container {
    height: $function-container-height;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .date-function-title {
      width: calc(100% - $function-container-width - 10px);
      flex-grow: 0;
      display: flex;
      overflow: hidden;
      flex-direction: row;
      align-items: flex-end;
      vertical-align: bottom;

      .date-gregorian-calendar {
        width: 140px;
        font-size: 32px;
        line-height: $function-container-height;
        flex-grow: 0;
        flex-shrink: 0;
      }

      .date-lunar-calendar {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .date-function-selector {
      width: $function-container-width;
      flex-grow: 0;
      flex-shrink: 0;
    }
  }

  .date-table-view-container {
    height: calc(100% - $function-container-height - var(--tm-article-padding));
  }
}
</style>
