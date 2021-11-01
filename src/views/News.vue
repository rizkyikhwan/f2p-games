<template>
  <div class="news">
    <div class="container">
      <h2 class="title">Last News</h2>
      <div class="line mb-5" :class="{ 'dark-mode': darkMode }"></div>
      <div class="container">
        <div class="row d-flex justify-content-between">
          <div
            class="wrap mb-4 col-lg-12 row"
            v-for="news in lastNews"
            :key="news.id"
          >
            <div class="wrap-img col-sm-4 px-1 d-flex justify-content-start">
              <img
                :src="`${news.thumbnail}`"
                class="img-fluid rounded shadow"
              />
            </div>
            <div class="wrap-body col-sm px-1">
              <p class="title-body mt-2">{{ news.title }}</p>
              <p class="small text-muted description">
                {{ news.short_description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_News } from "@/composable/getDataNews.js";

export default {
  data() {
    return {
      lastNews: {}
    }
  },
  props: ['darkMode'],
  methods: {
    async getNews() {
      await axios.request(API_News)
        .then(response => this.lastNews = response.data)
        .catch(error => console.log(error))
    }
  },
  mounted() {
    this.getNews();
  }
}
</script>

<style lang="scss" scoped>
.news {
  margin-top: 100px;
  min-height: 100vh;

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
  }

  .wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;

    .wrap-img {
      display: flex;
      align-items: center;

      .img-fluid {
        min-width: 140px;
      }
    }

    .wrap-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;

      .description {
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

@media (max-width: 992px) {
  #news {
    .game-card {
      .card {
        .card-body {
          .card-title {
            max-width: 150px;
          }

          .description {
            max-width: 150px;
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  #news {
    .game-card {
      .card {
        .card-body {
          .card-title {
            max-width: 350px;
          }

          .description {
            max-width: 350px;
          }
        }
      }
    }
  }
}

@media (max-width: 576px) {
  #news {
    // .wrap {
    //   flex-wrap: wrap;
    // }
    .game-card {
      .card {
        .card-body {
          .card-title {
            max-width: 300px;
          }

          .description {
            max-width: 300px;
          }
        }
      }
    }
  }
}

@media (max-width: 356px) {
  #news {
    .wrap {
      flex-wrap: wrap;
    }
  }
}
</style>
