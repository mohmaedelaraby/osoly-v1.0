import axios from "axios";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all Tickets
export const getTickets = (params) => {
  const { pageNo, limit } = params;
  return axios.get(`${apiUrl}dashboard/tickets?page=${pageNo}&limit=${limit}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific Tickets
export const getTicketsDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/tickets/${id}`;
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

//update Tickets
export const updateTickets = (data) => {
  return axios.put(`${apiUrl}dashboard/tickets/${data?.id}`, data?.body)
}

//create Tickets
export const createTickets = (data) => {
  return axios.post(`${apiUrl}dashboard/tickets`, data?.body)
}
//create Tickets
export const deleteTickets = (data) => {
    return axios.delete(`${apiUrl}dashboard/tickets${data?.id}`,)
  }


