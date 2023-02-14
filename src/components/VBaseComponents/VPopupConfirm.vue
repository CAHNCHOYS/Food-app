<template>
    <div class="popup-confirm" :class="{ isFull: isFullScreen }">
        <div class="popup-confirm__body">
            <div class="popup-confirm__content">
                <div class="popup-confirm__text">
                    {{ text }}
                </div>
                <div class="popup-confirm__actions">
                    <div class="popup-confirm__action popup-confirm__action_no" @click="$emit('cancel')">Нет</div>
                    <div class="popup-confirm__action popup-confirm__action_yes" @click="$emit('confirm')"> Да</div>

                </div>


            </div>

        </div>

    </div>
</template>

<script setup>
const props = defineProps({
    text: {
        type: String,
        default: "Вы уверены?"
    },
    isFullScrenn: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['confirm', 'cancel']);


</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.popup-confirm {

    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 105;


    background-color: rgba($color: #000000, $alpha: 0.7);


    // .popup-confirm__body
    &__body {
        min-height: 100%;
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
    }

    // .popup-confirm__content

    &__content {

        background-color: white;
        color: black;
        flex: 1 1 auto;
        padding: rem(30) rem(20);
        max-width: rem(500);


    }

    // .popup-confirm__text

    &__text {
        line-height: 1.2;
        font-weight: 500;
        text-align: center;

        font-size: rem(32);
        margin: 0px 0px rem(30) 0px;
    }

    // .popup-confirm__actions

    &__actions {
        display: flex;
        justify-content: center;
        column-gap: rem(10);
    }

    // .popup-confirm__action

    &__action {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        min-height: rem(45);
        justify-content: center;
        max-width: 100%;
        padding: 0px rem(20);

        color: white;
        transition: all 0.5s ease 0s;

        // .popup-confirm__action_no
        &_no {
            background-color: cornflowerblue;

            @media (any-hover:hover) {
                &:hover {
                    background-color: rgb(16, 99, 253);
                }
            }
        }

        // .popup-confirm__action_yes

        &_yes {
            background-color: crimson;

            @media (any-hover:hover) {
                &:hover {
                    background-color: rgb(253, 3, 53);

                }
            }
        }
    }
}
</style>