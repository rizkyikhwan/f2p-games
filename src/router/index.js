import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import('../views/Home.vue'),
    meta: {
      title: "Welcome to F2P Games"
    }
  },
  {
    path: "/about",
    name: "About",
    component: () => import('../views/About.vue'),
    meta: {
      title: "Welcome to F2P Games"
    }
  },
  {
    path: "/games",
    name: "Games",
    component: () => import('../views/Games.vue'),
    meta: {
      title: "All Free Games"
    }
  },
  {
    path: "/game/:id/:title",
    name: "GameDetail",
    component: () => import('../views/GameDetail.vue'),
    meta: {
      title: "Game Detail",
    }
  },
  {
    path: "*",
    name: "404",
    component: () => import('../views/404.vue'),
    meta: {
      title: "404",
    }
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

router.beforeEach((to, from ,next) => {
  let documentTitle = `${to.meta.title} | ${process.env.VUE_APP_TITLE}`;
  if (to.params.meta) {
    documentTitle = `${to.params.meta}`;
  }
  document.title = documentTitle;
  next();
})

export default router;
