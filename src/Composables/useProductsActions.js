import { ref } from "vue";

import { useUserCartStore } from "../stores/userCart";

export const useProductsActions = () => {
  const userCartStore = useUserCartStore();

  const isActionLoading = ref(false);
  const isAlreadyInCart = ref(false);
  const isProductAdded = ref(false);
  const isAddProductError = ref(false);
  const isNotLoggedUser = ref(false);
  const isDeleteError = ref(false);
  const actionErrorMessage = ref("Произошла ошибка");

  const deleteProductAction = async (product) => {
    isActionLoading.value = true;
    const deletionResult = await userCartStore.deleteProductFromCart(product);
    console.log(deletionResult);

    if (deletionResult.isRemoved) {
      userCartStore.updateUserCart(product, "Remove");
    }
    if (deletionResult.err) {
      actionErrorMessage.value =   deletionResult.err;
       console.log(deletionResult.err);
      isDeleteError.value = true;
      
      setTimeout(() => (isDeleteError.value = false), 2500);
    }
    isActionLoading.value = false;
  };



  
  const addProductAction = async (product) => {
    isActionLoading.value = true;

    const addedProduct = await userCartStore.addProductToCart(product);

    console.log(addedProduct);
    if (addedProduct.isUserNotLogged) {
      isNotLoggedUser.value = true;
      setTimeout(() => (isNotLoggedUser.value = false), 2500);
    }

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

    if (addedProduct.isSameProduct) {
      isAlreadyInCart.value = true;
      setTimeout(() => (isAlreadyInCart.value = false), 2500);
    }

    isActionLoading.value = false;
  };

  return {
    isNotLoggedUser,
    isActionLoading,
    isAlreadyInCart,
    isAddProductError,
    isProductAdded,
    isDeleteError,

    actionErrorMessage,
    addProductAction,
    deleteProductAction,
  };
};
