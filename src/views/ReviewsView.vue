<template>
  <div class="reviews">
    <LoadingGif v-if="isFetchingLoading"></LoadingGif>
    <div class="reviews__body" v-else>
      <Transition name="message">
        <div
          class="reviews__message reviews__message_added"
          v-if="isReviewAdded"
        >
          Отзыв добавлен!
        </div>
      </Transition>

      <Transition name="message">
        <div
          class="reviews__message reviews__message_not-logged"
          v-if="isUserNotLogged"
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
          <LoadingGif class="reviews__loading-add" v-if="isReviewAdding" />
          <vForm
            @invalid-submit="invalidFormSubmit"
            @submit="addSingleReviewSubmit"
            class="review-form__form"
            :validation-schema="formSchema"
            :class="{ opacity: isReviewAdding }"
          >
            <div class="review-form__elements">
              <div class="review-form__element">
                <div class="review-form__element-title">Ваше сообщение</div>
                <div class="review-form__textarea">
                  <vField
                    as="textarea"
                    name="message"
                    placeholder="Сообщение"
                  />
                </div>
                <FieldError class="review-form__error-msg" name="message" />
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

          <VErrorMessage
            v-if="isAddError"
            :err-message="addErrorMessage"
            style="margin-bottom: 20px"
          />
        </div>
      </slide-up-down>

      <VErrorMessage v-if="isError" :err-message="errorMessage" />

      <div v-if="reviews.length" class="reviews__reviews">
        <div class="reviews__all-reviews">
          <ReviewItem
            v-for="review in reviews"
            :key="review.review_id"
            :review="review"
          />
        </div>
      </div>

      <div class="reviews__no-reviews" v-else-if="!isError && !reviews.length">
        Пока что отзывов нет, станьте первым!
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  Form as vForm,
  Field as vField,
  ErrorMessage as FieldError,
} from "vee-validate";
import * as yup from "yup";

import ReviewItem from "../components/ReviewItem.vue";

import {getAllReviews,  addReview} from "../api/reviews.js";

import { useUserAuthStore } from "../stores/userAuth";

//Работа с формой --------------------------------------------------------------------------------------------------------

const formSchema = yup.object({
  message: yup
    .string()
    .min(10, "Сообщение должно иметь больше символов!")
    .required("Поле обязательное для ввода!"),
});
const isFormToggled = ref(false);
const isInvalidSubmit = ref(false);
const addSingleReviewSubmit = async (values, { resetForm }) => {
  let currentDate = new Date().toLocaleString();
  await addSingleReview({ ...values, currentDate });
  resetForm();
};
const invalidFormSubmit = () => {
  isInvalidSubmit.value = true;
  setTimeout(() => (isInvalidSubmit.value = false), 500);
};
//-------------------------------------------------------------------------------------------------------------------------

const userAuthStore = useUserAuthStore();
const reviews = ref([]);

const isFetchingLoading = ref(false);
const isError = ref(false); //Ошибка если не получилось получить отзывы с базы данных
const isUserNotLogged = ref(false);
const isReviewAdded = ref(false);
const isAddError = ref(false);
const isReviewAdding = ref(false);

const errorMessage = ref("Произошла ошибка");
const addErrorMessage = ref("Произошла ошибка");

const addSingleReview = async (review) => {
  isReviewAdding.value = true;
  if (userAuthStore.checkIfUserLogged) {
    review.user_id = userAuthStore.currentUser.id;

    const addedReview = await addReview(review);

    if (addedReview.err) {
      console.log(addedReview.err);
      isAddError.value = true;
      setTimeout(() => (isAddError.value = false), 2500);
      addErrorMessage.value = addedReview.err;
    }
    if (addedReview.isAdded) {
      const splittedDate = review.currentDate.split(",")[0].split(".");
      const dateToInsert =
        splittedDate[1] + "." + splittedDate[0] + "." + splittedDate[2];

      reviews.value.push({
        text: review.message,
        date: dateToInsert,
        name: userAuthStore.currentUser.name,
      });

      isReviewAdded.value = true;
      setTimeout(() => (isReviewAdded.value = false), 2500);
    }
  } else {
    isUserNotLogged.value = true;
    setTimeout(() => (isUserNotLogged.value = false), 2500);
  }
  isReviewAdding.value = false;
};

onMounted(async () => {
  isFetchingLoading.value = true;
  const reviewsFetch = await getAllReviews();
  console.log(reviewsFetch);
  if (reviewsFetch.length) {
    reviews.value = reviewsFetch;
  }
  if (reviewsFetch.err) {
    console.log(reviewsFetch.err);
    isError.value = true;
    errorMessage.value = reviewsFetch.err;
  }

  isFetchingLoading.value = false;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/adaptive-value";

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

  &__loading-add {
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
