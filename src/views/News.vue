<template>
  <main class="news">
    <div class="container">
      <div class="row">
        <div class="col-md-8 py-3">
          <ListNews :darkMode="darkMode" />
        </div>
        <div class="col-md-4 mt-5 d-none d-md-block">
          <SideList :darkMode="darkMode" />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ListNews from "@/section/News/ListNews.vue";
import SideList from "@/section/News/SideList.vue";

export default {
  data() {
    return {};
  },
  props: ["darkMode"],
  components: {
    ListNews,
    SideList,
  },
};
</script>

<style lang="scss" scoped>
.news {
  padding-top: 50px;
}
</style>
