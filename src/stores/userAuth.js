import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { fetchData } from "../api/fetchData.js";

export const useUserAuthStore = defineStore("userAuth", () => {
  const currentUser = ref(null);
  const isUserLoggedIn = ref(false);
  const checkIfUserLogged = computed(() => isUserLoggedIn.value);

  function addUserToStorage({ token, user }) {
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

  async function verifyTokenStore() {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(token);

      let response = await fetchData(`/api/verify`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      console.log(response);
      if (response.isExpiredToken) {
        logOutUser();
      } else if (response.isValidToken) {
        currentUser.value = response.user;
        isUserLoggedIn.value = true;
      } else if (response.err) {
        console.log(response.err);
        logOutUser();
      }
    }
  }

  //Обновление данных в личном кабинете
  async function updateUserInfo(userData) {
    userData.id = currentUser.value.id;

    let userUpdate = await fetchData(`/api/users`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (userUpdate.err) {
      console.log(userUpdate.err);
      return { err: userUpdate.err };
    }
    if (userUpdate.isUpdated) {
      currentUser.value = Object.assign(currentUser.value, userData);

      //Так данные о пользователе хранятся в токене, то получаем новый токен
      let loginAgain = await fetchData("/api/login", {
        method: "POST",

        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: currentUser.value.email,
          password: currentUser.value.password,
        }),
      });

      console.log(loginAgain);

      if (loginAgain.err) {
        console.log(loginAgain.err);
        return { err: loginAgain.err };
      } else if (loginAgain.token) {
        addUserToStorage(loginAgain);
        return { isUpdated: true };
      } else {
        return { done: false };
      }
    }
  }

  return {
    addUserToStorage,
    verifyTokenStore,

    logOutUser,
    updateUserInfo,

    checkIfUserLogged,
    currentUser,
  };
});
