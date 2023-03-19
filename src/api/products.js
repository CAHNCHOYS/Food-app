const API_URL = import.meta.env.VITE_API_URL;

export const getUserCartProducts = async (userId) => {
  try {
    let response = await fetch(`${API_URL}/api/cartProducts/${userId}`);
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};

export const addToCart = async (productData) => {
  try {
    let response = await fetch(`${API_URL}/api/cartProducts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};

export const deleteFromCart = async (productData) => {
  try {
    let response = await fetch(`${API_URL}/api/cartProducts`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};

export const getCategoryProducts = async (category) => {
  try {
    let response = await fetch(`${API_URL}/api/cartProducts`);
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};
