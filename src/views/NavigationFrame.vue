<template>
  <div id="navigation-box" class="navigation-box">
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
            <d-button variant="solid" size="md" @click="changeTheme">Solid Button</d-button>
          </template>
        </tm-split-panel>
      </d-content>
    </d-layout>
  </div>
</template>

<script lang="ts" setup>
import NavigateTab from "@/components/navigationTab/NavigateTab.vue";
import TmSplitPanel from "@/components/tmSplitPanel/TmSplitPanel.vue";

import { inject } from "vue";
import { ThemeService } from "devui-theme";
import { toolManagerLightTheme, toolManagerDarkTheme } from "@/assets/ts/theme/ToolManagerTheme";
import { topBtnList, bottomBtnList } from "@/assets/ts/config/Navigate";

const themeService: ThemeService | null | undefined = inject("themeService");
const changeTheme = (): void => {
  themeService?.applyTheme(themeService?.currentTheme === toolManagerLightTheme ? toolManagerDarkTheme : toolManagerLightTheme);
};

</script>

<style scoped lang="scss">
@use "~@/assets/css/constants.scss";

.navigation-box {
  width: 100%;
  height: 100%;
  background-color: var(--devui-global-bg-normal);

  .navigation-left-aside {
    width: constants.$main-asside-width;
    height: 100%;
  }

  .navigation-main-content {
    height: 100%;
  }
}
</style>
