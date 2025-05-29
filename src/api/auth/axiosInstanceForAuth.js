import axios from "axios";
import { getToken } from "../../utils/auth";

const axiosInstanceForAuth = axios.create({
    baseURL: "https://api.findmyjob.net",
    withCredentials: true,
});

axiosInstanceForAuth.interceptors.request.use(
  config => {
      const accessToken = getToken();

      if(accessToken){
          config.headers.Authorization = `${accessToken}`;
      } 
      return config;
  },
  error => Promise.reject(error),
);
