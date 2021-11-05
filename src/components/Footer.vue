<template>
  <div class="footer" :class="{ 'dark-mode': darkMode }">
    <div class="container d-flex flex-column align-items-center">
      <img v-if="!darkMode" src="../assets/logo/logo-light.png" />
      <img v-else src="../assets/logo/logo-dark.png" />
      <router-link :to="{name: 'About'}" class="nav-link" :class="{'dark-mode': darkMode}">About</router-link>
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
            :icon="[
              `${icon.prefix}`,
              `${icon.iconName}`,
            ]"
          ></font-awesome-icon>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

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
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/_rootColor.scss";
@import "../assets/sass/_font.scss";

.footer {
  font-family: "Montserrat", sans-serif;
  background: $grayVeryLight;
  padding: 25px 0;
  transition: background 0.2s ease-in-out;

  &.dark-mode {
    background: $backgroundDarkDeep;
  }

  img {
    max-width: 250px;
    padding: 10px 0 25px;
    pointer-events: none;
    animation: pulse 2s infinite;
    filter: drop-shadow(0 0 2px $navyBlue);
  }

  .nav-link {
    text-align: center;
    padding: 5px 0 15px;
    color: $fontLight;
    text-decoration: none;

    &.dark-mode {
      color: $fontDark;
      filter: drop-shadow(0 0 2px);
    }
  }

  span {
    font-size: 14px;
  }

  .link {
    color: $fontLight;
    transition: 0.2s ease-in-out;

    .icon {
      margin: 0 1rem;
      animation: pulse 1.5s ease-in-out;
    }

    &.dark-mode {
      color: $fontDark;
      filter: drop-shadow(0 0 2px $navyBlue);
    }
  }
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

</style>