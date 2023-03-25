const API_URL = import.meta.env.VITE_API_URL;

export const getAllReviews = async () => {
  let response = await fetch(`${API_URL}/api/reviews`);

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};


export const addReview = async (review) => {
  let response = await fetch(`${API_URL}/api/reviews`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};
