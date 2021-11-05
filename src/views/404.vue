<template>
  <main class="not_found">
    <div class="container">
      <div class="wrap">
      <div class="not__found">
        <h1 class="not___found">
          404
        </h1>
        <p class="text-center">Oops! Something is wrong.</p>
      </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/sass/_rootColor.scss";

.not_found {
  font-family: "Montserrat", sans-serif;
  margin-top: 75px;
  min-height: 75vh;


  .wrap {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .not__found {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      .not___found {
        color: $navyBlue;
        font-size: 10rem;
        font-weight: 700;
      }
    }
  }

}
</style>