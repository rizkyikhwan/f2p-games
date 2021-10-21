<template>
  <section id="most-played" class="d-flex align-items-center mt-5 mb-5" :class="{ 'dark-mode':darkMode }">
    <div class="container">
      <div class="angle" :class="{ 'dark-mode':darkMode }"></div>
      <h3 class="title" :class="{ 'dark-mode': darkMode }">
        Top 10 Most Played on PC
      </h3>
      <div class="line" :class="{ 'dark-mode': darkMode }"></div>
      <div class="row">
        <swiper :options="swiperOption" class="swiper">
          <swiper-slide
            v-for="mostPlay in mostPlayed"
            :key="mostPlay.id"
            class="col-6 col-md-3 px-1"
          >
            <GameCard :game="mostPlay" :darkMode="darkMode" />
          </swiper-slide>
        </swiper>
      </div>
      <Loading v-if="loading" />
      <div class="angle" :class="{ 'dark-mode':darkMode }"></div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GameCard from "@/components/GameCard.vue";
import Loading from "@/components/Loading.vue";
import { API_MostPlayedPC } from "@/composable/getDataGames.js";
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
    GameCard,
    Swiper,
    SwiperSlide,
    Loading,
  },
  methods: {
    async getMostPlayed() {
      this.loading = true;
      await axios
        .request(API_MostPlayedPC)
        .then((response) => {
          const mostlyPlay = response.data.slice(0, 10);
          this.mostPlayed = mostlyPlay;
        })
        .catch((error) => console.error(error));
      this.loading = false;
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
  background: $grayLight;
  transition: background 0.2s ease-in-out;

  .angle {
    width: 170rem;
    height: 75px;
    background: $backgroundLight;
    transform: translateX(-50%) translateY(-70%) rotate(2deg);
    transition: 0.2s ease-in-out;

    &:last-child {
      transform: translateX(-50%) translateY(35%) rotate(2deg);
    }
    
    &.dark-mode {
      background: $backgroundDark;
    }
  }
  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
    z-index: 1;

    &.dark-mode {
      color: $fontDark;
    }
  }

  &.dark-mode {
    background: $backgroundDarkDeep;
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