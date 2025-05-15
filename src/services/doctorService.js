import API from "./api";

export const fetchDoctors = async () => {
  const response = await API.get("/doctors");
  return response.data;
};

export const fetchDoctorDetail = async (id) => {
  const response = await API.get(`/doctors/${id}`);
  return response.data;
};
