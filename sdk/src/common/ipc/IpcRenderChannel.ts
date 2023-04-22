/**
 * IPC通讯中由渲染进程发起的事件名称枚举
 */
export enum IpcRenderChannel{
  CHANGE_THEME = "changeTheme",
  PLUGIN_CHANEL_PREFIX = "pluginEvent"
}

export const getPluginChanel = (chanelName: string): string => {
  return IpcRenderChannel.PLUGIN_CHANEL_PREFIX + chanelName;
}
