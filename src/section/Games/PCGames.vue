<template>
  <section id="pc-games">
    <transition-group
      name="fadeInBottom"
      tag="div"
      v-infinite-scroll="getGames"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="limit"
      class="row"
    >
      <div v-for="game in games" :key="game.id" class="col-md-3 col-6 px-2">
        <router-link
          class="specific-game"
          :class="{ 'dark-mode': darkMode }"
          :to="{
            name: 'GameDetail',
            params: {
              id: game.id,
              meta: game.title,
              title: convertToSlug(game.title),
            },
          }"
        >
          <GameCard :game="game" :darkMode="darkMode" />
        </router-link>
      </div>
    </transition-group>
  </section>
</template>

<script>
import axios from "axios";
import GameCard from "@/components/GameCard.vue";
import { URL, Headers } from "@/api/getDataGames.js";

export default {
  data() {
    return {
      games: [],
      limit: 24,
      busy: false,
    };
  },
  props: ["darkMode"],
  components: {
    GameCard,
  },
  methods: {
    async getGames() {
      const API_AllGames = {
        method: "GET",
        url: URL,
        params: { platform: "pc", "sort-by": "popularity" },
        headers: Headers,
      };
      this.busy = true;
      try {
        const response = await axios.request(API_AllGames);
        const data = response.data.slice(this.games.length, this.games.length + this.limit);
        setTimeout(() => {
          this.games.push(...data);
          this.busy = false;
        }, 250)
      } catch (error) {
        console.log(error);
      }
    },
    convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
  },
  mounted() {
    this.getGames();
  },
};
</script>

<style lang="scss" scoped>
</style>