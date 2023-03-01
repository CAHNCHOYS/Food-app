<template>
  <div class="products-slider">
    <div class="products-slider__by-type" v-if="productsByType.length">
      <div class="products-slider__by-type-body">
        <swiper :modules="[Pagination]" v-bind="swiperSettings" class="products-slider__slider">
          <swiper-slide class="product-slider__slide" v-for="product in productsByType" :key="product.product_id">
            <SingleProduct :product="product" />
          </swiper-slide>

          <div class="products-slider__pagination"></div>
        </swiper>
      </div>
    </div>

    <div class="products-slider__by-category" v-if="productsByCategory.length">
      <swiper :modules="[Pagination]" v-bind="swiperSettingsCirle" class="products-slider__slider">
        <swiper-slide class="product-slider__slide" v-for="product in productsByCategory" :key="product.product_id">
          <SingleProduct :is-circle-product="true" :product="product" />
        </swiper-slide>
        <div class="products-slider__pagination"></div>
      </swiper>
    </div>
    <p v-else-if="!productType">Нет рекомендуемых товаров для данного (</p>
    


    <LoadingGif :bg-color="'gray'" v-if="isLoading"> </LoadingGif>

    <VErrorMessage v-if="isErr" :err-message="loadErrorMessage">
    </VErrorMessage>
  </div>
</template>

<script setup>
//swiper-------------------------------------------------------------
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref, watch } from "vue";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
//-------------------------------------------------------------------
//api----------------------------------------------------------------
import { fetchData } from "../api/fetchData";
//-------------------------------------------------------------------

const props = defineProps({
  productType: String,
  recommendedProducts: String,
});

//Найстроки свайпера для обычных товаров
const swiperSettings = {
  slidesPerView: 3,
  spaceBetween: 30,

  navigation: {
    clickable: true,
    prevEl: ".products-slider__arrow.icon-arrow-left",
    nextEl: ".products-slider__arrow.icon-arrow-right",
  },
  pagination: {
    clickable: true,
    el: ".products-slider__pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    420: {
      spaceBetween: 15,
      slidesPerView: 2,
    },

    1300: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
  },
};

//Свайпер для товаров с круглой картинокй 
const swiperSettingsCirle = {
  slidesPerView: 3,
  spaceBetween: 30,

  navigation: {
    clickable: true,
    prevEl: ".products-slider__arrow.icon-arrow-left",
    nextEl: ".products-slider__arrow.icon-arrow-right",
  },
  pagination: {
    clickable: true,
    el: ".products-slider__pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
    420: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    1000: {
      slidesPerView: 3,
    },

    1700: {
      spaceBetween: 100,
    },
  },
};

const isLoading = ref(false);
const productsByType = ref([]);
const productsByCategory = ref([]);
const isErr = ref(false);
const loadErrorMessage = ref("Произошла ошибка при  загрузке товаров!");

onMounted(async () => {
  isLoading.value = true;
  if (!props.recommendedProducts && props.productType) {

    let getProducts = await fetchData(`/api/productsByType/${props.productType}`)
  
    console.log(getProducts);

    if (getProducts.length) {
      productsByType.value = getProducts;
    }

    if (getProducts.err) {

      loadErrorMessage.value = getProducts.err;
      console.log(getProducts.err);
      isErr.value = true;
    }
  }
  isLoading.value = false;
});


function randomInteger(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


//Получение товаров по категории
watch(
  () => props.recommendedProducts,
  async () => {
    productsByCategory.value = [];
    isLoading.value = true;
    if (props.recommendedProducts) {
      let categoryToGet = "";

      //Если категорий несколько выбираем случайную
      if (props.recommendedProducts.split(",").length > 0) {
        let splitted = props.recommendedProducts.split(",");
        let start = 0;
        let end = splitted.length - 1;
        categoryToGet = splitted[randomInteger(start, end)].trim();
        console.log(categoryToGet);
      } else categoryToGet = props.recommendedProducts.trim();

      const recommendedProducts = await fetchData(`/api/categories/${categoryToGet}/10`);

      if (recommendedProducts.err) {
        isErr.value = true;
        loadErrorMessage.value = recommendedProducts.err;
        console.log(recommendedProducts.err);
      }
      if (recommendedProducts.length) {
        productsByCategory.value = recommendedProducts;
      }
    }

    isLoading.value = false;
  },
  { immediate: true }
);
</script>

<style lang="scss">
@import "@/assets/adaptive-value.scss";

.products-slider {
  min-width: 0;
  overflow: hidden;

  // .products-slider__slider
  &__slider {
    min-width: 0;
    overflow: hidden;
    position: relative;

    .swiper-pagination {
      z-index: 10 !important;
    }
  }

  // .products-slider__by-type

  &__by-type {
    position: relative;
  }

  // .products-slider__by-type-body

  &__by-type-body {
    position: relative;
  }

  // .products-slider__pagination

  &__pagination {
    z-index: 100;
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 5px;
    flex-wrap: wrap;
    height: auto;
    row-gap: 5px;
    margin: rem(30) 0px 0px 0px;

    // background: #A4ACAD;
    span {
      flex: 0 0 12px;
      height: 12px;

      opacity: 1;
      background: #a4acad;

      &.swiper-pagination-bullet-active {
        background-color: #ff9846;
      }
    }
  }

  // .products-slider__arrow
  &__arrow {
    position: absolute;
    z-index: 5;
    top: 50%;
    display: flex;
    width: rem(60);
    height: rem(60);
    transform: translate(0, -50%);
    background: #111111;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &::before {
      color: white;
      font-size: rem(24);
    }

    &.icon-arrow-left {
      left: 0;

      @media (max-width: #{$container+px}) {
        left: rem(-10);
      }
    }

    &.icon-arrow-right {
      right: 0;

      @media (max-width: #{$container+px}) {
        right: rem(-10);
      }
    }

    transition: all 0.5s ease 0s;

    @media (any-hover: hover) {
      &:hover {
        background-color: cornflowerblue;
      }
    }

    @media (max-width: #{$container+px}) {
      width: rem(45);
      height: rem(45);
    }

    @media (max-width: #{$tablet+px}) {
      width: rem(30);
      height: rem(30);

      &::before {
        font-size: rem(16);
      }
    }

    &.swiper-button-disabled {
      opacity: 0.3;
    }
  }

  // .products-slider__by-category

  &__by-category {}
}

.swiper {
  width: 100%;
  position: relative;
}

.swiper-slide {
  height: auto !important;
}
</style>
