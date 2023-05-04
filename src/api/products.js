const API_URL = import.meta.env.VITE_API_URL;

class ProductService {
  async getUserCartProducts(userId) {
    let response = await fetch(`${API_URL}/api/cartProducts/${userId}`);

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async getSearchedProducts(searchCategories, searchName) {
    let response = await fetch(
      `${API_URL}/api/searchProduct/${searchCategories}/${searchName}`
    );

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async addProductToCart(product) {
    let response = await fetch(`${API_URL}/api/cartProducts`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async deleteProductFromCart(productData) {
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
  }

  async getSingleProduct(productName, productId) {
    let response = await fetch(
      `${API_URL}/api/products/${productName}/${productId}`
    );

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async getCategoryProducts(category, limit) {
    let response = await fetch(
      `${API_URL}/api/categories/${category}/${limit}`
    );

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async getTypeProducts(type) {
    let response = await fetch(`${API_URL}/api/productsByType/${type}`);

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }
}

export default new ProductService();
