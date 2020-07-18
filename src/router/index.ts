import Vue from "vue";
import VueRouter from "vue-router";
import { routes } from "./router";
import Cookies from "js-cookie";
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

//路由守卫 前端的路由前端控制，在声明周期create之前执行。
router.beforeEach((to, from, next) => {
  const token = Cookies.get("token");
  console.log(token);
  if (token) {
    if (to.path !== "/login") {
      next();
    } else {
      alert("当前已是登录状态，请注销后重新登录");
      next(from.path);
    }
  } else {
    if (to.path !== "/login") {
      alert("登录后，尝试访问其他页面");
      next("/login");
    } else {
      next();
    }
  }
});

export default router;
