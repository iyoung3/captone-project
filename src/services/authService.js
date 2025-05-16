import $API from "./api";

const API_BASE = "https://capstone-project.up.railway.app";

// Fungsi untuk login
export async function login(payload, isDoctor = false) {
  const endpoint = isDoctor ? "/doctor/login" : "/user/login";
  
  try {
    const res = await $API(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      credentials: "include",
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

export const refreshToken = async () => {
  try {
    const res = await $API(`/user/refresh`, {
      method: "POST",
      credentials: "include",
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

// Fungsi untuk registrasi
export async function register(payload, isDoctor = false) {
  const endpoint = isDoctor ? "/doctor/register" : "/user/register";
  
  const body = isDoctor
    ? {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phoneNumber,
        hospitalAffiliation: payload.hospitalAffiliation,
        specialization: payload.specialization,
        licenseNumber: payload.licenseNumber,
      }
    : {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.phoneNumber,
        dateOfBirth: payload.dateOfBirth,
        address: payload.address || "",
      };

  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
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
