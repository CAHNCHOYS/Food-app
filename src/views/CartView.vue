<template>
    <div class="cart-page">
        <div class="cart-page__body">
            <UserCart> </UserCart>
        </div>


    </div>


</template>

<script setup>
import UserCart from "@/components/UserCart/UserCart.vue";


</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.cart-page {

    // .cart-page__body

    &__body {
        padding: 0px 0px rem(30) 0px;
    }
}
</style>