import api from "../../../services/axiosInstance/api";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all users
export const getUsers = (params) => {
  const { pageNo, limit, sortDirection, sortBy, phoneNumber, email, identityId, contractNumber, role } = params;
  return api.get(`${apiUrl}dashboard/users?page=${pageNo}&limit=${limit}${sortBy ? `&sortBy=${sortBy}` : ``}${sortDirection ? `&sortDirection=${sortDirection}` : ``}${contractNumber ? `&contractNumber=${contractNumber}` : ``}${phoneNumber ? `&phoneNumber=${phoneNumber}` : ``}${identityId ? `&identityId=${identityId}` : ``}${email ? `&email=${email}` : ``}${role ? `&role=${role}` : ``}`, {
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
export const deleteUser = (id) => {
  return api.delete(`${apiUrl}dashboard/users/${id}`)
}

//create user
export const uploadUsersFile = (data) => {
  return api.post(`${apiUrl}dashboard/users/bulk-create`, data?.body)
}



