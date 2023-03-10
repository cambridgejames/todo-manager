import { NavigateTabItem } from "@/components/ui/navigationTab/ts/NavigateTabItem";
import { initTabItem } from "@/components/ui/navigationTab/ts/NavigateUtil";

describe("NavigationTabUtil.ts", () => {
  it("testInitTabItem", () => {
    const tabItem: NavigateTabItem = { name: "sideBar.home", icon: "icon-homepage", url: "/" };
    const itemView = initTabItem(tabItem);
    expect<boolean>(itemView.enable).toBe(false);
  });
});
