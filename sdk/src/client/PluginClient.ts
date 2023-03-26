export interface PluginClient {
  // Lifecycle
  onMount: () => void;
  beforeRun: () => void;
  afterRun: () => void;
  onUnmount: () => void;
}
