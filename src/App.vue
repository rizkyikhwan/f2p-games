<template>
  <div id="app" :class="{'dark-mode' : darkMode}">
    <Navbar @darkMode="toggleDarkMode" :darkMode="darkMode" />
    <transition name="fadeInOutBottom" mode="out-in">
      <router-view :darkMode="darkMode" />
    </transition>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  data() {
    return {
      darkMode: false
    }
  },
  components: {
    Navbar
  },
  methods: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    }
  },
  watch: {
    darkMode() {
      localStorage.setItem("darkMode", JSON.stringify(this.darkMode));
    }
  },
  created() {
    this.darkMode = JSON.parse(localStorage.getItem("darkMode"));
  }
}
</script>

<style lang="scss">
</style>
