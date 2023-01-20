<template>
  <div id="navigation-box" class="navigation-box">
    <d-button variant="solid" size="md" @click="changeTheme">Solid Button</d-button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { ThemeService } from "devui-theme";
import { toolManagerLightTheme, toolManagerDarkTheme } from "../assets/ts/theme/ToolManagerTheme";

const themeService: ThemeService | null | undefined = inject("themeService");
const changeTheme = (): void => {
  themeService?.applyTheme(themeService?.currentTheme === toolManagerLightTheme ? toolManagerDarkTheme : toolManagerLightTheme);
};

// return {
//   changeTheme
// };

</script>

<style lang="scss">
.navigation-box {
  width: 100%;
  height: 100%;
  background-color: var(--devui-global-bg);
}
</style>
