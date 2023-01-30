import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { allBtnList } from "@/assets/ts/config/Navigate";

/**
 * 将导航配置转换成router配置
 *
 * @returns router配置
 */
const buildNavigationRouter = (): Array<RouteRecordRaw> => {
  const solution = [] as Array<RouteRecordRaw>;
  for (const btnItem of allBtnList) {
    solution.push({ path: btnItem.url, name: btnItem.name, component: btnItem.component } as RouteRecordRaw);
  }
  return solution;
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/NavigationFrame.vue"),
    children: [
      ...buildNavigationRouter()
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
