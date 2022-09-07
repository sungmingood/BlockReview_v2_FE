import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {getCookie, removeCookie} from "./hooks/Cookie";

const token = getCookie("blockReview");

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

if (!!token) {
  api.defaults.headers.common["Authorization"] = "Bearer " + token;
}

api.interceptors.response.use(
  (config: AxiosResponse) => {
    return config;
  },
  (err) => {
    if (err.response.status == 404) {
      window.location.replace("/notfound");
    }
    if (err.response.status == 401) {
      removeCookie("blockReview");
    }
    return Promise.reject(err);
  }
);

export default api;
