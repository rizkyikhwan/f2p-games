<template>
  <main class="advanced-filter">
    <div class="container">
      <h4 class="title mb-3">Advanced Filter Search</h4>
      <div class="row">
        <div class="col-lg-9 col-sm-8 order-1">
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
              class="col-lg-4 col-6 px-2"
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
        <div class="col-lg-3 col-sm-4 order-sm-2">
          <div class="box-filter" :class="{'dark-mode': darkMode}">
            <!-- Platform -->
            <div class="box-platform">
              <label class="title-filter">Platform</label>
              <Divider />
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

            <!-- Sort-By -->
            <div class="form-group">
              <label class="title-filter">Sorted By</label>
              <Divider />
              <select v-model="sorted" @change="getGames" class="form-select" :class="{'dark-mode': darkMode}">
                <option
                  v-for="(sortBy, index) in sortedBy"
                  :key="index"
                  :value="`${sortBy.value}`"
                >
                  {{ sortBy.title }}
                </option>
              </select>
            </div>
            <hr>

            <!-- Genre -->
            <div class="form-group">
              <label class="title-filter">Genre</label>
              <Divider />
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
          
          <div class="box-filter" :class="{'dark-mode': darkMode}">
            <!-- Graphics -->
            <label class="title-filter">Graphics</label>
            <Divider />
            <div class="d-flex flex-column" @change="getGames">
              <input type="checkbox" v-model="graphics_1" id="graphic-1" value="3d">
              <input type="checkbox" v-model="graphics_2" id="graphic-2" value="2d">
              <label for="graphic-1" class="graphic-1" :class="{'dark-mode': darkMode}">
                <span>3D Graphics</span>
              </label>
              <label for="graphic-2" class="graphic-2" :class="{'dark-mode': darkMode}">
                <span>2D Graphics</span>
              </label>
            </div>
            <hr>

            <!-- Combat -->
            <label class="title-filter">Combat</label>
            <Divider />
            <div class="d-flex flex-column" @change="getGames">
              <input type="checkbox" v-model="combat_1" id="combat-1" value="pve">
              <input type="checkbox" v-model="combat_2" id="combat-2" value="pvp">
              <label for="combat-1" class="combat-1" :class="{'dark-mode': darkMode}">
                <span>PVE</span>
              </label>
              <label for="combat-2" class="combat-2" :class="{'dark-mode': darkMode}">
                <span>PVP</span>
              </label>
            </div>
            <hr>

            <!-- Gameplay -->
            <label class="title-filter">Gameplay</label>
            <Divider />
            <div class="d-flex flex-column" @change="getGames">
              <input type="radio" v-model="gameplay" id="gameplay-1" value="real-time" checked>
              <input type="radio" v-model="gameplay" id="gameplay-2" value="turn-based">
              <label for="gameplay-1" class="gameplay-1" :class="{'dark-mode': darkMode}">
                <span>Real Time</span>
              </label>
              <label for="gameplay-2" class="gameplay-2" :class="{'dark-mode': darkMode}">
                <span>Turn Based</span>
              </label>
            </div>
            <hr>

            <!-- Setting -->
            <label class="title-filter">Setting</label>
            <Divider />
            <div class="d-flex flex-column" @change="getGames">
              <input type="checkbox" v-model="setting_1" id="setting-1" value="anime">
              <input type="checkbox" v-model="setting_2" id="setting-2" value="fantasy">
              <input type="checkbox" v-model="setting_3" id="setting-3" value="horror">
              <input type="checkbox" v-model="setting_4" id="setting-4" value="sci-fi">
              <input type="checkbox" v-model="setting_5" id="setting-5" value="military">
              <label for="setting-1" class="setting-1" :class="{'dark-mode': darkMode}">
                <span>Anime</span>
              </label>
              <label for="setting-2" class="setting-2" :class="{'dark-mode': darkMode}">
                <span>Fantasy</span>
              </label>
              <label for="setting-3" class="setting-3" :class="{'dark-mode': darkMode}">
                <span>Horror</span>
              </label>
              <label for="setting-4" class="setting-4" :class="{'dark-mode': darkMode}">
                <span>Sci-Fi</span>
              </label>
              <label for="setting-5" class="setting-5" :class="{'dark-mode': darkMode}">
                <span>Military</span>
              </label>
            </div>
          </div>

          <!-- Tags -->
          <div class="box-filter" :class="{'dark-mode': darkMode}">
            <div class="box-tags">
              <label class="title-filter">Tags</label>
              <Divider />
              <div class="d-flex flex-column" @change="getGames">
                <div class="wrap-tag">
                  <input type="checkbox" v-model="tag_1" id="tag-1" value="mmofps" />
                  <input type="checkbox" v-model="tag_2" id="tag-2" value="sandbox" />
                  <input type="checkbox" v-model="tag_3" id="tag-3" value="open-world" />
                  <input type="checkbox" v-model="tag_4" id="tag-4" value="survival" />
                  <input type="checkbox" v-model="tag_5" id="tag-5" value="action-rpg" />
                  <input type="checkbox" v-model="tag_6" id="tag-6" value="mmorts" />
                  <input type="checkbox" v-model="tag_7" id="tag-7" value="pixel" />
                  <input type="checkbox" v-model="tag_8" id="tag-8" value="mmotps" />
                  <input type="checkbox" v-model="tag_9" id="tag-9" value="zombie" />
                  <input type="checkbox" v-model="tag_10" id="tag-10" value="first-person" />
                  <input type="checkbox" v-model="tag_11" id="tag-11" value="top-down" />
                  <input type="checkbox" v-model="tag_12" id="tag-12" value="tank" />
                  <input type="checkbox" v-model="tag_13" id="tag-13" value="space" />
                  <input type="checkbox" v-model="tag_14" id="tag-14" value="sailing" />
                  <input type="checkbox" v-model="tag_15" id="tag-15" value="side-scroller" />
                  <input type="checkbox" v-model="tag_16" id="tag-16" value="superhero" />
                  <input type="checkbox" v-model="tag_17" id="tag-17" value="permadeath" />
                  <input type="checkbox" v-model="tag_18" id="tag-18" value="action" />
                  <input type="checkbox" v-model="tag_19" id="tag-19" value="martial-arts" />
                  <input type="checkbox" v-model="tag_20" id="tag-20" value="flight" />
                  <input type="checkbox" v-model="tag_21" id="tag-21" value="low-spec" />
                  <label for="tag-1" class="tag-1" :class="{'dark-mode': darkMode}">
                    <span>MMOFPS</span>
                  </label>
                  <label for="tag-2" class="tag-2" :class="{'dark-mode': darkMode}">
                    <span>Sandbox</span>
                  </label>
                  <label for="tag-3" class="tag-3" :class="{'dark-mode': darkMode}">
                    <span>Openworld</span>
                  </label>
                  <label for="tag-4" class="tag-4" :class="{'dark-mode': darkMode}">
                    <span>Survival</span>
                  </label>
                  <label for="tag-5" class="tag-5" :class="{'dark-mode': darkMode}">
                    <span>Action RPG</span>
                  </label>
                  <label for="tag-6" class="tag-6" :class="{'dark-mode': darkMode}">
                    <span>MMORTS</span>
                  </label>
                  <label for="tag-7" class="tag-7" :class="{'dark-mode': darkMode}">
                    <span>Pixel</span>
                  </label>
                  <label for="tag-8" class="tag-8" :class="{'dark-mode': darkMode}">
                    <span>MMOTPS</span>
                  </label>
                  <label for="tag-9" class="tag-9" :class="{'dark-mode': darkMode}">
                    <span>Zombie</span>
                  </label>
                  <label for="tag-10" class="tag-10" :class="{'dark-mode': darkMode}">
                    <span>First-Person</span>
                  </label>
                  <label for="tag-11" class="tag-11" :class="{'dark-mode': darkMode}">
                    <span>Top-Down</span>
                  </label>
                  <label for="tag-12" class="tag-12" :class="{'dark-mode': darkMode}">
                    <span>Tank</span>
                  </label>
                  <label for="tag-13" class="tag-13" :class="{'dark-mode': darkMode}">
                    <span>Space</span>
                  </label>
                  <label for="tag-14" class="tag-14" :class="{'dark-mode': darkMode}">
                    <span>Sailing</span>
                  </label>
                  <label for="tag-15" class="tag-15" :class="{'dark-mode': darkMode}">
                    <span>Side Scroller</span>
                  </label>
                  <label for="tag-16" class="tag-16" :class="{'dark-mode': darkMode}">
                    <span>Superhero</span>
                  </label>
                  <label for="tag-17" class="tag-17" :class="{'dark-mode': darkMode}">
                    <span>Permadeath</span>
                  </label>
                  <label for="tag-18" class="tag-18" :class="{'dark-mode': darkMode}">
                    <span>Action</span>
                  </label>
                  <label for="tag-19" class="tag-19" :class="{'dark-mode': darkMode}">
                    <span>Martial Arts</span>
                  </label>
                  <label for="tag-20" class="tag-20" :class="{'dark-mode': darkMode}">
                    <span>Flight</span>
                  </label>
                  <label for="tag-21" class="tag-21" :class="{'dark-mode': darkMode}">
                    <span>Low-Spec</span>
                  </label>
                </div>
              </div>
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
import Divider from "@/components/Divider.vue";
import { URL_filter, Headers } from "@/api/getDataGames.js";

export default {
  data() {
    return {
      filteredGames: [],
      sortedBy: [
        { value: "", title: "Default" },
        { value: "release-date", title: "Release Date" },
        { value: "alphabetical", title: "Alphabetical" },
      ],
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
      sorted: "",
      genre: "shooter",
      platform: "all",
      graphics_1: null,
      graphics_2: null,
      combat_1: null,
      combat_2: null,
      gameplay: "real-time",
      setting_1: null,
      setting_2: null,
      setting_3: null,
      setting_4: null,
      setting_5: null,
      tag_1: null,
      tag_2: null,
      tag_3: null,
      tag_4: null,
      tag_5: null,
      tag_6: null,
      tag_7: null,
      tag_8: null,
      tag_9: null,
      tag_10: null,
      tag_11: null,
      tag_12: null,
      tag_13: null,
      tag_14: null,
      tag_15: null,
      tag_16: null,
      tag_17: null,
      tag_18: null,
      tag_19: null,
      tag_20: null,
      tag_21: null,
    };
  },
  components: {
    GameCard,
    Divider
  },
  props: ["darkMode"],
  methods: {
    async getGames() {
      const API_games = {
        method: "GET",
        url: URL_filter,
        params: { 
          'sort-by': this.sorted,
          platform: this.platform, 
          tag: [
            this.genre, 
            this.graphics_1 === true ? "3d" : "", 
            this.graphics_2 === true ? "2d" : "",
            this.combat_1 === true ? "pve" : "",
            this.combat_2 === true ? "pvp" : "",
            this.gameplay,
            this.setting_1 === true ? "anime" : "",
            this.setting_2 === true ? "fantasy" : "",
            this.setting_3 === true ? "horror" : "",
            this.setting_4 === true ? "sci-fi" : "",
            this.setting_5 === true ? "military" : "",
            this.tag_1 === true ? "mmofps" : "",
            this.tag_2 === true ? "sandbox" : "",
            this.tag_3 === true ? "open-world" : "",
            this.tag_4 === true ? "survival" : "",
            this.tag_5 === true ? "action-rpg" : "",
            this.tag_6 === true ? "mmorts" : "",
            this.tag_7 === true ? "pixel" : "",
            this.tag_8 === true ? "mmotps" : "",
            this.tag_9 === true ? "zombie" : "",
            this.tag_10 === true ? "first-person" : "",
            this.tag_11 === true ? "top-down" : "",
            this.tag_12 === true ? "tank" : "",
            this.tag_13 === true ? "space" : "",
            this.tag_14 === true ? "sailing" : "",
            this.tag_15 === true ? "side-scroller" : "",
            this.tag_16 === true ? "superhero" : "",
            this.tag_17 === true ? "permadeath" : "",
            this.tag_18 === true ? "action" : "",
            this.tag_19 === true ? "martial-arts" : "",
            this.tag_20 === true ? "flight" : "",
            this.tag_21 === true ? "low-spec" : "",
            ] 
          },
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

.box-filter {
  background: $light;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 2em;
  box-shadow: 0px 10px 15px 2px rgba(0, 0, 0, 0.12);
  transition: .2s ease-in-out;

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
    transition: .2s ease-in-out;

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

  .box-tags {
    padding: 10px 5px;

    .wrap-tag {
      display: flex;
      flex-direction: column;
      height: 230px;
      overflow: auto;
      scrollbar-width: none;
    }
  }
}

input[type="radio"] {
  display: none;
}

input[type="checkbox"] {
  display: none;
}
</style>