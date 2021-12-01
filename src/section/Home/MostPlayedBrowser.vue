<template>
  <section id="most-played" class="d-flex align-items-center mt-4 mb-5">
    <div class="container my-3">
      <div class="wrapper" :class="{ 'dark-mode': darkMode }">
        <div class="row">
          <div
            class="
              col-md-4
              d-flex
              flex-column
              justify-content-center
              order-md-1
              text-md-right
            "
          >
            <div class="row">
              <div class="col-12 my-md-3 mt-3 mb-n3">
                <h3 class="title">Top 10 Most Played on Browser</h3>
                <Divider class="divider" />
                <p>
                  The best Browser Games that can be played anytime without
                  worry about game specs
                </p>
              </div>
              <div class="col-12 d-none d-md-flex justify-content-end">
                <div
                  id="browser-slide-prev"
                  class="swiper-button-prev mr-2"
                  :class="{ 'dark-mode': darkMode }"
                ></div>
                <div
                  id="browser-slide-next"
                  class="swiper-button-next"
                  :class="{ 'dark-mode': darkMode }"
                ></div>
              </div>
            </div>
          </div>
          <div class="col-md-8 order-0">
            <div class="row">
              <swiper :options="swiperOption" class="swiper">
                <swiper-slide
                  v-for="mostPlay in mostPlayed"
                  :key="mostPlay.id"
                  class="col-12 col-md-4 px-1"
                >
                  <router-link
                    class="specific-game"
                    :class="{ 'dark-mode': darkMode }"
                    :to="{
                      name: 'GameDetail',
                      params: {
                        id: mostPlay.id,
                        meta: mostPlay.title,
                      },
                    }"
                  >
                    <GameCard :game="mostPlay" :darkMode="darkMode" />
                  </router-link>
                </swiper-slide>
              </swiper>
            </div>
            <Loading v-if="loading" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Divider from "@/components/Divider.vue";
import GameCard from "@/components/GameCard.vue";
import Loading from "@/components/Loading.vue";
import { API_MostPlayedBrowser } from "@/api/getDataGames.js";

export default {
  data() {
    return {
      mostPlayed: [],
      swiperOption: {
        slidesPerView: 3,
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 3,
          },
        },
        navigation: {
          nextEl: "#browser-slide-next",
          prevEl: "#browser-slide-prev",
        },
      },
      loading: null,
    };
  },
  props: ["darkMode"],
  components: {
    Divider,
    GameCard,
    Loading,
  },
  methods: {
    async getMostPlayed() {
      this.loading = true;
      try {
        const response = await axios.request(API_MostPlayedBrowser);
        const data = await response.data.slice(0, 10);
        this.mostPlayed = data;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
  },
  mounted() {
    this.getMostPlayed();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";
@import "@/assets/sass/_font.scss";

#most-played {
  .wrapper {
    background: linear-gradient(
        rgba($color: $backgroundLight, $alpha: 0.75),
        rgba($color: $backgroundLight, $alpha: 1) 90%
      ),
      url(../../assets/images/bg-browser.jpg);
    background-size: cover;
    background-position: center;
    border-radius: 10px;
    padding: 15px 25px 0;

    &.dark-mode {
      background: linear-gradient(
          rgba($color: $backgroundDark, $alpha: 0.75),
          rgba($color: $backgroundDark, $alpha: 1) 90%
        ),
        url(../../assets/images/bg-browser.jpg);
      background-size: cover;
      background-position: center;
    }

    .divider {
      margin-left: 50%;

      @media (max-width: 767px) {
        margin: 0;
      }
    }
  }

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
  }

  .swiper {
    padding: 5px 14px 25px;
    z-index: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: static;
    background: rgba(41, 41, 41, 0.1);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    box-shadow: 0px 5px 10px -3px rgba(0, 0, 0, 0.2);
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
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

@media (max-width: 768px) {
  #most-played .title {
    font-size: 20px;
  }
}
</style>
