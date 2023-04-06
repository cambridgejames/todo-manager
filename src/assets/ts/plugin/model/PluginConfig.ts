import { LanguageEnum } from "@todo-manager/plugin-sdk/lib/server/i18n";

export interface PluginConfig {
  /**
   * 插件名称
   */
  name: string;
  activationEvents: Array<string>;
  i18n: Map<LanguageEnum, string>;
}
