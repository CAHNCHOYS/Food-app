<template>
  <div class="cart-page">
    <div class="cart-page__body">
      <UserCart /> 
    </div>
  </div>
</template>

<script setup>
import UserCart from "@/components/UserCart/UserCart.vue";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.cart-page {
  // .cart-page__body

  &__body {
    padding: 0px 0px rem(40) 0px;
  }
}
</style>
