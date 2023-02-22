<template>
  <div id="navigation-box" class="navigation-box">
    <d-layout class="navigation-box">
      <d-header data-tauri-drag-region class="navigation-header">
        <title-menu-content/>
      </d-header>
      <d-layout class="navigation-box navigation-document-content">
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
import NavigateTab from "@/components/ui/navigationTab/NavigateTab.vue";
import { topBtnList, bottomBtnList } from "@/assets/ts/config/Navigate";
import TitleMenuContent from "@/components/system/TitleMenuContent.vue";
</script>

<style scoped lang="scss">
@use "~@/assets/css/constants.scss";

.navigation-box {
  width: 100%;
  height: 100%;
  background-color: var(--devui-global-bg-normal);

  &.navigation-document-content {
    height: calc(100% - var(--tm-header-height));
    flex-grow: 0;
    flex-shrink: 0;
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
