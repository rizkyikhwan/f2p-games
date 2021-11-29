<template>
  <main class="game-detail" :class="{ 'dark-mode': darkMode }">
    <Loading v-if="loading" />
    <div class="container" v-else>
      <div class="row">
        <div class="col-md-4 d-flex flex-column">
          <img
            :src="`${gameDetail.thumbnail}`"
            :alt="gameDetail.title"
            class="img-fluid rounded shadow mb-3"
          />
          <a :href="`${gameDetail.game_url}`" target="_blank">
            <button
              class="button mb-3 rounded shadow-sm"
              :class="{ 'dark-mode': darkMode }"
            >
              Play Now
              <font-awesome-icon
                :icon="['fas', 'sign-in-alt']"
              ></font-awesome-icon>
            </button>
          </a>
          <p class="text-justify small text-muted">
            {{ gameDetail.short_description }}
          </p>
        </div>
        <div class="col-md-8">
          <h3 class="title">{{ gameDetail.title }}</h3>
          <p class="description">{{ gameDetail.description }}</p>
          <h3 class="title mt-5">Addtional Information</h3>
          <div class="row">
            <div class="col-6 col-md-4">
              <span class="sub-title">Title</span>
              <p>{{ gameDetail.title }}</p>
            </div>
            <div class="col-6 col-md-4">
              <span class="sub-title">Developer</span>
              <p>{{ gameDetail.developer }}</p>
            </div>
            <div class="col-6 col-md-4">
              <span class="sub-title">Publisher</span>
              <p>{{ gameDetail.publisher }}</p>
            </div>
            <div class="col-6 col-md-4">
              <span class="sub-title">Release Date</span>
              <p>{{ gameDetail.release_date }}</p>
            </div>
            <div class="col-6 col-md-4">
              <span class="sub-title">Genre</span>
              <p>{{ gameDetail.genre }}</p>
            </div>
            <div class="col-6 col-md-4">
              <span class="sub-title">Platform</span>
              <p>
                {{ gameDetail.platform }}
                <span v-if="gameDetail.platform === 'Windows'">
                  <font-awesome-icon
                    :icon="['fab', 'windows']"
                  ></font-awesome-icon>
                </span>
                <span v-else>
                  <font-awesome-icon
                    :icon="['fas', 'window-maximize']"
                  ></font-awesome-icon>
                </span>
              </p>
            </div>
          </div>
          <h3 class="title mt-5">
            Minimum System Requirements
            <span class="small text-muted"
              >({{
                gameDetail.platform === "Windows" ? "Windows" : "Web Browser"
              }})</span
            >
          </h3>
          <div class="row" v-if="gameDetail.platform === 'Windows'">
            <div
              v-for="(spec, index) in gameDetail.minimum_system_requirements"
              :key="spec"
              class="col-md-6"
            >
              <span style="text-transform: uppercase" class="sub-title">{{
                index
              }}</span>
              <p>{{ spec }}</p>
            </div>
          </div>
          <div v-else>
            <p>
              {{ gameDetail.title }} is a browser based game and should run
              smoothly on practically any PC with a updated web-browser. If you
              have old hardware or software, you may still be able to play
              {{ gameDetail.title }}, but your game experience may suffer. For
              the best gameplay experience, we recommend the latest versions of
              Firefox, Chrome, or Internet Explorer.
            </p>
          </div>
          <div class="row mt-5 mb-2">
            <div class="col-md-6">
              <h3 class="title">Screenshots</h3>
            </div>
            <div class="col-md-6 d-none d-md-flex justify-content-end">
              <div
                id="screenshot-prev"
                class="swiper-button-prev"
                :class="{ 'dark-mode': darkMode }"
              ></div>
              <div
                id="screenshot-next"
                class="swiper-button-next ml-4"
                :class="{ 'dark-mode': darkMode }"
              ></div>
            </div>
          </div>
          <swiper :options="swiperOption" class="swiper">
            <swiper-slide
              v-for="screenshot in gameDetail.screenshots"
              :key="screenshot.id"
              class="col-6 px-1"
            >
              <div class="wrap-img rounded">
                <img
                  :src="`${screenshot.image}`"
                  class="img-fluid rounded shadow-sm preview"
                  @click="showImg"
                />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <!-- image preview screenshot -->
      <div id="preview-ss-overlay" @click="closeShowImg">
        <div class="preview-ss">
          <img src="" alt="" class="shadow rounded" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Loading from "@/components/Loading.vue";
import axios from "axios";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import { URL_gameSpecific, Headers } from "@/api/getDataGames.js";
import "swiper/swiper-bundle.min.css";

export default {
  data() {
    return {
      gameDetail: [],
      mostPlayed: [],
      swiperOption: {
        slidesPerView: 2,
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
            slidesPerView: 2,
          },
        },
        navigation: {
          nextEl: "#screenshot-next",
          prevEl: "#screenshot-prev",
        },
      },
      loading: false,
    };
  },
  props: ["dark-mode"],
  components: {
    Swiper,
    SwiperSlide,
    Loading,
  },
  methods: {
    async specifiGame() {
      const API_specificGame = {
        method: "GET",
        url: URL_gameSpecific,
        params: { id: this.$route.params.id },
        headers: Headers,
      };
      this.loading = true;
      try {
        const response = await axios.request(API_specificGame);
        const data = response.data;
        setTimeout(() => {
          this.gameDetail = data;
          this.loading = false;
        }, 1500);
      } catch (error) {
        console.log(error);
      }
    },
    showImg(e) {
      const previewImg = document.querySelector("#preview-ss-overlay");
      let img;
      if (e.target) {
        img = e.target.parentElement;
      } else {
        img = e.target;
      }
      previewImg.querySelector("img").src = img.querySelector("img").src;
      previewImg.style.display = "block";
    },
    closeShowImg() {
      const previewImg = document.querySelector("#preview-ss-overlay");
      previewImg.style.display = "none";
    },
  },
  mounted() {
    this.specifiGame();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";

.game-detail {
  min-height: 100vh;
  padding-top: 100px;

  &.dark-mode {
    color: $grayLight;
  }

  .button {
    border: 0;
    color: $fontDark;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    width: 100%;
    padding: 5px 10px;
  }

  .title {
    font-family: "Saira", sans-serif;
    font-weight: 600;
  }

  .sub-title {
    font-weight: 700;
  }

  .description {
    white-space: pre-line;
    text-align: justify;
  }

  .swiper {
    padding: 5px 14px 25px 0px;
    z-index: 0;

    .wrap-img {
      overflow: hidden;

      .preview {
        cursor: pointer;
        filter: saturate(50%);
        transition: 0.2s ease-out;

        &:hover {
          transform: scale(1.1);
          filter: saturate(100%);
        }
      }
    }
  }

  #preview-ss-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba($color: $backgroundDark, $alpha: 0.7);
    backdrop-filter: blur(2px);
    z-index: 9999;
    display: none;

    .preview-ss {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 5px;

      img {
        width: 60vw;
      }
    }
  }

  .swiper-button-prev,
  .swiper-button-next {
    position: relative;
    background: rgba(41, 41, 41, 0.1);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    box-shadow: 0px 5px 10px -3px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    padding: 0 23px;
    transition: 0.3s ease-in-out;

    &::after {
      font-size: 0.75rem;
      color: $navyBlue;
      font-weight: 800;
      filter: drop-shadow(0 0 2px $navyBlue);
    }

    &.dark-mode {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}

@media (max-width: 992px) {
  .game-detail {
    .swiper {
      .wrap-img {
        .preview {
          cursor: pointer;
          filter: saturate(100%);
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .game-detail {
    #preview-ss-overlay {
      .preview-ss {
        img {
          width: 80vw;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .game-detail {
    #preview-ss-overlay {
      .preview-ss {
        img {
          width: 95vw;
        }
      }
    }
  }
}
</style>
