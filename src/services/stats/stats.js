import { apiUrl } from "../../utils/exportEnvUrls";
import api from "../axiosInstance/api";

//Fetch all enterprises
export const getStats = () => {
  return api.get(`${apiUrl}dashboard/stats`, {
  }).then(res => res.data.data)
}






