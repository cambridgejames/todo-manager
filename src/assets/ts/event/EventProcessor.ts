import { Point } from "@/assets/ts/interface/2d/Point";

/**
 * 判定鼠标拖拽的移动距离最小值（单位：像素）
 */
const MOUSE_DRAG_MIN_X = 0;
const MOUSE_DRAG_MIN_Y = 0;

/**
 * 判定鼠标拖拽的间隔时间最小值（单位：毫秒）
 */
const MOUSE_DRAG_MIN_TIME = 70;

/**
 * 鼠标事件回调方法类型定义
 */
export declare type EventCallbackIntf = (event: MouseEvent, startPoint: Point) => void;
export declare type EventCallback = EventCallbackIntf | null;
export declare type ConfigCallbackIntf = () => void;
export declare type ConfigCallback = ConfigCallbackIntf | null;

interface StartPointMessage extends Point {
  time: number
}

/**
 * 判断鼠标是点击还是拖拽
 *
 * @param currentEvent 当前的鼠标事件
 * @param startPoint 鼠标按下时的坐标
 * @return 是(true) / 否(false)
 */
const isClickEvent = (currentEvent: MouseEvent, startPoint: StartPointMessage): boolean => {
  if (Math.abs(currentEvent.clientX - startPoint.x) < MOUSE_DRAG_MIN_X
    && Math.abs(currentEvent.clientY - startPoint.y) < MOUSE_DRAG_MIN_Y) {
    return true;
  }
  return new Date().getTime() - startPoint.time < MOUSE_DRAG_MIN_TIME;
};

/**
 * 鼠标按下事件监听方法
 *
 * @param event 鼠标按下事件
 * @param onInit 鼠标按下事件初始化方法
 * @param onDrag 鼠标拖拽回调方法
 * @param onClick 鼠标点击回调方法
 * @param onClear 鼠标按下事件清理方法
 */
export const onMouseDown = (event: MouseEvent, onInit: ConfigCallback, onDrag: EventCallback, onClick: EventCallback,
  onClear: ConfigCallback): void => {
  if (onInit !== null) {
    onInit();
  }
  const lastDragEndPoint: Point = { x: event.clientX, y: event.clientY };
  const mouseDownPoint = { ...lastDragEndPoint } as StartPointMessage;
  mouseDownPoint.time = new Date().getTime();

  /**
   * 鼠标移动事件监听方法
   *
   * @param subEvent 鼠标移动事件
   */
  const mouseDragFunc = (subEvent: Event): void => {
    if (!(subEvent instanceof MouseEvent) || onDrag === null) {
      return;
    }
    const mouseEvent = subEvent as MouseEvent;
    if (isClickEvent(mouseEvent, mouseDownPoint)) {
      return;
    }
    onDrag(mouseEvent, lastDragEndPoint);
  };

  /**
   * 鼠标抬起事件监听方法
   *
   * @param subEvent 鼠标抬起事件
   */
  const mouseUpFunc = (subEvent: Event): void => {
    try {
      if (!(subEvent instanceof MouseEvent) || onClick === null) {
        return;
      }
      const mouseEvent = subEvent as MouseEvent;
      if (!isClickEvent(mouseEvent, mouseDownPoint)) {
        return;
      }
      onClick(mouseEvent, mouseDownPoint);
    } finally {
      if (onClear !== null) {
        onClear();
      }
      window.removeEventListener("mousemove", mouseDragFunc);
      window.removeEventListener("mouseup", mouseUpFunc);
    }
  };

  window.addEventListener("mousemove", mouseDragFunc);
  window.addEventListener("mouseup", mouseUpFunc);
};
