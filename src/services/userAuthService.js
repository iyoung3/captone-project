import $API from "./api";

// Fungsi untuk login
export async function loginUser(payload) {
  
  try {
    const res = await $API("/user/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response:", errorData);
      throw new Error("Login gagal. Periksa email dan password.");
    }
    
    return res.json();
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

export const refreshUserToken = async () => {
  try {
    const res = await $API(`/user/refresh`, {
      method: "POST",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response:", errorData);
      throw new Error("Gagal memperbarui token.");
    }

    return res.json();
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};


export const logoutUser = async () => {
  try {
    const res = await $API(`/user/logout`, {
      method: "POST",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response:", errorData);
      throw new Error("Gagal logout.");
    }

    return res.json();
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
};

// Fungsi untuk registrasi
export async function registerUser(payload) {
  
  const body = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phoneNumber,
        dateOfBirth: payload.dateOfBirth,
        address: payload.address || "",
      };

  try {
    const res = await $API("/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error response:", errorData);
      throw new Error("Registrasi gagal. Periksa kembali data yang dimasukkan.");
    }

    return res.json();
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}
