<template>
    <button class="go-back icon-arrow-left" @click="goBack">
        <slot>Назад </slot>
    </button>
</template>

<script setup>

import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
    router.go(-1);
}




</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";


.go-back {
    line-height: calc(22/18);
    position: relative;
    display: inline-block;

    &::before {
        position: absolute;
        left: 0;
        display: inline-flex;
        width: rem(20);
        height: rem(20);
        background-color: #F46D40;
        color: white;
        justify-content: center;
        align-items: center;
        transition: all 0.5s ease 0s;
        border-radius: 50%;
        transform: translate(0, -10%);
    }

    padding: 0px 0px 0px rem(30);
    transition: all 0.5s ease 0s;

    @media (any-hover:hover) {
        &:hover {
            color: cornflowerblue;

            &::before {
                background-color: cornflowerblue;
            }
        }
    }
}
</style>