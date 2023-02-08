<template>
  <div id="navigation-box" class="navigation-box">
    <d-layout class="navigation-box">
      <d-aside class="navigation-left-aside">
        <navigate-tab :top-btn="topBtnList" :bottom-btn="bottomBtnList"/>
      </d-aside>
      <d-content class="navigation-main-content">
<!--        <d-splitter class="splitter-border" orientation="horizontal" splitBarSize="2px">
          <template v-slot:DSplitterPane>
            <d-splitter-pane minSize="400px" class="pane-content">
              <router-view/>
            </d-splitter-pane>
            <d-splitter-pane collapseDirection="before" size="300px" minSize="50px" collapsible>
              <d-button variant="solid" size="md" @click="changeTheme">Solid Button</d-button>
            </d-splitter-pane>
          </template>
        </d-splitter>-->
        <tm-split-panel direction="column"></tm-split-panel>
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

    .pane-content {
      height: 100%;
    }

    .splitter-border {
      height: 100%;
    }
  }
}
</style>
