<template>
  <div id="navigation-box" class="navigation-box">
    <d-layout class="navigation-box">
      <d-header data-tauri-drag-region v-if="showTitle && !isLinux" class="navigation-header">
        <title-menu-content/>
      </d-header>
      <d-layout :class="['navigation-box', 'navigation-document-content', { 'show-title': showTitle && !isLinux }]">
        <d-aside class="navigation-left-aside">
          <navigate-tab :top-btn="topBtnList" :bottom-btn="bottomBtnList"/>
        </d-aside>
        <d-content class="navigation-main-content">
          <router-view/>
        </d-content>
      </d-layout>
    </d-layout>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { ipcRenderer } from "electron";
import { IpcMainChannel } from "@todo-manager/plugin-sdk/lib/common";

import { topBtnList, bottomBtnList } from "@/assets/ts/config/Navigate";
import NavigateTab from "@/components/ui/navigationTab/NavigateTab.vue";
import TitleMenuContent from "@/components/system/TitleMenuContent.vue";

const showTitle = ref<boolean>(true);
const isLinux = process.platform === "linux";
const enterFillScreenFunc = () => { showTitle.value = false; };
const leaveFillScreenFunc = () => { showTitle.value = true; };

onMounted(() => {
  ipcRenderer.on(IpcMainChannel.ENTER_FULL_SCREEN, enterFillScreenFunc);
  ipcRenderer.on(IpcMainChannel.LEAVE_FULL_SCREEN, leaveFillScreenFunc);
});

onUnmounted(() => {
  ipcRenderer.removeListener(IpcMainChannel.ENTER_FULL_SCREEN, enterFillScreenFunc);
  ipcRenderer.removeListener(IpcMainChannel.LEAVE_FULL_SCREEN, leaveFillScreenFunc);
});
</script>

<style scoped lang="scss">
@use "~@/assets/css/constants.scss";

.navigation-box {
  width: 100%;
  height: 100%;
  background-color: var(--devui-global-bg-normal);

  &.navigation-document-content {
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;

    &.show-title {
      height: calc(100% - var(--tm-header-height));
    }
  }

  .navigation-header {
    flex-shrink: 0;
    flex-grow: 0;
    background-color: var(--devui-global-bg);
    border-bottom: 1px solid var(--devui-global-bg-normal);

    &.devui-layout__header {
      min-height: 0;
    }
  }

  .navigation-left-aside {
    width: constants.$main-asside-width;
    height: 100%;
  }

  .navigation-main-content {
    width: calc(100% - #{constants.$main-asside-width});
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
  }
}
</style>
