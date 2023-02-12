import { createI18n } from "vue-i18n";

import { getConfigure } from "@/assets/ts/config/SettingsUtil";

import enLocale from "@/i18n/en-us/index";
import zhLocale from "@/i18n/zh-cn/index";

const messages = {
  "zh-cn": zhLocale,
  "en-us": enLocale
};

const lang = getConfigure("$.common.lang");

const i18n = createI18n({
  globalInjection: true, // 全局生效$t
  locale: lang === undefined ? "zh-cn" : lang,
  messages,
  legacy: false
});

export default i18n;
