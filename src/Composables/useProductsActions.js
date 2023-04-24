import { ref } from "vue";

import { useUserCartStore } from "../stores/userCart";
import { useUserAuthStore } from "../stores/userAuth";
import { addToCart, deleteFromCart } from "../api/products";

export const useProductsActions = () => {
  
  const userCartStore = useUserCartStore();
  const userAuthStore = useUserAuthStore();

  const isActionLoading = ref(false);
  const isProductAdded = ref(false);
  const isAddProductError = ref(false);
  const isNotLoggedUser = ref(false);
  const isDeleteError = ref(false);
  const actionErrorMessage = ref("Произошла ошибка");

  const deleteProductAction = async (product) => {
    isActionLoading.value = true;
    try {
      await deleteFromCart({
        product_id: +product.product_id,
        user_id: +userAuthStore.currentUser.id,
      });
      userCartStore.updateUserCart(product, "Remove");
    } catch (error) {
      actionErrorMessage.value = error.message;
      isDeleteError.value = true;
      setTimeout(() => (isDeleteError.value = false), 2500);
    }
    isActionLoading.value = false;
  };

  const addProductAction = async (product) => {
    if (userAuthStore.checkIfUserLogged) {
      isActionLoading.value = true;
      if (!product.count) product.count = 1;

      try {
        await addToCart({
          product_id: product.product_id,
          user_id: userAuthStore.currentUser.id,
          count: product.count,
        });

        isProductAdded.value = true;
        userCartStore.updateUserCart(product, "Add");
        setTimeout(() => (isProductAdded.value = false), 2500);
      } catch (error) {
        actionErrorMessage.value = error.message;
        isAddProductError.value = true;
        setTimeout(() => (isAddProductError.value = false), 2500);
      }
      isActionLoading.value = false;
    } else {
      isNotLoggedUser.value = true;
      setTimeout(() => (isNotLoggedUser.value = false), 2500);
    }
  };

  return {
    isNotLoggedUser,
    isActionLoading,
    isAddProductError,
    isProductAdded,
    isDeleteError,

    actionErrorMessage,
    addProductAction,
    deleteProductAction,
  };
};
