import api from "../../../services/axiosInstance/api";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all enterprises
export const getEnterprisesUsers = (params) => {
  const { pageNo, limit , sortDirection,sortBy ,planId} = params;
  return api.get(`${apiUrl}dashboard/enterprises?page=${pageNo}&limit=${limit}${sortBy?`&sortBy=${sortBy}`:``}${sortDirection?`&sortDirection=${sortDirection}`:``}${planId?`&planId=${planId}`:``}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific enterprises
export const getEnterprisesUserDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/enterprises/${id}`;
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

//update enterprises
export const updateEnterprisesUser = (data) => {
  return api.put(`${apiUrl}dashboard/enterprises/${data?.id}`, data?.body)
}

//create enterprises
export const createEnterprisesUser = (data) => {
  return api.post(`${apiUrl}dashboard/enterprises`, data)
}
//create enterprises
export const createEnterprisesSettings = (data) => {
  return api.post(`${apiUrl}dashboard/enterprises/settings`, data?.body)
}
//delete enterprises
export const deleteEnterprisesUser = (id) => {
  return api.delete(`${apiUrl}dashboard/enterprises/${id}`)

}


