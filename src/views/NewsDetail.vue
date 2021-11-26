<template>
<main class="detail-news">
  <div class="container mt-5">
    <h5>{{ news.title }}</h5>
    <img :src="news.main_image" :alt="news.title" class="img-fluid">
    <div class="content" v-html="news.article_content"></div>
  </div>
</main>
</template>

<script>
export default {
  computed: {
   news() {
     return this.$store.state.news
   } 
  }
}
</script>

<style lang="scss" scoped>
.detail-news {
  margin-top: 100px;
}
</style>