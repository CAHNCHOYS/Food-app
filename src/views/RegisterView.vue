<template>


   <div class="fullscreen" v-cloak>
      <Transition name="message">
         <div class="message message_same-user" v-if="isSameUser">
            <div class="message__body">
               Упс, пользователь с такой же почтой уже существует (
            </div>
         </div>
      </Transition>

      <Transition name="message">
         <div class="message message_error" v-if="isErr">
            <div class="message__body">
               {{ errorMessage }}
            </div>
         </div>
      </Transition>

      <Transition name="message">
         <div class="message message_success" v-if="isSuccess">
            <div class="message__body">Пользователь добавлен в базу данных !)</div>
         </div>
      </Transition>
      <div class="fullscreen__body">
         <div class="fullscreen__content">
            <div class="fullscreen__form-body">
               <vForm @submit="submitForm" @invalid-submit="invalidSubmit" class="fullscreen__form action-form"
                  :validation-schema="registerSchema">
                  <div class="action-form__title">Регистрация</div>

                  <div class="action-form__elements">
                     <div class="action-form__element">
                        <div class="action-form__input-body">
                           <div class="action-form__placeholder">ФИО</div>
                           <vField class="action-form__input" type="text" name="username" @focus="toggleFocus"
                              @blur="toggleBlur">
                           </vField>
                        </div>
                        <ErrorMessage class="action-form__error-msg" name="username"></ErrorMessage>
                     </div>

                     <div class="action-form__element">
                        <div class="action-form__input-body">
                           <div class="action-form__placeholder">Email</div>
                           <vField class="action-form__input" name="email" type="text" @focus="toggleFocus"
                              @blur="toggleBlur">
                           </vField>
                        </div>
                        <ErrorMessage class="action-form__error-msg" name="email"></ErrorMessage>
                     </div>


                     <div class="action-form__element">
                        <div class="action-form__input-body">
                           <div class="action-form__placeholder">Номер телефона</div>
                           <vField class="action-form__input" name="phone" type="text" placeholder="+7949 381 39 82"
                              @focus="toggleFocus" @keydown="phoneControl" @blur="toggleBlur">
                           </vField>
                        </div>
                        <ErrorMessage class="action-form__error-msg" name="phone"></ErrorMessage>
                     </div>

                     <div class="action-form__element">
                        <VCustomSelect :background-color="`#f8f1ff`" :default-title="'Ваш город'"
                           @update-value="updateCity" :options="cities">

                        </VCustomSelect>

                     </div>


                     <div class="action-form__element">
                        <div class="action-form__input-body">
                           <div class="action-form__placeholder">Пароль</div>
                           <vField class="action-form__input" name="password" @focus="toggleFocus" @blur="toggleBlur"
                              type="password">
                           </vField>
                        </div>
                        <ErrorMessage class="action-form__error-msg" name="password"></ErrorMessage>
                     </div>

                     <div class="action-form__element">
                        <div class="action-form__input-body">
                           <div class="action-form__placeholder">Повторите пароль</div>
                           <vField class="action-form__input" name="passwordRepeat" type="password">
                           </vField>
                        </div>
                        <ErrorMessage class="action-form__error-msg" name="passwordRepeat"></ErrorMessage>
                     </div>
                     <div class="action-form__element">
                        <button :disabled="isLoading" class="action-form__btn" type="submit"
                           :class="{ err: isInvalidForm }">
                           Регистрация
                        </button>
                     </div>

                     <LoadingGif v-if="isLoading"></LoadingGif>

                  </div>
               </vForm>

               <Transition name="login-btn">
                  <div class="action-form__login-btn" v-if="userCanGoToLogin">
                     <router-link class="action-form__btn" to="/Login">Перейти к авторизации</router-link>
                  </div>
               </Transition>
            </div>
            <RouterLink class="home-button" to="/">На главную</RouterLink>
         </div>
      </div>
   </div>
</template>

<script setup>
import { useFormSchemas } from "../Composables/useFormSchemas";


import { Form as vForm, Field as vField, ErrorMessage } from "vee-validate";
import { configure } from "vee-validate";

import { fetchData } from "../api/fetchData";
import { ref } from "vue";

// Default values
configure({
   validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
   validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
   validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
   validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});


const isSuccess = ref(false);
const isSameUser = ref(false);
const userCanGoToLogin = ref(false);
const isLoading = ref(false);
const errorMessage = ref("Произошла ошибка");


const cities = ref(["Москва", "СПБ", "Донецк", "Ростов"]);
const selectedCity = ref(cities.value[0]);

const updateCity = (city) => {
   selectedCity.value = city;
}

const {
   registerSchema,
   isErr,
   toggleBlur,
   toggleFocus,
   isInvalidForm,
   invalidSubmit,
} = useFormSchemas();





//Работа с формой ---------------------------------------------------------------------
const submitForm = async (values, { resetForm }) => {
   isLoading.value = true;



   let obj = {
      ...values,
      name: values.username,
      city: selectedCity.value
   };



   const response = await fetchData("/api/register", {

      method: "POST",
      headers: {
         "Content-type": "application/json",
      },
      body: JSON.stringify(obj),
   });




   console.log(response);
   if (response.isSuccess) {
      isSuccess.value = true;
      setTimeout(() => isSuccess.value = false, 3000);
      resetForm();
      userCanGoToLogin.value = true;
   }
   else if (response.isSameUser) {
      isSameUser.value = true;
      setTimeout(() => isSameUser.value = false, 3000);
   }
   else if (response.err) {
      console.log(response.err);
      errorMessage.value = response.err;
      isErr.value = true;
      setTimeout(() => isErr.value = false, 3000);
   }

   isLoading.value = false;
};
//-------------------------------------------------------------------------------------

//Контроль только цифр пробела и Backspace в поле номер телефона
const phoneControl = (event) => {
   console.log(event.key);
   if (!((event.key >= '0' && event.key <= '9') || event.key == '+' || event.key == "Backspace" || event.key == "(" || event.key == ")" || event.key == '-' ||
      event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Delete' || event.key == "Tab" || event.key == " ")) {
      event.preventDefault();
   }
}

</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";
@import "@/assets/LoginRegister.scss";

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
