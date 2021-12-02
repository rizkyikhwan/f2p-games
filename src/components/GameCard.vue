<template>
  <div class="game-card my-4">
    <div class="card" :class="{ 'dark-mode': darkMode }">
      <img
        :src="`${game.thumbnail}`"
        class="card-img-top"
        :alt="`${game.title}`"
      />
      <div class="card-body">
        <p class="title">{{ game.title }}</p>
        <p class="card-text">
          {{ game.short_description }}
        </p>
        <p class="text-muted card-publisher">{{ game.publisher }}</p>
      </div>
      <div class="card-footer" :class="{ 'dark-mode': darkMode }">
        <span>{{ game.genre }}</span>
        <span v-if="this.game.platform === `PC (Windows)`">
          <font-awesome-icon
            :icon="['fab', 'windows']"
            class="icon-social"
          ></font-awesome-icon>
        </span>
        <span v-else>
          <font-awesome-icon
            :icon="['fas', 'window-maximize']"
          ></font-awesome-icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["game", "darkMode"],
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/_rootColor.scss";
@import "@/assets/sass/_font.scss";

.card {
  border: 0;
  background: $light;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  transition: 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.2);
    transform: scale(1.02);
  }

  .card-img-top {
    filter: saturate(25%);
    transition: 0.2s ease-in-out;
  }
  .card-body {
    padding: 15px 10px;

    .title {
      font-family: "Saira", sans-serif;
      font-size: 18px;
      font-weight: 600;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .card-text {
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 0;
    }

    .card-publisher {
      font-size: 12px;
      margin: 5px 0 0 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    padding: 5px 15px;
    color: $fontLight;

    &.dark-mode {
      color: $fontDark;
    }
  }

  &:hover .card-img-top {
    filter: saturate(100%);
  }

  &.dark-mode {
    background: $bgCard;
  }
}

@media (max-width: 992px) {
  .card {
    .card-img-top {
      filter: saturate(100%);
    }
    .card-body {
      .title {
        font-size: 17px;
      }
    }

    .card-footer {
      span {
        font-size: 14px;
      }
    }
  }
}

@media (max-width: 576px) {
  .card:hover {
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
    transform: scale(1);
  }
}
</style>
