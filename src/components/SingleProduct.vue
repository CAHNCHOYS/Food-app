<template>
  <article class="single-product" :class="{ white: !isCircleProduct }">
    <div class="single-product__content">
      <Transition name="product-message">
        <VAlert :position="'absolute'" :type="'success'" v-if="isProductAdded">
          Товар добавлен в корзину!
        </VAlert>
      </Transition>

      <Transition name="product-message">
        <VAlert :position="'absolute'" :type="'error'" v-if="isAddProductError">
          {{ actionErrorMessage }}
        </VAlert>
      </Transition>

      <Transition name="product-message">
        <VAlert :position="'absolute'" :type="'info'" v-if="isNotLoggedUser">
          Для добавления товара нужно сначала авторизироваться!
        </VAlert>
      </Transition>

      <div class="single-product__body">
        <RouterLink
          :to="`/Products/${product.name}/${product.product_id}`"
          :class="{ circle: isCircleProduct }"
          class="single-product__image _ibg"
        >
          <img
            v-lazy="{
              src: `https://sushi-backend-henna.vercel.app/Products/${product.image}`,
              loading: 'https://sushi-backend-henna.vercel.app/Load.gif',
              error: 'https://sushi-backend-henna.vercel.app/Err.png',
            }"
            :alt="product.product_name"
          />
        </RouterLink>

        <div class="single-product__info" :class="{ center: isCircleProduct }">
          <RouterLink
            :to="`/Products/${product.name}/${product.product_id}`"
            class="single-product__name"
          >
            {{ product.name }}
          </RouterLink>
          <div class="single-product__size" v-if="!isCircleProduct">
            {{ product.textSize }}
          </div>
        </div>
      </div>

      <div
        v-show="!isActionLoading"
        class="single-product__actions"
        :class="{ border: !isCircleProduct }"
      >
        <div class="single-product__pricing">
          <div class="single-product__price">{{ product.Price }}₽</div>
          <div class="single-product__old-price" v-if="product.oldPrice">
            {{ product.oldPrice }}₽
          </div>
        </div>
        <div class="single-product__button">
          <button
            class="btn icon-cart"
            v-show="!isActionLoading"
            :disabled="isNotLoggedUser"
            @click="
              addProductAction({
                name: product.name,
                product_id: product.product_id,
                image: product.image,
                Price: product.Price,
              })
            "
          >
            Хочу!
          </button>
        </div>
      </div>

      <LoadingGif
        class="single-product__action-loading"
        v-show="isActionLoading"
      />
    </div>
  </article>
</template>

<script setup>
import { useProductsActions } from "@/Composables/useProductsActions";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isCircleProduct: {
    type: Boolean,
    default: false,
  },
});

const {
  isNotLoggedUser,
  isAddProductError,
  isActionLoading,
  isProductAdded,

  addProductAction,
  actionErrorMessage,
} = useProductsActions();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.single-product {
  display: flex;
  flex-direction: column;
  height: 100%;

  &.white {
    background-color: white;
  }

  // .single-product__content
  &__content {
    display: flex;
    position: relative;
    flex-direction: column;
    z-index: 2;
    flex: 1 1 auto;
  }

  // .single-product__action-loading

  &__action-loading {
  }

  // .single-product__body

  &__body {
    padding: 17px;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  // .single-product__image

  &__image {
    display: block;
    transition: all 0.5s ease 0s;
    padding: 0px 0px calc(200 / 253 * 100%) 0px;
    margin: 0px 0px rem(20) 0px;
    z-index: 1;

    img {
      object-fit: contain;
    }

    &.circle {
      background-color: white;
      padding: 0px 0px calc(250 / 250 * 100%) 0px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0px 0px rem(5) 0px;

      img {
        border-radius: 50%;
        overflow: hidden;
        object-fit: contain;
      }
    }
  }

  // .single-product__info

  &__info {
    > *:last-child {
      margin-bottom: 0px;
    }

    &.center {
      margin: 0px 0px rem(0) 0px;
      text-align: center;
    }

    margin: 0px 0px rem(15) 0px;
  }

  // .single-product__name

  &__name {
    transition: color 0.5s ease 0s;
    font-weight: 500;
    font-size: rem(24);
    line-height: calc(30 / 24);
    color: black;

    @media (any-hover: hover) {
      &:hover {
        color: cornflowerblue;
      }
    }

    display: inline-block;
    margin: 0px 0px rem(15) 0px;
  }

  // .single-product__size

  &__size {
    line-height: calc(22 / 18);

    color: #a4acad;

    &.center {
      text-align: center;
    }
  }

  // .single-product__actions

  &__actions {
    &.border {
      border-top: rem(0.5) solid #a4acad;
      justify-content: space-between;
      padding: 5px 17px 5px 17px;

      @media (max-width: 1550px) and (min-width: 1312px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 10px;
    justify-content: center;
  }

  // .single-product__pricing

  &__pricing {
  }

  // .single-product__price

  &__price {
    font-weight: 700;
    font-size: rem(24);
  }

  // .single-product__old-price

  &__old-price {
    font-size: rem(25);
    text-decoration: line-through;
    color: #a4acad;
  }

  // .single-product__button

  &__button {
  }

  // .single-product__message

  &__message {
    top: 10px;
    left: 10px;
    width: 80%;
  }

  &__add-btn {
    background: #f46d40;
    display: inline-flex;
    align-items: center;
    flex: 0 0 rem(26);
    min-height: rem(26);
    transition: all 0.5s ease 0s;
    justify-content: center;

    @media (any-hover: hover) {
      &:hover {
        background: #fa4204;
      }
    }

    border-radius: 50%;

    &::before {
      color: white;
      font-size: rem(14);
    }
  }
}
</style>
