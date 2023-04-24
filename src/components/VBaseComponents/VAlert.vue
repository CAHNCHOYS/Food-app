<template>
  <div class="message" :class="positionType">
    <div class="message__body" :class="messageColorType">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  position: {
    type: String,
    default: "fixed",
  },
  type: {
    type: String,
    default: "success",
  },
});

const positionType = computed(() => ({
  fixed: props.position === "fixed",
  absolute: props.position === "absolute",
  static: props.position === "static",
}));

const messageColorType = computed(() => ({
  success: props.type === "success",
  error: props.type === "error",
  info: props.type === "info",
}));
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.message {
  z-index: 200;

  &.fixed {
    width: 420px;
    position: fixed;

    top: 15px;
    left: 15px;
    border-radius: rem(25);

    @media (max-width: #{$mobile+px}) {
      max-width: 280px;
    }
  }

  &.absolute {
    width: 90%;
    position: absolute;
    top: 10px;
    left: 10px;

    display: block;

    border-radius: rem(10);
  }

  &.static {
    margin: 0px 0px 0px 0px;
    width: 100%;
    .message__body {
      background-color: unset !important;
      color: crimson !important;
      padding: 0px 0px 0px 0px;
    }

    .message__body.success {
      color: green !important;
    }
  }

  // .message__body

  &__body {
    position: relative;
    z-index: 100;
    padding: rem(20);
    font-size: rem(20);
    line-height: 1.3;

    @media(max-width: #{$container+px}){ 
      padding: rem(10);
    }

    &.info {
      background-color: rgb(33, 168, 252);
      color: white;
    }

    &.success {
      background-color: rgb(39, 133, 39);
      color: white;
    }

    &.error {
      background-color: crimson;
      color: white;
    }
  }
}
</style>
