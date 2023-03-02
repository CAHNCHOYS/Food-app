<template>
  <div class="site-load">
    <div class="site-load__body">
      <div class="site-load__content">
        <div class="site-load__loader"></div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.site-load {
  display: flex;

  min-height: 100vh;
  background-color: rgba($color: whitesmoke, $alpha: 0.96);

  // .site-load__body
  &__body {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: rem(20) 0px;
  }

  // .site-load__content

  &__content {
    padding: 0px 15px;
  }

  // .site-load__loader

  &__loader {
    position: relative;
    display: inline-block;

    width: 280px;
    height: 280px;

    border: 2px solid #0cf;
    border-radius: 50%;

    animation: spin 0.75s infinite linear;

    &::before,
    &::after {
      left: -2px;
      top: -2px;
      display: none;
      position: absolute;
      content: "";
      width: inherit;
      height: inherit;
      border: inherit;
      border-radius: inherit;
    }

    @media (max-width: #{$mobileSmall+px}) {
      width: 240px;
      height: 240px;
      margin: 0;
    }

    border-top-width: 0;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
