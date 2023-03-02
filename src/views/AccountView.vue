<template>
  <div class="user-account">
    <div class="user-account__body" v-if="userAuthStore.currentUser">
      <div class="user-account__main-title">Информация о вас</div>

      <div class="user-account__info" v-show="!isUserEditing">
        <div class="user-account__all-info">
          <div class="user-account__info-block">
            <div class="user-account__info-text">Имя:</div>
            <div class="user-account__info-value">
              {{ userAuthStore.currentUser.name }}
            </div>
          </div>
          <div class="user-account__info-block">
            <div class="user-account__info-text">email:</div>
            <div class="user-account__info-value">
              {{ userAuthStore.currentUser.email }}
            </div>
          </div>
          <div class="user-account__info-block">
            <div class="user-account__info-text">Телефон:</div>
            <div class="user-account__info-value">
              {{ userAuthStore.currentUser.phone }}
            </div>
          </div>
        </div>
      </div>

      <div class="user-account__edit" v-show="isUserEditing">
        <vForm
          @submit="updateInfo"
          class="user-account__edit-form edit-form"
          :validation-schema="userEditSchema"
          :initial-values="initialValues"
        >
          <div class="edit-form__elements">
            <div class="edit-form__element">
              <div class="edit-form__element-title">Ваш эмайл</div>
              <vField
                name="email"
                type="text"
                class="edit-form__element-input"
              ></vField>
              <FieldError name="email" class="edit-form__wrong-data" />
            </div>
            <div class="edit-form__element">
              <div class="edit-form__element-title">Имя</div>
              <vField
                name="name"
                type="text"
                class="edit-form__element-input"
              ></vField>
              <FieldError name="name" class="edit-form__wrong-data" />
            </div>

            <div class="edit-form__element">
              <div class="edit-form__element-title">Телефон</div>
              <vField
                name="phone"
                type="text"
                class="edit-form__element-input"
              ></vField>
              <FieldError name="phone" class="edit-form__wrong-data" />
            </div>

            <div class="edit-form__element" v-show="isUserEditing">
              <button
                :disabled="isLoading"
                type="submit"
                class="user-account__btn user-account__btn_update"
                v-show="isUserEditing"
              >
                Обновить данные!
              </button>

              <Transition name="message">
                <div class="edit-form__success" v-if="isSuccess">
                  Информация о вас была успешно обновлена!
                </div>
              </Transition>
            </div>

            <LoadingGif v-if="isLoading" class="edit-form__loading" />

            <VErrorMessage
              :error-message="`Ошибка при обновлении информации`"
              v-if="isError"
            />
          </div>
        </vForm>
      </div>

      <div class="user-account__actions">
        <button
          class="user-account__btn user-account__btn_edit"
          @click="isUserEditing = !isUserEditing"
        >
          <span v-show="!isUserEditing">Изменить данные </span>
          <span v-show="isUserEditing"> Отменить изменение </span>
        </button>

        <button class="user-account__btn" @click="logOut">
          Выйти с аккаунта
        </button>
      </div>
    </div>

    <div class="user-account__no-user" v-else>
      Не удалось получить данные о пользователе
    </div>
  </div>
</template>

<script setup>
import {
  Form as vForm,
  Field as vField,
  ErrorMessage as FieldError,
} from "vee-validate";
import { ref } from "vue";

import { useFormSchemas } from "../Composables/useFormSchemas";

import { useRouter } from "vue-router";
import { useUserAuthStore } from "../stores/userAuth";
import { computed } from "@vue/reactivity";

const { userEditSchema } = useFormSchemas();

const userAuthStore = useUserAuthStore();
const router = useRouter();
const isUserEditing = ref(false);
const isLoading = ref(false);
const isError = ref(false);
const isSuccess = ref(false); //Сообщение при изменении информации о пользователе

const updateErrorMessage = ref(
  "Произошла ошибка при обновлении информации о вас(!"
);


const logOut = () => {
  if (window.confirm("Вы уверены что хотите выйти с аккаунта?")) {
    userAuthStore.logOutUser();
    router.push("/");
  }
};


const updateInfo = async (values) => {
  isLoading.value = true;
  let res = await userAuthStore.updateUserInfo(values);
  if (res.isUpdated) {
    isSuccess.value = true;
    setTimeout(() => {
      isSuccess.value = false;
      isUserEditing.value = false;
    }, 2500);
  } else if (res.err) {
    updateErrorMessage.value = res.err;
    isError.value = true;
    setTimeout(() => (isError.value = false), 5000);
  }

  isLoading.value = false;
};

const initialValues = computed(() => {
  return {
    email: userAuthStore.currentUser.email,
    name: userAuthStore.currentUser.name,
    phone: userAuthStore.currentUser.phone,
  };
});


</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.user-account {
  &__body {
    padding: 0px 0px rem(45) 0px;
  }

  // .user-account__main-title

  &__main-title {
    font-size: rem(42);
    font-weight: 500;
    margin: 0px 0px rem(30) 0px;
    line-height: 1.2;
    text-align: center;
  }

  // .user-account__info
  &__info {
  }

  // .user-account__all-info

  &__all-info {
    display: flex;
    flex-direction: column;
    row-gap: rem(15);
    padding: 0px 0px rem(30) 0px;
  }

  // .user-account__info-block

  &__info-block {
    display: flex;
    column-gap: rem(20);
  }

  // .user-account__info-text

  &__info-text {
    font-size: rem(24);
    font-weight: 500;
    color: coral;
  }

  // .user-account__info-value

  &__info-value {
    flex: 1 1 auto;
    font-size: rem(20);
    font-weight: 400;
    align-self: center;

    line-height: calc(30 / 24);
  }

  // .user-account__edit

  &__edit {
    margin: 0px 0px rem(80) 0px;
  }

  // .user-account__edit-form

  &__edit-form {
  }

  // .user-account__actions

  &__actions {
    display: flex;
    column-gap: rem(20);
    flex-wrap: wrap;
    row-gap: rem(10);
  }

  // .user-account__btn

  &__btn {
    background-color: indianred;
    transition: all 0.5s ease 0s;
    display: inline-flex;
    min-height: rem(55);
    align-items: center;
    justify-content: center;
    max-width: 100%;
    padding: 0px rem(20);
    color: white;
    font-size: rem(22);

    font-weight: 500;

    @media (any-hover: hover) {
      &:hover {
        background-color: rgb(250, 54, 94);
      }
    }

    // .user-account__btn_edit
    &_edit {
      background-color: rgb(113, 211, 243);

      @media (any-hover: hover) {
        &:hover {
          background-color: rgb(7, 188, 248);
        }
      }
    }

    &_update {
      background-color: coral;

      @media (any-hover: hover) {
        &:hover {
          background-color: rgb(255, 77, 12);
        }
      }
    }
  }
}

.edit-form {
  position: relative;

  // .edit-form__elements

  &__elements {
    display: flex;
    flex-direction: column;
    row-gap: rem(15);
  }

  // .edit-form__element

  &__element {
  }

  // .edit-form__element-title

  &__element-title {
    font-size: rem(32);
    font-weight: 500;
    margin: 0px 0px rem(5) 0px;
  }

  // .edit-form__element-input

  &__element-input {
    width: 100%;
    height: rem(55);
    padding: 0px rem(20);
    font-size: rem(24);
    color: black;
    background-color: white;

    &:focus {
      border: rem(1) solid lightgrey;
    }
  }

  // .edit-form__wrong-data

  &__wrong-data {
    font-size: rem(24);
    line-height: 1.2;
    color: crimson;
  }

  // .edit-form__loading
  &__loading {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba($color: #f2f2f2, $alpha: 1);
    z-index: 3;
  }

  // .edit-form__success

  &__success {
    margin: rem(10) 0px rem(80) 0px;
    padding: rem(10);
    font-size: rem(20);
    background-color: lightcoral;
    color: white;
    line-height: 1.3;
    font-weight: 500;
  }
}

.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease 0s;
}

.message-enter-from {
  transform: translate(0, -100%);
  opacity: 0;
}

.messag-enter-to {
  opacity: 1;
  transform: translate(0);
}

.message-leave-to {
  transform: translate(0, 100%);
  opacity: 0;
}
</style>
