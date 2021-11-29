<template>
  <main class="home">
    <Hero :darkMode="darkMode" />
    <RecentlyAdd :darkMode="darkMode" />
    <MostPlayedPc :darkMode="darkMode" />
    <MostPlayedBrowser :darkMode="darkMode" />
    <WhatsNew :darkMode="darkMode" />
  </main>
</template>

<script>
import Hero from "@/section/Home/Hero.vue";
import RecentlyAdd from "@/section/Home/RecentlyAdd.vue";
import MostPlayedPc from "@/section/Home/MostPlayedPc.vue";
import MostPlayedBrowser from "@/section/Home/MostPlayedBrowser.vue";
import WhatsNew from "@/section/Home/WhatsNew.vue";

export default {
  name: "Home",
  props: ["darkMode"],
  components: {
    Hero,
    RecentlyAdd,
    MostPlayedPc,
    MostPlayedBrowser,
    WhatsNew,
  },
};
</script>
