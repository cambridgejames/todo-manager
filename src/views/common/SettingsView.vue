<template>
  <div id="settings-box" class="settings-box">
    settings<br/><br/>
    <d-button variant="solid" size="md" @click="changeTheme">Solid Button</d-button><br/><br/>
    <d-button variant="solid" size="md" @click="changeLanguage">{{ locale }}</d-button>
  </div>
</template>

<script lang="ts" setup>
import { inject, reactive } from "vue";
import { ThemeService } from "devui-theme";
import { toolManagerLightTheme, toolManagerDarkTheme } from "@/assets/ts/theme/ToolManagerTheme";
import { useI18n } from "vue-i18n";

const themeService: ThemeService | null | undefined = inject("themeService");
const changeTheme = (): void => {
  themeService?.applyTheme(themeService?.currentTheme === toolManagerLightTheme ? toolManagerDarkTheme : toolManagerLightTheme);
};

const { locale } = useI18n();
const state = reactive({
  curLanguage: "zh-cn"
});
const changeLanguage = () => {
  state.curLanguage = state.curLanguage === "zh-cn" ? "en-us" : "zh-cn";
  locale.value = state.curLanguage;
};
</script>

<style lang="scss">
.settings-box {
  width: 100%;
  height: 100%;
  padding: var(--tm-article-padding);
}
</style>
