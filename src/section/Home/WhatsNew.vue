<template>
  <section id="news">
    <div class="container">
      <div class="row">
        <div class="col-6">
          <h2 class="title">What's New</h2>
          <Divider style="width: 100%" />
        </div>
        <div class="col-6 d-flex justify-content-end align-items-center">
          <router-link
            class="link"
            :class="{ 'dark-mode': darkMode }"
            :to="{ name: 'News' }"
            >See More
            <font-awesome-icon
              :icon="['fas', 'arrow-right']"
            ></font-awesome-icon
          ></router-link>
        </div>
      </div>
      <div class="container mt-3">
        <div class="row group-news wrap-responsive">
          <div
            class="wrap d-flex flex-nowrap row mb-4 col-lg-6"
            v-for="news in lastNews"
            :key="news.id"
            @click="detailNews(news)"
          >
            <div
              class="
                wrap-img
                col-sm-4
                px-1
                d-flex
                justify-content-start
                align-items-center
              "
            >
              <img
                :src="`${news.thumbnail}`"
                class="img-fluid rounded shadow"
              />
            </div>
            <div
              class="
                wrap-body
                d-flex
                flex-column
                justify-content-center
                col-sm
                px-1
              "
            >
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
import Divider from "@/components/Divider.vue";
import { API_News } from "@/api/getDataNews.js";
import axios from "axios";

export default {
  data() {
    return {
      lastNews: [],
    };
  },
  props: ["darkMode"],
  components: {
    Divider,
  },
  methods: {
    async getLastNews() {
      try {
        const response = await axios.request(API_News);
        const data = response.data.slice(0, 4);
        this.lastNews = data;
      } catch (error) {
        console.log(error);
      }
    },
    detailNews(data) {
      this.$store.commit("setNews", data);
      this.$router.push({ name: "NewsDetail" });
    },
  },
  mounted() {
    this.getLastNews();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";
@import "@/assets/sass/_font.scss";

#news {
  margin-bottom: 50px;

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
  }

  .link {
    color: $fontLight;

    &.dark-mode {
      color: $fontDark;
    }
  }

  .group-news {
    display: flex;
    justify-content: space-between;

    .wrap {
      border-radius: 10px;
      cursor: pointer;
      padding: 10px 5px;
      transition: 0.2s ease;

      .title-body {
        font-family: "Saira", sans-serif;
        letter-spacing: 0.5px;
      }

      .description {
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &:hover {
        background: $backgroundDarkDeep;
        box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
        border-radius: 10px;
        color: #fff;
        transform: translateY(-5px);
      }
    }
  }
}

@media (max-width: 992px) {
  #news {
    .wrap-responsive {
      display: flex;
      justify-content: center;

      .wrap .title-body {
        font-size: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  #news {
    .wrap-responsive .wrap .title-body {
      font-size: 14px;
    }
  }
}

@media (max-width: 576px) {
  #news {
    .wrap-responsive .wrap .title-body {
      font-size: 13px;
      letter-spacing: 1px;
    }
  }
}
</style>
