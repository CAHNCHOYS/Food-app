<template>
  <div class="products-slider__by-type" v-if="productsByType.length">
    <div class="products-slider__by-type-body">
      <swiper
        :modules="[Pagination]"
        v-bind="productSliderSettings"
        class="products-slider__slider"
      >
        <swiper-slide
          v-for="product in productsByType"
          :key="product.product_id"
          class="product-slider__slide"
        >
          <SingleProduct :product="product" />
        </swiper-slide>

        <div class="products-slider__pagination"></div>
      </swiper>
    </div>
  </div>
  <LoadingGif :bg-color="'gray'" v-if="isLoading" />
  <VErrorMessage v-if="isLoadErr" :err-message="loadErrorMessage" />
</template>

<script setup>
//swiper-------------------------------------------------------------
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { onMounted, ref } from "vue";
import { Pagination } from "swiper";

//-------------------------------------------------------------------
import { getTypeProducts } from "@/api/products";

const props = defineProps({
  productType: {
    type: String,
    required: true,
  },
});

const productsByType = ref([]);

const isLoading = ref(false);
const isLoadErr = ref(false);
const loadErrorMessage = ref("Произошла ошибка при  загрузке товаров!");

onMounted(async () => {
  isLoading.value = true;

  let getProducts = await getTypeProducts(props.productType);

  console.log(getProducts);
  if (getProducts.length) {
    productsByType.value = getProducts;
  }

  if (getProducts.err) {
    loadErrorMessage.value = getProducts.err;
    console.log(getProducts.err);
    isLoadErr.value = true;
  }

  isLoading.value = false;
});

const productSliderSettings = {
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
</script>

<style lang="scss" >
@import "@/assets/scss/sliders.scss";
</style>
