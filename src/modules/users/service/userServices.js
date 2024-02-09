import axios from "axios";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all users
export const getUsers = (params) => {
  const { pageNo, limit } = params;
  console.log(pageNo , limit)
  return axios.get(`${apiUrl}dashboard/users?page=${pageNo}&limit=${limit}`, {
  }).then(res => res.data.data)
}
//Fech details of a specific user
/* export const getUserDetails = async (params) => {
  const { userId } = params;
  try {
    let url = `${apiUrl}/referd/users/${userId}/details`;
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
} */


