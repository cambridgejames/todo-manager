import { PluginClient } from "@todo-manager/plugin-sdk/lib/client/PluginClient";

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
};
