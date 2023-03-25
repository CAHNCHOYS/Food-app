import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { getUserByToken, login, register } from "../api/users.js";

export const useUserAuthStore = defineStore("userAuth", () => {
  const currentUser = ref(null);
  const isUserLoggedIn = ref(false);
  const checkIfUserLogged = computed(() => isUserLoggedIn.value);

  const isSuccessMessageShown = ref(false);
  const isErrorMessageShown = ref(false);
  const message = ref("");

  async function loginUser(loginPayload) {
    try {
      let loginResult = await login(loginPayload);
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
      await register(registerPayload);
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
    console.log("tokenn", token);
    console.log("user", user);
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
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      try {
        const user = await getUserByToken(token);
        currentUser.value = user;
        isUserLoggedIn.value = true;
      } catch (error) {
        console.log(error);
        logOutUser();
      }
    }
  }

  return {
    addTokenToStorage,
    getUser,
    logOutUser,
    loginUser,
    registerUser,

    checkIfUserLogged,
    isSuccessMessageShown,
    isErrorMessageShown,
    message,
    currentUser,
  };
});
