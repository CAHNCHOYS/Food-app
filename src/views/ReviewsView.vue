<template>
  <div class="reviews">
    <LoadingGif v-if="isFetchingLoading"></LoadingGif>
    <div class="reviews__body" v-else>
      <Transition name="review">
        <div
          class="reviews__message reviews__message_added"
          v-show="isReviewAdded"
        >
          Отзыв добавлен!
        </div>
      </Transition>

      <Transition name="review">
        <div
          class="reviews__message reviews__message_not-logged"
          v-show="isUserLogged"
        >
          Для добавления отзыва требуется войти в аккаунт!
        </div>
      </Transition>

      <div class="reviews__header" v-if="!isError">
        <div class="reviews__title">Отзывы</div>
        <div class="reviews__button">
          <button
            class="reviews__add-button"
            :class="{ red: isFormToggled, 'icon-plus': !isFormToggled }"
            @click="isFormToggled = !isFormToggled"
          >
            Добавить отзыв
          </button>
        </div>
      </div>

      <slide-up-down v-model="isFormToggled" :duration="500">
        <div class="reviews__add-form review-form">
          <LoadingGif
            class="reviews__loading-form"
            v-if="isAddingLoading"
          ></LoadingGif>
          <vForm
            @invalid-submit="invalidFormSubmit"
            @submit="submitForm"
            class="review-form__form"
            :validation-schema="formSchema"
            :class="{ opacity: isAddingLoading }"
          >
            <div class="review-form__elements">
              <div class="review-form__element">
                <div class="review-form__element-title">Ваше сообщение</div>
                <div class="review-form__textarea">
                  <vField as="textarea" name="message" placeholder="Сообщение">
                  </vField>
                </div>
                <FormError
                  class="review-form__error-msg"
                  name="message"
                ></FormError>
              </div>

              <div class="review-form__submit">
                <button
                  type="submit"
                  :class="{ err: isInvalidSubmit }"
                  :disabled="isInvalidSubmit"
                >
                  Отправить отзыв
                </button>
              </div>
            </div>
          </vForm>
        </div>
      </slide-up-down>

      <VErrorMessage
        v-if="isAddError"
        :err-message="addErrorMessage"
        style="margin-bottom: 20px"
      ></VErrorMessage>

      <VErrorMessage :err-message="errorMessage" v-if="isError"></VErrorMessage>

      <div class="reviews__reviews" v-if="reviews.length">
        <div class="reviews__all-reviews">
          <ReviewItem
            v-for="review in reviews"
            :key="review.review_id"
            :review="review"
          >
          </ReviewItem>
        </div>
      </div>

      <div class="reviews__no-reviews" v-else-if="!isError && !reviews.length">
        Пока что отзывов нет, станьте первым!
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Form as vForm,
  Field as vField,
  ErrorMessage as FormError,
} from "vee-validate";
import * as yup from "yup";
import { configure } from "vee-validate";

import ReviewItem from "../components/ReviewItem.vue";
import { ref } from "vue";
import { useReviewsActions } from "../Composables/useReviewsActions.js";

// Default values
configure({
  validateOnBlur: true, // controls if `blur` events should trigger validation with `handleChange` handler
  validateOnChange: true, // controls if `change` events should trigger validation with `handleChange` handler
  validateOnInput: true, // controls if `input` events should trigger validation with `handleChange` handler
  validateOnModelUpdate: true, // controls if `update:modelValue` events should trigger validation with `handleChange` handler
});

const {
  isError,
  isFetchingLoading,
  reviews,
  isUserLogged,
  isReviewAdded,
  isAddError,
  isAddingLoading,
  errorMessage,
  addErrorMessage,
  addReviewItem,
} = useReviewsActions();

//Работа с формой --------------------------------------------------------------------------------------------------------

const formSchema = yup.object({
  message: yup
    .string()
    .min(10, "Сообщение должно иметь больше символов!")
    .required("Поле обязательное для ввода!"),
});

const isFormToggled = ref(false);
const isInvalidSubmit = ref(false);

const submitForm = async (values, { resetForm }) => {
  let currentDate = new Date().toLocaleString();
  await addReviewItem({ ...values, currentDate });
  resetForm();
};

const invalidFormSubmit = () => {
  isInvalidSubmit.value = true;
  setTimeout(() => (isInvalidSubmit.value = false), 500);
};
//-------------------------------------------------------------------------------------------------------------------------
</script>

<style lang="scss" scoped>
@import "@/assets/adaptive-value.scss";

.reviews {
  // .reviews__body

  &__body {
    padding: 0px 0px rem(50) 0px;
    position: relative;
  }

  // .reviews__message

  &__message {
    position: absolute;
    max-width: rem(280);

    z-index: 10;
    height: auto;
    top: 0;
    left: 0;
    padding: rem(10);
    color: white;
    font-size: rem(16);

    // .reviews__message_added
    &_added {
      background-color: cornflowerblue;
    }

    // .reviews__message_not-logged

    &_not-logged {
      background-color: crimson;
    }

    &_err {
      background-color: crimson;
    }
  }

  // .reviews__header

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 0px rem(20) 0px;
  }

  // .reviews__title

  &__title {
    font-size: rem(24);
    font-weight: 500;
    line-height: calc(30 / 24);
  }

  // .reviews__button

  &__button {
  }

  // .reviews__add-button

  &__add-button {
    min-height: rem(36);
    color: white;
    align-items: center;
    justify-content: center;

    transition: all 0.5s ease 0s;
    display: inline-flex;
    position: relative;
    background-color: #111111;
    border-radius: rem(5);
    padding: rem(5) rem(17) rem(5) rem(30);

    &::before {
      font-size: rem(14);
      position: absolute;
      left: rem(10);
      top: 50%;
      transform: translate(0, -50%);
      display: block;
      color: wheat;
      transition: all 0.5s ease 0s;
    }

    @media (any-hover: hover) {
      &:hover {
        background-color: cornflowerblue;
      }
    }

    &.red {
      &::after {
        content: "";
        z-index: 2;
        position: absolute;
        width: rem(10);
        height: rem(2);
        background-color: white;
        left: rem(15);
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }

  // .reviews__add-form

  &__add-form {
    margin: 0px 0px rem(28) 0px;
    position: relative;
  }

  // .reviews__loading-form

  &__loading-form {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 10;
  }

  // .reviews__all-reviews

  &__all-reviews {
    display: flex;
    flex-direction: column;
    row-gap: rem(22);
  }

  // .reviews__no-reviews

  &__no-reviews {
  }
}

.review-form {
  // .review-form__form
  &__form {
    &.opacity {
      opacity: 0.5;
    }
  }

  // .review-form__elements

  &__elements {
    display: flex;
    flex-direction: column;
    row-gap: rem(20);
  }

  // .review-form__element

  &__element {
  }

  // .review-form__element-title

  &__element-title {
    font-size: rem(20);
    color: black;

    margin: 0px 0px rem(5) 0px;
  }

  // .review-form__textarea

  &__textarea {
    textarea {
      width: 100%;
      resize: vertical;
      padding: rem(10);
      font-size: rem(20);
      color: black;
      max-height: 500px;
      min-height: 200px;
      border: rem(1) solid lightgray;

      &::placeholder {
        font-size: rem(20);
      }

      &:focus {
        border: rem(2) solid lightgray;
      }
    }
  }

  // .review-form__submit

  &__submit {
    button {
      min-height: rem(40);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: lightskyblue;
      font-size: rem(20);
      font-weight: 500;
      color: white;
      padding: rem(10) rem(20);
      transition: all 0.5s ease 0s;

      @media (any-hover: hover) {
        &:hover {
          background-color: rgb(16, 163, 255);
        }
      }

      &.err {
        background-color: crimson;
      }
    }
  }

  &__error-msg {
    margin: rem(5) 0px 0px 0px;
    font-size: rem(20);
    color: crimson;
  }
}

.review-leave-active,
.review-enter-active {
  transition: all 0.8s ease 0s;
}

.review-enter-from {
  transform: translate(0, -100%);
  opacity: 0;
}

.review-enter-to {
  transform: translate(0);
  opacity: 1;
}

.review-leave-to {
  transform: translate(0, 100%);
  opacity: 0;
}

.list-leave-active,
.list-enter-active {
  transition: all 0.8s ease 0s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
