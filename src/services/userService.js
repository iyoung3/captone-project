import $API from "./api";

export const fetchDoctors = async ({page,perPage}) => {
  const response = await $API(`/user/search-doctors?page=${page}&perPage=${perPage}`);

  if(!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
};

export const initiateConsultation = async (doctorId) => {
  const response = await $API('/user/initiate-consultation', {
    method: 'POST',
    body: JSON.stringify({ doctorId }),
  });

    if (!response.ok) {
      throw new Error("Failed to initiate consultation");
    }

    return response.json();
}

export const fetchDoctorDetail = async (id) => {
  const response = await $API(`/doctors/${id}`);
  return response.data;
};
