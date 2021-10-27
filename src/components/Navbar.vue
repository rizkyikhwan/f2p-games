<template>
  <nav
    class="navbar d-flex align-items-center justify-content-between shadow py-3 fixed-top"
    :class="{ 'dark-mode': darkMode }"
  >
    <div class="container">
      <div>
        <img v-if="!darkMode" src="../assets/logo/logo-light.png" class="logo" />
        <img v-else src="../assets/logo/logo-dark.png" class="logo" />
      </div>

      <!-- Desktop -->
      <div class="d-flex" v-if="!mobile">
        <router-link :to="{ name: 'Home' }" class="nav-link" :class="{ 'dark-mode': darkMode }">Home</router-link>
        <router-link :to="{ name: 'Games' }" class="nav-link" :class="{ 'dark-mode': darkMode }">Games</router-link>
        <router-link :to="{ name: 'About' }" class="nav-link" :class="{ 'dark-mode': darkMode }">About</router-link>
      </div>
      <button class="d-flex align-items-center icon-wrap" @click="$emit('darkMode')" v-if="!mobile">
        <font-awesome-icon
          class="icon sun"
          v-if="!darkMode"
          :icon="[ 'fas', 'sun' ]"
        ></font-awesome-icon>
        <font-awesome-icon
          class="icon moon"
          v-else
          :icon="[ 'fas', 'moon' ]"
        ></font-awesome-icon>
      </button>

      <!-- Mobile -->
      <div class="menu-toggle" v-show="mobile" @click="toggleMobileNav">
        <span class="bar" :class="{'dark-mode': darkMode}"></span>
        <span class="bar" :class="{'dark-mode': darkMode}"></span>
        <span class="bar" :class="{'dark-mode': darkMode}"></span>
      </div>
      <transition name="slideLeft">
        <ul class="mobile-nav" v-show="mobileNav" :class="{'dark-mode': darkMode}">
          <font-awesome-icon @click="toggleMobileNav" class="icon-close" :class="{'dark-mode': darkMode}" :icon="['fas', 'times']"></font-awesome-icon>
          <router-link :to="{ name: 'Home' }" class="nav-link mt-3" :class="{ 'dark-mode': darkMode }">Home</router-link>
          <router-link :to="{ name: 'Games' }" class="nav-link" :class="{ 'dark-mode': darkMode }">Games</router-link>
          <router-link :to="{ name: 'About' }" class="nav-link" :class="{ 'dark-mode': darkMode }">About</router-link>
          <button class="d-flex align-items-center icon-wrap" :class="{ 'dark-mode': darkMode }" @click="$emit('darkMode')" style="margin: 0 auto">
            <font-awesome-icon class="icon sun" v-if="!darkMode" :icon="[ 'fas', 'sun' ]"></font-awesome-icon>
            <font-awesome-icon class="icon moon" v-else :icon="[ 'fas', 'moon' ]"></font-awesome-icon>
          </button>
        </ul>
      </transition>
      <transition name="overlay">
        <div class="overlay" v-show="mobileNav" @click="toggleMobileNav"></div>
      </transition>
    </div>
  </nav>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data() {
    return {
      mobileNav: null,
      mobile: null,
      windowWith: null,
    };
  },
  props: ["darkMode"],
  components: {
    FontAwesomeIcon,
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  methods: {
    checkScreen() {
      this.windowWith = window.innerWidth;
      if (this.windowWith <= 768) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    },
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";
@import "./src/assets/sass/_font.scss";

.navbar {
  font-family: "Saira", sans-serif;
  background-color: $light;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  transition: 0.3s ease-in-out;

  &.dark-mode {
    background-color: $backgroundDark2;
  }
}

.nav-link {
  color: $navyBlue;
  opacity: 0.5;
}

.logo {
  width: 100px;
  filter: drop-shadow(0 0 2px $navyBlue);
  pointer-events: none;
}

.icon-wrap {
  box-shadow: none;
  border: 0;
  border-radius: 25%;
  padding: 5px;
  background: none;
  transition: 0.2s ease;

  &:hover {
    background: $gray;
  }

  .icon {
    font-size: 20px;
    cursor: pointer;
  }

  .sun {
    color: $yellow;
    filter: drop-shadow(0 0px 5px);
  }

  .moon {
    color: $navyBlue;
    filter: drop-shadow(0 0px 5px);
  }
}

.router-link-exact-active {
  opacity: 1;
  filter: drop-shadow(0 0px 1px $navyBlue);
  transition: 0.5s ease;

  &.dark-mode {
    filter: drop-shadow(0 0px 6px);
  }
}

.mobile-nav {
  padding: 25px;
  width: 70%;
  max-width: 250px;
  position: fixed;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $light;
  top: 0;
  right: 0;
  transition: 0.2s ease-in-out;
  z-index: 100;

  .nav-link {
    text-align: center;
    padding: 15px 0;
    color: $navyBlue;
    text-decoration: none;
  }

  .icon-close {
    color: $navyBlue;
    cursor: pointer;
    font-size: 24px;
    filter: drop-shadow(0 0px 1px);
  }

  &.dark-mode {
    background-color: $backgroundDark;

    .icon-close {
      color: $light;
    }
  }
}

.menu-toggle {
  cursor: pointer;
  
  .bar {
    display: block;
    border-radius: 25px;
    width: 25px;
    height: 3px;
    margin: 5px 0 5px auto;
    background: $navyBlue;
    filter: drop-shadow(0 0px 1px $navyBlue);

    &:nth-child(2) {
      width: 17.5px;
    }
    
    &:last-child {
      width: 10px;
    }

    &.dark-mode {
      background: $navyBlue;
      filter: drop-shadow(0 0px 4px $navyBlue);
    }
  }
}

.overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  filter: saturate(50%);
  background-color: rgba($color: $backgroundDark, $alpha: .5);
  backdrop-filter: blur(2px);
  z-index: 99;
}

@media (max-width: 768px) {
  .icon-wrap {
    position: absolute;
    top: 22px;
    right: 25px;
    background: $gray;
    transition: 0.2s ease-in-out;

    &.dark-mode {
      background: none;
    }
  }
}
</style>