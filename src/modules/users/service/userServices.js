import api from "../../../services/axiosInstance/api";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all users
export const getUsers = (params) => {
  const { pageNo, limit ,sortDirection,sortBy} = params;
  return api.get(`${apiUrl}dashboard/users?page=${pageNo}&limit=${limit}${sortBy?`&sortBy=${sortBy}`:``}${sortDirection?`&sortDirection=${sortDirection}`:``}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific user
export const getUserDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/users/${id}`;
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

//update user
export const updateUser = (data) => {
  return api.put(`${apiUrl}dashboard/users/${data?.id}`, data?.body)
}

//create user
export const createUser = (data) => {
  return api.post(`${apiUrl}dashboard/users`, data?.body)
}
//delete user
export const deleteUser = (data) => {
  return api.delete(`${apiUrl}dashboard/users`, data?.body)
}


