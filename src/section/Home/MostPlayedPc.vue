<template>
  <section
    id="most-played"
    class="d-flex align-items-center mb-5"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="container">
      <h3 class="title" :class="{ 'dark-mode': darkMode }">
        Top 10 Most Played on PC
      </h3>
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
                params: {
                  id: mostPlay.id,
                  meta: mostPlay.title,
                  title: convertToSlug(mostPlay.title),
                },
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
import { API_MostPlayedPC } from "@/api/getDataGames.js";
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
        .request(API_MostPlayedPC)
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
  background: $grayVeryLight;
  transition: background 0.2s ease-in-out;
  padding: 50px 0;
  clip-path: polygon(0 0, 100% 7.5%, 100% 100%, 0 92.5%);

  .angle {
    width: 250rem;
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
    clip-path: polygon(0 0, 100% 5%, 100% 100%, 0 95%);

    .title {
      font-size: 20px;
    }
  }
}
</style>
