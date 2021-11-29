<template>
  <div class="sticky-top mb-5">
    <h2 class="title">Recently Added</h2>
    <div class="line" style="margin-bottom: 24px"></div>
    <div v-for="mostPlay in recentlyAdd" :key="mostPlay.id">
      <router-link
        class="specific-game"
        :class="{ 'dark-mode': darkMode }"
        :to="{
          name: 'GameDetail',
          params: {
            id: mostPlay.id,
            meta: mostPlay.title,
          },
        }"
      >
        <SideGameCard :game="mostPlay" :darkMode="darkMode" />
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
      recentlyAdd: [],
      loading: false,
    };
  },
  props: ["darkMode"],
  components: {
    SideGameCard,
    Loading,
  },
  methods: {
    async getRecentlyAdd() {
      this.loading = true;
      try {
        const response = await axios.request(API_Newcomers);
        const data = response.data.slice(0, 3);
        setTimeout(() => {
          this.recentlyAdd = data;
          this.loading = false;
        }, 250);
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getRecentlyAdd();
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
