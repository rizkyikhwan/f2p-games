<template>
  <div class="loading"></div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/_rootColor.scss";

.loading {
  display: block;
  width: 32px;
  height: 32px;
  margin: 10% auto 15%;
  padding: 30px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-left-color: $lightBlue1;
  border-right-color: $lightBlue1;
  filter: drop-shadow(0 0 2px $lightBlue1);
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  to{transform: rotateZ(720deg);}
}
</style>