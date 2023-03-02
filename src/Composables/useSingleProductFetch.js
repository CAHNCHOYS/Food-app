import {  ref, watch } from "vue";

import { fetchData } from "../api/fetchData";

export const useSingleProductFetch = (props) => {
  const pageProduct = ref(null);
  const isProductLoading = ref(false);
  const isFetchError = ref(false);
  const errorMessage = ref("Произошла ошибка(");

  watch(
    [() => props.name, () => props.id],
    async () => {
      isProductLoading.value = true;
      pageProduct.value = null;

      const product = await fetchData(
        `/api/products/${props.name}/${props.id}`
      );
      if (product.length) {
        pageProduct.value = product[0];
        pageProduct.value.count = 1;
      }

      if (product.err) {
        errorMessage.value = product.err;
        isFetchError.value = true;
        console.log(product.err);
      }

      isProductLoading.value = false;
    },
    { immediate: true }
  );

  return { pageProduct, isProductLoading, isFetchError, errorMessage };
};
