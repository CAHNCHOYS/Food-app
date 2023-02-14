import { onMounted, ref, watchEffect } from "vue";

import { useUserAuthStore } from "../stores/userAuth";

import { fetchData } from "../api/fetchData.js";

export const useReviewsActions = () => {
  const userAuthStore = useUserAuthStore();
  const reviews = ref([]);

  const isFetchingLoading = ref(false);
  const isError = ref(false); //Ошибка если не получилось получить отзывы с базы данных
  const isUserLogged = ref(false);
  const isReviewAdded = ref(false);
  const isAddError = ref(false);
  const isAddingLoading = ref(false);

  const errorMessage = ref("Произошла ошибка");
  const addErrorMessage = ref("Произошла ошибка");

  const addReviewItem = async (review) => {
    isAddingLoading.value = true;
    if (userAuthStore.checkIfUserLogged) {
      review.user_id = userAuthStore.currentUser.id;

      
      const addedReview = await fetchData(`/api/reviews`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(review),
      });

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
      isUserLogged.value = true;
      setTimeout(() => (isUserLogged.value = false), 2500);
    }
    isAddingLoading.value = false;
  };

  onMounted(async () => {
    isFetchingLoading.value = true;
    const reviewsFetch = await fetchData(`/api/reviews`);

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
    addReviewItem,
    isUserLogged,
    isReviewAdded,
    isAddError,
    errorMessage,
    isAddingLoading,
    addErrorMessage,
  };
};
