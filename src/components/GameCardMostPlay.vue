<template>
  <div class="game-card mt-3">
    <div class="card" :class="{ 'dark-mode': darkMode }">
      <div class="overlay-img" :class="{ 'dark-mode': darkMode }">
        <p class="title" :class="{ 'dark-mode': darkMode }">{{ game.title }}</p>
        <p
          class="icon"
          v-if="this.game.platform === `PC (Windows)`"
          :class="{ 'dark-mode': darkMode }"
        >
          <font-awesome-icon
            :icon="[ 'fab', 'windows' ]"
          ></font-awesome-icon>
        </p>
        <p class="icon" v-else :class="{ 'dark-mode': darkMode }">
          <font-awesome-icon
            :icon="[ 'fas', 'window-maximize' ]"
          ></font-awesome-icon>
        </p>
        <p class="platform" :class="{ 'dark-mode': darkMode }">
          {{ game.platform }}
        </p>
      </div>
      <img
        :src="`${game.thumbnail}`"
        class="card-img-top"
        :alt="`${game.title}`"
      />
      <div class="d-flex align-items-center d-sm-block d-md-none">
        <div class="card-body" :class="{ 'dark-mode': darkMode }">
          <span class="title">{{ game.title }}</span>
          <span v-if="this.game.platform === `PC (Windows)`">
            <font-awesome-icon
              :icon="[ 'fab', 'windows' ]"
            ></font-awesome-icon>
          </span>
          <span v-else>
            <font-awesome-icon
              :icon="[ 'fas', 'window-maximize' ]"
            ></font-awesome-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  props: ["game", "darkMode"],
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";
@import "./src/assets/sass/_font.scss";

.card {
  border: 0;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  transition: 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }

  .card-img-top {
    border-bottom-left-radius: calc(0.25rem - 1px);
    border-bottom-right-radius: calc(0.25rem - 1px);
    transition: 0.2s ease-in-out;
  }

  .overlay-img {
    visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.1s;
    z-index: 1;

    .title {
      font-family: "Saira", sans-serif;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      opacity: 0;
      transform: translateY(195px);
      transition: 0.5s ease;
      transition-delay: 0.2s;
    }

    .icon {
      text-align: center;
      transform: translateY(175px);
      opacity: 0;
      transition: 0.5s ease;
    }

    .platform {
      text-align: center;
      transform: translateY(175px);
      opacity: 0;
      transition: 0.5s ease;
    }

    &:hover .title {
      opacity: 1;
      transform: translateY(150px);
    }

    &:hover .icon {
      opacity: 1;
      transform: translateY(50px);
    }

    &:hover .platform {
      opacity: 1;
      transform: translateY(35px);
    }

    &:hover {
      transform: scale(1.0039);
    }
  }

  .card-body {
    font-family: "Saira", sans-serif;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background: $light;
    color: $fontLight;
    border-bottom-left-radius: 2.5px;
    border-bottom-right-radius: 2.5px;
    transition: 0.2s ease-in-out;

    .title {
      font-weight: 600;
      max-width: 175px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &.dark-mode {
      background: $bgCard;
      color: $fontDark;
    }
  }
}

@media (min-width: 992px) {
  .card {
    &:hover .overlay-img {
      visibility: visible;
      background: linear-gradient(
        rgba($color: $backgroundLight, $alpha: 0.3),
        rgba($color: $backgroundLight, $alpha: 1)
      );
      backdrop-filter: blur(2px);
      border-radius: calc(0.25rem - 1px);
      animation: fade 0.5s ease-in-out;

      &.dark-mode {
        background: linear-gradient(
          rgba($color: $backgroundDark, $alpha: 0.3),
          rgba($color: $backgroundDark, $alpha: 1)
        );
      }
    }
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}

@media (max-width: 992px) {
  .card {
    .card-img-top {
      filter: saturate(100%);
    }

    .card-body {
      font-size: 18px;
      
      .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
}

@media (max-width: 768px) {
  .card {
    .card-img-top {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
}
</style>