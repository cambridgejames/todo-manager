import { Component } from "vue";
import { NavigateTabItem } from "@/components/ui/navigationTab/ts/NavigateTabItem";

export interface NavigateTabItemEx extends NavigateTabItem {
  component: Component
}

export const topBtnList: Array<NavigateTabItemEx> = [
  { name: "sideBar.home", icon: "icon-homepage", url: "/", component: () => import("@/views/common/HomeView.vue") },
  { name: "sideBar.todo", icon: "icon-message", url: "/todo", component: () => import("@/views/common/TodoView.vue") },
  { name: "sideBar.day", icon: "icon-archived-item", url: "/day", component: () => import("@/views/common/DayView.vue") },
  { name: "sideBar.date", icon: "icon-date", url: "/date", component: () => import("@/views/common/DateView.vue") }
];

export const bottomBtnList: Array<NavigateTabItemEx> = [
  { name: "sideBar.settings", icon: "icon-setting", url: "/settings", component: () => import("@/views/common/SettingsView.vue") }
];

export const allBtnList: Array<NavigateTabItemEx> = [...topBtnList, ...bottomBtnList];
