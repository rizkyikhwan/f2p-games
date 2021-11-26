<template>
  <main class="games mb-5">
    <div class="container">
      <SearchGames :darkMode="darkMode" />
      <div class="row">
        <div class="col-sm-6">
          <h4 class="title">All Free Games</h4>
          <Divider />
        </div>
        <div id="btn-wrap" class="btn-wrap col-sm-6">
          <button
            class="btn-category mr-3 px-3 btn-active"
            @click="buttonAll"
          >
            All
          </button>
          <button
            class="btn-category mr-3 px-3"
            @click="buttonPC"
          >
            PC
          </button>
          <button
            class="btn-category mr-3 px-3"
            @click="buttonBrowser"
          >
            Browser
          </button>
          <router-link :to="{name: 'GameFilter'}">
            <button
            class="btn-category px-3"
          >
            Filters
          </button>
          </router-link>
          
        </div>
      </div>
      <AllGames v-if="all" :darkMode="darkMode" />
      <PCGames v-if="pc" :darkMode="darkMode" />
      <BrowserGames v-if="browser" :darkMode="darkMode" />
    </div>
  </main>
</template>

<script>
import SearchGames from "@/components/SearchGames.vue";
import Divider from "@/components/Divider.vue";
import AllGames from "@/section/Games/AllGames.vue";
import PCGames from "@/section/Games/PCGames.vue";
import BrowserGames from "@/section/Games/BrowserGames.vue";

export default {
  data() {
    return {
      all: true,
      pc: false,
      browser: false,
    };
  },
  props: ["darkMode"],
  components: {
    SearchGames,
    Divider,
    AllGames,
    PCGames,
    BrowserGames,
  },
  methods: {
    buttonAll() {
      this.all = true;
      this.pc = false;
      this.browser = false;
    },
    buttonPC() {
      this.pc = true;
      this.all = false;
      this.browser = false;
    },
    buttonBrowser() {
      this.browser = true;
      this.all = false;
      this.pc = false;
    },
  },
  mounted() {
    const btnWrap = document.getElementById("btn-wrap");
    const btnCategory = btnWrap.getElementsByClassName("btn-category");

    for (let i = 0; i < btnCategory.length; i++) {
      btnCategory[i].addEventListener("click", function() {
        const currentActive = document.getElementsByClassName("btn-active");
        currentActive[0].className = currentActive[0].className.replace(" btn-active", "");
        this.className += " btn-active";
      })
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/_rootColor.scss";

.games {
  min-height: 100vh;
  margin-top: 100px;

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-size: 24px;
  }

  .btn-wrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .btn-category {
      font-family: "Saira", sans-serif;
      border: 2px solid $navyBlue;
      filter: drop-shadow(0 0 2px $navyBlue);
      border-radius: 40px;
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      transition: .2s ease-in-out;
    }

    .btn-active {
      background: rgba(33, 150, 243, 0.25);
    }
  }
}

@media (max-width: 576px) {
  .games {
    .btn-wrap {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      margin: 7.5px 0;
    }
  }
}
</style>