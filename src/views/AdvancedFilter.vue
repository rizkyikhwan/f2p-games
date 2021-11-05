<template>
  <main class="advanced-filter">
    <div class="container">
      <h4 class="title mb-3">Advanced Filter Search</h4>
      <div class="row">
        <div class="col-sm-8 order-1">
          <div v-if="!filteredGames.length">{{ error }}</div>
          <transition-group
            appear
            tag="div"
            name="fade"
            mode="out-in"
            class="row"
            v-if="filteredGames.length"
          >
            <div
              v-for="game in filteredGames"
              :key="game.id"
              class="col-lg-4 col-6 px-1"
            >
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
        </div>
        <div class="col-sm-3 order-sm-2">
          <div class="box-filter" :class="{'dark-mode': darkMode}">
            <div class="box-platform">
              <label class="title-filter">Platform</label>
              <div
                class="line mb-3"
                :class="{ 'dark-mode': darkMode }"
              ></div>
              <div class="d-flex flex-column" @change="getGames">
                <input type="radio" v-model="platform" name="select" id="platform-1" value="all" checked />
                <input type="radio" v-model="platform" name="select" id="platform-2" value="pc" />
                <input type="radio" v-model="platform" name="select" id="platform-3" value="browser" />
                <label for="platform-1" class="platform-1" :class="{'dark-mode': darkMode}">
                  <span>All</span>
                </label>
                <label for="platform-2" class="platform-2" :class="{'dark-mode': darkMode}">
                  <span>PC</span>
                </label>
                <label for="platform-3" class="platform-3" :class="{'dark-mode': darkMode}">
                  <span>Browser</span>
                </label>
              </div>
            </div>
            <hr>
            <div class="form-group">
              <label class="title-filter">Genre</label>
              <div
                class="line mb-3"
                :class="{ 'dark-mode': darkMode }"
              ></div>
              <select v-model="genre" @change="getGames" class="form-select" :class="{'dark-mode': darkMode}">
                <option
                  v-for="(genreFilter, index) in genreFilters"
                  :key="index"
                  :value="`${genreFilter.value}`"
                >
                  {{ genreFilter.title }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import GameCard from "@/components/GameCard.vue";
import { URL, Headers } from "@/api/getDataGames.js";

export default {
  data() {
    return {
      filteredGames: [],
      genreFilters: [
        { value: "shooter", title: "Shooter" },
        { value: "battle-royale", title: "Battle Roayle" },
        { value: "moba", title: "MOBA" },
        { value: "mmorpg", title: "MMORPG" },
        { value: "mmo", title: "MMO" },
        { value: "strategy", title: "Strategy" },
        { value: "sports", title: "Sports" },
        { value: "racing", title: "Racing" },
        { value: "fighting", title: "Fighting" },
        { value: "social", title: "Social" },
      ],
      search: "",
      error: "",
      genre: "shooter",
      platform: "all",
    };
  },
  components: {
    GameCard,
  },
  props: ["darkMode"],
  methods: {
    async getGames() {
      const API_games = {
        method: "GET",
        url: URL,
        params: { platform: this.platform, category: this.genre },
        headers: Headers,
      };
      try {
        const res = await axios
          .request(API_games)
          .then((response) => (this.filteredGames = response.data))
          .catch((error) => console.log(error));

        if (!res.exists) {
          throw new Error("Sorry, games not found!");
        }
      } catch (err) {
        this.error = err.message;
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
@import "../assets/sass/_rootColor.scss";

.advanced-filter {
  min-height: 100vh;
  margin-top: 100px;
}

.title {
  font-family: "Saira", sans-serif;
  text-transform: capitalize;
  font-size: 24px;
}

.title-filter {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
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

.box-filter {
  background: $light;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 10px 15px -7px rgba(0, 0, 0, 0.12);

  &.dark-mode {
    background: $bgCard;
  }

  .form-select {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: $fontLight;
    background-color: $grayVeryLight;
    border: none;
    border-radius: 5px;
    box-shadow: 0px 10px 15px -7px rgba(0, 0, 0, 0.12);

    &.dark-mode {
      background-color: $backgroundDark2;
      color: $fontDark;
    }

    &:focus {
      outline: none;
    }

    option {
      border: 0;
    }
  }

  @for $i from 1 through 3 {
    .platform-#{$i} {
      border-radius: 5px;
      padding: 5px 10px;
    }
  }

  @for $i from 1 through 3 {
    #platform-#{$i}:checked:checked ~ .platform-#{$i} {
      padding: 5px 10px;
      border-radius: 5px;
      color: $fontDark;
      background: $navyBlue;
      box-shadow: 0px 10px 15px -7px rgba(0, 0, 0, 0.25);

      &.dark-mode {
        background: $backgroundDarkDeep;
      }
    }
  }
}

input[type="radio"] {
  display: none;
}
</style>