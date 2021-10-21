<template>
  <div id="app" :class="{'dark-mode' : darkMode}">
    <Navbar @darkMode="toggleDarkMode" :darkMode="darkMode" />
    <transition name="fadeInOutTop" mode="out-in">
      <router-view :darkMode="darkMode" />
    </transition>
    <BtnToTop :darkMode="darkMode" />
    <Footer :darkMode="darkMode" />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import BtnToTop from "@/components/BtnToTop.vue";

export default {
  data() {
    return {
      darkMode: false
    }
  },
  components: {
    Navbar,
    Footer,
    BtnToTop
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
