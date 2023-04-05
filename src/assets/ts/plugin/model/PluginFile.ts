import { PluginConfig } from "@/assets/ts/plugin/model/PluginConfig";

export interface PluginFile {
  entrance: string;
  config: PluginConfig;
  i18n: Map<string, Array<string>>;
}
