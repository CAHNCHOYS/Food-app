const API_URL = import.meta.env.VITE_API_URL;

class AuthService {
  async login(loginPayload) {
    let response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async register(registerPayload) {
    let response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    });

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async getUserByToken(token) {
    let response = await fetch(`${API_URL}/api/verify`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }

  async updateInfo(updatePayload) {
    let response = await fetch(`${API_URL}/api/updateInfo`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    });

    if (!response.ok) {
      throw new Error((await response.json()).err);
    }
    return await response.json();
  }
}

export default new AuthService();
