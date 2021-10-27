import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon, faTimes, faWindowMaximize, faAngleUp, faSignInAlt, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faWindows, faGithub, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./assets/css/main.css"
import infiniteScroll from 'vue-infinite-scroll';

library.add( faSun, faMoon, faTimes, faWindows, faWindowMaximize, faAngleUp, faGithub, faLinkedin, faInstagram, faSignInAlt, faSearch );

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(infiniteScroll);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
