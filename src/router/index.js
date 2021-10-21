import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue')
  },
  {
    path: "/about",
    name: "About",
    component: () => import('../views/About.vue')
  },
  {
    path: "/games",
    name: "Games",
    component: () => import('../views/Games.vue')
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return;
    } else {
      return { x: 0, y: 0, behavior: "smooth" };
    }
  }
});

export default router;
