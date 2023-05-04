<template>
  <div class="bottom-menu">
    <div class="bottom-menu__body">
      <ul class="bottom-menu__list">
        <li>
          <router-link :to="{ name: 'cart-page' }" class="bottom-menu__link"
            ><div class="bottom-menu__item-icon icon-cart"></div>
            <div class="bottom-menu__item-text">Корзина</div></router-link
          >
        </li>
        <li v-if="userAuthStore.isUserLoggedIn">
          <router-link :to="{ name: 'account' }" class="bottom-menu__link">
            <img src="@/assets/Images/users/account-svgrepo-com.svg" alt="" />
            <div class="bottom-menu__item-text">
              Личный кабинет
            </div></router-link
          >
        </li>
        <li v-if="!userAuthStore.isUserLoggedIn">
          <router-link :to="{ name: 'login' }" class="bottom-menu__link">
            <img src="@/assets/Images/users/login-svgrepo-com.svg" alt="" />
            <div class="bottom-menu__item-text">Войти</div></router-link
          >
        </li>
        <li v-if="!userAuthStore.isUserLoggedIn">
          <router-link :to="{ name: 'register' }" class="bottom-menu__link">
            <img
              src="@/assets/Images/users/sign-in-double-arrow-2-svgrepo-com.svg"
              alt=""
            />
            <div class="bottom-menu__item-text">Регистрация</div></router-link
          >
        </li>

        <li>
          <router-link :to="{ name: 'reviews-page' }" class="bottom-menu__link">
            <div class="bottom-menu__item-icon icon-like"></div>
            <div class="bottom-menu__item-text">Отзывы</div></router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useUserAuthStore } from "../stores/userAuth";
const userAuthStore = useUserAuthStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value.scss";

.bottom-menu {
  position: fixed;
  background-color: white;
  bottom: 0;
  left: 0;
  border-top: rem(0.5) solid #a4acad;

  width: 100%;
  height: auto;
  z-index: 100;

  // .bottom-menu__body
  &__body {
    padding: 10px 15px;
  }

  // .bottom-menu__list

  &__list {
    display: flex;
    align-items: end;
    flex-wrap: wrap;
    column-gap: rem(30);
    row-gap: rem(5);
    justify-content: center;
  }

  &__link {
    display: block;
    color: inherit;
    img {
      width: 20px;
      height: 20px;
      margin: 0 auto;
      margin-bottom: rem(4);
      display: block;
    }
  }

  // .bottom-menu__item-icon

  &__item-icon {
    text-align: center;
    margin: 0px 0px rem(2) 0px;
    &::before {
      font-size: rem(24);
      font-weight: 600;
    }
  }

  // .bottom-menu__item-text

  &__item-text {
    font-weight: 500;
    font-size: rem(14);
    line-height: calc(17 / 14 * 100%);
  }
}
</style>
