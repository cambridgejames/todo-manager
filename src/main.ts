// Vue 相关配置
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// 国际化相关配置
import i18n from "@/i18n";

// DevUI相关配置
import DevUI from "vue-devui";
import "vue-devui/style.css";
import "@devui-design/icons/icomoon/devui-icon.css";
import { ThemeService, ThemeServiceInit } from "devui-theme";
import { allThemData, changeTheme } from "@/assets/ts/theme/ToolManagerTheme";

// 富文本编辑器
import CKEditor from "@ckeditor/ckeditor5-vue";

// 自定义全局样式
import "./assets/css/index.css";

// 插件加载器
import PluginManager from "@/assets/ts/plugin/PluginManager";

// 配置主题
const themeService: ThemeService | null = ThemeServiceInit(allThemData.themes, allThemData.defaultThemeId);
changeTheme(themeService, allThemData.themes[allThemData.defaultThemeId]);

PluginManager.instance();

const app = createApp(App);
app.provide("themeService", themeService).provide("allThemeData", allThemData);
app.use(i18n).use(DevUI).use(CKEditor).use(router).mount("#app");
