<template>
    <div class="review">
        <div class="review__body">
            <div class="review__header">
                <div class="review__user">{{ review.name }}</div>
                <div class="review__date">{{ new Date(props.review.date).toLocaleDateString() }}</div>
            </div>
            <div class="review__text">
                {{ review.text }}
            </div>
        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    review: {
        type: Object,
        required: true,
    }
});





</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

.review {

    background-color: white;
    border-radius: rem(5);



    // .review__body
    &__body {
        padding: rem(10);

    }

    // .review__header

    &__header {
        display: flex;
        align-items: center;
        column-gap: rem(20);
        margin: 0px 0px rem(15) 0px;
    }

    // .review__user

    &__user {
        font-size: rem(24);
        line-height: calc(30/24);


    }

    // .review__date

    &__date {
        color: #A4ACAD;
        line-height: calc(22/18);
    }

    // .review__text

    &__text {

        line-height: calc(22/18);
    }
}
</style>