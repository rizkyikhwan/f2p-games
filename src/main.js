import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import VueAwesomeSwiper from "vue-awesome-swiper"
import { Swiper as SwiperClass, Navigation, Pagination, Autoplay } from 'swiper/swiper.esm.js'
import getAwesomeSwiper from 'vue-awesome-swiper/dist/exporter'
import infiniteScroll from 'vue-infinite-scroll';
import "./assets/css/main.css";
import "swiper/swiper-bundle.min.css"

library.add(fas, fab)

SwiperClass.use([Navigation, Pagination, Autoplay])

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(infiniteScroll);
Vue.use(VueAwesomeSwiper)
Vue.use(getAwesomeSwiper(SwiperClass))

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
