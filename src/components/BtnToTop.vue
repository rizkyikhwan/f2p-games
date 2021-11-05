<template>
<transition name="fade">
  <div v-if="scrollY" @click="scrollToTop">
    <button class="btn-to-top shadow-sm" :class="{'dark-mode': darkMode}">
      <font-awesome-icon class="icon" :icon="['fas', 'angle-up']"></font-awesome-icon>
    </button>
  </div>
</transition>
</template>

<script>

export default {
  data() {
    return {
      scrollY: null
    }
  },
  props: ['darkMode'],
  created() {
    window.addEventListener("scroll", this.scrollScreen);
  },
  methods: {
    scrollScreen() {
      if (window.scrollY > 250) {
        this.scrollY = true;
        return;
      } else {
        this.scrollY = false;
        return;
      }
    },
    scrollToTop() {
      document.documentElement.scrollTop = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";

.btn-to-top {
  position: fixed;
  padding: 5px 11px;
  border-radius: 50%;
  bottom: 50px;
  right: 75px;
  border: 0;
  background: rgba($color: $backgroundDark, $alpha: 0.1);
  backdrop-filter: blur(2px);
  z-index: 99;
  transition: all 0.2s ease-in-out;

  .icon {
    font-size: 32px;
    color: $navyBlue;
    filter: drop-shadow(0 0 4px $navyBlue);
  }

  &.dark-mode {
    background: rgba($color: $light, $alpha: 0.1);
  }

  &:focus {
    animation: clicked .2s ease;
  }
}

@media (max-width: 576px) {
  .btn-to-top {
    right: 25px;
  }
}
</style>