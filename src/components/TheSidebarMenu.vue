<template>
  <div class="sidebar-menu">
    <router-link to="/" class="sidebar-menu__logo">
      <img src="@/assets/Images/PizzaLogo.svg" alt="Site logo" />
      <div class="sidebar-menu__logo-text"> Food App </div>
    </router-link>
    <ul class="sidebar-menu__list">
      <li v-for="link in menuLinks" :key="link.category">
        <router-link :to="`/Categories/${link.category}`" class="sidebar-menu__link" :class="[link.icon]">{{
          link.text
        }}</router-link>
      </li>

    </ul>


  </div>
</template>

<script setup>
import { ref } from "vue";

const menuLinks = ref([
  {
    icon: "icon-pizza",
    text: "Пицца",
    category: "Пиццы",
  },
  {
    icon: "icon-sets",
    text: "Сеты",
    category: "Сеты",
  },
  {
    icon: "icon-Wok",
    text: "WOK",
    category: "Wok",
  },
  {
    icon: "icon-Rolli",
    text: "Роллы",
    category: "Роллы",
  },
  {
    icon: "icon-sushi",
    text: "Суши",
    category: "Суши",
  },
  {
    icon: "icon-Salad",
    text: "Салаты",
    category: "Салаты",
  },
  {
    icon: "icon-Soup",
    text: "Супы",
    category: "Супы",
  },
  {
    icon: "icon-Corn",
    text: "Корн доги",
    category: "Корн доги",
  },
  {
    icon: "icon-drinks2",
    text: "Напитки",
    category: "Напитки",
  },

]);
</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.sidebar-menu {


  text-align: center;
  // .sidebar-menu__logo

  &__logo {
    display: block;

    img {
      max-width: 100%;
      height: 120px;
      display: inline-block;
      margin: 0px 0px 5px 0px;
    }

    position: relative;
    margin: 0px 0px rem(30) 0px;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 0);
      display: block;
      width: 180px;
      height: 1px;
      background-color: #a4acad;
    }
  }

  // .sidebar-manu__logo-text

  &__logo-text {
    display: block;
    text-transform: uppercase;
    font-size: rem(30);
    padding: 0px 0px 25px 0px;
    color: black;
    transition: color 0.5s ease 0s;

    @media (any-hover: hover) {
      &:hover {
        color: #ff9846;
      }
    }

    font-family: "NexaLight";
  }

  // .sidebar-menu__list

  &__list {
    >li:not(:last-child) {
      margin-bottom: rem(25);
    }

  }

  // .sidebar-menu__link

  &__link {
    font-size: rem(24);
    transition: color 0.5s ease 0s;
    line-height: 1;
    position: relative;
    display: inline-flex;
    align-items: center;
    color: black;
    padding: 0px 0px 0px rem(45);
    line-height: calc(30/24);

    &::before {
      font-size: rem(29);
      color: black;
      transition: color 0.5s ease 0s;
      position: absolute;
      left: 0;
      top: 50%;

      transform: translate(0, -50%);
    }

    @media (any-hover: hover) {
      &:hover {
        color: #ff9846;

        &::before {
          color: #ff9846;
        }
      }
    }

    &.router-link-exact-active {
      color: #ff9846;

      &::before {
        color: #ff9846;
      }
    }
  }
}
</style>
