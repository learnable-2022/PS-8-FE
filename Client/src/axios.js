import axios from "axios";

const baseURL = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.getItem("HR_access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response, config } = error;

    if (response.status === 403) {
      try {
        const res = await getRefreshToken();
        if (res?.data) {
          const { accessToken } = res.data;
          localStorage.setItem("HR_access_token", accessToken);

          config.headers["Authorization"] = `Bearer ${accessToken}`;

          return instance(config);
        } else {
          logOut();
          return error;
        }
      } catch (err) {
        console.log(err);
      }
    }
    const { error: errMsg } = error.response.data;

    return errMsg;
  }
);

const getRefreshToken = async () => {
  const response = await instance.get("/refresh");
  return response;
};

const logOut = async () => {
  localStorage.removeItem("HR_access_token");
  localStorage.removeItem("userInfo");
  window.location.href = "/";
};
// const token = window.localStorage.getItem("HR_access_token");

export default instance;
