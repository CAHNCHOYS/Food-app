import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

export const useCategoiresFilter = (categoriesProducts, route) => {
  const router = useRouter();

  const moneySliderSettings = ref({
    min: 1,
    max: 2200,
    step: 20,
    format: {
      suffix: " ₽",
      decimals: 2,
    },
  });

  const productsByPage = ref(9);
  //текущая страница товаров
  const currentPage = ref(+route.query.currentPage || 1);
  //v model для слайдера цены
  const prices = ref([
    +route.query.priceFrom || 1,
    +route.query.priceTo || 2200,
  ]);

  const sortOptions = ref([
    "По умолчанию",
    "По цене(вверх)",
    "По цене(вниз)",
    "По весу",
  ]);

  const currentSortOption = ref(sortOptions.value[0]);
  const updateSorting = (sort) => {
    currentSortOption.value = sort;
  };

  //Фильтрация товаров по цене и сортировка по выбранному пользователем варианту
  const filteredProductsByValues = computed(() => {
    const filteredByPrice = categoriesProducts.value.filter(
      (product) =>
        product.Price >= prices.value[0] && product.Price <= prices.value[1]
    );
    let sorted = [];
    if (currentSortOption.value === "По цене(вверх)") {
      sorted = filteredByPrice.sort(
        (productA, productB) => productA.Price - productB.Price
      );
    } else if (currentSortOption.value === "По цене(вниз)") {
      sorted = filteredByPrice.sort(
        (productA, productB) => productB.Price - productA.Price
      );
    } else if (currentSortOption.value === "По весу") {
      sorted = filteredByPrice.sort(
        (productA, productB) => productA.numberSize - productB.numberSize
      );
    } else sorted = filteredByPrice;

    return sorted;
  });

  const setNewPageNumber = (newPage) => {
    currentPage.value = newPage;
  };

  //Пагинация по товаром ( на странице находится productsByPage товаров)
  const filteredProductsByPage = computed(() => {
    let count = filteredProductsByValues.value.length;
    let start = (currentPage.value - 1) * productsByPage.value;
    if (start >= count) {
      if (count === 0) {
        setNewPageNumber(1);
      } else setNewPageNumber(Math.ceil(count / productsByPage.value));
      start = (currentPage.value - 1) * productsByPage.value;
    }
    let end = start + productsByPage.value;
    return filteredProductsByValues.value.slice(start, end);
  });

  watch([currentPage, prices], () => {
    router.push({
      name: route.name,
      params: { ...route.params },
      query: {
        ...route.query,
        priceFrom: prices.value[0],
        priceTo: prices.value[1],
        currentPage: currentPage.value,
      },
    });
  });

  return {
    currentPage,
    prices,
    filteredProductsByPage,
    productsByPage,
    filteredProductsByValues,
    sortOptions,
    moneySliderSettings,
    updateSorting,
  };
};
