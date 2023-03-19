const API_URL = import.meta.env.VITE_API_URL;
console.log(`${API_URL}`);

export const login = async (loginPayload) => {

  try {
    let response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    });
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
  
};

export const register = async (registerPayload) => {
  try {
    let response = await fetch(`${API_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(registerPayload),
    });
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};

export const verifyToken = async (token) => {
  try {
    let response = await fetch(`${API_URL}/api/verify`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({token}),
    });
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
};

export const updateInfo = async (updatePayload)=>{
  try {
    let response = await fetch(`${API_URL}/api/updateInfo`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    });
    let json = await response.json();
    return json;
  } catch (err) {
    return { err };
  }
}
