<template>
  <div class="home">
    <Hero :darkMode="darkMode" />
    <Newcomers :darkMode="darkMode" />
    <MostPlayedPc :darkMode="darkMode" />
    <MostPlayedBrowser :darkMode="darkMode" />
  </div>
</template>

<script>
import Hero from "@/section/Home/Hero.vue";
import Newcomers from "@/section/Home/Newcomers.vue";
import MostPlayedPc from "@/section/Home/MostPlayedPc.vue";
import MostPlayedBrowser from "@/section/Home/MostPlayedBrowser.vue";

export default {
  name: "Home",
  props: ['darkMode'],
  components: {
    Hero,
    Newcomers,
    MostPlayedPc,
    MostPlayedBrowser,
  },
};
</script>
