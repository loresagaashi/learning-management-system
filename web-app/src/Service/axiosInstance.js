import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (x) => Promise.resolve(x.data),
  (x) => Promise.reject(x.response?.data),
);

axiosInstance.interceptors.request.use(
  config => {
    const user = localStorage.getItem("user");
    if (user) {
      config.headers.Authorization = "Bearer " + JSON.parse(user)?.accessToken;
    }
      return config;
    },(error) => {
    return Promise.reject(error);
  }
)