<template>
  <transition name="fade">
    <div v-if="scrollY" @click="scrollToTop">
      <button class="btn-to-top shadow-sm" :class="{ 'dark-mode': darkMode }">
        <font-awesome-icon
          class="icon"
          :icon="['fas', 'angle-up']"
        ></font-awesome-icon>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      scrollY: null,
    };
  },
  props: ["darkMode"],
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
      let currentScroll = document.documentElement.scrollTop,
        int = setInterval(frame, 10);

      function frame() {
        if (0 > currentScroll) {
          clearInterval(int);
        } else {
          currentScroll = currentScroll - 100;
          document.documentElement.scrollTop = currentScroll;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";

.btn-to-top {
  position: fixed;
  padding: 5px 11px;
  border-radius: 50%;
  bottom: 50px;
  right: 75px;
  border: 0;
  background: rgba($color: $backgroundDark, $alpha: 0.1);
  backdrop-filter: blur(2px);
  z-index: 9999;
  transition: all 0.2s ease-in-out;

  .icon {
    font-size: 32px;
    color: $navyBlue;
    filter: drop-shadow(0 0 4px $navyBlue);
  }

  &.dark-mode {
    background: rgba($color: $light, $alpha: 0.1);
  }
}

@media (max-width: 576px) {
  .btn-to-top {
    right: 25px;
  }
}
</style>
