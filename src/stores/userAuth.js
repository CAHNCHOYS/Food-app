import { defineStore } from "pinia";
import { computed, ref } from "vue";

import { verifyToken, updateInfo, login } from "../api/users.js";

export const useUserAuthStore = defineStore("userAuth", () => {
  const currentUser = ref(null);
  const isUserLoggedIn = ref(false);
  const checkIfUserLogged = computed(() => isUserLoggedIn.value);

  function addTokenToStorage({ token, user }) {
    console.log("tokenn", token);
    console.log("user", user);
    currentUser.value = user;
    localStorage.setItem("token", JSON.stringify(token));

    isUserLoggedIn.value = true;
  }

  function logOutUser() {
    isUserLoggedIn.value = false;
    localStorage.removeItem("token");
    currentUser.value = null;
  }

  async function verifyUserToken() {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(token);

      let verifiedToken = await verifyToken(token);

      console.log(verifiedToken);
      if (verifiedToken.isInvalidToken) {
        logOutUser();
      } else if (verifiedToken.user) {
        currentUser.value = verifiedToken.user;
        isUserLoggedIn.value = true;
      } else if (verifiedToken.err) {
        console.log(verifiedToken.err);
      }
    }
  }

  //Обновление данных в личном кабинете
  async function updateUserInfo(userData) {
    currentUser.value = Object.assign(currentUser.value, userData);
  }

  return {
    addTokenToStorage,
    verifyUserToken,

    logOutUser,
    updateUserInfo,

    checkIfUserLogged,
    currentUser,
  };
});
