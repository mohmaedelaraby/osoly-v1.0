import api from "../../../services/axiosInstance/api"
import { apiUrl } from "../../../utils/exportEnvUrls"

//update enterprises
export const updateSettings = (data) => {
    return api.post(`${apiUrl}dashboard/enterprises/settings`, data?.body)
  }