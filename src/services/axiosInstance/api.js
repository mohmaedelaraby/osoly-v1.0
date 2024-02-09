
import axios from "axios";
import { setupInterceptorsTo } from "./axiosInstance";

const api = setupInterceptorsTo(
  axios.create({
    headers: {
      // "Content-Type": "application/json",
    },
  })
);

export default api;