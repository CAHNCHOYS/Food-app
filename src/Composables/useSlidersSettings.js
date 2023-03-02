export const useSlidersSettings = () => {
  //Найстроки свайпера для обычных товаров
  const productSliderSettings = {
    slidesPerView: 3,
    spaceBetween: 30,

    navigation: {
      clickable: true,
      prevEl: ".products-slider__arrow.icon-arrow-left",
      nextEl: ".products-slider__arrow.icon-arrow-right",
    },
    pagination: {
      clickable: true,
      el: ".products-slider__pagination",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      420: {
        spaceBetween: 15,
        slidesPerView: 2,
      },

      1300: {
        spaceBetween: 30,
        slidesPerView: 3,
      },
    },
  };

  //Свайпер для товаров с круглой картинокй
  const productSettingsCirle = {
    slidesPerView: 3,
    spaceBetween: 30,

    navigation: {
      clickable: true,
      prevEl: ".products-slider__arrow.icon-arrow-left",
      nextEl: ".products-slider__arrow.icon-arrow-right",
    },
    pagination: {
      clickable: true,
      el: ".products-slider__pagination",
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      420: {
        spaceBetween: 30,
        slidesPerView: 2,
      },
      1000: {
        slidesPerView: 3,
      },

      1700: {
        slidesPerView: 3,
        spaceBetween: 80,
      },
    },
  };

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

   
  return { productSliderSettings, productSettingsCirle, mainSliderSettings}
};
