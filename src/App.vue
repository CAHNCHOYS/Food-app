<template>
  <SiteLoad v-if="userAuthStore.isUserDataLoading" />
  <component :is="getLayout" v-else>
    <router-view v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component"></component>
      </Transition>
    </router-view>
  </component>
</template>

<script setup>
import { onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";

import MainLayout from "@/Layouts/MainLayout.vue";
import LoginRegisterLayout from "@/Layouts/LoginRegisterLayout.vue";
import CheckoutLayout from "@/Layouts/CheckoutLayout.vue";

import { useWindowSizeStore } from "./stores/windowSize";
import { useUserAuthStore } from "./stores/userAuth.js";

import SiteLoad from "./components/SiteLoad.vue";

const userAuthStore = useUserAuthStore();

//Смена layout в зависимости от routa
const route = useRoute();
const layouts = {
  Main: MainLayout,
  Login: LoginRegisterLayout,
  Checkout: CheckoutLayout,
};

const getLayout = computed(() => {
  console.log(route.meta);
  return layouts[route.meta.layout || "Main"];
});
//-------------------------------------

const windowSizeStore = useWindowSizeStore();
const checkSize = () => {
  windowSizeStore.updateWindowSize(document.documentElement.clientWidth);
};

onMounted(async () => {
  console.log("route", route.name, route.fullPath);
  console.log("programm start");
  windowSizeStore.updateWindowSize(document.documentElement.clientWidth);
  window.addEventListener("resize", checkSize);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkSize);
});
</script>

<style lang="scss">
@import "@/assets/scss/adaptive-value.scss";
//Global styles -------------------------------------------------------
@import "@/assets/scss/nullstyle.scss";

//fonts
@import "@/assets/scss/fonts.scss";

@import "@/assets/scss/Ui.scss";

html {
  scrollbar-width: thin;
  scrollbar-color: rgb(163, 163, 163) transparent;

  /* для Chrome/Edge/Safari */
  &::-webkit-scrollbar {
    height: 9px;
    width: 9px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(163, 163, 163);
    border-radius: 8px;
  }
}

body {
  height: 100%;
  min-height: 100%;
  //Главный шрифт
  font-family: "Conv_dinpro";

  min-width: 320px;

  &._isLocked {
    overflow: hidden;
  }

  font-size: rem(18);
  color: #000000;
  font-weight: 400;
}

.container {
  //Если нет
  max-width: 1200px;
  margin: 0px auto;
  padding: 0px 15px;
}

#app {
  display: flex;
  max-width: 100%;
  min-height: 100%;
  flex-direction: column;

  @media (max-width: #{$mobile+px}) {
    overflow: hidden;
  }
}
</style>
