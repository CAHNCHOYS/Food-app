<template>
    <article class="cart-product">



        <!-- <Transition name="popup">
            <VPopupConfirm :text="`Удалить товар ${product.name} из корзины?`" @cancel="isOpenPopup = false"
                @confirm="deleteProductAction(product)" v-if="isOpenPopup"></VPopupConfirm>
        </Transition> -->


        <div class="cart-product__row" :class="{ op: isActionLoading }">
            <LoadingGif class="cart-product__delition-loading" v-if="isActionLoading"></LoadingGif>
         
            <div class="cart-product__remove" @click="deleteProductAction(product)">
                <img src="@/assets/Images/remove.svg" alt="remove icon">
            </div>

            <div class="cart-product__picture">

                <img v-lazy="{ src: `https://sushi-backend-henna.vercel.app/Products/${product.image}`, loading: 'https://sushi-backend-henna.vercel.app/Load.gif', error: 'https://sushi-backend-henna.vercel.app/Err.png' }" :alt="product.name">
            </div>

            <div class="cart-product__info">
                <div class="cart-product__name">
                    <RouterLink :to="`/Products/${product.name}/${product.product_id}`"> {{ product.name }}</RouterLink>
                </div>
                <div class="cart-product__actions">
                    <div class="cart-product__count count-product">
                        <div class="count-product__row count-product__row_small">
                            <div class="count-product__action count-product__action_small  count-product__action_minus"
                                @click="decrementCount">

                            </div>
                            <div class="count-product__number count-product__number_small"> {{ product.count }}</div>
                            <div class="count-product__action count-product__action_small icon-plus"
                                @click="incrementCount">

                            </div>

                        </div>
                    </div>
                    <div class="cart-product__total-price">
                        {{ getFullPrice }}₽
                    </div>

                </div>
           
                
                <div class="cart-product__delete-error" v-if="isDeleteError">
                   {{ actionErrorMessage }}
                </div>

            </div>

        </div>


    </article>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { useProductsActions } from '../../Composables/useProductsActions';
// import VPopupConfirm from '../VPopupConfirm.vue';
const props = defineProps({
    product: Object,
});



const { deleteProductAction, isActionLoading, isDeleteError, actionErrorMessage } = useProductsActions();

const getFullPrice = computed(() => props.product.count * props.product.Price);


const incrementCount = () => {
    props.product.count++;
    console.log(props.product);
}

const decrementCount = () => {
    if (props.product.count === 1) return;
    props.product.count--;
}






</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.cart-product {



    @media(max-width: #{$container+px}) {
        background: #FFFFFF;
        border-radius: rem(5);
        padding: rem(10);

    }






    // .cart-product__delition-loading

    &__delition-loading {
        position: absolute;
        width: 150px;
        height: 150px;
        top: 0%;
        left: 50%;
        z-index: 10;
        transform: translate(-50%, 0);

    }




    position: relative;
    // .cart-product__row

    &__row {
        display: flex;
        position: relative;
        padding-right: 25px;
        column-gap: 8px;

        &.op {
            opacity: 0.2;
        }
    }

    // .cart-product__remove

    &__remove {
        cursor: pointer;

        z-index: 1;
        position: absolute;
        width: 15px;
        height: 15px;
        right: 5px;
        top: 0;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    // .cart-product__picture

    &__picture {
        flex: 0 0 90px;
        height: 62px;
        position: relative;

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }

    // .cart-product__info

    &__info {
        position: relative;
        z-index: 2;

        >*:last-child {
            margin-bottom: 0px;
        }

        flex: 1 1 auto;
    }

    // .cart-product__name

    &__name {

        a {
            line-height: calc(22/18);
            color: inherit;
            transition: all 0.5s ease 0s;

            @media (any-hover:hover) {
                &:hover {
                    color: coral;
                }
            }
        }
    }

    // .cart-product__actions

    &__actions {
        display: flex;
        flex-wrap: wrap;
        column-gap: rem(10);
        align-items: center;
        row-gap: rem(10);
    }




    
    // .cart-product__count

    &__count {
        flex: 0 0 rem(90);
    }

    // .cart-product__total-price

    &__total-price {
        flex: 1 1 auto;
        line-height: calc(23/18);
        font-weight: 800;

        color: #000000;
    }
}


.popup-enter-active,
.popup-leave-active {
    transition: all 0.6s ease 0s;
}


.popup-enter-from {
    transform: perspective(600px);
    opacity: 0;
}

.popup-enter-to {
    transform: perspective(0px);
    opacity: 1;
}

.popup-leave-to {
    transform: translate(0, 100%) scale(0);
}
</style>