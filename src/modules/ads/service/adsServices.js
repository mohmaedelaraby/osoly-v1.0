import axios from "axios";
import { apiUrl } from "../../../utils/exportEnvUrls";

//Fetch all ads
export const getAds = (params) => {
  const { pageNo, limit } = params;
  return axios.get(`${apiUrl}dashboard/ads?page=${pageNo}&limit=${limit}`, {
  }).then(res => res.data.data)
}

//Fech details of a specific ads
export const getAdsDetails = async (id) => {
  try {
    let url = `${apiUrl}dashboard/ads/${id}`;
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

//update ads
export const updateAds = (data) => {
  return axios.put(`${apiUrl}dashboard/ads/${data?.id}`, data?.body)
}

//create ads
export const createAds = (data) => {
  return axios.post(`${apiUrl}dashboard/ads`, data?.body)
}


