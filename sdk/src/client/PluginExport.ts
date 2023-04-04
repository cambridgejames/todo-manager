import { PluginClient } from "@/client/PluginClient";

export interface PluginExport {
  getInstance: () => PluginClient;
}
