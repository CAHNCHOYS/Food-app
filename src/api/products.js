const API_URL = import.meta.env.VITE_API_URL;

export const getUserCartProducts = async (userId) => {
  let response = await fetch(`${API_URL}/api/cartProducts/${userId}`);

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};

export const addToCart = async (productData) => {
  let response = await fetch(`${API_URL}/api/cartProducts`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};

export const deleteFromCart = async (productData) => {
  let response = await fetch(`${API_URL}/api/cartProducts`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};

export const getCategoryProducts = async (category, limit) => {
  let response = await fetch(`${API_URL}/api/categories/${category}/${limit}`);

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};

export const getTypeProducts = async (type) => {
  let response = await fetch(`${API_URL}/api/productsByType/${type}`);

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};

export const getSingleProduct = async (productName, productId) => {
  let response = await fetch(
    `${API_URL}/api/products/${productName}/${productId}`
  );

  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};

export const searchProducts = async (searchCategories, searchName) => {
  let response = await fetch(
    `${API_URL}/api/searchProduct/${searchCategories}/${searchName}`
  );

  
  if (!response.ok) {
    throw new Error((await response.json()).err);
  }
  return await response.json();
};
