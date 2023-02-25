<template>
  <div id="settings-box" class="settings-box">
    settings

    <br/><br/>

    <d-radio-group v-model="currentTheme" direction="row" @change="localChangeTheme">
      <d-radio v-for="(item, index) in validThemes" :key="index" :value="item">{{ allThemeData?.themes[item].name }}</d-radio>
    </d-radio-group>

    <br/><br/>

    <d-button variant="solid" size="md" @click="changeLanguage">{{ locale }}</d-button>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { setConfigure } from "@/assets/ts/config/SettingsUtil";

import { inject, ref } from "vue";
import { ThemeService } from "devui-theme";

import { changeTheme } from "@/assets/ts/theme/ToolManagerTheme";
import { AllThemeData } from "@/assets/ts/interface/theme/ThemeData";

const themeService: ThemeService | null | undefined = inject("themeService");
const allThemeData: AllThemeData | null | undefined = inject("allThemeData");
const validThemes: Array<string> = allThemeData ? Object.keys(allThemeData.themes) : [];
const currentTheme = ref(allThemeData?.defaultThemeId);
const localChangeTheme = (themeId: string) => changeTheme(themeService, allThemeData?.themes[themeId]);

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
