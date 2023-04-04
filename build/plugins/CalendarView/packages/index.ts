import { PluginClient, PluginExport } from "@todo-manager/plugin-sdk/lib/client";

class CalendarViewPlugin implements PluginClient {
  onMount(): void {
    console.log("onMount");
  }

  beforeRun(): void {
    console.log("beforeRun");
  }

  afterRun(): void {
    console.log("afterRun");
  }

  onUnmount(): void {
    console.log("onUnmount");
  }
}

const INSTANCE = new CalendarViewPlugin();

const getInstance = (): PluginClient => {
  return INSTANCE;
};

export default {
  getInstance
} as PluginExport;
