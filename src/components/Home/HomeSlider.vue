<template>
    <div class="homepage__slider main-slider">
      <Swiper :modules="[Pagination, EffectFlip]" class="main-slider__slider" v-bind="mainSliderSettings">
        <SwiperSlide class="main-slider__slide">
          <div class="main-slider__body">
            <div class="main-slider__content">
              <div class="main-slider__slide-title">Лучшая еда</div>
              <div class="main-slider__slide-text">Только у нас</div>
              <div class="main-slider__btn">
                <RouterLink class="btn" to="/">Поехали</RouterLink>
              </div>
            </div>
          </div>
          <div class="main-slider__picture">
            <img src="@/assets/Images/FoodPic.jpg" alt="Food picture" />
          </div>
        </SwiperSlide>

        <SwiperSlide class="main-slider__slide">
          <div class="main-slider__body">
            <div class="main-slider__content">
              <div class="main-slider__slide-title">
                Доставка прямиком в руки!
              </div>

              <div class="main-slider__btn">
                <RouterLink class="btn" to="/">Узнать!</RouterLink>
              </div>
            </div>
          </div>
          <div class="main-slider__picture">
            <img src="@/assets/Images/Deliever.jpg" alt="Доставка еды фото" />
          </div>
        </SwiperSlide>

        <SwiperSlide class="main-slider__slide">
          <div class="main-slider__body">
            <div class="main-slider__content">
              <div class="main-slider__slide-title">Хммм Пицца</div>

              <div class="main-slider__btn">
                <RouterLink class="btn" to="/">Заказать</RouterLink>
              </div>
            </div>
          </div>
          <div class="main-slider__picture">
            <img src="@/assets/Images/Pizza.png" alt="Фото пиццы" />
          </div>
        </SwiperSlide>

        <div class="main-slider__pagination"></div>
      </Swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, EffectFlip } from "swiper";

import "swiper/css/effect-flip";
import "swiper/css";
import "swiper/css/pagination";

//-------------------------------------------------------------------



  const mainSliderSettings = {
    pagination: {
      clickable: true,
      el: ".main-slider__pagination",
    },
    effect: "flip",
    grabCursor: true,
    speed: 1000,
    autoHeight: true,
  };


</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";


.main-slider {
  // .main-slider__slider

  &__slider {
    position: relative;
  }

  // .main-slider__slide

  &__slide {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 3;
      top: 0;
      left: 0;
      background-color: rgba($color: #000000, $alpha: 0.6);
    }
  }

  // .main-slider__body

  &__body {
    position: relative;
    z-index: 4;
    padding: rem(150) rem(20);

    @media (max-width: #{$mobileSmall+px}) {
      padding: rem(80) rem(15);
    }

    color: white;
    display: flex;
    justify-content: flex-end;
  }

  &__content {
    position: relative;
    z-index: 4;
    max-width: rem(460);

    >*:last-child {
      margin-bottom: 0px;
    }

    text-align: right;
  }

  // .main-slider__slide-title

  &__slide-title {
    font-size: rem(56);
    margin: 0px 0px rem(20) 0px;

    @media (max-width: #{$tablet+px}) {
      font-size: rem(36);
    }
  }

  // .main-slider__slide-text
  &__slide-text {
    font-size: rem(28);
    margin: 0px 0px rem(20) 0px;

    @media (max-width: #{$tablet+px}) {
      font-size: rem(24);
    }
  }

  // .main-slider__btn

  &__btn {}

  // .main-slider__picture

  &__picture {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  // .main-slider__pagination

  &__pagination {
    margin: rem(10) 0px 0px 0px;
    display: flex;
    justify-content: center;
    column-gap: 0px;

    span.swiper-pagination-bullet-active {
      background-color: #f46d40;
    }
  }
}


.slider-enter-active,
.slider-leave-active {
  transition: all 0.5s ease 0s;
}

.slider-enter-from {
  transform: translate(-30%, 0);
  opacity: 0;
}

.slider-enter-to {
  transform: translate(0);
  opacity: 1;
}

.slider-leave-to {
  display: none;
  transform: translate(30%, 0);
  opacity: 0;
}

</style>