<template>
  <span
    :class="{
      'text-holder-wrapper': showContent === false,
      center: center
    }"
    :style="styleObj"
  >
    <div class="text-holder" v-if="!showContent"></div>
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: ["width", "height", "center", "showContent"],
  computed: {
    styleObj() {
      if (this.showContent) {
        return {
          width: this.width,
          hetight: this.height
        };
      } else {
        return null;
      }
    }
  }
};
</script>

<style lang="scss">
.text-holder-wrapper {
  display: block;
  transform: translate3d(0, 0, 0);
  &.center {
    margin: 0 auto;
  }
  .text-holder {
    background-color: rgba(136, 136, 136, 0.2);
    height: 100%;
  }
}
</style>
