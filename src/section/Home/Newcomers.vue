<template>
  <section id="newcomers" class="d-flex align-items-center mt-5">
    <div class="container">
      <h2 class="title text-center">Newcomers</h2>
      <div class="line" :class="{'dark-mode': darkMode}"></div>

      <!-- Desktop -->
      <div class="row d-flex justify-content-center" v-if="!mobile">
        <div
          v-for="newcomer in newcomers"
          :key="newcomer.id"
          class="col-6 col-md-3 px-1"
        >
          <GameCard :game="newcomer" :darkMode="darkMode" />
        </div>
      </div>

      <!-- Mobile -->
      <div class="row" v-if="mobile">
        <swiper
          :options="swiperOption"
          ref="swiper"
          class="swiper"
        >
          <swiper-slide
            v-for="newcomer in newcomers"
            :key="newcomer.id"
            class="col-6 col-md-3 px-1"
          >
            <GameCard :game="newcomer" :darkMode="darkMode" />
          </swiper-slide>
        </swiper>
      </div>
      <Loading v-if="loading" />
    </div>
  </section>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import Loading from "@/components/Loading.vue";
import { API_URL } from "@/composable/getNewcomers.js";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import axios from "axios";

export default {
  data() {
    return {
      newcomers: [],
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
    GameCard,
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
        .request(API_URL)
        .then((response) => {
          const newcomers = response.data.slice(0, 3);
          this.newcomers = newcomers;
        })
        .catch((error) => console.log(error));
      this.loading = false;
    },
  },
  mounted() {
    this.getNewcomers();
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";

#newcomers {
  // margin-top: -100px;
  // min-height: 75vh;
  margin-bottom: 100px;

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
  }
  
  .line {
    max-width: 250px;
    margin: auto;
    width: 100px;
    height: 5px;
    border-radius: 5rem;
    background: $navyBlue;
    transition: 0.2s ease-in-out;
  
    &.dark-mode {
      filter: drop-shadow(0 0 2px $navyBlue);
    }
  }

  .swiper {
        padding: 5px 14px 25px;

    .swiper-button-prev {
      color: $fontLight;
      background: rgba($color: $light, $alpha: 0.2);
      border-radius: 50%;
      padding: 15px;
      width: 33px;
      height: 32px;
      backdrop-filter: blur( 4px );
      -webkit-backdrop-filter: blur( 4px );
      transition: 0.2s ease-in-out;

      &::after {
        filter: drop-shadow(0 0 2px);
        font-size: 20px;
      }

      &.dark-mode {
        color: $navyBlue;
      }
    }

    .swiper-button-next {
      color: $fontLight;
      background: rgba($color: $light, $alpha: 0.2);
      border-radius: 50%;
      padding: 15px;
      width: 33px;
      height: 32px;
      backdrop-filter: blur( 4px );
      -webkit-backdrop-filter: blur( 4px );
      transition: 0.2s ease-in-out;

      &::after {
        filter: drop-shadow(0 0 2px);
        font-size: 20px;
      }

      &.dark-mode {
        color: $navyBlue;
      }
    }
  }
}

// @media (max-width: 768px) {
//   #newcomers {
//     min-height: 50vh;
//   }
// }
</style>