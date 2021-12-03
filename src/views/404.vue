<template>
  <main class="not_found d-flex flex-column justify-content-center">
    <div class="container">
      <h1 class="not__found text-center">404</h1>
      <p class="text-center">
        Oops! Something is wrong. <br>
        <span
          class="link"
          :class="{ 'dark-mode' : darkMode }"
          @click="goHome"
          ><font-awesome-icon
            :icon="['fas', 'arrow-left']"
          ></font-awesome-icon>
          Go Home
        </span>
      </p>
    </div>
  </main>
</template>

<script>
export default {
  props: ['darkMode'],
  methods: {
    goHome() {
      this.$router.push({name: 'Home'})
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";

.not_found {
  font-family: "Montserrat", sans-serif;
  padding-top: 75px;
  min-height: 90vh;

  .not__found {
    color: $navyBlue;
    font-size: 7.5rem;
    font-weight: 700;
  }
}
</style>
