<template>
  <div class="sticky-top mb-5">
    <h2 class="title">May you like</h2>
    <div class="line" style="margin-bottom: 24px"></div>
    <div v-for="game in randomItem" :key="game.id">
      <router-link
        class="specific-game"
        :class="{ 'dark-mode': darkMode }"
        :to="{
          name: 'GameDetail',
          params: {
            id: game.id,
            meta: game.title,
          },
        }"
      >
        <SideGameCard :game="game" :darkMode="darkMode" />
      </router-link>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script>
import axios from "axios";
import SideGameCard from "@/components/SideGameCard.vue";
import Loading from "@/components/Loading.vue";
import { API_Newcomers } from "@/api/getDataGames.js";

export default {
  data() {
    return {
      randomItem: [],
      loading: false,
    };
  },
  props: ["darkMode"],
  components: {
    SideGameCard,
    Loading,
  },
  methods: {
    async getRandomData() {
      this.loading = true;
      try {
        const response = await axios.request(API_Newcomers);
        const data = response.data;
        setTimeout(() => {
          const shuffled = data.sort(() => 0.5 - Math.random());
          let selected = shuffled.slice(0, 3);
          this.randomItem = selected;
          this.loading = false;
        }, 250);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getRandomData();
  },
};
</script>

<style lang="scss" scoped>
.sticky-top {
  top: 25px;
}

.title {
  font-family: "Saira", sans-serif;
  text-transform: uppercase;
  font-size: 24px;
}
</style>
