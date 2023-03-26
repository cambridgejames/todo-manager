import { PluginClient } from "@todo-manager/plugin-sdk/lib/client/PluginClient";

export default class PluginHolder {
  private readonly instantPlugins: Array<PluginClient>;
  private readonly commandPlugins: Map<string, Array<PluginClient>>;

  public constructor() {
    this.instantPlugins = new Array<PluginClient>();
    this.commandPlugins = new Map<string, Array<PluginClient>>();
  }

  public addPlugin(pluginInstance: PluginClient, activationEvents: Array<string>): void {
    if (activationEvents.includes("*")) {
      this.instantPlugins.push(pluginInstance);
      return;
    }
    this.addCommandPlugin(pluginInstance, activationEvents);
  }

  private addCommandPlugin(pluginInstance: PluginClient, activationEvents: Array<string>): void {
    [...activationEvents].filter(activationEvent => activationEvent.startsWith("onCommand"))
      .forEach(activationEvent => {
        const cachedPlugins = this.commandPlugins.has(activationEvent)
          ? this.commandPlugins.get(activationEvent)!
          : new Array<PluginClient>();
        cachedPlugins.push(pluginInstance);
        this.commandPlugins.set(activationEvent, cachedPlugins);
      });
  }

  public getPlugins(activationEvent: string): Array<PluginClient> {
    if (activationEvent === "*") {
      return [...this.instantPlugins];
    }
    const cachedPlugins = this.commandPlugins.has(activationEvent)
      ? this.commandPlugins.get(activationEvent)!
      : new Array<PluginClient>();
    return [...cachedPlugins];
  }
}
