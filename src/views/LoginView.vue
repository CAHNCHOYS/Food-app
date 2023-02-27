<template>
   <div class="fullscreen">
      <Transition name="message">

         <div v-if="isWrongData" class="message message_same-user" >
            <div class="message__body">
               Не удалось войти по ввденным данным. Пожалуйста, введите правильные данные!
            </div>
         </div>
      </Transition>
      <Transition name="message">
         <div v-if="isSuccess" class="message message_success" >
            <div class="message__body">
               Авторизация прошла успешно! Вас переведут на главную страницу !
            </div>
         </div>
      </Transition>
      <Transition name="message">
         <div v-if="isErr" class="message message_error" >
            <div class="message__body">
               {{ errorMessage }}
            </div>
         </div>
      </Transition>


      <Transition name="message">
         <div class="message message_error" v-if="$route.query.isLoginRequired && isNotL">
            <div class="message__body">
               Для доступа к данной странице ({{ $route.query.redirect }}) необходимо авторизироваться !
            </div>
         </div>
      </Transition>


      <div class="fullscreen__body">
         <div class="fullscreen__content">
            <div class="fullscreen__form-body">
               <vForm @submit="submitForm" @invalid-submit="invalidSubmit" :validation-schema="loginSchema">
                  <div class="action-form__title">Логин</div>

                  <div class="action-form__elements">
                     <div class="action-form__element">
                        <div class="action-form__input-body">
                           <div class="action-form__placeholder">Email</div>
                           <vField class="action-form__input" type="text" name="email" @focus="toggleFocus"
                              @blur="toggleBlur">
                           </vField>
                        </div>
                        <ErrorMessage class="action-form__error-msg" name="email"></ErrorMessage>
                     </div>

                     <div class="action-form__element">
                        <div class="action-form__input-body">
                           <div class="action-form__placeholder">Пароль</div>
                           <vField class="action-form__input" :type="fieldType" name="password" @focus="toggleFocus"
                              @blur="toggleBlur">
                           </vField>
                        </div>

                        <div class="action-form__show-pass"
                           @click="fieldType === 'password' ? fieldType = 'text' : fieldType = 'password'">
                           Показать/скрыть пароль
                        </div>
                        <ErrorMessage class="action-form__error-msg" name="password"></ErrorMessage>
                     </div>

                     <div class="action-form__input-wrapper">
                        <button class="action-form__btn" v-if="!isLoading" type="submit" :class="{ err: isInvalidForm }">
                           Войти
                        </button>
                     </div>
                  </div>
               </vForm>

               <LoadingGif v-if="isLoading"></LoadingGif>
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

import { ref, watch } from "vue";
import { useUserAuthStore } from '../stores/userAuth.js';
import { useRouter, useRoute } from 'vue-router';
import { useUserCartStore } from "../stores/userCart";

import { fetchData } from "../api/fetchData";
// Default values
configure({
   validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
   validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
   validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
   validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});


const { fetchUserCartProducts } = useUserCartStore();

const router = useRouter();
const route = useRoute();

const {
   isErr,
   loginSchema,
   toggleBlur,
   toggleFocus,
   invalidSubmit,
   isInvalidForm,
} = useFormSchemas();


//Если пользователь нажал на корзину не авторизировавшись то закрываем это сообщение
const isNotL = ref(true);
//=================================================================================
watch(() => route.query.redirect, () => {
   isNotL.value = true;
   setTimeout(() => isNotL.value = false, 2500);
}, { immediate: true })


const isWrongData = ref(false);
const isSuccess = ref(false);
const isLoading = ref(false);
const errorMessage = ref("Произошла ошибка");
const fieldType = ref("password");

const submitForm = async (values) => {

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
      isErr.value = true;
      setTimeout(() => isErr.value = false, 3000);

   }
   else if (login.noSuchUser) {
      isWrongData.value = true;
      setTimeout(() => isWrongData.value = false, 3000);
   }

   else if (login.token) {
      const userAuthStore = useUserAuthStore();
      userAuthStore.addUserToStorage(login);
      isSuccess.value = true;

      await fetchUserCartProducts();
      setTimeout(() => {
         router.push('/');
         isSuccess.value = false;
      }, 2000);

   }

   isLoading.value = false;

};










</script>

<style lang="scss" scoped>
@import "@/assets/LoginRegister.scss";
</style>
