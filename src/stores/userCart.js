import { defineStore } from "pinia";
import { computed, ref } from "vue";
import ProductService from "../api/products.js";

export const useUserCartStore = defineStore("userCart", () => {
  const cartItems = ref([]);
  const isProductsLoading = ref(false);
  const isCartProductsErr = ref(false);
  const loadErrorMessage = ref("Произошла ошибка при загрузке товаров корзины");

  const isPromoActive = ref(false);
  function updateUserPromo(promo) {
    if (promo === "zZz" || promo === "yYy" || promo === "aAa") {
      isPromoActive.value = true;
    }
  }

  async function fetchUserCartProducts(userId) {
    if (userId) {
      try {
        const products = await ProductService.getUserCartProducts(userId);
        console.log(products);
        cartItems.value = products;
      } catch (error) {
        console.log(error);
        isCartProductsErr.value = true;
        loadErrorMessage.value = error.message;
      }
      isProductsLoading.value = false;
    }
  }

  async function commitOrder(userId) {
    try {
      const requests = cartItems.value.map((product) =>
        fetch("https://sushi-backend-henna.vercel.app/api/order", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: product.product_id,
            user_id: userId,
            count: product.count,
          }),
        })
      );
      let results = await Promise.all(requests);

      let resultesJson = await Promise.all(results.map((res) => res.json()));

      return resultesJson;
    } catch (err) {
      console.log(err);
      return { err };
    }
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

  const getAllProductsPrice = computed(() => {
    return cartItems.value.reduce(
      (start, item) => start + item.Price * item.count,
      0
    );
  });

  return {
    fetchUserCartProducts,
    updateUserCart,
    updateUserPromo,
    commitOrder,

    cartItems,
    isProductsLoading,
    getAllProductsPrice,
    isCartProductsErr,
    isPromoActive,
    loadErrorMessage,
  };
});
