const API_URL = import.meta.env.VITE_API_URL;

class ReviewService {
  async getAllReviews() {
    let response = await fetch(`${API_URL}/api/reviews`);

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async addReview(review) {
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
  }
}

export default new ReviewService();
