<template>
  <main class="detail-news">
    <div class="container mt-5">
      <h3 class="title">{{ news.title }}</h3>
      <h5 class="text-muted">{{ news.short_description }}</h5>
      <div class="row">
        <div class="col-md-8">
          <div class="flex-column justify-content-center">
            <img
              :src="news.main_image"
              :alt="news.title"
              class="img-fluid rounded shadow"
            />
            <div class="article-content" v-html="news.article_content"></div>
          </div>
        </div>
        <div class="col-md-4 d-none d-md-block">
          <SideList :darkMode="darkMode" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SideList from "@/section/News/SideList.vue";

export default {
  props: ["darkMode"],
  components: {
    SideList,
  },
  mounted() {
    const iframe = document.querySelector("iframe");
    iframe.classList.add("container-fluid");
  },
  computed: {
    news() {
      return this.$store.state.news;
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-news {
  padding-top: 50px;

  .title {
    font-family: "Saira", sans-serif;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .article-content {
    white-space: pre-line;
    text-align: justify;
  }
}
</style>
