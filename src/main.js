import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faTimes, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
import { faWindows } from "@fortawesome/free-brands-svg-icons";
import "./assets/css/main.css"

library.add( faSun, faMoon, faTimes, faWindows, faWindowMaximize );

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
