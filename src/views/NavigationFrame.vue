<template>
  <div id="navigation-box" class="navigation-box">
    <d-layout class="navigation-box">
      <d-header data-tauri-drag-region class="navigation-header">
        <title-menu-content data-tauri-drag-region/>
      </d-header>
      <d-layout class="navigation-box">
        <d-aside class="navigation-left-aside">
          <navigate-tab :top-btn="topBtnList" :bottom-btn="bottomBtnList"/>
        </d-aside>
        <d-content class="navigation-main-content">
          <tm-split-panel direction="row">
            <template #first>
              <router-view/>
            </template>
            <template #second>
            </template>
          </tm-split-panel>
        </d-content>
      </d-layout>
    </d-layout>
  </div>
</template>

<script lang="ts" setup>
import NavigateTab from "@/components/navigationTab/NavigateTab.vue";
import TmSplitPanel from "@/components/tmSplitPanel/TmSplitPanel.vue";

import { topBtnList, bottomBtnList } from "@/assets/ts/config/Navigate";
import TitleMenuContent from "@/components/system/TitleMenuContent.vue";
</script>

<style scoped lang="scss">
@use "~@/assets/css/constants.scss";

.navigation-box {
  width: 100%;
  height: 100%;
  background-color: var(--devui-global-bg-normal);

  .navigation-header {
    height: var(--tm-header-height);
    min-height: var(--tm-header-height);
    flex-shrink: 0;
    flex-grow: 0;
    background-color: var(--devui-global-bg);
    border-bottom: 1px solid var(--devui-global-bg-normal);
  }

  .navigation-left-aside {
    width: constants.$main-asside-width;
    height: 100%;
  }

  .navigation-main-content {
    height: 100%;
  }
}
</style>
