<template>
  <div class="products-slider__by-category" v-if="productsByCategory.length">
    <swiper
      :modules="[Pagination]"
      v-bind="sliderSettings"
      class="products-slider__slider"
    >
      <swiper-slide
        v-for="product in productsByCategory"
        :key="product.product_id"
        class="product-slider__slide"
      >
        <SingleProduct :is-circle-product="true" :product="product" />
      </swiper-slide>
      <div class="products-slider__pagination"></div>
    </swiper>
  </div>
  <p v-else-if="!isErr && !isLoading">
    Нет рекомендуемых товаров для данного (
  </p>

  <LoadingGif :bg-color="'gray'" v-if="isLoading" />
  <VErrorMessage v-if="isErr" :err-message="loadErrorMessage" />
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { ref, watch } from "vue";
import { Pagination } from "swiper";
import ProductService from "@/api/products";

const props = defineProps({
  recommendedProducts: {
    type: String,
    required: true,
  },
});

const productsByCategory = ref([]);
const isLoading = ref(false);
const isErr = ref(false);
const loadErrorMessage = ref("Произошла ошибка при  загрузке товаров!");

watch(
  () => props.recommendedProducts,
  async () => {
    isLoading.value = true;
    let categoryToGet = "none";
    try {
      if (props.recommendedProducts) {
        //Если категорий несколько выбираем случайную
        if (props.recommendedProducts.split(",").length > 0) {
          let splitted = props.recommendedProducts.split(",");
          categoryToGet =
            splitted[randomInteger(0, splitted.length - 1)].trim();
        } else categoryToGet = props.recommendedProducts.trim();
      }

      const products = await ProductService.getCategoryProducts(
        categoryToGet,
        10
      );
      productsByCategory.value = products;
    } catch (error) {
      isErr.value = true;
      loadErrorMessage.value = error.message;
      console.log(recommendedProducts.err);
    }
    isLoading.value = false;
  },
  { immediate: true }
);

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const sliderSettings = {
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
      slidesPerView: 3,
      spaceBetween: 80,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/sliders.scss";
</style>
