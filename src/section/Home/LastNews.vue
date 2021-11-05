<template>
  <section id="news">
    <div class="container">
      <h2 class="title">Last News</h2>
      <div class="line mb-4" :class="{ 'dark-mode': darkMode }"></div>
      <div class="container">
        <div class="row d-flex justify-content-between">
          <div
            class="wrap mb-4 col-lg-6 row"
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
  </section>
</template>

<script>
import { API_News } from "@/api/getDataNews.js";
import axios from "axios";

export default {
  data() {
    return {
      lastNews: [],
    };
  },
  props: ["darkMode"],
  methods: {
    getLastNews() {
      axios
        .request(API_News)
        .then((response) => {
          const lastNews = response.data.slice(0, 4);
          this.lastNews = lastNews;
        })
        .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getLastNews();
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";
@import "./src/assets/sass/_font.scss";

#news {
  margin-bottom: 50px;

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