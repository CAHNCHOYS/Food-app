const API_URL = import.meta.env.VITE_API_URL;

export const getAllReviews = async () => {
  try {
    let response = await fetch(`${API_URL}/api/reviews`);
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};

export const addReview = async (review) => {
  try {
    let response = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(review),
    });
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};
