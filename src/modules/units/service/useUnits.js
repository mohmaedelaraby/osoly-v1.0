import axios from "axios";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all units
export const getUnits = (params) => {
  const { pageNo, limit } = params;
  return axios.get(`${apiUrl}dashboard/units?page=${pageNo}&limit=${limit}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific Unit
export const getUnitDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/units/${id}`;
    const response = await axios.get(url);

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
  return axios.put(`${apiUrl}dashboard/units/${data?.id}`, data?.body)
}

//create Unit
export const createUnit = (data) => {
  return axios.post(`${apiUrl}dashboard/units`, data?.body)
}

//update Unit
export const deleteUnit = (data) => {
    return axios.delete(`${apiUrl}dashboard/units/${data?.id}`)
  }


