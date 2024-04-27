import api from "../../../services/axiosInstance/api";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all units
export const getUnits = (params) => {
  const { pageNo, limit, sortBy, sortDirection, name, rent, waterAccount, space, waterCost, lounge, kitchen, electricityAccount, bathrooms, rooms, conditioners } = params;
  return api.get(`${apiUrl}dashboard/units?page=${pageNo}&limit=${limit}${sortBy ? `&sortBy=${sortBy}` : ``}${sortDirection ? `&sortDirection=${sortDirection}` : ``}${name ? `&name=${name}` : ``}${rent ? `&rent=${rent}` : ``}${waterAccount ? `&waterAccount=${waterAccount}` : ``}${waterCost ? `&waterCost=${waterCost}` : ``}${electricityAccount ? `&electricityAccount=${electricityAccount}` : ``}${rooms ? `&rooms=${rooms}` : ``}${kitchen ? `&kitchen=${kitchen}` : ``}${lounge ? `&lounge=${lounge}` : ``}${space ? `&space=${space}` : ``}${bathrooms ? `&bathrooms=${bathrooms}` : ``}${conditioners ? `&conditioners=${conditioners}` : ``}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific Unit
export const getUnitDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/units/${id}`;
    const response = await api.get(url);

    if (response.status === 200) {
      const data = response.data.data;
      return data;
    } else {
      return { error: 'Failed to fetch data' };
    }
  } catch (error) {
    return { error: 'Network error occurred' };
  }
}

//update Unit
export const updateUnit = (data) => {
  return api.put(`${apiUrl}dashboard/units/${data?.id}`, data?.body)
}

//create Unit
export const createUnit = (data) => {
  return api.post(`${apiUrl}dashboard/units`, data?.body)
}

//update Unit
export const deleteUnit = (id) => {
  return api.delete(`${apiUrl}dashboard/units/${id}`)
}


