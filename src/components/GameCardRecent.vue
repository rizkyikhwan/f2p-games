<template>
  <div class="game-card mt-3">
    <div class="card" :class="{ 'dark-mode': darkMode }">
      <img
        :src="`${game.thumbnail}`"
        class="card-img-top"
        :alt="`${game.title}`"
      />
      <div
        class="card-body d-flex align-items-center"
        :class="{ 'dark-mode': darkMode }"
      >
        <span class="title">{{ game.title }}</span>
        <span v-if="this.game.platform === `PC (Windows)`">
          <font-awesome-icon :icon="['fab', 'windows']"></font-awesome-icon>
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
    font-family: "Saira", sans-serif;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    background: $light;
    color: $fontLight;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
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
        font-size: 12px;
        max-width: 100px;
      }
    }
  }
}
</style>
