import $API from "./api";

export const getChats = async () => {
    const response = await $API(`/doctor/chat/list`);

    if (!response.ok) {
        throw new Error("Failed to fetch chat list");
    }

    return response.json();
};