import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Bookmarks from "@/views/Bookmarks.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/bookmarks",
    name: "bookmarks",
    component: Bookmarks
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
