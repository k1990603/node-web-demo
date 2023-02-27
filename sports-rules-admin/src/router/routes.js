/*
 * @Date           : 2022-04-04 15:55:31
 * @LastEditTime: 2022-08-28 12:00:58
 * @Description    :
 */
/*
 * @Date           : 2022-03-28 14:54:34
 * @LastEditTime   : 2022-04-04 15:49:51
 * @Description    :
 */
const routes = [
  {
    path: "/",
    component: () => import("src/pages/login/login1.vue"),
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "user",
        name: "user",
        component: () => import("src/pages/user/index.vue"),
      },
      {
        path: "language",
        name: "language",
        component: () => import("src/pages/language/index.vue"),
      },
      {
        path: "menu",
        name: "menu",
        component: () => import("src/pages/menu/index.vue"),
      },
      {
        path: "document",
        name: "document",
        component: () => import("src/pages/document/index.vue"),
      },

      {
        path: "updateRecord",
        name: "updateRecord",
        component: () => import("src/pages/updateRecord/index.vue"),
      },
      {
        path: "mddocpool",
        name: "mddocpool",
        component: () => import("src/pages/mddocpool/index.vue"),
      },
      {
        path: "packingrecords",
        name: "packingrecords",
        component: () => import("src/pages/packingrecords/index.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("src/pages3/Error404.vue"),
  },
];

export default routes;
