<template>
  <div class="homepage">
    <div class="homepage__slider main-slider">
      <Swiper
        :modules="[Pagination, EffectFlip]"
        class="main-slider__slider"
        v-bind="mainSliderSettings"
      >
        <SwiperSlide class="main-slider__slide">
          <div class="main-slider__body">
            <div class="main-slider__content">
              <div class="main-slider__slide-title">Лучшая еда</div>
              <div class="main-slider__slide-text">Только у нас</div>
              <div class="main-slider__btn">
                <RouterLink class="btn" to="/">Поехали</RouterLink>
              </div>
            </div>
          </div>
          <div class="main-slider__picture">
            <img src="@/assets/Images/FoodPic.jpg" alt="Food picture" />
          </div>
        </SwiperSlide>

        <SwiperSlide class="main-slider__slide">
          <div class="main-slider__body">
            <div class="main-slider__content">
              <div class="main-slider__slide-title">
                Доставка прямиком в руки!
              </div>

              <div class="main-slider__btn">
                <RouterLink class="btn" to="/">Узнать!</RouterLink>
              </div>
            </div>
          </div>
          <div class="main-slider__picture">
            <img src="@/assets/Images/Deliever.jpg" alt="Доставка еды фото" />
          </div>
        </SwiperSlide>

        <SwiperSlide class="main-slider__slide">
          <div class="main-slider__body">
            <div class="main-slider__content">
              <div class="main-slider__slide-title">Хммм Пицца</div>

              <div class="main-slider__btn">
                <RouterLink class="btn" to="/">Заказать</RouterLink>
              </div>
            </div>
          </div>
          <div class="main-slider__picture">
            <img src="@/assets/Images/Pizza.png" alt="Фото пиццы" />
          </div>
        </SwiperSlide>

        <div class="main-slider__pagination"></div>
      </Swiper>
    </div>

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
          <router-link
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
          </router-link>
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
            <router-link
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
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="homepage__tabs tabs-homepage">
      <div class="tabs-homepage__header">
        <ul class="tabs-homepage__tabs-list">
          <li v-for="tabLink in tabsMenuList" :key="tabLink.tabIndex">
            <span
              :class="{ 'current-tab': currentOpenTab === tabLink.tabIndex }"
              @click="currentOpenTab = tabLink.tabIndex"
            >
              {{ tabLink.text }}</span
            >
          </li>
        </ul>
      </div>
      <div class="tabs-homepage__all-tabs">
        <Transition name="slider">
          <KeepAlive>
            <div class="tabs-homepage__tab" v-show="currentOpenTab === 1">
              <ProductsSlider product-type="isNew" v-cloak></ProductsSlider>
            </div>
          </KeepAlive>
        </Transition>

        <Transition name="slider">
          <KeepAlive>
            <div class="tabs-homepage__tab" v-show="currentOpenTab === 2">
              <ProductsSlider product-type="isSale" v-cloak></ProductsSlider>
            </div>
          </KeepAlive>
        </Transition>
      </div>
    </section>

    <section class="homepage__company-info company-info">
      <div class="company-info__title">
        Заказать суши, другую еду можно у нас!
      </div>
      <div class="company-info__text">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
          voluptate provident quia amet facere vel itaque consequuntur doloribus
          commodi! Quaerat, explicabo tempore? Vel suscipit voluptatibus
          asperiores maiores optio iusto accusamus!
        </p>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
          voluptate provident quia amet facere vel itaque consequuntur doloribus
          commodi! Quaerat, explicabo tempore? Vel suscipit voluptatibus
          asperiores maiores optio iusto accusamus! 2
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
          voluptate provident quia amet facere vel itaque consequuntur doloribus
          commodi!
          <span
            class="company-info__text-hide"
            :class="{ opacity: !continueText }"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente,
            voluptates. Quaerat, explicabo tempore? Vel suscipit voluptatibus
            asperiores maiores Lo<span v-show="!continueText">... </span></span
          >
          <span v-show="continueText"
            >rem ipsum dolor sit amet consectetur adipisicing elit. Modi qui
            eius architecto quis repudiandae adipisci debitis dolorum provident
            in quidem vitae, beatae ut corrupti voluptatibus! Aut ab, ut minus
            laudantium repudiandae iure pariatur facere ad ea fugit aliquam
            labore rerum! Molestias nesciunt, sed rem maiores officia
            repellendus. Id voluptates iusto provident voluptas enim?</span
          >
        </p>
        <p v-show="continueText">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
          assumenda recusandae dolorum doloremque, perspiciatis nisi maiores
          adipisci repellat unde blanditiis dolorem nostrum maxime quia ipsa
          quis. Ut quos accusantium est.
        </p>

        <p v-show="continueText">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, aliquid!
          Quos perferendis quas quis aliquid deleniti, facere facilis voluptatem
          quo amet rerum suscipit expedita? Sunt, enim doloremque animi odit
          consectetur voluptatem ipsam amet minima quas perferendis sed
          veritatis. Beatae necessitatibus esse voluptate animi ipsa itaque
          atque dignissimos dolor a rerum?
        </p>
      </div>

      <div class="company-info__continue-btn">
        <span
          class="icon-arrow-down"
          @click="continueText = !continueText"
          :class="{ active: continueText }"
          >Подробнее</span
        >
      </div>
    </section>
  </div>
</template>

<script setup>
//swiper-------------------------------------------------------------
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, EffectFlip } from "swiper";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
//-------------------------------------------------------------------
import { ref } from "vue";
import ProductsSlider from "../components/ProductsSlider.vue";
import { useWindowSizeStore } from "../stores/windowSize.js";
import { useCategories } from "../Composables/useCategoriesLinks";
const windowStore = useWindowSizeStore();

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

const { mobileCategoires, pcCategories } = useCategories();

const continueText = ref(false);

const mainSliderSettings = {
  pagination: {
    clickable: true,
    el: ".main-slider__pagination",
  },
  effect: "flip",
  grabCursor: true,
  speed: 1000,
  autoHeight: true,
};
</script>

<style lang="scss">
@import "@/assets/adaptive-value.scss";

.homepage {
  // .homepage__slider

  &__slider {
  }

  > * {
    padding: 0px 0px rem(70) 0px;

    @media (max-width: #{$mobile+px}) {
      padding: 0px 0px rem(60) 0px;
    }
  }

  // .homepage__categories
  &__categories {
  }

  // .homepage__tabs

  &__tabs {
  }

  // .homepage__company-info

  &__company-info {
  }
}

.main-slider {
  // .main-slider__slider

  &__slider {
    position: relative;
  }

  // .main-slider__slide

  &__slide {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 3;
      top: 0;
      left: 0;
      background-color: rgba($color: #000000, $alpha: 0.6);
    }
  }

  // .main-slider__body

  &__body {
    position: relative;
    z-index: 4;
    padding: rem(150) rem(20);

    @media (max-width: #{$mobileSmall+px}) {
      padding: rem(80) rem(15);
    }

    color: white;
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    position: relative;
    z-index: 4;
    max-width: rem(460);

    > *:last-child {
      margin-bottom: 0px;
    }

    text-align: right;
  }

  // .main-slider__slide-title

  &__slide-title {
    font-size: rem(56);
    margin: 0px 0px rem(20) 0px;

    @media (max-width: #{$tablet+px}) {
      font-size: rem(36);
    }
  }

  // .main-slider__slide-text
  &__slide-text {
    font-size: rem(28);
    margin: 0px 0px rem(20) 0px;

    @media (max-width: #{$tablet+px}) {
      font-size: rem(24);
    }
  }

  // .main-slider__btn

  &__btn {
  }

  // .main-slider__picture

  &__picture {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // .main-slider__pagination

  &__pagination {
    margin: rem(10) 0px 0px 0px;
    display: flex;
    justify-content: center;
    column-gap: 0px;

    span.swiper-pagination-bullet-active {
      background-color: #f46d40;
    }
  }
}

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

    > li {
      cursor: pointer;
      font-weight: 500;
      font-size: rem(24);
      line-height: calc(30 / 22);

      > span {
        transition: all 0.3s ease 0s;
      }

      > span.current-tab {
        color: #000000;
      }

      > span:not(.current-tab) {
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

  &__tab {
  }
}

.company-info {
  // .company-info__title

  &__title {
    font-weight: 700;
    font-size: rem(24);
    line-height: calc(30 / 24);
    color: #a4acad;
    margin: 0px 0px rem(10) 0px;
  }

  // .company-info__text

  &__text {
    line-height: 100%;
    color: black;

    line-height: 1.3;
    margin: 0px 0px rem(30) 0px;

    > p:not(:last-child) {
      margin-bottom: rem(20);
    }

    &:last-child {
      margin: 0px 0px rem(42) 0px;
    }
  }

  &__text-hide {
    &.opacity {
      opacity: 0.5;
    }
  }

  // .company-info__continue-btn

  &__continue-btn {
    text-align: center;

    span {
      position: relative;
      padding: 0px rem(35) 0px 0px;
      display: inline-block;

      &::before {
        position: absolute;
        display: block;
        top: 50%;
        right: rem(10);
        transform: translate(0, -40%);
        transition: all 0.5s ease 0s;
        color: #f46d40;
        font-size: rem(24);
      }

      &.active {
        &::before {
          transform: translate(0, -40%) rotate(-180deg);
        }
      }

      font-size: rem(24);
      color: #f46d40;
      cursor: pointer;

      @media (any-hover: hover) {
        &:hover {
          color: #fd3f00;

          &::before {
            color: #fd3f00;
          }
        }
      }
    }
  }
}

.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s ease 0s;
}

.slider-enter-from {
  transform: translate(-30%, 0);
  opacity: 0;
}

.slider-enter-to {
  transform: translate(0);
  opacity: 1;
}

.slider-leave-to {
  display: none;
  transform: translate(30%, 0);
  opacity: 0;
}
</style>
