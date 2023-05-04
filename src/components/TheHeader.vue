<template>
  <header class="header">
    <div class="header__row">
      <div class="header__info-col" v-if="windowStore.getSize > 767">
        <VSiteInfo />
      </div>

      <router-link
        to="/"
        class="header__logo"
        v-if="windowStore.getSize < 767.98"
      >
        <img src="@/assets/Images/PizzaLogo.svg" alt="Site Logo" />
      </router-link>

      <div class="header__info" v-if="windowStore.getSize <= 767">
        <div class="site-info__title">Наш телефон</div>
        <div class="site-info__mobile-phones">
          <p>
            <a href="tel:+79493528425" class="site-info__mobile-phone"
              >+7949 352 84 25</a
            >
          </p>
          <p>
            <a
              href="tel:+79493816596"
              class="site-info__mobile-phone"
              v-if="windowStore.getSize > 479.98"
              >+7949 381 65 96</a
            >
          </p>
        </div>
      </div>

      <nav
        class="header__menu"
        :class="{ _active: toggleMobileMenu }"
        v-if="windowStore.getSize > 767.98"
      >
        <ul class="header__list">
          <li>
            <router-link :to="{ name: 'reviews-page' }" class="header__link"
              >Отзывы</router-link
            >
          </li>

          <li v-if="!userAuthStore.isUserLoggedIn">
            <router-link :to="{ name: 'login' }" class="header__link"
              >Войти</router-link
            >
          </li>

          <li v-if="userAuthStore.isUserLoggedIn">
            <router-link :to="{ name: 'account' }" class="header__link"
              >Личный кабинет</router-link
            >
          </li>

          <li>
            <router-link :to="{ name: 'register' }" class="header__link"
              >Регистрация</router-link
            >
          </li>
   

          <li class="search" v-if="windowStore.getSize > 767">
            <div
              class="header__search-icon icon-search"
              @click="isFormToggled = !isFormToggled"
            ></div>

            <div class="header__search">
              <slide-up-down v-model="isFormToggled" :duration="800">
                <SearchForm class="header__search-form" />
              </slide-up-down>
            </div>
          </li>
        </ul>
      </nav>

      <div class="header__search-column" v-if="windowStore.getSize <= 767">
        <div
          class="header__search-icon icon-search"
          @click="isFormToggled = !isFormToggled"
        ></div>
        <div class="header__search">
          <slide-up-down v-model="isFormToggled" :duration="800">
            <SearchForm
              @close-form="isFormToggled = false"
              class="header__search-form"
            />
          </slide-up-down>
        </div>
      </div>

      <router-link
        :to="{ name: 'cart-page' }"
        class="header__cart"
        v-if="windowStore.getSize <= 1312 && windowStore.getSize > 767"
      >
        <div class="header__cart-icon icon-cart"></div>
        <div class="header__cart-text">Корзина</div>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import SearchForm from "./SearchForm.vue";
import { useWindowSizeStore } from "../stores/windowSize";
import { useUserAuthStore } from "../stores/userAuth";
import { onMounted, ref } from "vue";

const windowStore = useWindowSizeStore();
const userAuthStore = useUserAuthStore();

const toggleMobileMenu = ref(false);

const isFormToggled = ref(false);

onMounted(() => {
  window.addEventListener("click", (e) => {
    if (
      !e.target.closest(".header__list > li.search") &&
      !e.target.closest(".header__search-column")
    ) {
      isFormToggled.value = false;
    }
  });
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.header {
  position: relative;

  min-width: 320px;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 102;
    background-color: #f2f2f2;
    border-bottom: rem(1) solid #a4acad;
  }

  @media (max-width: #{$container+px}) {
    position: fixed;
    width: calc(100% - 240px);
    right: 0;
    top: 0;
    z-index: 100;
    height: auto;
  }

  @media (max-width: #{$mobile+px}) {
    &::before {
      background-color: white;
    }

    width: 100%;
  }

  // .header__row
  &__row {
    display: flex;
    align-items: center;
    min-height: 94.5px;
    justify-content: space-between;

    column-gap: 10px;
    padding-right: 40px;

    @media (max-width: #{$container+px}) {
      padding-right: 15px;
    }

    @media (max-width: #{$mobile+px}) {
      padding: 5px 15px 5px 15px;
      min-height: 70px;
    }
  }

  // .header__info-col

  &__info-col {
    border-right: rem(1) solid #a4acad;
    padding: 10px;
    position: relative;
    z-index: 104;

    @media (max-width: #{$container+px}) {
      padding: 5px;
    }
  }

  &__info {
    text-align: center;
    position: relative;
    z-index: 104;

    @media (max-width: #{$mobile+px}) {
      .site-info__mobile-phones a {
        color: black;
      }
    }
  }

  &__logo {
    position: relative;
    flex: 0 0 50px;
    z-index: 104;
    display: inline-block;

    img {
      max-width: 100%;
    }
  }

  // .header__search-column
  &__search-column {
    // position: relative;
    // z-index: 104;
  }

  // .header__search

  &__search {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 10;
    // padding: rem(15);
    background-color: rgba($color: #000000, $alpha: 0.85);

    @media (max-width: #{$mobile+px}) {
      background-color: rgba($color: #111, $alpha: 1);
    }
  }

  // .header__search-form

  &__search-form {
    padding: rem(15);
  }

  // .header__menu
  &__menu {
  }

  // .header__list

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: rem(10);
    justify-content: center;
    position: relative;
    z-index: 104;

    @media (max-width: #{$mobile+px}) {
      flex-direction: column;
      row-gap: rem(10);
      column-gap: 0px;
    }
  }

  // .header__link

  &__link {
    transition: color 0.6s ease 0s;
    color: #111111;
    line-height: calc(22 / 18);

    @media (any-hover: hover) {
      &:hover {
        color: #ff9846;
      }
    }

    @media (max-width: #{$mobile+px}) {
      font-size: rem(40);
      color: white;
    }
  }

  // .header__search-icon

  &__search-icon {
    cursor: pointer;
    position: relative;
    z-index: 104;

    &::before {
      font-size: rem(24);
    }
  }

  // .header__cart

  &__cart {
    position: relative;
    z-index: 104;
    display: block;
    cursor: pointer;
  }

  // .header__cart-icon

  &__cart-icon {
    text-align: center;

    &::before {
      font-size: rem(30);
    }

    @media (max-width: #{$mobile+px}) {
      &::before {
        color: white;
        font-size: rem(45);
      }
    }
  }

  // .header__cart-text

  &__cart-text {
    font-size: rem(14);
    font-weight: 500;
    color: #111111;

    @media (max-width: #{$mobile+px}) {
      font-size: rem(40);
      font-weight: 400;
      color: white;
    }
  }
}
</style>
