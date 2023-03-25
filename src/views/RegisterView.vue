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
            @submit="registerSubmit"
            @invalid-submit="invalidSubmit"
            class="fullscreen__form action-form"
            :validation-schema="registerSchema"
          >
            <div class="action-form__title">Регистрация</div>

            <div class="action-form__elements">
              <div class="action-form__element">
                <div class="action-form__input-body">
                  <div class="action-form__placeholder">ФИО</div>
                  <vField
                    class="action-form__input"
                    type="text"
                    name="name"
                    @focus="toggleFocus"
                    @blur="toggleBlur"
                  />
                </div>
                <FieldError class="action-form__error-msg" name="name" />
              </div>

              <div class="action-form__element">
                <div class="action-form__input-body">
                  <div class="action-form__placeholder">Email</div>
                  <vField
                    class="action-form__input"
                    name="email"
                    type="text"
                    @focus="toggleFocus"
                    @blur="toggleBlur"
                  >
                  </vField>
                </div>
                <FieldError class="action-form__error-msg" name="email" />
              </div>

              <div class="action-form__element">
                <div class="action-form__input-body">
                  <div class="action-form__placeholder">Номер телефона</div>
                  <vField
                    class="action-form__input"
                    name="phone"
                    type="text"
                    placeholder="+7949 381 39 82"
                    @focus="toggleFocus"
                    @keydown="phoneControl"
                    @blur="toggleBlur"
                  />
                </div>
                <FieldError class="action-form__error-msg" name="phone" />
              </div>

              <div class="action-form__element">
                <VCustomSelect
                  :background-color="`#f8f1ff`"
                  :default-title="'Ваш город'"
                  @update-value="updateCity"
                  :options="cities"
                />
              </div>

              <div class="action-form__element">
                <div class="action-form__input-body">
                  <div class="action-form__placeholder">Пароль</div>
                  <vField
                    class="action-form__input"
                    name="password"
                    @focus="toggleFocus"
                    @blur="toggleBlur"
                    type="password"
                  />
                </div>
                <FieldError class="action-form__error-msg" name="password" />
              </div>

              <div class="action-form__element">
                <div class="action-form__input-body">
                  <div class="action-form__placeholder">Повторите пароль</div>
                  <vField
                    class="action-form__input"
                    name="passwordRepeat"
                    type="password"
                  />
                </div>
                <FieldError
                  class="action-form__error-msg"
                  name="passwordRepeat"
                />
              </div>
              <div class="action-form__element">
                <button
                  v-show="!isLoading"
                  class="action-form__btn"
                  type="submit"
                  :class="{ err: isInvalidFormSubmit }"
                >
                  Регистрация
                </button>
              </div>

              <LoadingGif v-if="isLoading" />
            </div>
          </vForm>

          <Transition name="login-btn">
            <div class="action-form__login-btn" v-if="userCanGoToLogin">
              <RouterLink class="action-form__btn" to="/Login"
                >Перейти к авторизации</RouterLink
              >
            </div>
          </Transition>
        </div>
        <RouterLink class="home-button" to="/">На главную</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useFormSchemas } from "../Composables/useFormSchemas";
import { useFormActions } from "../Composables/useFormActions";
import {
  Form as vForm,
  Field as vField,
  ErrorMessage as FieldError,
} from "vee-validate";

import { useUserAuthStore } from "../stores/userAuth";
const { registerSchema } = useFormSchemas();

const {
  isInvalidFormSubmit,
  toggleBlur,
  toggleFocus,
  invalidSubmit,
  phoneControl,
} = useFormActions();

const userAuthStore = useUserAuthStore();
const isLoading = ref(false);

const userCanGoToLogin = ref(false);

const cities = ref(["Москва", "СПБ", "Донецк", "Ростов"]);
const selectedCity = ref(cities.value[0]);
const updateCity = (city) => {
  selectedCity.value = city;
};

const registerSubmit = async (values, { resetForm }) => {
  isLoading.value = true;
  let userData = {
    ...values,
    city: selectedCity.value,
  };

  if (await userAuthStore.registerUser(userData)) {
    resetForm();
    userCanGoToLogin.value = true;
  }
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";
@import "@/assets/scss/LoginRegister.scss";

.login-btn-leave-active,
.login-btn-enter-active {
  transition: all 0.8s ease 0s;
}

.login-btn-enter-from {
  transform: translate(0, 100%) scale(0);
  opacity: 0;
}

.login-btn-enter-to {
  transform: translate(0, 0) scale(1);
  opacity: 1;
}

.login-btn-leave-to {
  transform: scale(0);
}
</style>
