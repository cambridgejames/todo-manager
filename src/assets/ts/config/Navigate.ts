import { Component } from "vue";
import { NavigateTabItem } from "@/components/navigationTab/ts/NavigateTabItem";

export interface NavigateTabItemEx extends NavigateTabItem {
  component: Component
}

export const topBtnList: Array<NavigateTabItemEx> = [
  { name: "Home", icon: "icon-homepage", url: "/", component: () => import("@/views/common/HomeView.vue") },
  { name: "Date", icon: "icon-date", url: "/date", component: () => import("@/views/common/DateView.vue") }
];

export const bottomBtnList: Array<NavigateTabItemEx> = [
  { name: "User", icon: "icon-mine", url: "/user", component: () => import("@/views/common/UserView.vue") },
  { name: "Settings", icon: "icon-setting", url: "/settings", component: () => import("@/views/common/SettingsView.vue") }
];

export const allBtnList: Array<NavigateTabItemEx> = [...topBtnList, ...bottomBtnList];
