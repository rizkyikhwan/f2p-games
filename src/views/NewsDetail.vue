<template>
<main class="detail-news">
  <div class="container mt-5">
    <h5>{{ news.title }}</h5>
    <p v-html="news.article_content"></p>
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