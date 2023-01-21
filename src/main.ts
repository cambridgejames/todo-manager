// Vue 相关配置
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// DevUI相关配置
import DevUI from "vue-devui";
import "vue-devui/style.css";
import "@devui-design/icons/icomoon/devui-icon.css";
import { ThemeService, ThemeServiceInit } from "devui-theme";
import { toolManagerLightTheme, toolManagerDarkTheme } from "@/assets/ts/theme/ToolManagerTheme";

// 自定义全局样式
import "./assets/css/index.css";

// 配置主题
const themeService: ThemeService | null = ThemeServiceInit({
  ToolManagerLightTheme: toolManagerLightTheme,
  ToolManagerDarkTheme: toolManagerDarkTheme
}, "ToolManagerLightTheme");
themeService?.applyTheme(toolManagerDarkTheme);

const app = createApp(App);
app.provide("themeService", themeService);
app.use(DevUI).use(router).mount("#app");
