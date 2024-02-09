import axios, {
} from "axios";
import { apiUrl } from "../../utils/exportEnvUrls";

// Request interceptor: Modify outgoing request config
const onRequest = (
  config
) => {
  const currentUserJson = localStorage.getItem("currentUser");
  const clientKey = sessionStorage.getItem("clientKey");
  const currentUser = currentUserJson ? JSON.parse(currentUserJson) : {};

  // Extract access token and API key from the current user
  const accessToken = currentUser?.accessToken;
  const apiKey = currentUser?.apiKey;

  // If clientKey exists, ClientKey headers to the request config
  if (clientKey) {
    config.headers["ClientKey"] = clientKey;
  }
  // If accessToken exists, Authorization headers to the request config
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  // If accessToken exists, Apikey headers to the request config
  if (apiKey) {
    config.headers["Apikey"] = apiKey;
  }

  return config;
};

const onRequestError = (error) => {
  return Promise.reject(error);
};

const onResponse = (response) => {
  localStorage.removeItem("refreshRequested");
  return response;
};

let failedQueue = [];

const processQueue = (token, error) => {
  failedQueue.forEach(prom => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });

  failedQueue = [];
};

// Response error interceptor: Handle errors in response
const onResponseError = async (error) => {
  if (error.config) {
    const originalRequest = error.config;

    // If the response status is 401 or 403 (unauthorized | forbidden), refresh the access token
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const refreshRequested = localStorage.getItem("refreshRequested");
      if (refreshRequested == "true") { // Check if already one refresh request has been initialized
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      } else {
        localStorage.setItem("refreshRequested", "true");
      }
      const currentUserJson = localStorage.getItem("currentUser");
      const clientKey = localStorage.getItem("clientKey");
      const currentUser = currentUserJson
        ? JSON.parse(currentUserJson)
        : {};
      // Extract refresh token from the current user
      const storedRefreshToken = currentUser?.refreshToken;

      try {
        // Call the refresh token API endpoint
        const res = await axios.post(
          `${apiUrl}/Protected/Token/Refresh`,
          {
            refreshToken: storedRefreshToken,
          }
        );

        // Check if the refresh token request was successful
        if (res.data.isSucceeded) {
          // Extract new access token and refresh token from the response
          const newAccessToken = res.data.data.accessToken;
          const newRefreshToken = res.data.data.refreshToken;

          // Update the current user with the new tokens
          const updatedUser = {
            ...currentUser,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
          };
          localStorage.setItem("currentUser", JSON.stringify(updatedUser));
          localStorage.removeItem("refreshRequested");

          // Resend the original request with the new access token
          if (originalRequest.headers && newAccessToken) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // If clientKey exists, add it to the headers
            if (clientKey) {
              originalRequest.headers.ClientKey = clientKey;
            }
          }
          processQueue(newAccessToken, null);
          return axios(originalRequest);
        } else {
          processQueue(null, res.data.status);
          // If the refresh token request fails, return error
          logout();
          return Promise.reject(error);
        }
      } catch (_error) {
        processQueue(null, _error);
        logout();
        return Promise.reject(_error);
      }
    }
  }
  return Promise.reject(error);
};

export const setupInterceptorsTo = (
  axiosInstance
) => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};


export const logout = () => {
  // localStorage.removeItem("currentUser");
  window.location.href = "/login";
}
