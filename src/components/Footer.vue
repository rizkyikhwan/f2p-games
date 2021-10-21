<template>
  <div class="footer" :class="{ 'dark-mode': darkMode }">
    <div class="container d-flex flex-column align-items-center">
      <img v-if="!darkMode" src="../assets/logo/logo-light.png" class="logo" />
      <img v-else src="../assets/logo/logo-dark.png" class="logo" />
      <span>© 2021 Rizky Ikhwan</span>
      <div class="pt-3">
        <a
          v-for="(icon, index) in icons"
          :key="index"
          :href="`${icon.link}`"
          target="_blank"
          class="link"
          :class="{ 'dark-mode': darkMode }"
        >
          <font-awesome-icon
            class="h4 icon"
            :icon="{
              prefix: `${icon.prefix}`,
              iconName: `${icon.iconName}`,
            }"
          ></font-awesome-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  data() {
    return {
      icons: [
        {
          prefix: "fab",
          iconName: "linkedin",
          link: "https://www.linkedin.com/in/rizkyikhwan/",
        },
        {
          prefix: "fab",
          iconName: "github",
          link: "https://github.com/rizkyikhwan",
        },
        {
          prefix: "fab",
          iconName: "instagram",
          link: "https://www.instagram.com/rizkykhwan_/",
        },
      ],
    };
  },
  props: ["darkMode"],
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/_rootColor.scss";
@import "../assets/sass/_font.scss";

.footer {
  font-family: "Montserrat", sans-serif;
  background: $grayLight;
  padding: 25px 0;
  transition: background 0.2s ease-in-out;

  &.dark-mode {
    background: $backgroundDarkDeep;
  }

  .logo {
    max-width: 250px;
    padding: 10px 0 25px;
    pointer-events: none;
    animation: pulse 2s infinite;
    filter: drop-shadow(0 0 2px $navyBlue);
  }

  span {
    font-size: 14px;
  }

  @keyframes pulse {
    0% {
      filter: drop-shadow(0 0 2px $navyBlue);
    }
    50% {
      filter: drop-shadow(0 0 6px $navyBlue);
    }
    100% {
      filter: drop-shadow(0 0 2px $navyBlue);
    }
  }

  .link {
    color: $fontLight;
    transition: 0.2s ease-in-out;

    .icon {
      margin: 0 1rem;
    }

    &.dark-mode {
      color: $fontDark;
      filter: drop-shadow(0 0 2px);
    }
  }
}
</style>