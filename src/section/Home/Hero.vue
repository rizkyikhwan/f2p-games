<template>
  <section id="hero" class="hero" :class="{ 'dark-mode': darkMode }">
    <div class="container">
      <div class="row mt-3">
        <div class="col-md-6 order-1 mb-5">
          <div class="d-flex">
            <div class="justify-content-center align-self-center">
              <h1 class="title">Free games to play</h1>
              <p class="lead mb-4">
                Cari dan temukan game <span>Free-to-play</span> terbaik kalian di <span>PC</span> dan <span>Browser</span> !
              </p>
              <div class="row justify-content-center">
                <div class="col">
                  <router-link
                    :to="{ name: 'Games' }"
                    class="button"
                    :class="{ 'dark-mode': darkMode }"
                    >See All Free Games</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["darkMode"],
};
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";
@import "./src/assets/sass/_font.scss";

#hero {
  font-family: "Roboto", sans-serif;
  min-height: 90vh;
  border-bottom: 5px solid $backgroundLight;
  background-image: linear-gradient(
      rgba($color: $backgroundLight, $alpha: 0.5),
      rgba($color: $backgroundLight, $alpha: 1)
    ),
    url(../../assets/images/hero/hero-image2.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &.dark-mode {
    border-bottom: 5px solid $backgroundDark;
    background-image: linear-gradient(
        rgba($color: $backgroundDark, $alpha: 0.75),
        rgba($color: $backgroundDark, $alpha: 1)
      ),
      url(../../assets/images/hero/hero-image2.jpg);
  }

  .title {
    font-family: "Saira", sans-serif;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 50%;
  }

  span {
    font-weight: 700;
    color: $navyBlue;
  }

  .button {
    font-family: "Saira", sans-serif;
    color: $fontLight;
    background: linear-gradient(45deg, $blue2, $lightBlue2 50%);
    border-radius: 4px;
    padding: 14px 40px;
    cursor: pointer;
    height: 32px;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    text-decoration: none;
    letter-spacing: 0.5px;
    box-shadow: 2px 2px $blue, 3px 3px $blue, 4px 4px $blue;
    filter: drop-shadow(0 0px 2px $lightBlue1);
    transition: all 0.2s ease-in-out;

    &:hover {
      color: $fontDark;
      box-shadow: none;
      transform: translateY(-3px);
    }

    &.dark-mode {
      background: linear-gradient(45deg, $lightBlue2, $blue2 50%);
      color: $fontDark;

      &:hover {
        color: $fontLight;
      }
    }
  }

  .lead {
    max-width: 23em;
    font-weight: 400;
  }
}

@media (max-width: 992px) {
  #hero {
    min-height: 60vh;

    .title {
      font-size: 32px;
    }

    .lead {
      font-size: 16px;
      max-width: 300px;
    }
  }
}
</style>