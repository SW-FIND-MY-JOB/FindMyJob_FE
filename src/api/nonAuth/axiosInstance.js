// src/api/nonAuth/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.findmyjob.net", // ✅ 배포 서버 주소
  withCredentials: true,
});

export default axiosInstance;
