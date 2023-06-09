import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
});

instance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("HR_access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// const token = window.localStorage.getItem("HR_access_token");

export default instance;
