<template>
  <section class="homepage__categories categories">
    <div class="categories__mobile" v-if="windowStore.getSize < 767.98">
      <div
        class="categories__column"
        v-for="{
          categoryText,
          categoryLink,

          picture,
        } in mobileCategoires"
        :key="categoryLink"
      >
        <RouterLink
          class="categories__mobile-body _ibg"
          :to="`categories/${categoryLink}`"
        >
          <div class="categories__mobile-text">
            {{ categoryText }}
          </div>
          <img
            v-lazy="{
              src: picture,
              loading: 'https://sushi-backend-henna.vercel.app/Load.gif',
              error: 'https://sushi-backend-henna.vercel.app/Err.png',
            }"
            :alt="'Категория ' + categoryText"
          />
        </RouterLink>
      </div>
    </div>
    <div class="categories__pc">
      <div class="categories__all-categories">
        <div
          class="categories__column"
          v-for="{
            categoryText,
            categoryLink,
            isBigColumn,
            picture,
          } in pcCategories"
          :key="categoryLink"
          :class="{ categories__column_big: isBigColumn }"
        >
          <RouterLink
            :class="{ pad: !isBigColumn }"
            class="categories__body _ibg"
            :to="`categories/${categoryLink}`"
          >
            <div class="categories__text">
              {{ categoryText }}
            </div>
            <img
              v-lazy="{
                src: picture,
                loading: 'https://sushi-backend-henna.vercel.app/Load.gif',
                error: 'https://sushi-backend-henna.vercel.app/Err.png',
              }"
              :alt="'Категория ' + categoryText"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useWindowSizeStore } from "../../stores/windowSize.js";
import { useCategories } from "../../Composables/useCategoriesLinks";

const { mobileCategoires, pcCategories } = useCategories();
const windowStore = useWindowSizeStore();
</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.categories {
  // .categories__mobile
  &__mobile {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    margin: 0px 0px rem(15) 0px;
    gap: rem(30);

    @media (max-width: #{$mobile+px}) {
      gap: rem(15);
    }
  }

  // .categories__pc
  &__pc {
  }

  // .categories__all-categories

  &__all-categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
    gap: rem(30);

    @media (max-width: #{$tablet+px}) {
      gap: rem(15);
    }

    @media (max-width: #{$mobileSmall+px}) {
      grid-template-columns: unset;
      grid-auto-flow: row;
      grid-template-rows: auto;
    }
  }

  // .categories__column

  &__column {
    &_big {
      @media (min-width: #{$mobileSmall+px}) {
        grid-column-start: span 2;
      }
    }
  }

  // .categories__body

  &__body {
    display: block;
    z-index: 2;
    position: relative;
    overflow: hidden;
    border-radius: rem(5);

    &.pad {
      padding: 0px 0px calc(224 / 200 * 100%) 0px;

      @media (max-width: #{$mobileSmall+px}) {
        padding: 0px 0px calc(124 / 200 * 100%) 0px;
      }
    }

    &:not(.pad) {
      height: 100%;

      min-height: 220px;

      @media (max-width: #{$mobileSmall+px}) {
        min-height: unset;
        height: unset;
        padding: 0px 0px calc(124 / 200 * 100%) 0px;
      }
    }

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 3;
      background-color: rgba($color: #000000, $alpha: 0.7);
    }

    img {
      transition: all 0.5s ease 0s;
      max-width: 100%;
      height: 100%;
    }

    @media (any-hover: hover) {
      &:hover {
        img {
          transform: scale(1.1);
        }
      }
    }
  }

  &__mobile-body {
    padding: 0px 0px calc(224 / 200 * 100%) 0px;
    position: relative;
    display: block;
    z-index: 2;

    @media (max-width: #{$mobileSmall+px}) {
      padding: 0px 0px calc(124 / 200 * 100%) 0px;
    }

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 3;
      background-color: rgba($color: #000000, $alpha: 0.7);
    }
  }

  // .categories__text

  &__text {
    position: absolute;
    z-index: 4;
    height: auto;
    bottom: rem(10);
    left: rem(10);
    font-size: rem(24);
    color: white;
    line-height: calc(30 / 24);
  }

  // .categories__mobile-text

  &__mobile-text {
    @extend .categories__text;
    top: rem(10) !important;
  }
}
</style>
