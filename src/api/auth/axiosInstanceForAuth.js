import axios from "axios";
import { getToken } from "../../utils/auth";
import { getNewAccessToken } from "../authService/authAPI";

const axiosInstanceForAuth = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}`,
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

// 응답 인터셉터
axiosInstanceForAuth.interceptors.response.use(
    (response) => response, // 성공 응답은 그대로 전달
    async (error) => {
        const originalRequest = error.config;

        console.log(error.response);

        // 401에러시 조건문 실행
        if (
            (error.response.status === 401) && 
            !originalRequest._retry){

            // 무한 루프 방지 플래그 설정
            originalRequest._retry = true; 

            console.log("[axiosInstance] 401에러!");

            try{
                // Refresh Token을 이용해 새 Access Token 요청
                await getNewAccessToken();

                //원래 요청 재시도
                return axiosInstanceForAuth(originalRequest);
            } catch (error) {
                console.log("엑세스 토큰 재발급에 실패하였습니다.");
                console.log(error.response);
                return Promise.reject(error);
            }
        }

        //401에러가 아니라면 에러를 그대로 반환
        return Promise.reject(error);
    }
);

export default axiosInstanceForAuth;