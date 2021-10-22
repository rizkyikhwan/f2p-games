<template>
  <div class="home">
    <Hero :darkMode="darkMode" />
    <Newcomers :darkMode="darkMode" />
    <MostPlayedPc :darkMode="darkMode" />
    <MostPlayedBrowser :darkMode="darkMode" />
    <News :darkMode="darkMode" />
  </div>
</template>

<script>
import Hero from "@/section/Home/Hero.vue";
import Newcomers from "@/section/Home/Newcomers.vue";
import MostPlayedPc from "@/section/Home/MostPlayedPc.vue";
import MostPlayedBrowser from "@/section/Home/MostPlayedBrowser.vue";
import News from "@/section/Home/News.vue";

export default {
  name: "Home",
  props: ['darkMode'],
  components: {
    Hero,
    Newcomers,
    MostPlayedPc,
    MostPlayedBrowser,
    News
  },
};
</script>
