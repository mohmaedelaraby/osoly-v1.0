import axios from "axios";


export const loginApi = (user) => {
  return axios.post(
    `test/Protected/referd/Token`,
    user
  );
};
