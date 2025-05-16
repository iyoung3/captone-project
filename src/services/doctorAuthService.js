import $API from "./api";

// Fungsi untuk login
export async function loginDoctor(payload) {
  
  try {
    const res = await $API("/doctor/login", {
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

export const refreshDoctorToken = async () => {
  try {
    const res = await $API(`/doctor/refresh`, {
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


export const logoutDoctor = async () => {
  try {
    const res = await $API(`/doctor/logout`, {
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
export async function registerDoctor(payload) {
  
  const body = {
    name: payload.name || "",
    email: payload.email || "",
    password: payload.password || "",
    phoneNumber: payload.phoneNumber || "",
    hospitalAffiliation: payload.hospitalAffiliation || "",
    specialization: payload.specialization || "",
    licenseNumber: payload.licenseNumber || "",
  }

  try {
    const res = await $API("/doctor/register", {
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
