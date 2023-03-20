<template>
  <div class="category-products">
    <div class="category-products__top-button">
      <VGoBackButton />
    </div>

    <LoadingGif v-if="isLoading" />
    <div class="category-products__content" v-else>
      <div class="category-products__header">
        <div class="category-products__title-col">
          <div class="category-products__title" :class="[currentCategoryIcon]">
            {{ category }}
          </div>
        </div>
        <div class="category-products__sort-field">
          <VCustomSelect
            :background-color="`white`"
            :border="true"
            :absolute="true"
            :default-title="'Сортировка по'"
            @update-value="updateSorting"
            :options="sortOptions"
          />
        </div>
      </div>

      <div class="category-products__price-slider price-slider">
        <div class="price-slider__row">
          <div class="price-slider__title">Цена:</div>

          <div class="price-slider__slider">
            <Slider v-model="prices" v-bind="moneySliderSettings" />
          </div>
        </div>
      </div>

      <div
        class="category-products__all-products"
        v-if="categoryProducts.length"
      >
        <div class="category-products__products-row">
          <SingleProduct
            v-for="product in filteredProductsByPage"
            :key="product"
            :product="product"
          />
        </div>

        <div
          class="category-products__no-products"
          v-show="!filteredProductsByValues.length"
        >
          Не удалось найти товары по заданному фильру!(
        </div>
      </div>

      <div class="category-products__no-products" v-else-if="!isError">
        Не удалось найти ни одного товара в данной категории или поиске(
      </div>

      <VErrorMessage :err-message="errorMessage" v-else />

      <div
        class="category-products__pagintaion"
        v-show="filteredProductsByValues.length"
      >
        <VueAwesomePaginate
          :total-items="filteredProductsByValues.length"
          :items-per-page="productsByPage"
          :max-pages-shown="8"
          v-model="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useCategoiresFilter } from "../Composables/useFilterCategories";
//MONEY SLIDER
import Slider from "@vueform/slider";

import { VueAwesomePaginate } from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

import { searchProducts, getCategoryProducts } from "../api/products";

const props = defineProps({
  category: {
    type: String,
    required: true,
  },
});

const route = useRoute();

const isLoading = ref(false);
const isError = ref(false);
const errorMessage = ref("Произошла ошибка при загрузке товаров");

const categoryProducts = ref([]);
const currentCategoryIcon = ref("");

const categoryIcons = {
  Пиццы: "icon-pizza",
  Сеты: "icon-sets",
  Суши: "icon-sushi",
  Роллы: "icon-Rolli",
  Wok: "icon-Wok",
  Супы: "icon-Soup",
  Напитки: "icon-drinks2",
  Салаты: "icon-Salad",
  "Поиск по товарам": "icon-search",
};

// Получаем товары по категория
watch(
  [
    () => props.category,
    () => route.query.searchCategories,
    () => route.query.searchProduct,
  ],
  async () => {
    isLoading.value = true;
    categoryProducts.value = [];

    console.log(props.category);

    let products = [];

    //Если пришли с формы поиска
    if (route.query.searchCategories || route.query.searchProduct) {
      products = await searchProducts(
        route.query.searchCategories,
        route.query.searchProduct
      );
      currentCategoryIcon.value = categoryIcons["Поиск по товарам"];

      //Если пришли с меню категорий
    } else {
      products = await getCategoryProducts(props.category, 999);
      currentCategoryIcon.value = categoryIcons[props.category];
    }
    if (products.length) categoryProducts.value = products;
    else if (products.err) {
      console.log(products.err);
      errorMessage.value = products.err;
      isError.value = true;
    }
    isLoading.value = false;
  },
  { immediate: true }
);

//Фильтруем товары
const {
  filteredProductsByPage,
  filteredProductsByValues,
  productsByPage,
  sortOptions,
  moneySliderSettings,
  currentPage,
  prices,
  updateSorting,
} = useCategoiresFilter(categoryProducts, route);

//При переходе на новую страницу скролим вверх
watch(currentPage, () => {
  const header = document.querySelector(".category-products__header");
  header.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
});
</script>

<style lang="scss">
@import "@/assets/scss/adaptive-value";

.category-products {
  &__content {
    padding: 0px 0px rem(100) 0px;
  }

  // .category-products__header
  &__header {
    // display: flex;
    // justify-content: space-between;
    margin: 0px 0px rem(15) 0px;

    @media (min-width: #{$mobileSmall+px}) {
      margin: 0px 0px rem(35) 0px;
      align-items: center;
      display: flex;
      justify-content: space-between;
    }
  }

  // .category-products__top-button

  &__top-button {
    display: none;

    @media (max-width: #{$mobile+px}) {
      display: block;
      margin: 0px 0px rem(20) 0px;
    }
  }

  // .category-products__title-col

  &__title-col {
    @media (max-width: #{$mobileSmall+px}) {
      text-align: center;
      margin: 0px 0px rem(10) 0px;
    }
  }

  // .category-products__title

  &__title {
    font-size: rem(36);
    line-height: calc(45 / 36);
    position: relative;
    padding: 0px 0px 0px rem(38);

    &::before {
      display: block;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      font-size: rem(30);
      color: black;
    }

    @media (max-width: #{$mobile+px}) {
      font-size: rem(28);

      &::before {
        font-size: rem(24);
      }
    }

    @media (max-width: #{$mobileSmall+px}) {
      display: inline-block;
    }

    color: #000000;
  }

  // .category-products__sort-field

  &__sort-field {
    flex: 0 0 280px;
  }

  // .category-products__all-products

  &__all-products {
    position: relative;
    margin: 0px 0px rem(30) 0px;
  }

  // .category-products__products-row

  &__products-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: rem(30);
  }

  // .category-products__price-slider

  &__price-slider {
    margin: 0px 0px rem(30) 0px;
  }

  // .category-products__pagintaion

  &__pagintaion {
    text-align: center;
  }

  // .category-products__no-products

  &__no-products {
    margin: 0px 0px rem(30) 0px;
    font-size: rem(28);
    color: crimson;
    line-height: 1.3;
  }
}

.price-slider {
  // .price-slider__row

  &__row {
    column-gap: rem(30);

    @media (min-width: #{$mobileSmall+px}) {
      display: flex;
      align-items: center;
    }
  }

  // .price-slider__title

  &__title {
    font-size: rem(24);
    font-weight: 500;

    @media (max-width: #{$mobileSmall+px}) {
      margin: 0px 0px rem(42) 0px;
      text-align: center;
    }
  }

  // .price-slider__slider

  &__slider {
    transform: translate(0, 5px);
    flex: 0 0 300px;

    @media (max-width: #{$mobileSmall+px}) {
      transform: translate(0);
      padding: 0px 20px 0px 20px;
    }
  }
}

.pagination-container {
  display: flex;
  justify-content: center;
  column-gap: rem(10);
  flex-wrap: wrap;
  row-gap: rem(10);
}

.paginate-buttons {
  height: rem(40);
  width: rem(40);
  border-radius: rem(20);
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: rem(1) solid lightgray;
  color: black;
}

.paginate-buttons:hover {
  background-color: lightgray;
}

.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}

.active-page:hover {
  background-color: #2988c8;
}

.slider-tooltip {
  background-color: cornflowerblue !important;
  border: 1px solid cornflowerblue !important;

  &::before {
  }
}

.slider-connect {
  background-color: cornflowerblue !important;
}
</style>

<style src="@vueform/slider/themes/default.css"></style>
