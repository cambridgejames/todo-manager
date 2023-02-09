import { createI18n } from "vue-i18n";
import enLocale from "@/i18n/en-us/index";
import zhLocale from "@/i18n/zh-cn/index";

const messages = {
  zh: zhLocale,
  cn: zhLocale,
  en: enLocale,
  us: enLocale
};

const localLang = navigator.language.split("-")[0];
const storageLang = window.localStorage.getItem("locale")?.split("\"")[1].split("\"")[0].toLocaleLowerCase() || "en";
const c = (storageLang.toLocaleLowerCase() !== "zh" && storageLang.toLocaleLowerCase() !== "en") ? "en" : storageLang;

const i18n = createI18n({
  globalInjection: true, // 全局生效$t
  locale: c || localLang || "en",
  messages,
  legacy: false
});

export default i18n;
