<template>
  <section id="newcomers" class="d-flex align-items-center mt-5">
    <div class="container">
      <!-- Desktop -->
      <div class="row d-flex justify-content-center">
        <div class="col-md-8 order-1" v-if="!mobile">
          <h2 class="title">Newcomers</h2>
          <Divider />
          <div class="row">
            <div
              v-for="newcomer in newcomers"
              :key="newcomer.id"
              class="col-6 col-md-4 px-1"
            >
              <router-link
                class="specific-game"
                :class="{ 'dark-mode': darkMode }"
                :to="{
                  name: 'GameDetail',
                  params: {
                    id: newcomer.id,
                    meta: newcomer.title,
                    title: convertToSlug(newcomer.title),
                  },
                }"
              >
                <GameCardNewcomers :game="newcomer" :darkMode="darkMode" />
              </router-link>
            </div>
          </div>
          <Loading v-if="loading" />
        </div>
        <div class="col-md-4 order-md-2 mb-4">
          <h2 class="title">Most Played</h2>
          <div class="line" style="margin-bottom: 32px"></div>
          <div v-for="mostPlay in mostPlayed" :key="mostPlay.id">
            <router-link
              class="specific-game"
              :class="{ 'dark-mode': darkMode }"
              :to="{
                name: 'GameDetail',
                params: {
                  id: mostPlay.id,
                  meta: mostPlay.title,
                  title: convertToSlug(mostPlay.title),
                },
              }"
            >
              <GameCardMostPlay :game="mostPlay" :darkMode="darkMode" />
            </router-link>
          </div>
          <Loading v-if="loading" />
        </div>
      </div>

      <!-- Mobile -->
      <div v-if="mobile">
        <h2 class="title mt-5">Newcomers</h2>
        <Divider />
        <div class="row">
          <swiper :options="swiperOption" ref="swiper" class="swiper">
            <swiper-slide
              v-for="newcomer in newcomers"
              :key="newcomer.id"
              class="col-6 col-md-3 px-1"
            >
              <router-link
                class="specific-game"
                :class="{ 'dark-mode': darkMode }"
                :to="{
                  name: 'GameDetail',
                  params: {
                    id: newcomer.id,
                    meta: newcomer.title,
                    title: convertToSlug(newcomer.title),
                  },
                }"
              >
                <GameCard :game="newcomer" :darkMode="darkMode" />
              </router-link>
            </swiper-slide>
          </swiper>
          <Loading v-if="loading" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Divider from "@/components/Divider.vue";
import GameCard from "@/components/GameCard.vue";
import GameCardNewcomers from "@/components/GameCardNewcomers.vue";
import GameCardMostPlay from "@/components/GameCardMostPlay.vue";
import Loading from "@/components/Loading.vue";
import { API_Newcomers, API_MostPlayed } from "@/api/getDataGames.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import axios from "axios";

export default {
  data() {
    return {
      newcomers: [],
      mostPlayed: [],
      loading: null,
      swiperOption: {
        slidesPerView: 4,
        breakpoints: {
          320: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 4,
          },
        },
      },
      windowWidth: null,
      mobile: null,
    };
  },
  props: ["darkMode"],
  components: {
    Divider,
    GameCard,
    GameCardNewcomers,
    GameCardMostPlay,
    Loading,
    Swiper,
    SwiperSlide,
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth < 576) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
    },
    async getNewcomers() {
      this.loading = true;
      await axios
        .request(API_Newcomers)
        .then((response) => {
          const newcomers = response.data.slice(0, 9);
          this.newcomers = newcomers;
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
    async getMostPlayed() {
      this.loading = true;
      await axios
        .request(API_MostPlayed)
        .then((response) => {
          const mostPlay = response.data.slice(0, 3);
          this.mostPlayed = mostPlay;
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
    convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
  },
  mounted() {
    this.getNewcomers();

    this.getMostPlayed();
  },
};
</script>

<style lang="scss" scoped>
#newcomers {
  margin-bottom: 100px;

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
  }

  .swiper {
    padding: 5px 14px 25px;
    z-index: 0;
  }
}
</style>