<template>
    <section class="homepage__tabs tabs-homepage">
      <div class="tabs-homepage__header">
        <ul class="tabs-homepage__tabs-list">
          <li v-for="tabLink in tabsMenuList" :key="tabLink.tabIndex">
            <span :class="{ 'current-tab': currentOpenTab === tabLink.tabIndex }"
              @click="currentOpenTab = tabLink.tabIndex">
              {{ tabLink.text }}</span>
          </li>
        </ul>
      </div>

      <div class="tabs-homepage__all-tabs">
        <Transition name="slider">
          <div class="tabs-homepage__tab" v-show="currentOpenTab === 1">
            <ProductsSlider product-type="isNew" />
          </div>
        </Transition>

        <Transition name="slider">
          <div class="tabs-homepage__tab" v-show="currentOpenTab === 2">
            <ProductsSlider product-type="isSale" />
          </div>
        </Transition>
      </div>
    </section>
</template>

<script setup>

import { ref } from 'vue';

//Табы( переключение слайдеров )
const currentOpenTab = ref(1);
const tabsMenuList = ref([
  {
    text: "Новинки",
    tabIndex: 1,
  },
  {
    text: "Акции",
    tabIndex: 2,
  },
]);
</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.tabs-homepage {
  // .tabs-homepage__header

  &__header {
    margin: 0px 0px rem(30) 0px;
  }

  // .tabs-homepage__tabs-list

  &__tabs-list {
    display: flex;
    flex-wrap: wrap;
    column-gap: 30px;
    row-gap: 10px;

    >li {
      cursor: pointer;
      font-weight: 500;
      font-size: rem(24);
      line-height: calc(30 / 22);

      >span {
        transition: all 0.3s ease 0s;
      }

      >span.current-tab {
        color: #000000;
      }

      >span:not(.current-tab) {
        text-decoration: underline;
        color: #a4acad;

        @media (any-hover: hover) {
          &:hover {
            text-decoration: unset;
            color: black;
          }
        }
      }
    }
  }

  // .tabs-homepage__all-tabs

  &__all-tabs {
    display: flex;
    flex-direction: column;
  }

  // .tabs-homepage__tab

  &__tab {}
}
</style>