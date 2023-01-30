import { NavigateTabItem } from "@/components/navigationTab/ts/NavigateTabItem";

export const topBtnList: Array<NavigateTabItem> = [
  { name: "Home", icon: "icon-homepage", url: "/" }
];

export const bottomBtnList: Array<NavigateTabItem> = [
  { name: "User", icon: "icon-mine", url: "/user" },
  { name: "Settings", icon: "icon-setting", url: "/settings" }
];
