import { ref, watch } from "vue";

import { fetchData } from "../api/fetchData";

export const useCategoryProductsFetch = (props, route) => {
  const isLoading = ref(false);
  const isError = ref(false);
  const errorMessage = ref("Произошла ошибка при загрузке товаров");

  const categoryProducts = ref([]);
  const currentCategoryIcon = ref("");

  const categoryIcons = {
    Пиццы: "icon-pizza",
    Сеты: "icon-sets",
    Суши: "icon-sushi",
    Роллы: "icon-Rolli",
    Wok: "icon-Wok",
    Супы: "icon-Soup",
    Напитки: "icon-drinks2",
    Салаты: "icon-Salad",
    "Поиск по товарам": "icon-search",
  };

  // Получаем товары по категория
  watch(
    [
      () => props.category,
      () => route.query.searchCategories,
      () => route.query.searchProduct,
    ],
    async () => {
      isLoading.value = true;
      categoryProducts.value = [];

      console.log(props.category);

      let products = [];

      //Если пришли с формы поиска
      if (route.query.searchCategories || route.query.searchProduct) {
        products = await fetchData(
          `/api/searchProduct/${route.query.searchCategories}/${route.query.searchProduct}`
        );
        currentCategoryIcon.value = categoryIcons["Поиск по товарам"];

        //Если пришли с меню категорий
      } else {
        products = await fetchData(`/api/categories/${props.category}/999`);
        currentCategoryIcon.value = categoryIcons[props.category];
      }

      if (products.length) {
        categoryProducts.value = products;
      } else if (products.err) {
        console.log(products.err);
        errorMessage.value = products.err;
        isError.value = true;
      }

      isLoading.value = false;
    },
    { immediate: true }
  );

  return {
    isLoading,
    categoryProducts,
    isError,
    currentCategoryIcon,
    errorMessage,
  };
};
