/**
 * IPC通讯中由渲染进程发起的事件名称枚举
 */
export enum IpcMainChannel{
  ENTER_FULL_SCREEN = "enterFullScreen",
  LEAVE_FULL_SCREEN = "leaveFullScreen",
  TIMER_SECOND = "secondlyTimer",
  TIMER_DAY = "dailyTimer"
}
