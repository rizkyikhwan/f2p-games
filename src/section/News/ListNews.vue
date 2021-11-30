<template>
  <main class="news">
    <h2 class="title">What's New</h2>
    <Divider />
    <div class="container">
      <transition-group
        name="fadeInBottom"
        tag="div"
        class="row d-flex justify-content-center"
      >
        <div
          class="wrap d-flex flex-row flex-nowrap col-lg-12 row py-2 px-1 my-2"
          v-for="news in listNews"
          :key="news.id"
          @click="detailNews(news)"
        >
          <div class="wrap-img col-sm-4 px-1 d-flex align-items-center">
            <img :src="`${news.thumbnail}`" class="img-fluid rounded shadow" />
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
            <h5 class="title-body mt-2">{{ news.title }}</h5>
            <p class="small text-muted description">
              {{ news.short_description }}
            </p>
          </div>
        </div>
      </transition-group>
      <div class="d-flex justify-content-center my-5">
        <button
          v-if="!loading"
          @click="getNews"
          class="button"
          :class="{ 'dark-mode': darkMode }"
        >
          Load More
        </button>
        <Loading v-if="loading" class="my-n3" />
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Divider from "@/components/Divider.vue";
import Loading from "@/components/Loading.vue";
import { API_News } from "@/api/getDataNews.js";

export default {
  data() {
    return {
      listNews: [],
      limit: 6,
      loading: null,
    };
  },
  components: {
    Divider,
    Loading,
  },
  props: ["darkMode"],
  methods: {
    async getNews() {
      try {
        this.loading = true;
        const response = await axios.request(API_News);
        const data = response.data.slice(
          this.listNews.length,
          this.listNews.length + this.limit
        );
        setTimeout(() => {
          this.listNews.push(...data);
          this.loading = false;
        }, 250);
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
    this.getNews();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";

.news {
  min-height: 100vh;

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
  }

  .wrap {
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      background: $backgroundDarkDeep;
      box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      color: #fff;
      transform: translateY(-5px);
    }
  }

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

  .button {
    padding: 5px 20px;
    color: $fontDark;
    &:hover {
      box-shadow: none;
      transform: translateY(3px);
    }
  }
}

@media (max-width: 992px) {
  .news {
    .title-body {
      font-size: 16px;
    }
  }
}

@media (max-width: 768px) {
  .news {
    .title-body {
      font-size: 14px;
    }
  }
}
</style>
