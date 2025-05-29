import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://api.findmyjob.net",
    withCredentials: true,
});

export default axiosInstance;