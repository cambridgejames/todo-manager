<template>
  <div id="settings-box" class="settings-box">
    settings<br/>
    <d-button variant="solid" size="md" @click="changeTheme">Solid Button</d-button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { ThemeService } from "devui-theme";
import { toolManagerLightTheme, toolManagerDarkTheme } from "@/assets/ts/theme/ToolManagerTheme";

const themeService: ThemeService | null | undefined = inject("themeService");
const changeTheme = (): void => {
  themeService?.applyTheme(themeService?.currentTheme === toolManagerLightTheme ? toolManagerDarkTheme : toolManagerLightTheme);
};
</script>

<style lang="scss">
.settings-box {
  width: 100%;
  height: 100%;
  padding: var(--tm-article-padding);
}
</style>
