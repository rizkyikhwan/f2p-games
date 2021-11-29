<template>
  <main class="detail-news">
    <div class="container mt-5">
      <h3 class="title">{{ news.title }}</h3>
      <img :src="news.main_image" :alt="news.title" class="img-fluid" />
      <div class="content" v-html="news.article_content"></div>
    </div>
  </main>
</template>

<script>
export default {
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
}
</style>
