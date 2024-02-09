import axios from "axios";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all users
export const getUsers = (params) => {
  const { pageNo, limit } = params;
  return axios.get(`${apiUrl}dashboard/users?page=${pageNo}&limit=${limit}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific user
export const getUserDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/users/${id}`;
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

//update user
export const updateUser = (data) => {
  return axios.put(`${apiUrl}dashboard/users/${data?.id}`, data?.body)
}

//create user
export const createUser = (data) => {
  return axios.post(`${apiUrl}dashboard/users`, data?.body)
}


