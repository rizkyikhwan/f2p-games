<template>
  <section id="most-played" class="d-flex align-items-center mt-4 mb-5">
    <div class="container">
      <h3 class="title">Top 10 Most Played on Browser</h3>
      <Divider />
      <div class="row">
        <swiper :options="swiperOption" class="swiper">
          <swiper-slide
            v-for="mostPlay in mostPlayed"
            :key="mostPlay.id"
            class="col-6 col-md-3 px-1"
          >
            <router-link
              class="specific-game"
              :class="{ 'dark-mode': darkMode }"
              :to="{
                name: 'GameDetail',
                params: { id: mostPlay.id, meta: mostPlay.title, title: convertToSlug(mostPlay.title) },
              }"
            >
              <GameCard :game="mostPlay" :darkMode="darkMode" />
            </router-link>
          </swiper-slide>
        </swiper>
      </div>
      <Loading v-if="loading" />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Divider from "@/components/Divider.vue";
import GameCard from "@/components/GameCard.vue";
import Loading from "@/components/Loading.vue";
import { API_MostPlayedBrowser } from "@/api/getDataGames.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";

export default {
  data() {
    return {
      mostPlayed: [],
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
            slidesPerView: 4,
          },
          992: {
            slidesPerView: 4,
          },
        },
      },
      loading: null,
    };
  },
  props: ["darkMode"],
  components: {
    Divider,
    GameCard,
    Swiper,
    SwiperSlide,
    Loading,
  },
  methods: {
    async getMostPlayed() {
      this.loading = true;
      await axios
        .request(API_MostPlayedBrowser)
        .then((response) => {
          const mostlyPlay = response.data.slice(0, 10);
          this.mostPlayed = mostlyPlay;
        })
        .catch((error) => console.error(error));
      this.loading = false;
    },
    convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
  },
  mounted() {
    this.getMostPlayed();
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";
@import "./src/assets/sass/_font.scss";

#most-played {
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

@media (max-width: 768px) {
  #most-played {
    .title {
      font-size: 20px;
    }
  }
}
</style>