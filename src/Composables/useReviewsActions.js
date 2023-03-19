import { onMounted, ref, watchEffect } from "vue";

import { useUserAuthStore } from "../stores/userAuth";

import {getAllReviews, addReview} from "../api/reviews.js";


export const useReviewsActions = () => {
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

  const addReviewItem = async (review) => {
    isReviewAdding.value = true;
    if (userAuthStore.checkIfUserLogged) {
      review.user_id = userAuthStore.currentUser.id;

      const addedReview = await addReview();

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

  return {
    reviews,
    isFetchingLoading,
    isError,
    isUserNotLogged,
    isReviewAdded,
    isAddError,
    errorMessage,
    isReviewAdding,
    addErrorMessage,
    addReviewItem,
  };
};
