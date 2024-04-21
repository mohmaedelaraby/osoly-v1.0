import api from "../../../services/axiosInstance/api";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all Tickets
export const getTickets = (params) => {
  const { pageNo, limit ,sortDirection,sortBy,type,status} = params;
  return api.get(`${apiUrl}dashboard/tickets?page=${pageNo}&limit=${limit}${sortBy?`&sortBy=${sortBy}`:``}${sortDirection?`&sortDirection=${sortDirection}`:``}${type?`&type=${type}`:``}${status?`&status=${status}`:``}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific Tickets
export const getTicketsDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/tickets/${id}`;
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

//update Tickets
export const updateTickets = (data) => {
  return api.put(`${apiUrl}dashboard/tickets/${data?.id}`, data?.body)
}

//create Tickets
export const createTickets = (data) => {
  return api.post(`${apiUrl}dashboard/tickets`, data?.body)
}
//create Tickets
export const deleteTickets = (data) => {
    return api.delete(`${apiUrl}dashboard/tickets${data?.id}`,)
  }


