<template>
  <div class="fullscreen">

    <Transition name="message">
      <VAlert :position="'fixed'" :type="'same'" v-if="isWrongData">
        Не удалось войти по ввденным данным. Пожалуйста, введите правильные
        данные!
      </VAlert>
    </Transition>

    <Transition name="message">
      <VAlert :position="'fixed'" :type="'success'" v-if="isSuccess">
        Авторизация прошла успешно! Вас переведут на главную страницу !
      </VAlert>
    </Transition>

    <Transition name="message">
      <VAlert :position="'fixed'" :type="'error'" v-if="isLoginError">
        {{ errorMessage }}
      </VAlert>
    </Transition>

    <Transition name="message">
      <VAlert
        :position="'fixed'"
        :type="'error'"
        v-if="$route.query.isLoginRequired && isNotLogged"
      >
        Для доступа к данной странице ({{ $route.query.redirect }}) необходимо
        авторизироваться !
      </VAlert>
    </Transition>

    <div class="fullscreen__body">
      <div class="fullscreen__content">
        <div class="fullscreen__form-body">
          <vForm
            @submit="loginUser"
            @invalid-submit="invalidSubmit"
            :validation-schema="loginSchema"
          >
            <div class="action-form__title">Логин</div>

            <div class="action-form__elements">
              <div class="action-form__element">
                <div class="action-form__input-body">
                  <div class="action-form__placeholder">Email</div>
                  <vField
                    class="action-form__input"
                    type="text"
                    name="email"
                    @focus="toggleFocus"
                    @blur="toggleBlur"
                  />
                </div>
                <FieldError class="action-form__error-msg" name="email" />
              </div>

              <div class="action-form__element">
                <div class="action-form__input-body">
                  <div class="action-form__placeholder">Пароль</div>
                  <vField
                    class="action-form__input"
                    :type="fieldType"
                    name="password"
                    @focus="toggleFocus"
                    @blur="toggleBlur"
                  />
                </div>

                <div
                  class="action-form__show-pass"
                  @click="
                    fieldType === 'password'
                      ? (fieldType = 'text')
                      : (fieldType = 'password')
                  "
                >
                  Показать/скрыть пароль
                </div>
                <FieldError class="action-form__error-msg" name="password" />
              </div>

              <div class="action-form__input-wrapper">
                <button
                  class="action-form__btn"
                  v-if="!isLoading"
                  type="submit"
                  :class="{ err: isInvalidFormSubmit }"
                >
                  Войти
                </button>
              </div>
            </div>
          </vForm>

          <LoadingGif v-if="isLoading" />
        </div>
        <RouterLink class="home-button" to="/">На главную</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import {
  Form as vForm,
  Field as vField,
  ErrorMessage as FieldError,
} from "vee-validate";

import { useFormActions } from "../Composables/useFormActions";
import { useFormSchemas } from "../Composables/useFormSchemas";

import { useUserAuthStore } from "../stores/userAuth.js";
import { useUserCartStore } from "../stores/userCart";

import { useRouter, useRoute } from "vue-router";


import { fetchData } from "../api/fetchData";
const { fetchUserCartProducts } = useUserCartStore();


const router = useRouter();
const route = useRoute();

const { loginSchema } = useFormSchemas();

const { 
  isInvalidFormSubmit, 
  toggleBlur, 
  toggleFocus,
  invalidSubmit 
} =  useFormActions();

//Если пользователь щашел на страницу где нужна авторизация не авторизировавшись, то
// перекидываем на эту старнциу и показываем сообщение
const isNotLogged = ref(true);

watch(
  () => route.query.redirect,
  () => {
    isNotLogged.value = true;
    setTimeout(() => (isNotLogged.value = false), 2500);
  },
  { immediate: true }
);
//=================================================================================

const isLoginError = ref(false);
const isWrongData = ref(false);
const isSuccess = ref(false);
const isLoading = ref(false);
const errorMessage = ref("Произошла ошибка");
const fieldType = ref("password");

const loginUser = async (values) => {
  isLoading.value = true;

  let login = await fetchData("/api/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  });

  console.log(login);
  if (login.err) {
    console.log(login.err);
    errorMessage.value = login.err;
    isLoginError.value = true;
    setTimeout(() => (isLoginError.value = false), 3000);
  } else if (login.noSuchUser) {
    isWrongData.value = true;
    setTimeout(() => (isWrongData.value = false), 3000);
  } else if (login.token) {
    const userAuthStore = useUserAuthStore();
    userAuthStore.addUserToStorage(login);
    isSuccess.value = true;

    await fetchUserCartProducts();
    setTimeout(() => {
      router.push("/");
      isSuccess.value = false;
    }, 2000);
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/LoginRegister.scss";
</style>
