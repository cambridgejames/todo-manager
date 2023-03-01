<template>
  <div id="date-box" class="date-box">
    <div class="date-function-container">
      <div class="date-function-title">
        <span class="date-gregorian-calendar">{{ currentTime }}</span>
        <span class="date-lunar-calendar">{{ "2023年03月01日 星期三 癸卯年二月初十" }}</span>
      </div>
      <d-date-picker-pro class="date-function-selector" v-model="selectedMonth" type="month" />
    </div>
    <div class="date-table-view-container">
      <DateTableView/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import DateTableView from "@/components/ui/dateTableView";
import { ipcRenderer, IpcRendererEvent } from "electron";
import { IpcMainChannel } from "@/assets/ts/interface/ipc/IpcMainChannel";
import { formatTime } from "@/assets/ts/utils/TimeFormatUtil";

const currentTime = ref<string>("");
const selectedMonth = ref<string>("");

const refreshTime = (timestamp: number): void => { currentTime.value = formatTime("HH:MM:ss", new Date(timestamp)); };

const timerConsumer = (event: IpcRendererEvent, timestamp: number): void => {
  refreshTime(timestamp);
};

onMounted(() => {
  refreshTime(Date.now());
  ipcRenderer.on(IpcMainChannel.TIMER_SECOND, timerConsumer);
});

onUnmounted(() => {
  ipcRenderer.removeListener(IpcMainChannel.TIMER_SECOND, timerConsumer);
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
