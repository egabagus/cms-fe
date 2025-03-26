import axios from "axios";

const ExportConnectionService = axios.create({
  baseURL: "http://egabagus.test/api",
  responseType: "blob",
});

ExportConnectionService.interceptors.request.use(
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

export default ExportConnectionService;
