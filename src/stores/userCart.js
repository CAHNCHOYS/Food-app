import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserAuthStore } from "./userAuth.js";

import { fetchData } from "../api/fetchData.js";

export const useUserCartStore = defineStore("userCart", () => {
 
  const userAuthStore = useUserAuthStore();

  const cartItems = ref([]);
  const isFetchingLoading = ref(false);
  const isCartProductsErr = ref(false);
  const loadErrorMessage = ref("Произошла ошибка при загрузке товаров корзины");
  const isPromoActive = ref(false);


  function updateUserPromo(promo) {
    if (promo === "zZz" || promo === "yYy" || promo === "aAa") {
      isPromoActive.value = true;
    }
  }

 
  async function fetchUserCartProducts() {
    if (userAuthStore.currentUser.id) {
      cartItems.value = [];
      isFetchingLoading.value = true;

      const userCartProducts = await fetchData(
        `/api/cartProducts/${+userAuthStore.currentUser.id}`
      );

      if (userCartProducts.length) {
        cartItems.value = userCartProducts;
      } else if (userCartProducts.err) {
        loadErrorMessage.value =
          userCartProducts.err.message || userCartProducts.err.sqlMessage;
        console.log(userCartProducts.err);

        isCartProductsErr.value = true;
      }

      isFetchingLoading.value = false;
    }
  }

  async function commitOrder() {
    try {
      const requests = cartItems.value.map((product) =>
        fetch("https://sushi-backend-henna.vercel.app/api/order", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.product_id,
            user_id: userAuthStore.currentUser.id,
            count: product.count,
          }),
        })
      );

      let results = await Promise.all(requests);
      console.log(results);

      let resultesJson = await Promise.all(results.map((res) => res.json()));
      console.log(resultesJson);
      return resultesJson;
    } catch (err) {
      console.log(err);
      return { err };
    }
  }

  async function addProductToCart(product) {
    if (userAuthStore.checkIfUserLogged) {
      if (!product.count) {
        product.count = 1;
      }

      const addProductFetch = await fetchData(`/api/cartProducts`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.product_id,
          user_id: userAuthStore.currentUser.id,
          count: product.count,
        }),
      });

      return addProductFetch;
    } else
      return {
        isUserNotLogged: true,
      };
  }

  function updateUserCart(product, method = "remove") {
    if (method.toLowerCase() === "add") {
      cartItems.value.push(product);
    }
    if (method.toLowerCase() === "remove") {
      cartItems.value = cartItems.value.filter(
        (item) => item.product_id != product.product_id
      );
    }
  }

  async function deleteProductFromCart(product) {
    const deleteProductFetch = await fetchData(`/api/cartProducts`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      }, 
      body: JSON.stringify({
        product_id: +product.product_id,
        user_id: +userAuthStore.currentUser.id,
      }),
    });

    return deleteProductFetch;
  }

  const getAllProductsPrice = computed(() => {
    return cartItems.value.reduce(
      (start, item) => start + item.Price * item.count,
      0
    );
  });


  return {
    addProductToCart,
    fetchUserCartProducts,
    updateUserCart,
    deleteProductFromCart,
    updateUserPromo,
    commitOrder,

    cartItems,
    isFetchingLoading,
    getAllProductsPrice,
    isCartProductsErr,
    isPromoActive,
    loadErrorMessage,
  };
});
