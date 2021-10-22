<template>
  <section id="news">
    <div class="container">
      <h2 class="title">Last News</h2>
      <div
        class="line mb-3"
        :class="{ 'dark-mode': darkMode }"
      ></div>
      <div class="container">
        <div class="row">
          <div v-for="news in lastNews" :key="news.id" class="col-md-3 px-2">
            <div class="game-card mt-3">
              <div class="card">
                <img
                  :src="`${news.thumbnail}`"
                  class="rounded"
                  :alt="`${news.title}`"
                />
                <div class="d-flex align-items-center">
                  <div class="card-body">
                    <p class="card-title">{{ news.title }}</p>
                    <p class="description small text-muted">
                      {{ news.short_description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { API_News } from "@/composable/getDataNews.js";
import axios from "axios";

export default {
  data() {
    return {
      lastNews: [],
    };
  },
  props: ['darkMode'],
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

  .game-card {
    .card {
      background: transparent;
      border: 0;

      .card-body {
        padding: 15px 0;

        .card-title {
          font-weight: 500;
          max-width: 225px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .description {
          max-width: 200px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
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
</style>