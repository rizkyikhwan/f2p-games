<template>
  <section id="pc-games">
    <transition-group name="fadeInBottom" tag="div" class="row">
      <div v-for="game in games" :key="game.id" class="col-md-3 col-6 px-2">
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
          <GameCard :game="game" :darkMode="darkMode" />
        </router-link>
      </div>
    </transition-group>
    <div
      class="d-flex justify-content-center my-5"
      v-if="games.length < dataLength.length"
    >
      <button
        v-if="!loading"
        @click="getGames"
        class="button"
        :class="{ 'dark-mode': darkMode }"
      >
        Load More
      </button>
      <Loading v-if="loading" class="my-n3" />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GameCard from "@/components/GameCard.vue";
import Loading from "@/components/Loading.vue";
import { mostPlayOnPC } from "@/api/getDataGames.js";

export default {
  data() {
    return {
      games: [],
      dataLength: [],
      limit: 24,
      loading: null,
    };
  },
  props: ["darkMode"],
  components: {
    GameCard,
    Loading,
  },
  methods: {
    async getGames() {
      try {
        this.loading = true;
        const response = await axios.request(mostPlayOnPC);
        const data = await response.data;
        const dataResource = await data.slice(
          this.games.length,
          this.games.length + this.limit
        );
        setTimeout(() => {
          this.games.push(...dataResource);
          this.loading = false;
        }, 250);
        this.dataLength = data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getGames();
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";

.button {
  padding: 5px 20px;
  color: $fontDark;
  &:hover {
    box-shadow: none;
    transform: translateY(3px);
  }
}
</style>
