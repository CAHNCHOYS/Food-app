import { computed, ref, watch } from "vue";

import { fetchData } from "../api/fetchData";

export const useSingleProductFetch = (props) => {
  const pageProduct = ref(null);
  const isLoading = ref(false);
  const isErr = ref(false);
  const errorMessage = ref("Произошла ошибка(");

  watch(
    [() => props.name, () => props.id],
    async () => {
      isLoading.value = true;
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
        isErr.value = true;
        console.log(product.err);
      }

      isLoading.value = false;
    },
    { immediate: true }
  );

  return { pageProduct, isLoading, isErr, errorMessage };
};
