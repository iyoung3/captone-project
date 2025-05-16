
const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const $API = async (url, options) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const opt = {credentials: "include",...options, headers: {...headers, ...options?.headers}};

  return fetch(BASE_URL + url, opt);
}

export default $API;