import { ref } from "vue";

import { useUserCartStore } from "../stores/userCart";
import {useUserAuthStore} from "../stores/userAuth";
import {addToCart, deleteFromCart} from "../api/products";


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
    const deletedProduct = await deleteFromCart({
      product_id: +product.product_id,
      user_id: +userAuthStore.currentUser.id,
    });

    console.log(deletedProduct);

    if (deletedProduct.isRemoved) {
      userCartStore.updateUserCart(product, "Remove");
    }
    if (deletedProduct.err) {
      actionErrorMessage.value = deletedProduct.err;
      console.log(deletedProduct.err);
      isDeleteError.value = true;
      setTimeout(() => (isDeleteError.value = false), 2500);
    }
    isActionLoading.value = false;
  };

  const addProductAction = async (product) => {
    if (userAuthStore.checkIfUserLogged) {
      isActionLoading.value = true;
      if (!product.count) {
        product.count = 1;
      }

      const addedProduct = await addToCart({
        product_id: product.product_id,
        user_id: userAuthStore.currentUser.id,
        count: product.count,
      });
      if (addedProduct.err) {
        console.log(addedProduct.err);
        actionErrorMessage.value = addedProduct.err;
        isAddProductError.value = true;
        setTimeout(() => (isAddProductError.value = false), 2500);
      }

      if (addedProduct.isAdded) {
        isProductAdded.value = true;
        userCartStore.updateUserCart(product, "Add");
        setTimeout(() => (isProductAdded.value = false), 2500);
      }
    } else {
      isNotLoggedUser.value = true;
      setTimeout(() => (isNotLoggedUser.value = false), 2500);
    }
    isActionLoading.value = false;
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
