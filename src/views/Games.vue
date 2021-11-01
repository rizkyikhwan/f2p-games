<template>
  <div class="games mb-5">
    <div class="container">
      <SearchGames :darkMode="darkMode" />
      <AllGames :darkMode="darkMode" />
    </div>
  </div>
</template>

<script>
import SearchGames from "@/components/SearchGames.vue";
import AllGames from "@/section/Games/AllGames.vue";

export default {
  data() {
    return {
    };
  },
  props: ["darkMode"],
  components: {
    SearchGames,
    AllGames
  },
};
</script>

<style lang="scss" scoped>
.games {
  min-height: 100vh;
  margin-top: 100px;
}
</style>