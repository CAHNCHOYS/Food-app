<template>
    <section class="homepage__company-info company-info">
        <div class="company-info__title">
            Заказать суши, другую еду можно у нас!
        </div>
        <div class="company-info__text">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                voluptate provident quia amet facere vel itaque consequuntur doloribus
                commodi! Quaerat, explicabo tempore? Vel suscipit voluptatibus
                asperiores maiores optio iusto accusamus!
            </p>

            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                voluptate provident quia amet facere vel itaque consequuntur doloribus
                commodi! Quaerat, explicabo tempore? Vel suscipit voluptatibus
                asperiores maiores optio iusto accusamus! 2
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                voluptate provident quia amet facere vel itaque consequuntur doloribus
                commodi!
                <span class="company-info__text-hide" :class="{ opacity: !continueText }">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente,
                    voluptates. Quaerat, explicabo tempore? Vel suscipit voluptatibus
                    asperiores maiores Lo<span v-show="!continueText">... </span></span>
                <span v-show="continueText">rem ipsum dolor sit amet consectetur adipisicing elit. Modi qui
                    eius architecto quis repudiandae adipisci debitis dolorum provident
                    in quidem vitae, beatae ut corrupti voluptatibus! Aut ab, ut minus
                    laudantium repudiandae iure pariatur facere ad ea fugit aliquam
                    labore rerum! Molestias nesciunt, sed rem maiores officia
                    repellendus. Id voluptates iusto provident voluptas enim?</span>
            </p>
            <p v-show="continueText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure
                assumenda recusandae dolorum doloremque, perspiciatis nisi maiores
                adipisci repellat unde blanditiis dolorem nostrum maxime quia ipsa
                quis. Ut quos accusantium est.
            </p>

            <p v-show="continueText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, aliquid!
                Quos perferendis quas quis aliquid deleniti, facere facilis voluptatem
                quo amet rerum suscipit expedita? Sunt, enim doloremque animi odit
                consectetur voluptatem ipsam amet minima quas perferendis sed
                veritatis. Beatae necessitatibus esse voluptate animi ipsa itaque
                atque dignissimos dolor a rerum?
            </p>
        </div>

        <div class="company-info__continue-btn">
            <span class="icon-arrow-down" @click="continueText = !continueText"
                :class="{ active: continueText }">Подробнее</span>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';


const continueText = ref(false);


</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";



.company-info {
    // .company-info__title

    &__title {
        font-weight: 700;
        font-size: rem(24);
        line-height: calc(30 / 24);
        color: #a4acad;
        margin: 0px 0px rem(10) 0px;
    }

    // .company-info__text

    &__text {
        line-height: 100%;
        color: black;

        line-height: 1.3;
        margin: 0px 0px rem(30) 0px;

        >p:not(:last-child) {
            margin-bottom: rem(20);
        }

        &:last-child {
            margin: 0px 0px rem(42) 0px;
        }
    }

    &__text-hide {
        &.opacity {
            opacity: 0.5;
        }
    }

    // .company-info__continue-btn

    &__continue-btn {
        text-align: center;

        span {
            position: relative;
            padding: 0px rem(35) 0px 0px;
            display: inline-block;

            &::before {
                position: absolute;
                display: block;
                top: 50%;
                right: rem(10);
                transform: translate(0, -40%);
                transition: all 0.5s ease 0s;
                color: #f46d40;
                font-size: rem(24);
            }

            &.active {
                &::before {
                    transform: translate(0, -40%) rotate(-180deg);
                }
            }

            font-size: rem(24);
            color: #f46d40;
            cursor: pointer;

            @media (any-hover: hover) {
                &:hover {
                    color: #fd3f00;

                    &::before {
                        color: #fd3f00;
                    }
                }
            }
        }
    }
}
</style>