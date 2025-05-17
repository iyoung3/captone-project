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
