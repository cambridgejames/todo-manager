import { NavigateTabItem } from "./NavigateTabItem";
import { useRouter, Router } from "vue-router";

export interface NavigateTabItemEx extends NavigateTabItem {
  enable: boolean
}

/**
 * 将侧边栏配置初始化成用于显示的模型
 *
 * @param tabItem 侧边栏配置
 * @returns 展示模型
 */
export const initTabItem = (tabItem: NavigateTabItem): NavigateTabItemEx => {
  const solution = { ...tabItem } as NavigateTabItemEx;
  solution.enable = false;
  return solution;
};

/**
 * 根据当前Url计算侧边栏按钮的激活状态
 *
 * @param tabItem 侧边栏按钮
 * @param router 路由器
 * @returns 是否激活
 */
export const isEnable = (tabItem: NavigateTabItemEx, router: Router): boolean => {
  const currentPath = router.currentRoute.value.path;
  return tabItem.url?.length > 0 && currentPath === tabItem.url;
};
