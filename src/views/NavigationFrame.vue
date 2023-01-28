<template>
  <div id="navigation-box" class="navigation-box">
    <d-layout class="navigation-box">
      <d-aside class="navigation-left-aside">
        <navigate-tab :top-btn="topBtnList" :bottom-btn="bottomBtnList"/>
      </d-aside>
      <d-content class="navigation-main-content">
        <d-splitter class="splitter-border" orientation="horizontal" splitBarSize="2px">
          <template v-slot:DSplitterPane>
            <d-splitter-pane minSize="400px" class="pane-content">
              <d-button variant="solid" size="md" @click="changeTheme">Solid Button</d-button>
              <router-view/>
            </d-splitter-pane>
            <d-splitter-pane collapseDirection="before" size="300px" minSize="50px" collapsible></d-splitter-pane>
          </template>
        </d-splitter>
      </d-content>
    </d-layout>
  </div>
</template>

<script lang="ts" setup>
import NavigateTab from "@/components/navigationTab/NavigateTab.vue";
import { NavigateTabItem } from "@/components/navigationTab/ts/NavigateTabItem";

import { inject } from "vue";
import { ThemeService } from "devui-theme";
import { toolManagerLightTheme, toolManagerDarkTheme } from "@/assets/ts/theme/ToolManagerTheme";

const topBtnList: Array<NavigateTabItem> = [
  { name: "Home", icon: "icon-homepage", url: "/" }
];
const bottomBtnList: Array<NavigateTabItem> = [
  { name: "User", icon: "icon-mine", url: "/user" },
  { name: "Settings", icon: "icon-setting", url: "/settings" }
];

const themeService: ThemeService | null | undefined = inject("themeService");
const changeTheme = (): void => {
  themeService?.applyTheme(themeService?.currentTheme === toolManagerLightTheme ? toolManagerDarkTheme : toolManagerLightTheme);
};

</script>

<style scoped lang="scss">
@use "~@/assets/css/constants";

.navigation-box {
  width: 100%;
  height: 100%;
  background-color: var(--devui-global-bg);

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
