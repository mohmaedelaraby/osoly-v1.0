import axios from "axios";
import { apiUrl } from "../../../utils/exportEnvUrls";


export const loginApi = (user) => {
  console.log(user)
  return axios.post(
    `${apiUrl}dashboard/auth/login`,
    user
  );
};
