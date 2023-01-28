import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/NavigationFrame.vue"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/common/HomeView.vue")
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/common/UserView.vue")
      },
      {
        path: "/settings",
        name: "settings",
        component: () => import("@/views/common/SettingsView.vue")
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
