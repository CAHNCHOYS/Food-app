import { defineStore } from "pinia";
import { ref } from "vue";
import { useUserCartStore } from "./userCart.js";

import AuthService from "../api/auth.js";

export const useUserAuthStore = defineStore("userAuth", () => {
  const currentUser = ref(null);
  const isUserLoggedIn = ref(false);

  const isSuccessMessageShown = ref(false);
  const isErrorMessageShown = ref(false);
  const message = ref("");
  const isUserDataLoading = ref(false);

  async function loginUser(loginPayload) {
    try {
      let loginResult = await AuthService.login(loginPayload);
      isSuccessMessageShown.value = true;
      addTokenToStorage(loginResult);
      message.value =
        "Авторизация прошла успешно, вскоре вы будете переведены на главную страницу!";
      setTimeout(() => (isSuccessMessageShown.value = false), 3000);
    } catch (error) {
      isErrorMessageShown.value = true;
      message.value = error.message;
      setTimeout(() => (isErrorMessageShown.value = false), 3000);
    }
  }

  async function registerUser(registerPayload) {
    try {
      await AuthService.register(registerPayload);
      isSuccessMessageShown.value = true;

      message.value =
        "Регистрация прошла успешно, можете переходить к авторизации!";
      setTimeout(() => (isSuccessMessageShown.value = false), 3000);
      return true;
    } catch (error) {
      isErrorMessageShown.value = true;
      message.value = error.message;
      setTimeout(() => (isErrorMessageShown.value = false), 3000);
      return false;
    }
  }

  function addTokenToStorage({ token, user }) {
    currentUser.value = user;
    localStorage.setItem("token", token);
    isUserLoggedIn.value = true;
  }

  function logOutUser() {
    isUserLoggedIn.value = false;
    localStorage.removeItem("token");
    currentUser.value = null;
  }

  async function getUser() {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        isUserDataLoading.value = true;
        const user = await AuthService.getUserByToken(token);
        currentUser.value = user;
        isUserLoggedIn.value = true;
        const { fetchUserCartProducts } = useUserCartStore();
        await fetchUserCartProducts(currentUser.value.id);
      } catch (error) {
        console.log(error);
        logOutUser();
      } finally {
        isUserDataLoading.value = false;
      }
    }
  }

  return {
    addTokenToStorage,
    getUser,
    logOutUser,
    loginUser,
    registerUser,

    isSuccessMessageShown,
    isUserLoggedIn,
    isErrorMessageShown,
    message,
    isUserDataLoading,
    currentUser,
  };
});
