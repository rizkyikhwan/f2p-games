<template>
  <section id="all-games">
    <h4 class="title">All Free Games</h4>
    <div
      class="line"
      style="margin-bottom: -25px"
      :class="{ 'dark-mode': darkMode }"
    ></div>
    <div
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
    </div>
    <div class="d-flex justify-content-center mt-5">
      <button
        v-if="!loading"
        @click="getGames"
        class="button"
        :class="{ 'dark-mode': darkMode }"
      >
        Load More
      </button>
      <Loading v-if="loading" class="loading" />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import GameCard from "@/components/GameCard.vue";
import Loading from "@/components/Loading.vue";
import { API_MostPlayed } from "@/composable/getDataGames.js";

export default {
  data() {
    return {
      games: [],
      limit: 24,
      busy: false,
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
      this.loading = true;
      this.busy = true;
      await setTimeout(() => {
        axios
          .request(API_MostPlayed)
          .then((response) => {
            const append = response.data.slice(
              this.games.length,
              this.games.length + this.limit
            );
            this.games = this.games.concat(append);
            this.busy = false;
            this.loading = false;
          })
          .catch((error) => console.log(error));
      }, 1500);
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
@import "./src/assets/sass/_rootColor.scss";

.title {
  font-family: "Saira", sans-serif;
  text-transform: uppercase;
  font-size: 24px;
}

.button {
  padding: 5px 20px;
  color: $fontDark;

  &:hover {
    box-shadow: none;
    transform: translateY(3px);
  }
}

.btn-loading {
  color: $fontDark;
  border: none;
  background: linear-gradient(45deg, $blue2, $lightBlue2 50%);
  border-radius: 4px;
  padding: 5px 30px;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.5px;
  filter: drop-shadow(0 0px 2px $lightBlue1);
}

.loading {
  margin: 0;
}
</style>