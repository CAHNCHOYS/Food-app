<template>
  <div>
    <div class="message" :class="positionType">
      <div class="message__body" :class="messageColorType">
        <slot></slot>
      </div>
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
  same: props.type === "same",
}));
</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

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
    margin: rem(15) 0px 0px 0px;
    width: 100%;
    border-radius: rem(10);
  }



  // .message__body

  &__body {
    position: relative;
    z-index: 100;
    padding: rem(10);
    font-size: rem(20);

    &.same {
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
