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
          <div class="swiper-button-prev" slot="button-prev" :class="{'dark-mode': darkMode}"></div>
          <div class="swiper-button-next" slot="button-next" :class="{'dark-mode': darkMode}"></div>
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
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
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

    .swiper-button-prev,
    .swiper-button-next {
      background: rgba(41, 41, 41, 0.1);
      backdrop-filter: blur( 2px );
      -webkit-backdrop-filter: blur( 2px );
      box-shadow: 0px 5px 10px -3px rgba(0,0,0,0.2);
      border-radius: 10px;
      padding: 25px;
      transition: 0.3s ease-in-out;

      &::after {
        font-size: 1.25rem;
        color: $navyBlue;
        font-weight: 800;
        filter: drop-shadow(0 0 2px $navyBlue);
      }

      &.dark-mode {
        background: rgba( 255, 255, 255, 0.1 );
      }
    }

    .swiper-button-next.swiper-button-disabled,
    .swiper-button-prev.swiper-button-disabled {
      opacity: 0;
    }
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