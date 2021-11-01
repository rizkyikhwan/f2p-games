<template>
  <section id="all-games">
    <h4 class="title">All Free Games</h4>
    <div
      class="line"
      style="margin-bottom: -25px"
      :class="{ 'dark-mode': darkMode }"
    ></div>
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
import { URL, Headers } from "@/composable/getDataGames.js";

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
        headers: Headers,
      };
      this.busy = true;
      await setTimeout(() => {
        axios
          .request(API_AllGames)
          .then((response) => {
            const append = response.data.slice(
              this.games.length,
              this.games.length + this.limit
            );
            this.games.push(...append);
            this.busy = false;
          })
          .catch((error) => console.log(error));
      }, 250);
    },
    convertToSlug(Text) {
      return Text.toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
    handlerScrollToBottom(ivVisible) {
      if (!ivVisible) {
        return;
      }
      console.log("abc");
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