<template>
  <div class="checkout">
    <div class="checkout__main-col">
      <div class="checkout__header header-checkout">
        <div class="header-checkout__row">
          <div class="header-checkout__back-button">
            <VGoBackButton>Продолжить выбор</VGoBackButton>
          </div>
          <div class="header-checkout__info">
            <VSiteInfo></VSiteInfo>
          </div>
          <div class="header-checkout__block"></div>
        </div>
      </div>

      <div class="checkout__content">
        <slot></slot>
      </div>
    </div>

    <div class="checkout__products-col">
      <div class="checkout__products-info">
        <UserCart
          class="checkout__user-cart"
          :is-checkout-page="true"
        ></UserCart>
        <CheckoutDetails class="checkout__details"></CheckoutDetails>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserCart from "../components/UserCart/UserCart.vue";
import { useWindowSizeStore } from "../stores/windowSize";
import CheckoutDetails from "../components/UserCart/CheckoutDetails.vue";

const windowStore = useWindowSizeStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.checkout {
  flex: 1 1 auto;
  display: flex;

  // .checkout__main-col
  &__main-col {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    background-color: #f2f2f2;
  }

  // .checkout__header

  &__header {
  }

  // .checkout__products-col

  &__products-col {
    display: flex;
    flex: 0 0 426px;

    @media (max-width: 1500px) {
      flex: 0 0 340px;
    }

    @media (max-width: #{$tablet+px}) {
      display: none;
    }
  }

  // .checkout__products-info

  &__products-info {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 80px 66px 40px 66px;
    @media (max-width: 1500px) {
      padding: 40px 15px 40px 15px;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
    max-width: rem(760);
    margin: 0 auto;
    padding: rem(55) 15px rem(30) 15px;

    @media (max-width: #{$tablet+px}) {
      padding: rem(30) 15px rem(30) 15px;
    }

    @media (max-width: #{$tablet+px}) {
      max-width: 100%;
      margin: 0;
    }
  }

  // .checkout__user-cart

  &__user-cart {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  // .checkout__details

  &__details {
  }
}

.header-checkout {
  // .header-checkout__row
  &__row {
    min-height: 82px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: rem(10);
    padding: rem(5) 100px rem(5) 100px;
    border-bottom: 1px solid #a4acad;

    @media (max-width: #{$container+px}) {
      padding: rem(5) 20px rem(5) 20px;
    }
  }

  // .header-checkout__back-button

  &__back-button {
    justify-self: flex-start !important;
  }

  // .header-checkout__info

  &__info {
  }

  // .header-checkout__block

  &__block {
    flex: 0 0 120px;

    @media (max-width: #{$container+px}) {
      display: none;
    }
  }
}
</style>
