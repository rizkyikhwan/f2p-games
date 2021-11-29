<template>
  <div id="searchGames" class="mb-5">
    <h4 class="title mb-3">
      <font-awesome-icon :icon="['fas', 'search']"></font-awesome-icon>
      Search
    </h4>
    <input
      type="text"
      placeholder="Search Games..."
      class="search shadow rounded mb-4"
      :class="{ 'dark-mode': darkMode }"
      v-model="search"
    />
    <transition name="fadeInBottom" mode="out-in">
      <div class="row d-flex justify-content-center" v-if="search">
        <div
          v-for="game in searchGames"
          :key="game.id"
          class="col-md-3 col-6 px-2"
        >
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
      </div>
      <p
        v-else
        class="d-flex align-items-center justify-content-center text-muted mt-2"
      >
        Search results will appear here
      </p>
    </transition>
    <p
      v-if="!searchGames.length"
      class="d-flex align-items-center justify-content-center text-muted mt-2"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
import GameCard from "@/components/GameCard.vue";
import axios from "axios";
import { API_AllGames } from "@/api/getDataGames.js";

export default {
  data() {
    return {
      resultGames: [],
      search: "",
      error: "",
    };
  },
  props: ["darkMode"],
  components: {
    GameCard,
  },
  methods: {
    async getGames() {
      try {
        const response = await axios.request(API_AllGames);
        const data = response.data;
        this.resultGames = data;

        if (!response.exists) {
          throw new Error("Sorry, games not found :(");
        }
      } catch (err) {
        this.error = err.message;
      }
    },
  },
  mounted() {
    this.getGames();
  },
  computed: {
    searchGames() {
      return this.resultGames.filter((game) => {
        return game.title.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";

#searchGames {
  min-height: 10vh;
}

.title {
  font-family: "Saira", sans-serif;
  text-transform: uppercase;
  font-size: 24px;
}

.search {
  background: $grayVeryLight;
  width: 100%;
  height: calc(1.5em + 1.5rem + 2px);
  padding: 5px 10px;
  border: 1px solid transparent;
  transition: 0.2s ease-in-out;

  &:focus {
    filter: drop-shadow(0 0 4px $navyBlue);
    border: 1px solid transparent;
    outline: none;
  }

  &.dark-mode {
    background: $backgroundDarkDeep;
    color: $gray;
  }
}

.text-search {
  color: $gray;
  text-align: center;
  margin-top: 15px;
}
</style>
