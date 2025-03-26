import axios from "axios";

const ApiConnectionService = axios.create({
  baseURL: "http://egabagus.test/api",
});

ApiConnectionService.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default ApiConnectionService;
