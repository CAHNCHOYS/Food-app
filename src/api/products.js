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

export const getCategoryProducts = async (category, limit) => {
  try {
    let response = await fetch(`${API_URL}/api/categories/${category}/${limit}`);
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};



export const getTypeProducts = async (type) => {
  try {
    let response = await fetch(`${API_URL}/api/productsByType/${type}`);
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};

export const getSingleProduct = async (productName,productId) => {
  try {
    let response = await fetch(`${API_URL}/api/products/${productName}/${productId}`);
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
}


export const searchProducts = async(searchCategories, searchName)=>{
  try {
    let response = await fetch(`${API_URL}/api/searchProduct/${searchCategories}/${searchName}`);
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
}