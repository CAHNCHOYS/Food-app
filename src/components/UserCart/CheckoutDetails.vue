<template>
  <div class="checkout-details">
    <div class="checkout-details__all-deatils">
      <div class="checkout-details__detail-row">
        <div class="checkout-details__detail-text">
          <p>{{ userCartStore.cartItems.length }} товар(ов)</p>
        </div>
        <div class="checkout-details__detail-value">
          <p>{{ userCartStore.getAllProductsPrice }}₽</p>
        </div>
      </div>
      <div class="checkout-details__detail-row">
        <div class="checkout-details__detail-text">Скидка</div>
        <div class="checkout-details__detail-value">
          {{ !userCartStore.isPromoActive ? 0 : 100 }}₽
        </div>
      </div>
      <div class="checkout-details__detail-row">
        <div class="checkout-details__detail-text">Доставка</div>
        <div class="checkout-details__detail-value">
          {{ getTotalPrice >= 7000 ? "Бесплатно" : 200 }}
        </div>
      </div>

      <div class="checkout-details__detail-row">
        <div
          class="checkout-details__detail-text checkout-details__detail-text_res"
        >
          Итого
        </div>
        <div
          class="checkout-details__detail-value checkout-details__detail-value_res"
        >
          {{ getTotalPrice }}₽
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { useUserCartStore } from "../../stores/userCart";
const userCartStore = useUserCartStore();

const getTotalPrice = computed(() => {
  let productsPrice = userCartStore.getAllProductsPrice;
  if (productsPrice >= 7000) {
    return userCartStore.isPromoActive ? productsPrice - 100 : productsPrice;
  } else {
    return userCartStore.isPromoActive
      ? productsPrice + 200 - 100
      : productsPrice + 200;
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.checkout-details {
  // .checkout-details__all-deatils
  &__all-deatils {
    display: flex;
    flex-direction: column;
  }

  // .checkout-details__detail-row

  &__detail-row {
    border-bottom: rem(0.5) solid #a4acad;
    padding: rem(10) 0px;
    display: flex;
    align-items: center;
    font-weight: 500;
    line-height: calc(22 / 18);
  }

  // .checkout-details__detail-text

  &__detail-text {
    flex: 1 1 50%;
    text-align: center;

    // .checkout-details__detail-text_res
    &_res {
      color: #ff9846;
    }

    padding: 0px rem(10) 0px 0px;
  }

  // .checkout-details__detail-value

  &__detail-value {
    flex: 1 1 50%;
    padding: 0px 0px 0px rem(10);
    text-align: center;
    // .checkout-details__detail-value_res

    &_res {
      color: #ff9846;
    }
  }
}
</style>
