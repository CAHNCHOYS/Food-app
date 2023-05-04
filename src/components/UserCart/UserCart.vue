<template>
  <div class="user-cart">
    <LoadingGif v-if="userCartStore.isProductsLoading" />
    <div class="user-cart__body" v-if="userAuthStore.isUserLoggedIn">
      <VErrorMessage
        v-if="userCartStore.isCartProductsErr"
        :err-message="userCartStore.loadErrorMessage"
      />

      <div
        class="user-cart__empty-cart empty-cart"
        v-else-if="!userCartStore.cartItems.length"
      >
        <div class="empty-cart__body">
          <div class="empty-cart__title">Ваша корзина пуста.</div>
          <div class="empty-cart__text">Добавьте же скорее что-нибудь!</div>
        </div>

        <div class="empty-cart__button">
          <span class="btn"> Бесплатная доставка от 7000руб </span>
        </div>
      </div>

      <div class="user-cart__all-items" v-else="userCartStore.cartItems.length">
        <Transition name="cart-message">
          <div class="user-cart__message" v-if="isItemRemoved">
            Товар был удален из корзины!
          </div>
        </Transition>

        <div class="user-cart__cart-header">Корзина</div>
        <div class="user-cart__cart-items">
          <TransitionGroup name="list">
            <div
              class="user-cart__cart-item"
              v-for="product in userCartStore.cartItems"
              :key="product.product_id"
            >
              <UserCartProduct :product="product" />
            </div>
          </TransitionGroup>
        </div>

        <div class="user-cart__total" v-if="!isCheckoutPage">
          <div class="user-cart__price black-text">
            {{ userCartStore.getAllProductsPrice }}₽
          </div>
          <router-link class="btn" to="/checkout"> Оформить заказ </router-link>
        </div>
      </div>
    </div>

    <div class="user-cart__no-logged-in" v-else>
      <div class="user-cart__no-login-message">
        Для получения доступа к корзине необходимо сначала авторизоваться!
      </div>
      <div class="user-cart__login">
        <RouterLink class="btn" to="/login">Авторизоваться</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserAuthStore } from "@/stores/userAuth";
import { useUserCartStore } from "@/stores/userCart";
import UserCartProduct from "./UserCartProduct.vue";

const props = defineProps({
  isCheckoutPage: {
    type: Boolean,
    default: false,
  },
});

const userAuthStore = useUserAuthStore();
const userCartStore = useUserCartStore();

const isItemRemoved = ref(false);

watch(
  () => userCartStore.cartItems.length,
  (newValue, oldValue) => {
    if (newValue < oldValue) {
      isItemRemoved.value = true;
      setTimeout(() => (isItemRemoved.value = false), 2500);
    }
  }
);


</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.user-cart {
  // .user-cart__body
  &__body {
  }

  // .user-cart__empty-cart

  &__empty-cart {
    background: #f2f2f2;
    border-radius: rem(5);

    @media (max-width: #{$container+px}) {
      background-color: white;
    }
  }

  // .user-cart__all-items

  &__all-items {
    position: relative;
  }

  // .user-cart__cart-header

  &__cart-header {
    min-height: rem(50);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: rem(24);
    line-height: calc(30 / 24);

    color: #000000;
    font-weight: 500;

    background: #f2f2f2;
    border-radius: rem(5);
    margin: 0px 0px rem(20) 0px;

    @media (max-width: #{$container+px}) {
      background-color: cornflowerblue;
      color: white;
    }
  }

  // .user-cart__cart-items

  &__cart-items {
    display: flex;
    flex-direction: column;
    row-gap: rem(10);
    margin: 0px 0px rem(30) 0px;

    @media (max-width: #{$mobileSmall+px}) {
      margin: 0px 0px rem(20) 0px;
    }

    scrollbar-width: thin;
    scrollbar-color: #f46d40 transparent;

    @media (min-width: #{$container+px}) {
      max-height: 70vh;
      overflow: auto;
    }

    /* для Chrome/Edge/Safari */
    &::-webkit-scrollbar {
      height: 5px;
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: lightgray;
      border-radius: 5px;
    }
  }

  // .user-cart__cart-item

  &__cart-item {
  }

  // .user-cart__no-logged-in

  &__no-logged-in {
  }

  // .user-cart__no-login-message

  &__no-login-message {
    font-size: rem(20);
    color: black;
    font-weight: 500;
    line-height: calc(24 / 20);
    margin: 0px 0px rem(10) 0px;
  }

  // .user-cart__login

  &__login {
    a {
      width: 100%;
      display: flex;

      color: white;
    }
  }

  // .user-cart__total

  &__total {
    .btn {
      font-size: rem(18);
    }

    display: flex;
    column-gap: rem(30);
    font-weight: 700;

    align-items: center;

    color: #000000;

    @media (max-width: #{$mobileSmall+px}) {
      flex-direction: column;
      row-gap: 10px;
    }

    .btn {
      @media (max-width: #{$mobileSmall+px}) {
        width: 100%;
      }
    }
  }

  // .user-cart__price
  &__price {
  }

  // .user-cart__message
  &__message {
    position: absolute;
    top: 0;
    left: 50%;
    width: 80%;
    display: block;
    transform: translate(-50%, 0);
    padding: rem(10);
    background-color: black;
    color: white;
    font-size: rem(16);

    @media (max-width: #{$container+px}) {
      width: auto;
    }

    @media (max-width: #{$container+px}) {
    }
  }
}

.empty-cart {
  &__body {
    padding: rem(12);
    text-align: center;
  }

  // .empty-cart__title
  &__title {
    font-weight: 500;
    font-size: rem(24);
    line-height: calc(30 / 24);

    margin: 0px 0px rem(10) 0px;
  }

  // .empty-cart__text

  &__text {
    line-height: calc(22 / 18);
    margin: 0px 0px rem(14) 0px;

    color: #a4acad;
  }

  // .empty-cart__button

  &__button {
    span {
      font-size: rem(14);
      font-weight: 400;
      display: flex;
      width: 100%;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }
}

// Transitions ===========================

.cart-message-leave-active,
.cart-message-enter-active {
  transition: all 0.5s ease 0s;
}

.cart-message-leave-to {
  transform: translate(-50%, -100%);

  @media (max-width: #{$container+px}) {
    transform: translate(0%, -100%);
  }

  opacity: 0;
}

.cart-message-enter-from {
  opacity: 0;
}

.cart-message-enter-to {
  opacity: 1;
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease 0s;
}

.list-enter-from {
  transform: translate(0, -100%);
  opacity: 0;
}

.list-leave-to {
  transform: translate(0);
  opacity: 1;
}

.list-leave-to {
  transform: scale(0);
  opacity: 0;
}
</style>
