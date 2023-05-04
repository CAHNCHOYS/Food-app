<template>
  <div class="fullscreen">
    <Transition name="message">
      <VAlert
        :position="'fixed'"
        :type="'success'"
        v-if="userAuthStore.isSuccessMessageShown"
      >
        {{ userAuthStore.message }}
      </VAlert>
    </Transition>

    <Transition name="message">
      <VAlert
        :position="'fixed'"
        :type="'error'"
        v-if="userAuthStore.isErrorMessageShown"
      >
        {{ userAuthStore.message }}
      </VAlert>
    </Transition>

    <div class="fullscreen__body">
      <div class="fullscreen__content">
        <div class="fullscreen__form-body">
          <vForm
            @submit="loginSubmit"
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

              <div class="action-form__btns">
                <button
                  class="action-form__btn"
                  v-if="!isLoginLoading"
                  type="submit"
                  :class="{ err: isInvalidFormSubmit }"
                >
                  Войти
                </button>
              </div>
            </div>
          </vForm>

          <LoadingGif v-if="isLoginLoading" />
        </div>
        <RouterLink class="home-button" to="/">На главную</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";

import {
  Form as vForm,
  Field as vField,
  ErrorMessage as FieldError,
} from "vee-validate";

import { useFormActions } from "../Composables/useFormActions";
import { useFormSchemas } from "../Composables/useFormSchemas";

import { useUserAuthStore } from "../stores/userAuth.js";
import { useUserCartStore } from "../stores/userCart";

const router = useRouter();
const route = useRoute();

const { loginSchema } = useFormSchemas();
const { isInvalidFormSubmit, toggleBlur, toggleFocus, invalidSubmit } =
  useFormActions();

const userAuthStore = useUserAuthStore();
const { fetchUserCartProducts } = useUserCartStore();

const isLoginLoading = ref(false);

const fieldType = ref("password");

const loginSubmit = async (values) => {
  isLoginLoading.value = true;

  await userAuthStore.loginUser(values);

  if (userAuthStore.isUserLoggedIn) {
    fetchUserCartProducts(userAuthStore.currentUser.id);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  isLoginLoading.value = false;
};

//Если пользователь щашел на страницу где нужна авторизация не авторизировавшись, то
// перекидываем на эту старнциу и показываем сообщение
watchEffect(() => {
  if (route.query.redirect) {
    userAuthStore.isErrorMessageShown = true;
    userAuthStore.message = `Для доступа к данной странице ( ${route.query.redirect}) необходимо
        авторизироваться !`;
    setTimeout(() => (userAuthStore.isErrorMessageShown = false), 2500);
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/LoginRegister.scss";
</style>
