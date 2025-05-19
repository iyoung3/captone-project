import $API from "./api";

export const getChats = async () => {
    const response = await $API(`/doctor/chat/list`);

    if (!response.ok) {
        throw new Error("Failed to fetch chat list");
    }

    return response.json();
};

export const createDoctorReferral = async (data) => {
    const response = await $API(`/referral/create`, {
        method: "POST",
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to create referral");
    }

    return response.json();
}


export const fetchChatHistory = async (userId) => {
    const response = await $API(`/doctor/chat/${userId}/history`);

    if (!response.ok) {
        throw new Error("Failed to fetch chat history");
    }

    return response.json();
}

export async function getUserById(userId) {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}
