import axios from "axios";
import { apiUrl } from "../../../utils/exportEnvUrls";


export const loginApi = (user) => {
  return axios.post(
    `${apiUrl}auth/login`,
    user
  );
};
