import axios from "axios";
import { getToken } from "../../utils/auth";

const axiosInstanceForAuth = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
});

axiosInstanceForAuth.interceptors.request.use(
  config => {
      const accessToken = getToken();

      if(accessToken){
          config.headers.Authorization = `Bearer ${accessToken}`;
      } 
      return config;
  },
  error => Promise.reject(error),
);
