import { apiUrl } from "../../utils/exportEnvUrls";
import api from "../axiosInstance/api";

//Fetch all enterprises
export const getPlans = () => {
  return api.get(`${apiUrl}dashboard/plans`, {
  }).then(res => res.data.data)
}






