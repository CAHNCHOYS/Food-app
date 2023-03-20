<template>
  <div class="product-page">
    <div class="product-page__back-button">
      <VGoBackButton />
    </div>

    <div class="product-page__product-body">
      <LoadingGif v-if="isProductLoading" />

      <div class="product-page__product-content product" v-if="pageProduct">
        <div class="product__row">
          <div class="product__picture-col">
            <div class="product__picture _ibg">
              <img
                :src="`https://sushi-backend-henna.vercel.app/Products/${pageProduct.image}`"
                :alt="pageProduct.name"
              />
            </div>
          </div>
          <div class="product__info-col">
            <div class="product__name">
              {{ pageProduct.name }}
            </div>
            <div class="product__size">
              {{ pageProduct.textSize }}
            </div>
            <div class="product__actions">
              <div class="product__price">
                <div class="product__current-price">
                  {{ pageProduct.Price * pageProduct.count }}₽
                </div>
                <div class="product__old-price" v-if="pageProduct.oldPrice">
                  {{ pageProduct.oldPrice * pageProduct.count }}₽
                </div>
              </div>
              <div class="product__count count-product">
                <div class="count-product__row">
                  <div
                    class="count-product__action count-product__action_minus"
                    @click="pageProduct.count <= 1 ? '' : pageProduct.count--"
                  ></div>
                  <div class="count-product__number">
                    {{ pageProduct.count }}
                  </div>
                  <div
                    class="count-product__action icon-plus"
                    @click="pageProduct.count++"
                  ></div>
                </div>
              </div>
            </div>
            <div class="product__consist" v-if="pageProduct.consists">
              <h3>Состав</h3>
              <p>{{ pageProduct.consists }}</p>
            </div>
            <div class="product__add-to-cart">
              <button
                class="btn icon-cart"
                v-show="!isActionLoading"
                @click="
                  addProductAction({
                    product_id: pageProduct.product_id,
                    count: pageProduct.count,
                    name: pageProduct.name,
                    image: pageProduct.image,
                    Price: pageProduct.Price,
                  })
                "
              >
                Хочу!
              </button>
            </div>

            <LoadingGif v-if="isActionLoading" class="product__action-load" />

            <Transition name="product-message">
              <VAlert
                :position="'static'"
                :type="'success'"
                v-if="isProductAdded"
              >
                Товар добавлен в корзину!
              </VAlert>
            </Transition>

            <Transition name="product-message">
              <VAlert
                :position="'static'"
                :type="'error'"
                v-if="isAddProductError"
              >
                {{ actionErrorMessage }}
              </VAlert>
            </Transition>

            <Transition name="product-message">
              <VAlert
                :position="'static'"
                :type="'info'"
                v-if="isNotLoggedUser"
              >
                Для добавления товара в корзину необходимо сначала войти в
                аккаунт!
              </VAlert>
            </Transition>
          </div>
        </div>
      </div>

      <VErrorMessage
        v-if="isFetchError"
        style="margin-bottom: 20px"
        :err-message="errorMessage"
      />
      <p v-else-if="!isProductLoading && !pageProduct">
        Не удалось найти товар с таким именем и айди, проверьте ссылку!
      </p>
    </div>
    <div
      class="product-page__recommended-products recomended-products"
      v-if="pageProduct"
    >
      <div class="recomended-products__title">Рекомендованные товары</div>

      <div class="recomended-products__slider">
        <ProductsSlider :recommended-products="pageProduct.recommendedCat" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useProductsActions } from "../Composables/useProductsActions";
import {getSingleProduct} from "../api/products.js";


const props = defineProps({
  id: Number,
  name: String,
});

const pageProduct = ref(null);
const isProductLoading = ref(false);
const isFetchError = ref(false);
const errorMessage = ref("Произошла ошибка(");

watch(
  [() => props.name, () => props.id],
  async () => {
    isProductLoading.value = true;
    pageProduct.value = null;

    const product = await getSingleProduct(props.name, props.id);
    if (product.length) {
      pageProduct.value = product[0];
      pageProduct.value.count = 1;
    }

    if (product.err) {
      errorMessage.value = product.err;
      isFetchError.value = true;
      console.log(product.err);
    }

    isProductLoading.value = false;
  },
  { immediate: true }
);

const {
  isActionLoading,
  isNotLoggedUser,
  isProductAdded,
  actionErrorMessage,
  isAddProductError,

  addProductAction,
} = useProductsActions();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.product-page {
  position: relative;

  // .product-page__back-button

  &__back-button {
    padding: rem(0) 0px rem(15) 0px;
  }

  &__body {
    position: relative;
  }

  // .product-page__product-content
  &__product-content {
    padding: rem(30) 0px rem(15) 0px;

    @media (max-width: #{$mobile+px}) {
      padding: rem(15) 0px rem(15) 0px;
    }
  }

  &__message {
    top: 50px;
    display: block;
    left: 30px;
    width: 100%;
    margin: rem(20) 0px 0px 0px;
    padding: rem(10);
    color: white;
  }

  // .product-page__recommended-products

  &__recommended-products {
    padding: rem(15) 0px rem(50) 0px;
  }
}

.product {
  position: relative;

  // .product__row
  &__row {
    position: relative;

    padding: rem(20) 0px rem(20) 0px;

    &::before {
      content: "";
      background-color: white;
      position: absolute;
      width: calc(100% + 220px);
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1;
      transform: translate(-110px, 0);

      @media (max-width: 1700px) {
        width: calc(100% + 100px);
        transform: translate(-50px, 0);
      }

      @media (max-width: #{$container+px}) {
        width: calc(100% + 30px);
        transform: translate(-15px, 0);
      }
    }

    @media (min-width: #{$mobile+px}) {
      display: flex;
    }
  }

  // .product__picture-col

  &__picture-col {
    flex: 0 0 percent(400, 950);
    align-self: start;
    position: relative;
    z-index: 2;
    // transform: translate(-110px, 0px);
  }

  // .product__picture

  &__picture {
    padding: 0px 0px calc(405 / 510 * 100%) 0px;

    min-height: 250px;

    img {
      object-fit: contain;
    }

    @media (max-width: #{$mobile+px}) {
      padding: 0px 0px calc(305 / 510 * 100%) 0px;
    }
  }

  // .product__info-col

  &__info-col {
    position: relative;
    z-index: 2;
    flex: 1 1 auto;
    padding: 0px 0px 0px 30px;

    > *:last-child {
      margin-bottom: 0px;
    }

    @media (max-width: #{$tablet+px}) {
      padding: 0px 0px 0px 15px;
    }

    @media (max-width: #{$mobile+px}) {
      padding: 10px 0px 0px 0px;
      text-align: center;
    }
  }

  // .product__name
  &__name {
    font-size: rem(48);
    line-height: calc(60 / 48);
    font-weight: 800;
    color: #000000;
    margin: 0px 0px rem(5) 0px;

    @media (max-width: #{$tablet+px}) {
      font-size: rem(38);
    }
  }

  // .product__size

  &__size {
    line-height: calc(22 / 18);

    color: #ff9846;
    margin: 0px 0px rem(30) 0px;
  }

  // .product__actions

  &__actions {
    display: flex;
    align-items: center;
    column-gap: rem(30);
    flex-wrap: wrap;
    margin: 0px 0px rem(30) 0px;

    @media (max-width: #{$tablet+px}) {
      column-gap: rem(15);
    }

    @media (max-width: #{$mobile+px}) {
      justify-content: center;
    }
  }

  // .product__price

  &__price {
    font-size: rem(24);
    line-height: calc(25 / 24);
  }

  // .product__current-price

  &__current-price {
    margin: 0px 0px rem(5) 0px;
    font-weight: 700;
  }

  // .product__old-price

  &__old-price {
    color: gray;
    font-size: rem(26);
    text-decoration: line-through;
  }

  // .product__count

  &__count {
  }

  // .product__consist

  &__consist {
    margin: 0px 0px rem(30) 0px;

    font-weight: 200;

    line-height: calc(22 / 18);

    color: #111111;

    h3 {
      font-weight: 500;
    }
  }

  // .product__add-to-cart

  &__add-to-cart {
    button {
      padding: 0px rem(60) 0px rem(60);

      &::before {
        right: rem(30);
      }
    }
  }

  // .product__action-load

  &__action-load {
  }
}

.recomended-products {
  // .recomended-products__title

  &__title {
    font-size: rem(24);
    line-height: calc(30 / 24);
    margin: 0px 0px rem(15) 0px;
    font-weight: 500;
    text-align: center;
  }

  // .recomended-products__slider

  &__slider {
  }
}
</style>
