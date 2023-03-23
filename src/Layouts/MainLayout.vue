<template>
  <div class="main">
    <aside class="main__menu-col" v-if="windowStore.getSize > 767">
      <div class="main__menu-wrapper">
        <TheSidebarMenu />
      </div>
    </aside>
    <div class="main__content">
      <TheHeader /> 
      <div class="main__body">
        <slot></slot>
      </div>

      <TheFooter />

    </div>
    <aside class="main__cart-col cart-col" v-if="windowStore.getSize >= 1312">
      <div class="cart-col__body">
        <UserCart /> 
      </div>
    </aside>

   <TheBottomMenu v-if="windowStore.getSize < 767.98" />
  </div>
</template>

<script setup>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import TheSidebarMenu from "@/components/TheSidebarMenu.vue";
import UserCart from "@/components/UserCart/UserCart.vue";
import TheBottomMenu from "../components/TheBottomMenu.vue";

import { useWindowSizeStore } from "../stores/windowSize.js";

const windowStore = useWindowSizeStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.main {
  flex: 1 1 auto;
  display: flex;
  position: relative;

  @media (max-width: #{$mobile+px}) {
    flex-direction: column;
  }

  // .main__menu-col
  &__menu-col {
    flex: 0 0 320px;

    padding: 0px 15px 20px 15px;
    align-self: stretch;

    @media (max-width: 1600px) {
      flex: 0 0 240px;
    }
  }

  // .main__content

  &__content {
    background-color: #f2f2f2;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
  }

  // .main__header

  &__header {
  }

  // .main__body

  &__body {
    padding: 30px 110px 0px 110px;
    flex: 1 1 auto;

    @media (max-width: 1700px) {
      padding: 30px 50px 0px 50px;
    }

    @media (max-width: #{$container+px}) {
      padding: rem(140) 15px 0px 15px;
    }

    @media (max-width: #{$mobile+px}) {
      padding: rem(110) 15px 0px 15px;
    }
  }

  // .main__cart-col
  &__cart-col {
    flex: 0 0 420px;

    @media (max-width: 1600px) {
      flex: 0 0 360px;
    }
  }

  // .main__menu-wrapper

  &__menu-wrapper {
    position: sticky;

    top: 50px;
  }
}

.cart-col {
  // .cart-col__body

  &__body {
    padding: 50px 40px 50px 40px;
    position: sticky;
    top: 20px;

    @media (max-width: 1600px) {
      padding: 50px 20px 50px 20px;
    }
  }
}
</style>
