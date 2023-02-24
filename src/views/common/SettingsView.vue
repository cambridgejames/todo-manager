<template>
  <div id="settings-box" class="settings-box">
    settings<br/><br/>
    <d-button variant="solid" size="md" @click="changeTheme">Solid Button</d-button><br/><br/>
    <d-button variant="solid" size="md" @click="changeLanguage">{{ locale }}</d-button>
  </div>
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { Theme, ThemeService } from "devui-theme";
import { toolManagerLightTheme, toolManagerDarkTheme } from "@/assets/ts/theme/ToolManagerTheme";
import { useI18n } from "vue-i18n";
import { setConfigure } from "@/assets/ts/config/SettingsUtil";
import { ipcRenderer } from "electron";
import { IpcRenderChannel } from "@/assets/ts/interface/ipc/IpcRenderChannel";

const themeService: ThemeService | null | undefined = inject("themeService");
const changeTheme = (): void => {
  const targetTheme: Theme = themeService?.currentTheme === toolManagerLightTheme ? toolManagerDarkTheme : toolManagerLightTheme;
  themeService?.applyTheme(targetTheme);
  ipcRenderer.invoke(IpcRenderChannel.CHANGE_THEME, targetTheme);
};

const { locale } = useI18n();
const changeLanguage = () => {
  locale.value = locale.value === "zh-cn" ? "en-us" : "zh-cn";
  setConfigure("$.common.lang", locale.value);
};
</script>

<style lang="scss" scoped>
.settings-box {
  width: 100%;
  height: 100%;
  padding: var(--tm-article-padding);
}
</style>
